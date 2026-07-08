// const { getMessages } = require("./messageService");

// const formatResponseTime = (seconds) => {

//     if (seconds < 60) {
//         return `${seconds} sec`;
//     }

//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;

//     return `${minutes} min ${remainingSeconds} sec`;
// };

// const getDashboardStats = () => {

//     const messages = getMessages();

//     const uniqueMembers = new Set();
//     const uniqueAgents = new Set();

//     const activeAgents = new Map();

//     const pendingCustomers = {};

//     // NEW: Customers already counted today
//     const processedCustomers = new Set();

//     const conversations = [];

//     let fastResponses = 0;
//     let slowResponses = 0;

//     messages.forEach((message) => {

//         // -----------------------------
//         // Incoming Customer Message
//         // -----------------------------
//         if (message.direction === "FROM_CUSTOMER") {

//             uniqueMembers.add(message.customerId);

//             // Ignore future messages from customers already processed
//             if (processedCustomers.has(message.customerId)) {
//                 return;
//             }

//             // Save only the first message awaiting reply
//             if (!pendingCustomers[message.customerId]) {
//                 pendingCustomers[message.customerId] = message;
//             }

//             return;
//         }

//         // -----------------------------
//         // Outgoing Store Reply
//         // -----------------------------
//         if (message.direction === "FROM_STORE") {

//             const agentIdentifier =
//                 message.agentEmail ||
//                 message.senderName ||
//                 message.appName ||
//                 "Unknown";

//             uniqueAgents.add(agentIdentifier);

//             if (!activeAgents.has(agentIdentifier)) {

//                 activeAgents.set(agentIdentifier, {
//                     name: message.senderName || "Unknown",
//                     email: message.agentEmail || "-",
//                     appName: message.appName || "-",
//                     appType: message.appType || "-"
//                 });

//             }

//             // Ignore replies for customers already counted
//             if (processedCustomers.has(message.customerId)) {
//                 return;
//             }

//             const customerMessage =
//                 pendingCustomers[message.customerId];

//             if (!customerMessage) return;

//             const customerTime =
//                 new Date(customerMessage.timestamp);

//             const replyTime =
//                 new Date(message.timestamp);

//             const seconds =
//                 Math.floor((replyTime - customerTime) / 1000);

//             const underOneMinute = seconds <= 60;

//             if (underOneMinute)
//                 fastResponses++;
//             else
//                 slowResponses++;

//             conversations.push({

//                 customer: customerMessage.customerName,

//                 phone: customerMessage.phone,

//                 agentName: message.senderName,

//                 agentEmail: message.agentEmail,

//                 appName: message.appName,

//                 appType: message.appType,

//                 customerMessage: customerMessage.text,

//                 agentReply: message.text,

//                 responseTimeSeconds: seconds,

//                 responseTime: formatResponseTime(seconds),

//                 status: underOneMinute
//                     ? "UNDER_1_MIN"
//                     : "OVER_1_MIN",

//                 statusBadge: underOneMinute
//                     ? "🟢 Under 1 Minute"
//                     : "🔴 Over 1 Minute"

//             });

//             // Mark this customer as completed for today
//             processedCustomers.add(message.customerId);

//             delete pendingCustomers[message.customerId];

//         }

//     });

//     return {

//         summary: {

//             uniqueMembers: uniqueMembers.size,

//             uniqueAgents: uniqueAgents.size,

//             fastResponses,

//             slowResponses

//         },

//         agents: [...activeAgents.values()],

//         conversations

//     };

// };

// module.exports = {
//     getDashboardStats
// };

const { getMessages } = require("./messageService");

const formatResponseTime = (seconds) => {

    if (seconds < 60) {
        return `${seconds} sec`;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes} min ${remainingSeconds} sec`;
};

const getDashboardStats = async () => {

    // Fetch messages from Supabase
    const allMessages = await getMessages();

    const today = new Date().toISOString().split("T")[0];

    const messages = allMessages.filter(message => {

        if (!message.timestamp) return false;

        return message.timestamp.startsWith(today);

    });

    const uniqueMembers = new Set();
    const uniqueAgents = new Set();

    const activeAgents = new Map();

    const pendingCustomers = {};

    const processedCustomers = new Set();

    const conversations = [];

    let fastResponses = 0;
    let slowResponses = 0;

    messages.forEach((message) => {

        // -----------------------------
        // Incoming Customer Message
        // -----------------------------
        if (message.direction === "FROM_CUSTOMER") {

            uniqueMembers.add(message.customer_id);

            if (processedCustomers.has(message.customer_id)) {
                return;
            }

            if (!pendingCustomers[message.customer_id]) {
                pendingCustomers[message.customer_id] = message;
            }

            return;
        }

        // -----------------------------
        // Outgoing Store Reply
        // -----------------------------
        if (message.direction === "FROM_STORE") {

            const agentIdentifier =
                message.agent_email ||
                message.sender_name ||
                message.app_name ||
                "Unknown";

            uniqueAgents.add(agentIdentifier);

            if (!activeAgents.has(agentIdentifier)) {

                activeAgents.set(agentIdentifier, {

                    name: message.sender_name || "-",

                    email: message.agent_email || "-",

                    appName: message.app_name || "-",

                    appType: message.app_type || "-"

                });

            }

            if (processedCustomers.has(message.customer_id)) {
                return;
            }

            const customerMessage =
                pendingCustomers[message.customer_id];

            if (!customerMessage) {
                return;
            }

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

                customer: customerMessage.customer_name,

                phone: customerMessage.phone,

                agentName: message.sender_name,

                agentEmail: message.agent_email,

                appName: message.app_name,

                appType: message.app_type,

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

            processedCustomers.add(message.customer_id);

            delete pendingCustomers[message.customer_id];

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