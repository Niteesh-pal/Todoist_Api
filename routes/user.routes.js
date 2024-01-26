const express = require('express');
const { registerUser } = require('../controllers/user.controller');
const { verifySignUp, verifyLogin } = require('../middleware/user/verifyUserInput');
const userRoute = express.Router();

userRoute.route('/register').post(verifySignUp, registerUser);
userRoute.route('/login').post(verifyLogin, registerUser);
module.exports = userRoute;
