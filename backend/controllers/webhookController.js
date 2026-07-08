const { sendMessage } = require("../services/zokoService");

const {
    saveMessage,
    getMessages
} = require("../services/messageService");

const {
    getDashboardStats
} = require("../services/statsService");

const webhookHandler = (req, res) => {

    saveMessage(req.body);

    console.log("📩 Webhook Received");
    console.dir(req.body, { depth: null });

    res.status(200).json({
        success: true,
        message: "Webhook received successfully"
    });

};

const getAllMessages = (req, res) => {

    res.status(200).json(getMessages());

};

const getDashboard = (req, res) => {

    res.status(200).json(getDashboardStats());

};

const sendWhatsappMessage = async (req, res) => {

    try {

        const { phone, message } = req.body;

        const result = await sendMessage(phone, message);

        res.status(200).json(result);

    } catch (error) {

    console.log("========== ZOKO ERROR ==========");
    console.log(error.response?.status);
    console.log(error.response?.data);
    console.log(error.message);
    console.log("===============================");

    res.status(500).json({
        message: "Failed to send WhatsApp message",
        error: error.response?.data || error.message
    });

}

};

module.exports = {
    webhookHandler,
    getAllMessages,
    getDashboard,
    sendWhatsappMessage
};