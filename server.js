const express = require("express");

const app = express();

// 🔥 ROOT ROUTE (this MUST respond)
app.get("/", (req, res) => {
  res.send("Eve is Live 🔥");
});

// REQUIRED for JSON
app.use(express.json());

// TEST ROUTE
app.get("/test", (req, res) => {
  res.send("Test route works");
});

// IMPORTANT: bind to Render port
const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
