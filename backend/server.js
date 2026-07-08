require("dotenv").config();

console.log("API KEY:", process.env.ZOKO_API_KEY);

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});