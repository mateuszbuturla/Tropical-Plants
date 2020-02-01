const express = require('express');
const app = express();
const mongoose = require('mongoose');

const config = require('./config');

const port = process.env.PORT || 4000;

const serverRouter = require('./router/server.router');

mongoose.connect(config.db, { useNewUrlParser: true });
const db = mongoose.connection;
global.db = db;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', config.client);
    next();
})

app.get('/', function (req, res) {
    res.send('Tropical Plants')
})

db.once('open', () => {
    console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));

serverRouter(app);

app.listen(port)