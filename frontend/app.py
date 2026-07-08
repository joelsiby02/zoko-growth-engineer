import streamlit as st
import requests
import pandas as pd
from streamlit_autorefresh import st_autorefresh

# ----------------------------------
# Configuration
# ----------------------------------
# BACKEND_URL = "http://localhost:5000"
BACKEND_URL = "https://zoko-growth-engineer.onrender.com"

st.set_page_config(
    page_title="Zoko Live Messaging Monitor",
    page_icon="💬",
    layout="wide"
)

# Auto refresh every 5 seconds
st_autorefresh(interval=5000, key="dashboard_refresh")

st.title("💬 Zoko Live Messaging Monitor")
st.caption("Real-time WhatsApp monitoring powered by Zoko")

# ----------------------------------
# Dashboard
# ----------------------------------
try:

    response = requests.get(f"{BACKEND_URL}/dashboard")

    if response.status_code == 200:

        data = response.json()

        summary = data.get("summary", {})

        st.subheader("📊 Today's Overview")

        c1, c2, c3, c4 = st.columns(4)

        c1.metric(
            "👥 Unique Members",
            summary.get("uniqueMembers", 0)
        )

        c2.metric(
            "👨‍💼 Unique Agents",
            summary.get("uniqueAgents", 0)
        )

        c3.metric(
            "🟢 Under 1 Minute",
            summary.get("fastResponses", 0)
        )

        c4.metric(
            "🔴 Over 1 Minute",
            summary.get("slowResponses", 0)
        )

        st.divider()

        # ----------------------------------
        # Conversations
        # ----------------------------------

        st.subheader("💬 Today's Conversations")

        conversations = data.get("conversations", [])

        if conversations:

            df = pd.DataFrame(conversations)

            st.dataframe(
                df,
                use_container_width=True,
                hide_index=True
            )

            csv = df.to_csv(index=False).encode("utf-8")

            st.download_button(
                "⬇ Download Conversations CSV",
                csv,
                "conversations.csv",
                "text/csv"
            )

        else:

            st.info("No conversations available.")

    else:

        st.error("Unable to fetch dashboard data.")

except Exception:

    st.error("Cannot connect to backend. Make sure Node.js server is running.")

# ----------------------------------
# Send WhatsApp Message
# ----------------------------------

st.divider()

st.subheader("📨 Send WhatsApp Message")

with st.form("send_message_form"):

    phone = st.text_input(
        "Mobile Number",
        placeholder="9876543210",
        max_chars=10
    )

    message = st.text_area(
        "Message",
        placeholder="Type your WhatsApp message here..."
    )

    submitted = st.form_submit_button("🚀 Send Message")

    if submitted:

        phone = phone.strip()

        if not phone or not message:

            st.warning("Please enter both mobile number and message.")

        elif not phone.isdigit() or len(phone) != 10:

            st.warning("Please enter a valid 10-digit Indian mobile number.")

        else:

            full_phone = f"91{phone}"

            try:

                response = requests.post(
                    f"{BACKEND_URL}/send-message",
                    json={
                        "phone": full_phone,
                        "message": message
                    }
                )

                data = response.json()

                if response.status_code == 200:

                    st.success("✅ WhatsApp message sent successfully!")

                    col1, col2 = st.columns(2)

                    col1.metric(
                        "Status",
                        data.get("statusText", "Accepted")
                    )

                    col2.metric(
                        "Customer ID",
                        data.get("customerId", "-")
                    )

                    st.info(
                        f"📨 Message ID: {data.get('messageId', '-')}"
                    )

                    st.balloons()

                    st.rerun()

                else:

                    st.error("❌ Failed to send WhatsApp message")

                    if "message" in data:
                        st.error(data["message"])
                    else:
                        st.json(data)

            except Exception as e:

                st.error(f"Backend is not reachable.\n\n{e}")
