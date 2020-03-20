const express = require('express');

const router = express.Router();

const { getUrl, postUrl } = require('../controllers/urlController');

router.get('/:code', getUrl);
router.post('/', postUrl);

module.exports = router;
