const express = require('express');
const passport = require('passport');

const router = express.Router();

const {
  login,
  signup,
  error,
  getUser
} = require('../controllers/authController');

router.post('/signup', signup);
router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/auth/error' }),
  login
);
router.get('/current_user', getUser);

router.get('/error', error);

module.exports = router;
