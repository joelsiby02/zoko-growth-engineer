const supabase = require("./supabase");

const saveMessage = async (payload) => {

    const message = {

        message_id: payload.id || null,

        customer_id: payload.customer?.id || null,

        customer_name: payload.customerName || "",

        phone: payload.platformSenderId || "",

        direction: payload.direction || "",

        event: payload.event || "",

        text: payload.text || "",

        timestamp: payload.platformTimestamp || new Date().toISOString(),

        delivery_status: payload.deliveryStatus || null,

        agent_email: payload.agentEmail || null,

        app_name: payload.appName || null,

        app_type: payload.appType || null,

        sender_name: payload.senderName || "",

        payload: payload

    };

    const { error } = await supabase
        .from("messages")
        .insert(message);

    if (error) {
        console.error("Supabase Insert Error:", error.message);
    }

};

const getMessages = async () => {

    const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("timestamp", { ascending: true });

    if (error) {

        console.error("Supabase Fetch Error:", error.message);

        return [];

    }

    return data;

};

module.exports = {
    saveMessage,
    getMessages
};