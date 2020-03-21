const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const models = require('../database/models');

// passport.use(
//   'signup',
//   new LocalStrategy(
//     { usernameField: 'username', passwordField: 'password', session: false },
//     async (username, password, done) => {
//       try {
//         let user = await models.User.findOne({ where: { username } });
//         if (user)
//           return done(null, false, {
//             message: 'Username has been taken!'
//           });

//         const hashedPassword = await promisify(bcrypt.hash)(password, 10);
//         user = await models.User.create({ username, password: hashedPassword });
//         return done(null, user);
//       } catch (err) {
//         done(err);
//       }
//     }
//   )
// );

passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password', session: false },
    async (username, password, done) => {
      try {
        let user = await models.User.findOne({ where: { username } });
        if (!user)
          return done(null, false, {
            message: 'Username not found!'
          });

        const result = await promisify(bcrypt.compare)(password, user.password);
        if (!result)
          return done(null, false, {
            message: 'Username or password is incorrect!'
          });

        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY
};

passport.use(
  'jwt',
  new JWTStrategy(opts, async ({ id }, done) => {
    try {
      const user = await models.User.findOne({
        where: { username: id }
      });
      if (!user)
        done(null, false, {
          message: 'User not found'
        });

      done(null, user);
    } catch (err) {
      done(err);
    }
  })
);
