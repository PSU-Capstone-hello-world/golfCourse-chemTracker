const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(cors());

app.use('/login', (req, res) => {
    console.log(`${req.body.username} - ${req.body.password}`);
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));