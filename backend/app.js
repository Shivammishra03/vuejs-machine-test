const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
});


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/images', express.static('images'));

app.use('/api', routes);
app.use(limiter);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
