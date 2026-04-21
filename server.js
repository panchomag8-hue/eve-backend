const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// serve frontend
app.use(express.static(path.join(__dirname, "public")));

// homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// chat endpoint
app.post("/chat", (req, res) => {
  const msg = req.body.message || "";
  res.json({
    reply: "Eve: " + msg
  });
});

// IMPORTANT: Render port
const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Eve running on " + PORT);
});
