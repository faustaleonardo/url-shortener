const express = require('express');

const router = express.Router();

const { login, signup, getUser } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', getUser);

module.exports = router;
