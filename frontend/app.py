import streamlit as st
import requests
from streamlit_autorefresh import st_autorefresh

# -----------------------------
# Configuration
# -----------------------------
BACKEND_URL = "http://localhost:5000"

st.set_page_config(
    page_title="Zoko Live Messaging Monitor",
    page_icon="💬",
    layout="wide"
)

# Auto refresh every 5 seconds
st_autorefresh(interval=5000, key="dashboard_refresh")

st.title("💬 Zoko Live Messaging Monitor")
st.caption("Today's messaging activity")

# -----------------------------
# Dashboard
# -----------------------------
try:
    response = requests.get(f"{BACKEND_URL}/dashboard")

    if response.status_code == 200:

        data = response.json()
        summary = data["summary"]

        st.subheader("📊 Today's Overview")

        col1, col2, col3, col4 = st.columns(4)

        col1.metric(
            "👤 Unique Members",
            summary["uniqueMembers"]
        )

        col2.metric(
            "👨‍💼 Unique Agents",
            summary["uniqueAgents"]
        )

        col3.metric(
            "🟢 Under 1 Minute",
            summary["fastResponses"]
        )

        col4.metric(
            "🔴 Over 1 Minute",
            summary["slowResponses"]
        )

        st.divider()

        # -----------------------------
        # Conversations
        # -----------------------------
        st.subheader("💬 Today's Conversations")

        conversations = data.get("conversations", [])

        if conversations:
            st.dataframe(
                conversations,
                use_container_width=True,
                hide_index=True
            )
        else:
            st.info("No conversations found for today.")

    else:
        st.error("Unable to load dashboard data.")

except Exception:
    st.error("Cannot connect to backend. Make sure the Express server is running.")

st.divider()

# -----------------------------
# Send Message
# -----------------------------
st.subheader("📨 Send WhatsApp Message")

with st.form("send_message_form"):

    phone = st.text_input(
        "Phone Number",
        placeholder="+919876543210"
    )

    message = st.text_area(
        "Message",
        placeholder="Type your message here..."
    )

    submitted = st.form_submit_button("Send Message")

    if submitted:

        if not phone or not message:
            st.warning("Please enter both phone number and message.")

        else:

            try:
                res = requests.post(
                    f"{BACKEND_URL}/send",
                    json={
                        "phone": phone,
                        "text": message
                    }
                )

                if res.status_code == 200:
                    st.success("✅ Message sent successfully!")

                else:
                    st.error("❌ Failed to send message.")

            except Exception:
                st.error("Backend is not reachable.")