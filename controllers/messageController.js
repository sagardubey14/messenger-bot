const { sendTextMessage } = require("../services/messengerService");

const VERIFY_TOKEN = process.env.VERIFY_TOKEN; // our secret token to check requests

exports.verifyWebhook = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  console.log(mode, challenge); // just to see logs

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('WEBHOOK_VERIFIED'); // token matched, all good
    res.status(200).send(challenge); // send back challenge like FB wants
  } else {
    console.log('WEBHOOK_VERIFICATION_FAILED'); // wrong token or something
    res.sendStatus(403); // not allowed
  }
};

exports.handleWebhookEvent = async (req, res) => {
  const body = req.body;

  if (body.object === 'page') { // make sure it's a page-related event
    for (const entry of body.entry) {
      for (const event of entry.messaging) {
        const senderId = event.sender.id;

        if (event.message && event.message.text) {
          console.log(`Incoming message from ${senderId}: ${event.message.text}`); // log message
          await sendTextMessage(senderId, 'Hello from my bot'); // send reply
        }
      }
    }

    res.status(200).send('EVENT_RECEIVED'); // tell FB we got it
  } else {
    res.sendStatus(404); // not from a page? ignore it
  }
};


exports.sendTestMessage = async (req, res) => {
  const testPSID = process.env.PSID; // hard-coded PSID for sending texts
  try {
    
    await sendTextMessage(testPSID, 'Hello from my bot');
    res.status(200).send('Message sent');
  } catch (err) {
    console.error('Failed to send test message:', err.message);
    res.sendStatus(500);
  }
};
