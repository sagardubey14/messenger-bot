const express = require('express');
const { verifyWebhook, sendTestMessage, handleWebhookEvent } = require('../controllers/messageController');
const router = express.Router();

router.get('/webhook', verifyWebhook);
router.post('/webhook', handleWebhookEvent);
router.post('/send', sendTestMessage);


module.exports = router;
