const express = require('express');

const router = express.Router();

const { isLoggedIn } = require('../controllers/authController');
const {
  getUrl,
  getStats,
  getTrack,
  getHistory,
  postUrl
} = require('../controllers/urlController');

router.get('/track/:urlId', isLoggedIn, getTrack);
router.get('/history', isLoggedIn, getHistory);
router.get('/stats', isLoggedIn, getStats);
router.get('/:code', getUrl);
router.post('/', postUrl);

module.exports = router;
