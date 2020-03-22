const { promisify } = require('util');
const bcrypt = require('bcryptjs');

const models = require('../database/models');

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  let user = await models.User.findOne({ where: { username } });
  if (user) return res.status(401).json('Username has been taken!');

  const hashedPassword = await promisify(bcrypt.hash)(password, 10);
  user = await models.User.create({ username, password: hashedPassword });

  req.login(user, err => {
    if (err) return res.status(500).json('Something went wrong.');
    res.redirect('/');
  });
};

exports.login = (req, res) => {
  return res.redirect('/');
};

exports.getUser = (req, res) => {
  return res.status(200).json(req.user);
};

exports.error = (req, res) => {
  return res.status(401).json('Username or password is incorrect!');
};
