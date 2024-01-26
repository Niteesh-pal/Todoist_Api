const express = require('express');
const { registerUser } = require('../controllers/user.controller');
const { verifySignUp } = require('../middleware/user/verifySignUp');
const userRoute = express.Router();

userRoute.route('/register').post(verifySignUp, registerUser);

module.exports = userRoute;
