const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());

const mainUserName = "helloWorld@test.com";
const mainPassword = "helloWorld";

app.use('/login', (req, res) => {
    console.log(`${req.body.username} - ${req.body.password}`);

    if (req.body.username === mainUserName && req.body.password === mainPassword) {
        res.send(true);
    } else {
        res.send(false);
    }
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));