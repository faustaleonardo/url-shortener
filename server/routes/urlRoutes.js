const express = require('express');

const router = express.Router();

const requireLogin = require('../middlewares/requireLogin');
const {
  getUrl,
  getStats,
  getTrack,
  getHistory,
  postUrl,
  patchUrl
} = require('../controllers/urlController');

router.get('/track/:urlId', requireLogin, getTrack);
router.get('/history', requireLogin, getHistory);
router.get('/stats', requireLogin, getStats);
router.get('/:code', getUrl);
router.post('/', postUrl);
router.patch('/:urlId', patchUrl);

module.exports = router;
