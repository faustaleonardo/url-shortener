const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) {
      console.log(err);
      return res.status(500).json('Something went wrong');
    }

    if (info) return res.status(401).json(info.message);

    const token = jwt.sign({ id: user.username }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
    res.status(200).json(token);
  })(req, res, next);
};

exports.getUser = (req, res) => {
  res.status(200).json(req.user);
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
