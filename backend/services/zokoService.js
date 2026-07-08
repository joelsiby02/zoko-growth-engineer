const axios = require("axios");

const sendMessage = async (phone, message) => {

    const response = await axios.post(
        "https://chat.zoko.io/v2/message",
        {
            channel: "whatsapp",
            recipient: phone,
            type: "text",
            message: message
        },
        {
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                apikey: process.env.ZOKO_API_KEY
            }
        }
    );

    return response.data;
};

module.exports = {
    sendMessage
};