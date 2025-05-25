

# 📄 Project Documentation: messenger-bot (POC)

## 📌 Overview
This project is a **proof-of-concept (POC)** that connects a Meta Facebook Page to a Node.js backend server using the **Messenger Platform API**. It demonstrates how to:

* Verify a webhook for a Facebook Page
* Receive messages via the Messenger API
* Send automatic replies
* Use **Ngrok** for tunneling
* Follow an **MVC architecture** for clean, modular code

---

## 🧱 Project Structure

```bash
project-root/
│
├── controllers/
│   └── messageController.js    # Handles request logic
│
├── routes/
│   └── webhookRoutes.js        # Route definitions
│
├── services/
│   └── messengerService.js     # Handles Meta API logic
│
├── index.js                    # App entry point (server setup)
├── .env                        # Env vars (tokens, port, ngrok domain)
└── package.json                # Project config & dependencies
```

---

## ⚙️ How It Works

### 1. **Server Startup (`index.js`)**

* Loads environment variables using `dotenv`
* Sets up Express server and parses JSON payloads
* Imports and mounts routes from `webhookRoutes.js`
* Starts server and creates a secure tunnel using **Ngrok**
* Logs the Ngrok public URL for webhook configuration

```js
app.listen(PORT, async () => {
  const listener = await ngrok.connect({ addr: PORT, ... });
  console.log(`Ngrok tunnel at: ${listener.url()}`);
});
```

---

### 2. **Webhook Routing (`routes/webhookRoutes.js`)**

Defines three primary routes:

| Method | Route      | Description                             |
| ------ | ---------- | --------------------------------------- |
| GET    | `/webhook` | Meta webhook verification (challenge)   |
| POST   | `/webhook` | Handle incoming message events          |
| POST   | `/send`    | Send a test message to a hardcoded PSID |

---

### 3. **Message Controller (`controllers/messageController.js`)**

Handles the logic behind each route:

#### `verifyWebhook(req, res)`

* Meta sends a GET request to verify the webhook.
* Compares `hub.verify_token` from request with `VERIFY_TOKEN` from `.env`.
* If valid, sends back `hub.challenge`; else, returns 403.

#### `handleWebhookEvent(req, res)`

* Listens for incoming messages (`POST /webhook`)
* Loops through the messaging events
* Logs incoming messages
* Calls `messengerService.sendTextMessage()` to auto-reply

#### `sendTestMessage(req, res)`

* Sends a test message to a **hardcoded PSID**
* Logs the result or any errors

---

### 4. **Messenger Service (`services/messengerService.js`)**

Handles interaction with the **Meta Graph API**.

#### `sendTextMessage(recipientId, text)`

* Sends a POST request to `https://graph.facebook.com/v21.0/me/messages`
* Passes `PAGE_ACCESS_TOKEN` via query param
* Sends a JSON body with recipient ID and message text
* Logs API response or error

---

## 🔐 Environment Variables (`.env`)

```env
PAGE_ACCESS_TOKEN=EAAG...YOURTOKEN
VERIFY_TOKEN=my_verify_token
NGROK_AUTHTOKEN=your-ngrok-authtoken
NGROK_DOMAIN=your-subdomain.ngrok.dev
PORT=8080
PSID=hard-coded psid
```

---

## 🔁 Message Flow

1. A user sends a message to your **Facebook Page**.
2. Facebook sends the message event to your **Webhook URL**.
3. Your server logs the message and sends a reply.
4. User receives the reply in Messenger.

---

## 🔧 Tools & Dependencies

| Tool/Library   | Purpose                      |
| -------------- | ---------------------------- |
| `express`      | Web server                   |
| `axios`        | HTTP client for API calls    |
| `@ngrok/ngrok` | Public HTTPS tunnel          |
| `dotenv`       | Manage environment variables |
| `body-parser`  | Parse incoming JSON payloads |

---

## 📋 Example Test Cases

| Test                                                                                                            | Expected Result                          |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Open `https://<ngrok>.ngrok-free.app/webhook?hub.mode=subscribe&hub.verify_token=my_verify_token&hub.challenge=12345` | Returns `12345` if token matches         |
| Send a message from FB Page                                                                                     | Logs the message in console + auto reply |
| Call `POST /send`                                                                                               | Sends "Hello from my bot" to test PSID   |

---

## 📦 Deployment Notes

* Make sure the **Meta App is Live** and **Page is linked**
* Use **Graph API Explorer** to:

  * Generate a **Page Access Token**
  * Call `/me/messages` to verify permissions
* Set your **Webhook callback URL** using Ngrok
* Subscribe your app to the Page via Graph API

---

**Sagar Dubey**
📧 [sagardubey353@gmail.com](mailto:sagardubey353@gmail.com)

---

## 🔗 References

1. [Messenger Platform Quick Start Guide](https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start/)
2. [Graph API Explorer Guide](https://developers.facebook.com/docs/graph-api/guides/explorer)
3. [Messenger Platform Overview](https://developers.facebook.com/docs/messenger-platform/overview)
4. [Send Messages with Messenger API](https://developers.facebook.com/docs/messenger-platform/send-messages/)
5. [Ngrok JavaScript SDK Docs](https://ngrok.github.io/ngrok-javascript/)
6. [ChatGPT (OpenAI)](https://chat.openai.com) – Use for understanding complex documentation, and learning APIs quickly

---