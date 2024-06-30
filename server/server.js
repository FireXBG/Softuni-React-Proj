const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes')

const port = 3001;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
    mongoose.connect('mongodb://localhost:27017/tables').then(() => {
        console.log('Connected to MongoDB')
    }).catch((err) => {
        console.error(err)
    })
})