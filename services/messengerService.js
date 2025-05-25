const axios = require('axios');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN; // secret token to access FB API

exports.sendTextMessage = async (recipientId, text) => {
  try {
    // send a POST request to Facebook to send a message to the user recipientId
    const res = await axios.post(
      `https://graph.facebook.com/v20.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
      {
        recipient: { id: recipientId },
        message: { text: text }
      }
    );
    console.log('Reply sent:', res.data); // log success
  } catch (err) {
    // log error if something goes wrong
    console.error('Error sending message:', err.response?.data || err.message);
    throw err;
  }
};
