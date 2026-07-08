const { sendMessage } = require("../services/zokoService");

const {
    saveMessage,
    getMessages
} = require("../services/messageService");

const {
    getDashboardStats
} = require("../services/statsService");

const webhookHandler = async (req, res) => {

    try {

        await saveMessage(req.body);

        console.log("📩 Webhook Received");
        console.dir(req.body, { depth: null });

        res.status(200).json({
            success: true,
            message: "Webhook received successfully"
        });

    } catch (error) {

        console.error("Webhook Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to save webhook."
        });

    }

};

const getAllMessages = async (req, res) => {

    try {

        const messages = await getMessages();

        res.status(200).json(messages);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Unable to fetch messages."
        });

    }

};

const getDashboard = async (req, res) => {

    try {

        const stats = await getDashboardStats();

        res.status(200).json(stats);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Unable to load dashboard."
        });

    }

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

        res.status(error.response?.status || 500).json({
            success: false,
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