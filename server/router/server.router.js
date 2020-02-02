const plantsController = require('../controllers/plantsController');
const usersController = require('../controllers/usersController');

module.exports = (app) => {

    app.post('/api/getplants', plantsController.getPlants);

    app.post('/api/getplants/:type', plantsController.getPlantsType);

    app.post('/api/getPlantsByName/:name', plantsController.getPlantByName);

    app.post('/api/search/:searchValue', plantsController.searchPlants);

    app.post('/api/user/login/:login/:password', usersController.userLogin);

    app.post('/api/user/register/:login/:password', usersController.userRegister);

    app.post('/api/user/updateshopingcart/:id/:shopingcart', usersController.updateShopingCart);
}