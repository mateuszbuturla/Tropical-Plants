const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
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

app.use(express.static(path.join(__dirname, '/../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

db.once('open', () => {
    console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));

serverRouter(app);

app.listen(port)