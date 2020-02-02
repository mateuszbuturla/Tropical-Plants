const mongoose = require('mongoose');
const Schelma = mongoose.Schema;

const usersModel = new Schelma({
    _id: { type: mongoose.ObjectId, required: true },
    login: { type: String, required: true },
    password: { type: String, required: true },
    shopingcart: { type: Array, required: true },
})

module.exports = mongoose.model('users', usersModel);