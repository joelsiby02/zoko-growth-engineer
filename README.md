# 💬 Zoko Live Messaging Monitor

A lightweight real-time WhatsApp monitoring dashboard built using **Node.js (Express)** and **Streamlit**, integrated with the **Zoko API**.

This application listens to Zoko webhook events, tracks today's conversations, calculates first response SLA, and allows users to send WhatsApp messages directly through the dashboard.

---

# 📸 Application Preview

![Zoko Live Messaging Monitor](ui.png)

---

# ✨ Features

## 📥 Webhook Integration

- Receives incoming WhatsApp messages from Zoko
- Receives outgoing WhatsApp messages from Zoko
- Processes webhook events in real time
- Stores messages in memory for this prototype

---

## 📊 Live Dashboard

Displays today's messaging metrics including:

- 👥 Unique Members Who Chatted
- 👨‍💼 Unique Agents Who Chatted
- 🟢 Conversations receiving a first response within 1 minute
- 🔴 Conversations receiving a first response after 1 minute

The dashboard automatically refreshes every **5 seconds**.

---

## 💬 Conversation Monitor

Displays today's conversations with:

- Customer Name
- Phone Number
- Agent Name
- Agent Email (if available)
- Application Name
- Application Type
- Customer Message
- Agent Reply
- Response Time
- SLA Status Badge

Conversations can also be downloaded as a CSV file.

---

## 📨 Send WhatsApp Message

A simple form allows sending WhatsApp messages through the Zoko API.

Features include:

- Mobile number validation
- Automatic country code prefix (`91`)
- Delivery status display
- Customer ID
- Message ID

---

# 🧠 First Response Logic

After clarifying the requirement, the application calculates SLA as follows:

- Only the **first customer conversation of the day** is considered.
- The **first agent reply** determines the response time.
- Any later conversations from the **same customer on the same day are ignored** for SLA calculation.
- Metrics automatically reset each day by considering only today's webhook events.

### Example

```
09:00 Customer → Hi
09:00:20 Agent → Hello
✅ Counted (20 seconds)

14:00 Customer → Need help
14:04 Agent → Sure
❌ Ignored
```

Dashboard Result

```
🟢 Under 1 Minute = 1
🔴 Over 1 Minute = 0
```

---

# 🏗️ Tech Stack

### Backend

- Node.js
- Express.js
- Axios

### Frontend

- Streamlit
- Pandas

### APIs

- Zoko Webhook API
- Zoko Messaging API

---

# 📁 Project Structure

```
backend/
│
├── controllers/
├── routes/
├── services/
├── app.js
├── server.js
├── package.json
└── package-lock.json

frontend/
│
├── app.py
└── requirements.txt
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000
ZOKO_API_KEY=YOUR_ZOKO_API_KEY
```

---

# 🚀 Running Locally

## Backend

```bash
git clone <repository-url>

cd backend

npm install

npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

## Frontend

```bash
cd frontend

pip install -r requirements.txt

streamlit run app.py
```

Frontend runs on

```
http://localhost:8501
```

---

# 🔌 API Endpoints

## Receive Webhook

```
POST /webhook
```

Receives incoming and outgoing WhatsApp webhook events.

---

## Dashboard

```
GET /dashboard
```

Returns:

- Today's Summary Metrics
- Active Agents
- Today's Conversations

---

## Messages

```
GET /messages
```

Returns all received webhook events.

---

## Send WhatsApp Message

```
POST /send-message
```

Example Request

```json
{
    "phone": "919876543210",
    "message": "Hello from Zoko Monitor"
}
```

---

# 🌐 Deployment

### Backend

Deploy using:

- Render
- Railway

### Frontend

Deploy using:

- Streamlit Community Cloud

After deployment, update:

```python
BACKEND_URL = "https://your-backend-url.com"
```

---

# 📌 Notes

- This project was developed as a working prototype for the **Zoko Growth Engineer Task**.
- Still updation needed, since time was a limitation. Will be revisiting this project back
