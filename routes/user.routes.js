const express = require('express');
const { registerUser, loginUser } = require('../controllers/user.controller');
const { verifySignUp, verifyLogin } = require('../middleware/user/verifyUserInput');
const userRoute = express.Router();

userRoute.route('/register').post(verifySignUp, registerUser);
userRoute.route('/login').post(verifyLogin, loginUser);

module.exports = userRoute;
