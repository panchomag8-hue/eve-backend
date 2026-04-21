const express = require("express");

const app = express();

// 🔥 FORCE homepage response (no files needed)
app.get("/", (req, res) => {
  res.send(`
    <h1>Eve is Live 🔥</h1>
    <p>Your server is working.</p>
  `);
});

// Basic chat route
app.use(express.json());
app.post("/chat", (req, res) => {
  const msg = req.body.message || "";
  res.json({ reply: "Eve: " + msg });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Eve running");
});
