const express = require('express');
const passport = require('passport');

const router = express.Router();

const {
  login,
  signup,
  logout,
  error,
  getUser
} = require('../controllers/authController');

router.post('/signup', signup);
router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/api/auth/error' }),
  login
);
router.get('/user', getUser);
router.get('/logout', logout);

router.get('/error', error);

module.exports = router;
