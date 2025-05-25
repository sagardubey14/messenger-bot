require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ngrok = require('@ngrok/ngrok');
const webhookRoutes = require('./routes/webhookRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use('/', webhookRoutes);


app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  try {
    const listener = await ngrok.connect({
      addr: PORT,
      authtoken_from_env: true,
      domain: process.env.NGROK_DOMAIN,
    });
    console.log(`Ngrok tunnel established at: ${listener.url()}`);
  } catch (err) {
    console.error('Failed to start ngrok:', err);
  }
});