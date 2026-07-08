const messages = [];

const saveMessage = (payload) => {

    const message = {

        event: payload.event,
        direction: payload.direction,

        customerId: payload.customer?.id || null,
        customerName: payload.customerName || "",

        phone: payload.platformSenderId || "",

        text: payload.text || "",

        senderName: payload.senderName || "",

        agentEmail: payload.agentEmail || null,

        appName: payload.appName || null,

        appType: payload.appType || null,

        timestamp: payload.platformTimestamp || new Date().toISOString()

    };

    messages.push(message);

};

const getMessages = () => messages;

module.exports = {
    saveMessage,
    getMessages
};