const plantsController = require('../controllers/plantsController');

module.exports = (app) => {

    app.post('/api/getplants', plantsController.getPlants);

    app.post('/api/getplants/:type', plantsController.getPlantsType);

    app.post('/api/search/:searchValue', plantsController.searchPlants);
}