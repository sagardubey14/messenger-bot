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
