const mongoose = require('mongoose');
const Schelma = mongoose.Schema;

const plantsModel = new Schelma({
    _id: { type: mongoose.ObjectId, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    imgsrc: { type: String, required: true },
    whereGrow: { type: String, required: true },
    howCare: { type: String, required: true },
})

module.exports = mongoose.model('plants', plantsModel);