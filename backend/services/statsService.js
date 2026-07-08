const { getMessages } = require("./messageService");

const formatResponseTime = (seconds) => {

    if (seconds < 60) {
        return `${seconds} sec`;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes} min ${remainingSeconds} sec`;

};

const getDashboardStats = () => {

    const messages = getMessages();

    const uniqueMembers = new Set();

    const uniqueAgents = new Set();

    const activeAgents = new Map();

    const pendingCustomers = {};

    const conversations = [];

    let fastResponses = 0;
    let slowResponses = 0;

    messages.forEach((message) => {

        // -----------------------------
        // Incoming Customer Message
        // -----------------------------
        if (message.direction === "FROM_CUSTOMER") {

            uniqueMembers.add(message.customerId);

            if (!pendingCustomers[message.customerId]) {
                pendingCustomers[message.customerId] = message;
            }

            return;
        }

        // -----------------------------
        // Outgoing Store Reply
        // -----------------------------
        if (message.direction === "FROM_STORE") {

            // Prefer email, otherwise sender name
            const agentIdentifier =
                message.agentEmail ||
                message.senderName ||
                message.appName ||
                "Unknown";

            uniqueAgents.add(agentIdentifier);

            if (!activeAgents.has(agentIdentifier)) {

                activeAgents.set(agentIdentifier, {

                    name: message.senderName || "Unknown",

                    email: message.agentEmail || "-",

                    appName: message.appName || "-",

                    appType: message.appType || "-"

                });

            }

            const customerMessage =
                pendingCustomers[message.customerId];

            if (!customerMessage) return;

            const customerTime =
                new Date(customerMessage.timestamp);

            const replyTime =
                new Date(message.timestamp);

            const seconds =
                Math.floor((replyTime - customerTime) / 1000);

            const underOneMinute = seconds <= 60;

            if (underOneMinute)
                fastResponses++;
            else
                slowResponses++;

            conversations.push({

                customer: customerMessage.customerName,

                phone: customerMessage.phone,

                agentName: message.senderName,

                agentEmail: message.agentEmail,

                appName: message.appName,

                appType: message.appType,

                customerMessage: customerMessage.text,

                agentReply: message.text,

                responseTimeSeconds: seconds,

                responseTime: formatResponseTime(seconds),

                status: underOneMinute
                    ? "UNDER_1_MIN"
                    : "OVER_1_MIN",

                statusBadge: underOneMinute
                    ? "🟢 Under 1 Minute"
                    : "🔴 Over 1 Minute"

            });

            delete pendingCustomers[message.customerId];

        }

    });

    return {

        summary: {

            uniqueMembers: uniqueMembers.size,

            uniqueAgents: uniqueAgents.size,

            fastResponses,

            slowResponses

        },

        agents: [...activeAgents.values()],

        conversations

    };

};

module.exports = {
    getDashboardStats
};