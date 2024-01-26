const db = require('../../config/db_connect');
const User = db.User;

const verifySignUp = (req, res, next) => {
  const { email, password, username } = req.body;

  if (email === undefined || password === undefined || username === undefined) {
    const error = new Error('Username, Email and password is required');
    error.statusCode = 400;
    return next(error);
  }
  if (username == '' || username.trim() === '') {
    const error = new Error('Email is required');
    error.statusCode = 400;
    return next(error);
  }

  if (email == '' || email.trim() === '') {
    const error = new Error('Email is required');
    error.statusCode = 400;
    return next(error);
  }

  if (password == '' || password.trim() === '') {
    const error = new Error('password is required');
    error.statusCode = 400;
    return next(error);
  }

  if (!email.includes('@')) {
    const error = new Error('Email does not match');
    error.statusCode = 400;
    return next(error);
  }

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        const error = new Error('Email already exist');
        error.statusCode = 400;
        return next(error);
      }

      return next();
    })
    .catch((err) => {
      if (err.name === 'SequelizeDatabaseError') {
        const e = new Error('Something went wrong');
        e.statusCode = 500;
        return next(e);
      }

      next(new Error(err.message));
    });
};

module.exports = { verifySignUp };
