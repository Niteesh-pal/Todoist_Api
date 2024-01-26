const bcrypt = require('bcryptjs');
const db = require('../config/db_connect');
const jwt = require('jsonwebtoken');
const User = db.User;

const registerUser = async (req, res, next) => {

  const password = await bcrypt.hashSync(req.body.password, 12);


  User.create({
    username:req.body.username.trim(),
    email: req.body.email.trim(),
    password: password,
  })
    .then((data) => {
      const token = jwt.sign({ id: data.id }, process.env.TOKEN_SECRET_STRING, {
        expiresIn: process.env.LOGIN_EXPIRE,
      });

      res.send({token,data})
    })
    .catch((err) => {
      if (err.name === 'SequelizeDatabaseError') {
        const e = new Error('Something Went Wrong while registering');
        return next(e);
      }

      next(new Error(err.message));
    });
};

module.exports = { registerUser };
