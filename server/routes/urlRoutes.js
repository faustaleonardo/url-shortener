const express = require('express');

const router = express.Router();

const { isLoggedIn } = require('../controllers/authController');
const { getUrl, getTrack, postUrl } = require('../controllers/urlController');

router.get('/track', isLoggedIn, getTrack); // protect
router.get('/:code', getUrl);
router.post('/', postUrl);

module.exports = router;
