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

//     const conversations = [];

//     let fastResponses = 0;
//     let slowResponses = 0;

//     messages.forEach((message) => {

//         // -----------------------------
//         // Incoming Customer Message
//         // -----------------------------
//         if (message.direction === "FROM_CUSTOMER") {

//             uniqueMembers.add(message.customerId);

//             if (!pendingCustomers[message.customerId]) {
//                 pendingCustomers[message.customerId] = message;
//             }

//             return;
//         }

//         // -----------------------------
//         // Outgoing Store Reply
//         // -----------------------------
//         if (message.direction === "FROM_STORE") {

//             // Prefer email, otherwise sender name
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

const getDashboardStats = () => {

    // ------------------------------------
    // Get only today's messages
    // ------------------------------------

    const allMessages = getMessages();

    const today = new Date().toISOString().split("T")[0];

    const messages = allMessages.filter(message => {

        if (!message.timestamp) return false;

        return message.timestamp.startsWith(today);

    });

    const uniqueMembers = new Set();
    const uniqueAgents = new Set();

    const activeAgents = new Map();

    const pendingCustomers = {};

    // Customer already evaluated today
    const processedCustomers = new Set();

    const conversations = [];

    let fastResponses = 0;
    let slowResponses = 0;

    messages.forEach((message) => {

        // ------------------------------------
        // Incoming customer message
        // ------------------------------------

        if (message.direction === "FROM_CUSTOMER") {

            uniqueMembers.add(message.customerId);

            // Ignore if customer already evaluated today
            if (processedCustomers.has(message.customerId)) {
                return;
            }

            // Save only first customer message
            if (!pendingCustomers[message.customerId]) {

                pendingCustomers[message.customerId] = message;

            }

            return;
        }

        // ------------------------------------
        // Outgoing store message
        // ------------------------------------

        if (message.direction === "FROM_STORE") {

            // ------------------------------------
            // Determine the actual agent identity
            // ------------------------------------
            let agentIdentifier;
            let displayName;

            if (message.agentEmail) {
                // Human agent
                agentIdentifier = message.agentEmail;
                displayName = message.senderName || message.agentEmail;
            } else if (message.appName) {
                // AI Agent (Guru, WISMO, Hallo, etc.)
                agentIdentifier = message.appName;
                displayName = message.appName;
            } else {
                // Fallback
                agentIdentifier = message.senderName || "Unknown";
                displayName = message.senderName || "Unknown";
            }

            uniqueAgents.add(agentIdentifier);

            if (!activeAgents.has(agentIdentifier)) {
                activeAgents.set(agentIdentifier, {
                    identifier: agentIdentifier,
                    name: displayName,
                    email: message.agentEmail || "-",
                    appName: message.appName || "-",
                    appType: message.appType || "-"
                });
            }

            // Already counted today's first response
            if (processedCustomers.has(message.customerId)) {
                return;
            }

            const customerMessage =
                pendingCustomers[message.customerId];

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

            // Mark customer as completed for today
            processedCustomers.add(message.customerId);

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
