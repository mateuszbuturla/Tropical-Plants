const plantsModel = require('../models/plantsModel');

exports.getPlants = async (req, res) => {
    try {
        res.status(200).json(await plantsModel.find({}))
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.getPlantsType = async (req, res) => {
    try {
        res.status(200).json(await plantsModel.find({ type: req.params.type }))
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.getPlantByName = async (req, res) => {
    try {
        res.status(200).json(await plantsModel.find({ name: req.params.name }))
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.searchPlants = async (req, res) => {
    try {
        res.status(200).json(await plantsModel.find({ name: { "$regex": req.params.searchValue, "$options": "i" } }))
    } catch (err) {
        res.status(500).json(err);
    }
}