const express = require('express');
const NodeCache = require('node-cache');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();
const cache = new NodeCache();

const dataFilePath = './api/countries.json';
const upload = multer({ 
    dest: 'images/',
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'));
        }
    },
    limits: { fileSize: 4 * 1024 * 1024 } // 4MB limit 
});

function readData() {
    // return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    if (fs.existsSync(dataFilePath)) {
        return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    } else {
        return { countries: [] };
    }
}

function writeData(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

router.get('/countries', (req, res) => {
    const data = readData();
    const cachedCountries = cache.get('countries');
    if (cachedCountries) {
        return res.json(cachedCountries);
    }

    const countriesData = data.countries
    const countries = countriesData.map(country => ({ id: country.id, name: country.name, continent:country.continent }));
    cache.set('countries', countries, 3600);
    res.json(countries);
});

router.get('/country/:id', (req, res) => {
    const data = readData();
    const countriesData = data.countries
    const country = countriesData.find(c => c.id === parseInt(req.params.id));
    if (country) {
        res.json(country);
    } else {
        res.status(404).send('Country not found');
    }
});

router.post('/country', upload.single('image'), (req, res) => {
    const data = readData();
    const countriesData = data.countries
    const { name, continent, rank } = req.body;

    if (!name || !continent || !rank) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (countriesData.some(c => c.name === name)) {
        return res.status(400).json({ error: 'Country name must be unique' });
    }

    if (countriesData.some(c => c.rank === parseInt(rank))) {
        return res.status(400).json({ error: 'Rank must be unique' });
    }

    const newCountry = {
        id: countriesData.length + 1,
        name,
        continent,
        flag: req.file ? `images/${req.file.filename}` : null,
        rank: parseInt(rank)
    };

    countriesData.push(newCountry);
    writeData(data);

    res.status(201).json(newCountry);
});

// Error handling middleware for multer errors
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
    } else if (err) {
        return res.status(500).json({ error: err.message });
    }
    next();
});

module.exports = router;
