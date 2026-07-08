const express = require("express");
const cors = require("cors");

const webhookRoutes = require("./routes/webhookRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Zoko Monitor Backend Running 🚀");
});

app.use("/", webhookRoutes);

module.exports = app;