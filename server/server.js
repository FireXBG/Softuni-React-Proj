const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const userServices = require('./services/userServices');

const port = 3001;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/api', routes);

mongoose.connect('mongodb://localhost:27017/tables')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, async () => {
            await userServices.setDefaultAdmin();
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });
