const userModel = require('../models/userModel');
const mongoose = require('mongoose');

exports.userLogin = async (req, res) => {
    const { login, password } = req.params;
    try {
        const findUser = await userModel.find({ login: login, password: password });
        console.log(findUser)
        if (findUser.length > 0) {
            const user = {
                _id: findUser[0]._id,
                login: findUser[0].login,
                shopingcart: findUser[0].shopingcart
            }
            res.status(200).json({ user: user, status: 'correct' });
        }
        else {
            res.status(200).json({ status: 'incorrect' });
        }
    } catch (err) {
        res.status(500).json({ message: 'error' });
    }
}