const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const models = require('../database/models');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await models.User.findByPk(id);
  done(null, user);
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      let user = await models.User.findOne({ where: { username } });
      if (!user) return done(null, false);

      const result = await promisify(bcrypt.compare)(password, user.password);
      if (!result) return done(null, false);

      return done(null, user);
    } catch (err) {
      done(err);
    }
  })
);
