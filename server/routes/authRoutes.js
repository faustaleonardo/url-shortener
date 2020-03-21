const express = require('express');

const router = express.Router();

const { login, getUser } = require('../controllers/authController');

router.post('/login', login);
router.get('/user', getUser);

module.exports = router;
