const plantsModel = require('../models/plantsController');

exports.getPlants = async (req, res) => {
    try {
        res.status(200).json(await plantsModel.find({}))
    } catch (err) {
        res.status(500).json(err);
    }
}