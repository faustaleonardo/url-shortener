const { promisify } = require('util');
const bcrypt = require('bcryptjs');

const models = require('../database/models');

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  let user = await models.User.findOne({ where: { username } });
  if (user)
    return res.status(401).json({
      status: 'fail',
      message: 'Username has been taken!'
    });

  const hashedPassword = await promisify(bcrypt.hash)(password, 10);
  user = await models.User.create({ username, password: hashedPassword });

  req.login(user, err => {
    if (err)
      return res.status(500).json({
        status: 'fail',
        message: 'Something went wrong.'
      });
    return res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  });
};

exports.login = (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: {
      user: req.user
    }
  });
};

exports.getUser = (req, res) => {
  return res.status(200).json(req.user);
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.error = (req, res) => {
  return res.status(401).json({
    status: 'fail',
    message: 'Username or password is incorrect!'
  });
};
