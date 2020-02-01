const plantsController = require('../controllers/plantsController');

module.exports = (app) => {

    app.post('/api/getplants', plantsController.getPlants);

}