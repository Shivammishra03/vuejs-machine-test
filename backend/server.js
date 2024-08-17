// const express = require('express');
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');
// const cors = require('cors');

// const app = express();
// const PORT = 8080;

// app.use(express.json());
// app.use(cors());
// app.use('/images', express.static(path.join(__dirname, 'images')));

// const dataFilePath = path.join(__dirname, 'data.json');

// // Initialize data if not exists
// if (!fs.existsSync(dataFilePath)) {
//   fs.writeFileSync(dataFilePath, JSON.stringify({ countries: [] }));
// }

// const getCountries = () => JSON.parse(fs.readFileSync(dataFilePath)).countries;
// const saveCountries = (countries) => fs.writeFileSync(dataFilePath, JSON.stringify({ countries }));


// // GET /countries - List of countries
// app.get('/countries', (req, res) => {
//   const countries = getCountries().map(country => ({ id: country.id, name: country.name }));
//   res.json(countries);
//   console.log("res.json(countries)", res.json(countries))
// });

// // GET /country/:id - Country details by ID
// app.get('/country/:id', (req, res) => {
//   const country = getCountries().find(c => c.id === req.params.id);
//   if (country) {
//     res.json(country);
//   } else {
//     res.status(404).json({ error: 'Country not found' });
//   }
// });

// // POST /country - Add new country
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   }
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 4 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//       cb(null, true);
//     } else {
//       cb(new Error('Only .jpg and .png files are allowed!'));
//     }
//   }
// });

// app.post('/country', upload.single('image'), (req, res) => {
//   const { name, continent, rank } = req.body;
//   const image = req.file ? `/images/${req.file.filename}` : null;

//   if (!name || name.length < 3 || name.length > 20 || !continent || isNaN(rank)) {
//     return res.status(400).json({ error: 'Validation failed' });
//   }

//   const countries = getCountries();
//   if (countries.some(c => c.name === name || c.rank === parseInt(rank, 10))) {
//     return res.status(400).json({ error: 'Country name or rank already exists' });
//   }

//   const newCountry = {
//     id: Date.now().toString(),
//     name,
//     continent,
//     rank: parseInt(rank, 10),
//     image
//   };

//   countries.push(newCountry);
//   saveCountries(countries);

//   res.json(newCountry);
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
