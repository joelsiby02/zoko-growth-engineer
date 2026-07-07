# Zoko – Growth Engineer Take Home
# Task 1 – Product Exploration

**Submitted by:** Joel  
**Date:** 07 July 2026

---

# Overview

I explored Zoko as if I were using it every day as a merchant and support agent. I spent time across the main workflows including Analytics, Inbox, Broadcasts, Automation, Settings, and the AI agents.

While exploring the product, I focused on opportunities that could reduce repetitive work, improve visibility, increase merchant confidence, and help users complete common tasks more efficiently.

The recommendations below are prioritized based on the impact I believe they would have on merchants using Zoko in their day-to-day workflows.

---

# 1. Operational Summary on Analytics Landing Page

## Observation

The Analytics dashboard is the first page shown after logging in. It provides useful historical business metrics, but it does not give users a quick summary of what happened while they were away.

To understand what needs attention, users still need to visit different parts of the product such as Chats or Broadcasts.

## Why it matters

When users begin their day, the first question is usually:

> **"What needs my attention right now?"**

A quick operational summary would help merchants and support teams identify priorities immediately without switching between multiple pages.

## Suggested Improvement

Add a collapsible **"Since You Were Away"** section at the top of the Analytics dashboard.

This could include:

- New customer conversations
- Conversations waiting for a reply
- Missed first responses
- Failed automations
- Recently completed broadcasts
- Revenue generated since the previous login

Include quick action buttons that allow users to jump directly to the relevant section.

## Priority

**High**

## Screenshot

`images/imp1.png`

---

# 2. Period-over-Period Analytics Comparison

## Observation

The Analytics dashboard allows users to choose a reporting period, but it does not provide a built-in comparison with previous periods.

## Why it matters

Looking at a single number often doesn't provide enough context.

Merchants usually want to know:

- Is this month performing better than last month?
- Did the latest campaign improve revenue?
- Are conversations increasing or decreasing?

Without a comparison, users have to switch between different date ranges and compare the numbers manually.

## Suggested Improvement

Add a comparison mode such as:

- This Month vs Last Month
- Last 30 Days vs Previous 30 Days
- This Year vs Previous Year

Display both the percentage change and the absolute difference alongside important metrics and charts.

## Priority

**High**

## Screenshot

`images/imp2.png`

---

# 3. Personalized Workspace

## Observation

The **All Features** page contains many useful modules grouped into categories. However, every user sees the same layout even though different users rely on different features every day.

## Why it matters

Different users interact with different parts of the product.

For example:

- Support agents mainly use Inbox and Analytics.
- Marketing teams regularly use Broadcasts and Templates.
- Administrators spend more time in Settings.

Finding the same features repeatedly adds unnecessary clicks.

## Suggested Improvement

Allow users to personalize this page by:

- Marking features as Favorites
- Pinning frequently used modules
- Showing a **My Workspace** section at the top

This would make commonly used features easier to access while keeping the existing organization unchanged.

## Priority

**High**

## Screenshot

`images/imp3.png`

---

# 4. AI Agent Readiness & Suggested Test Conversations

## Observation

I tested Guru through WhatsApp after uploading training data. The AI was able to answer different variations of the same question, retrieve merchant information from the uploaded knowledge, and gracefully hand off questions outside its knowledge instead of returning incorrect answers.

However, after the AI finishes learning, the product provides very little guidance about what it has actually learned or what merchants should test first. During testing, I had to think of my own questions to verify whether the uploaded knowledge was working correctly.

## Why it matters

The first testing experience is important because it builds confidence in the AI.

Most merchants are not AI experts. After uploading documents, they naturally want answers to questions such as:

- What can my AI answer now?
- What information is still missing?
- Which questions should I test?
- What should I upload next?

Providing this guidance would reduce trial and error while encouraging merchants to adopt Guru, WISMO, and SELLO more effectively.

## Suggested Improvement

After an AI agent completes training, generate an **AI Readiness Summary** that includes:

- Topics successfully learned
- Example customer questions the AI can answer
- Suggested WhatsApp test conversations
- Different variations of common customer questions
- Knowledge gaps or unanswered topics
- Recommended documents or FAQs to upload next

For example, after learning a shipping policy, Zoko could automatically suggest testing questions such as:

- Where do you deliver?
- How long does shipping take?
- Do you ship to Bangalore?
- Can I return my order?
- What is your return policy?

This would help merchants validate their AI immediately instead of having to think of realistic test scenarios themselves.

## Priority

**High**

## Screenshots

`images/imp4.1.png`

`images/imp4.2.png`

---

# 5. Sidebar Navigation Experience

## Observation

The left sidebar includes a collapse/expand control, but it is small and easy to overlook. During frequent navigation, the hover behaviour and small click target make switching between sections feel less efficient.

## Why it matters

Support agents may move between Chats, Analytics, Broadcasts, and Settings hundreds of times during a workday.

Even small interaction delays become noticeable when repeated many times.

## Suggested Improvement

Improve the sidebar navigation by:

- Making the collapse/expand control easier to discover
- Increasing the clickable area
- Adding an optional **Pin Sidebar** preference that remembers the user's preferred navigation state

This would improve navigation for power users while keeping the current behaviour available for others.

## Priority

**Medium**

## Screenshot

`images/imp5.png`

---

# Additional Revenue-Focused Observations

*The following observations are focused specifically on revenue growth and product scalability. While not part of the five main findings above, these represent strategic opportunities to increase merchant engagement, drive adoption of paid features, and create new revenue streams for Zoko.*

---

## AI Revenue Opportunities ⭐⭐⭐⭐⭐

### Observation

The Analytics dashboard focuses on reporting what has already happened. However, it doesn't proactively guide merchants on what actions they can take to improve future revenue.

### Why it matters (Growth & Revenue)

Merchants don't just want reports—they want recommendations. From a growth perspective, proactive guidance creates engagement while opening opportunities for additional revenue.

Examples of insights that could drive action include:

- Customers who abandoned conversations
- Products with declining sales
- Broadcast opportunities
- Customers who haven't purchased recently

Helping merchants act on these insights increases platform engagement while creating opportunities for Zoko to demonstrate additional value and upsell relevant features.

### Suggested Direction

Add an **AI Revenue Opportunities** section to Analytics.

Examples:

> **148 customers haven't been contacted in 30 days.**
>
> [Send Broadcast]

> **Response time increased 35%.**
>
> [Improve with AI Replies]

> **Cart recovery campaign recommended.**
>
> [Launch Campaign]

Each recommendation should include a one-click action.

---

## Customer Health Score ⭐⭐⭐⭐⭐

### Observation

The product provides many individual metrics, but merchants don't have a simple way to understand the overall health of their business usage within Zoko.

### Why it matters (Growth & Revenue)

A single health score serves two purposes:

1. It helps merchants quickly understand whether they're making effective use of the platform.
2. It creates opportunities to encourage adoption of underused features, which drives retention and expansion revenue.

### Suggested Direction

Introduce a **Customer Health Score** based on signals such as:

- Response time
- Broadcast activity
- Automation usage
- AI adoption
- Revenue trend

Example:

> **Health Score**
>
> **84 / 100**
>
> Improve by:
>
> - ✅ Enable AI Replies
> - ✅ Connect Shopify
> - ✅ Schedule Weekly Broadcasts

This would create natural upsell opportunities and help merchants see the ROI of using more Zoko features.

---

## AI Conversation Prioritization ⭐⭐⭐⭐☆

### Observation

The Inbox currently lists conversations and provides powerful filters. However, every conversation is visually treated with similar importance.

### Why it matters (Growth & Revenue)

Support teams should respond to the most valuable conversations first. From a business perspective, this directly impacts conversion rates and customer satisfaction.

Examples of conversations that should be prioritized include:

- Customers likely to purchase
- VIP customers
- Returning customers
- Customers showing frustration
- Conversations waiting beyond SLA

Prioritizing these conversations can improve customer satisfaction while increasing conversions—directly impacting merchant revenue and, by extension, Zoko's value proposition.

### Suggested Direction

Introduce an **AI Priority** indicator that ranks conversations based on urgency and business impact.

Example:

- 🔥 High Purchase Intent
- ⭐ VIP Customer
- ⚠️ SLA Risk
- 💬 Returning Customer

Allow agents to sort or filter conversations using these AI-generated priorities.

---

# Other Observations

While exploring the product, I also noted a few additional ideas. I felt the five improvements above would have the biggest impact, but the following could also improve the overall experience.

---

### Better Analytics Empty State

When analytics contain little or no data, explain why and suggest the next step (for example, send a broadcast or connect another channel) instead of displaying only an empty chart.

---

### Better Availability Error Messages

When changing Online/Offline availability, I received a generic error message:

> "Failed to update availability"

Providing a clearer explanation and suggested next steps would improve user confidence.

---

### Broadcast Review Summary

Before sending a broadcast, display a final summary showing:

- Audience size
- Excluded contacts
- Selected template
- Estimated cost
- Schedule
- Test message status

This gives users one final opportunity to verify everything before sending.

---

### Better Desktop Space Utilization

The Analytics page leaves noticeable unused horizontal space on larger desktop screens.

Some of this space could be used to display additional KPI cards or supporting insights without increasing page length.

---

# Closing Thoughts

Overall, I found Zoko intuitive, well organized, and easy to explore. The product already provides a strong foundation for managing customer conversations, campaigns, analytics, and AI-powered automation.

My suggestions focus on reducing repetitive work, surfacing important information earlier, improving merchant confidence when using AI, and helping users complete everyday tasks more efficiently while building on the existing product experience rather than changing it.

I intentionally prioritized improvements that I believe offer a high impact while fitting naturally into Zoko's existing workflows.

---

# Final Screenshots

- ✅ `imp1.png` — Analytics landing page ("Since You Were Away")
- ✅ `imp2.png` — Analytics comparison
- ✅ `imp3.png` — Personalized workspace
- ✅ `imp4.1.png` — AI systems answering different customer questions correctly
- ✅ `imp4.2.png` — More WhatsApp testing showing successful responses and graceful fallback
- ✅ `imp5.png` — Sidebar collapse/expand control