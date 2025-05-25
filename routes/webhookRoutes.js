const express = require('express');
const { verifyWebhook, sendTestMessage } = require('../controllers/messageController');
const router = express.Router();

router.get('/webhook', verifyWebhook);
router.post('/send', sendTestMessage);


module.exports = router;
