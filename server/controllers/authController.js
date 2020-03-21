const passport = require('passport');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const bcrypt = require('bcryptjs');

const models = require('../database/models');

const createToken = username => {
  return jwt.sign({ id: username }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const sendToken = (res, username) => {
  const token = createToken(username);
  return res.status(200).json(token);
};

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  let user = await models.User.findOne({ where: { username } });
  if (user) return res.status(401).json('Username has been taken!');

  const hashedPassword = await promisify(bcrypt.hash)(password, 10);
  user = await models.User.create({ username, password: hashedPassword });

  sendToken(res, user.username);
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, { username }, info) => {
    if (err) {
      console.log(err);
      return res.status(500).json('Something went wrong');
    }

    if (info) return res.status(401).json(info.message);

    sendToken(res, username);
  })(req, res, next);
};

exports.isLoggedIn = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
      return res.status(500).json('Something went wrong');
    }

    if (info) return res.status(401).json(info.message);

    req.user = user;
    next();
  })(req, res, next);
};

exports.getUser = (req, res) => {
  res.status(200).json(req.user);
};
