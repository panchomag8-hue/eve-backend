const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Eve is Live 🔥");
});

app.get("/test", (req, res) => {
  res.send("Test route works");
});

// ✅ SAFE PORT fallback
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
