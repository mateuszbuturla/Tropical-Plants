const userModel = require('../models/userModel');
const mongoose = require('mongoose');

exports.userLogin = async (req, res) => {
    const { login, password } = req.params;
    try {
        const findUser = await userModel.find({ login: login, password: password });
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

exports.userRegister = async (req, res) => {
    const { login, password } = req.params;
    try {
        if (login.length >= 5 && password.length >= 5) {
            userModel.create({ _id: mongoose.Types.ObjectId(), login: login, password: password, shopingcart: [] }, (err) => {
                if (err)
                    return console.log(err)

                res.status(200).json({ status: 'correct', message: 'Zarejestrowano pomyślnie' });
            })
        }
        else {
            res.status(200).json({ status: 'incorrect', message: 'Podano nieprawidłowe dane' });
        }
    }
    catch{
        res.status(500).json({ message: 'error' });
    }
}