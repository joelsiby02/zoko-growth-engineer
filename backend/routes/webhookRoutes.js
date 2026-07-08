const express = require("express");
const router = express.Router();

const {
    webhookHandler,
    getAllMessages,
    getDashboard,
    sendWhatsappMessage
} = require("../controllers/webhookController");

router.post("/webhook", webhookHandler);
router.get("/messages", getAllMessages);
router.get("/dashboard", getDashboard);
router.post("/send-message", sendWhatsappMessage);

module.exports = router;