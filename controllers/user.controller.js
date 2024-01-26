const bcrypt = require('bcryptjs');
const db = require('../config/db_connect');
const jwt = require('jsonwebtoken');
const User = db.User;

const createToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.TOKEN_SECRET_STRING, {
    expiresIn: process.env.LOGIN_EXPIRE,
  });
};

const registerUser = (req, res, next) => {
  User.create({
    username: req.body.username.trim(),
    email: req.body.email.trim(),
    password: bcrypt.hashSync(req.body.password, 12),
  })
    .then((data) => {
      const token = createToken(data);
      res.send({ token, data });
    })
    .catch((err) => {
      if (err.name === 'SequelizeDatabaseError') {
        const e = new Error('Something Went Wrong while registering');
        return next(e);
      }

      next(new Error(err.message));
    });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ where: { email: email.trim() } }).then((user) => {
    if (!user) {
      const error = new Error('user not found');
      error.statusCode = 404;
      return next(error);
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      const error = new Error('invalid user or password');
      error.statusCode = 401;
      return next(error);
    }

    const token = createToken(user);

    res.send([
      {
        id: user.id,
        username: user.username,
        email: user.email,
        token: token,
      },
    ]);
  });
};

module.exports = { registerUser, loginUser };
