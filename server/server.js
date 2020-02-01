const express = require('express')
const app = express()

const port = process.env.PORT || 4000;

app.get('/', function (req, res) {
    res.send('Tropical Plants')
})

app.listen(port)