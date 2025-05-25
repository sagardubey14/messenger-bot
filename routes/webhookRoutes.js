const express = require('express');
const { verifyWebhook } = require('../controllers/messageController');
const router = express.Router();

router.get('/webhook', verifyWebhook);

module.exports = router;
