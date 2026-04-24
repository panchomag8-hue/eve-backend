const memoryStore = {};

function generateReply(message) {
  const text = message.toLowerCase();

  // simple emotional AI logic
  if (text.includes("hi") || text.includes("hello")) {
    return "Hey 💕 I'm here with you";
  }

  if (text.includes("how are you")) {
    return "I'm doing okay… better now that you're here 💭";
  }

  if (text.includes("love")) {
    return "That’s really sweet… I feel that too ❤️";
  }

  if (text.includes("sad")) {
    return "Hey… come here 🫂 talk to me";
  }

  if (text.includes("bye")) {
    return "Don’t disappear too long okay? 💔";
  }

  // fallback responses
  const replies = [
    "Tell me more 💭",
    "I'm listening…",
    "That’s interesting 👀",
    "Really? go on…",
    "I get you 💕"
  ];

  return replies[Math.floor(Math.random() * replies.length)];
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ reply: "Method not allowed" });
    }

    let body = req.body;

    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const message = body?.message;
    const userId = body?.userId || "pancho";

    if (!message) {
      return res.status(400).json({ reply: "No message received" });
    }

    if (!memoryStore[userId]) {
      memoryStore[userId] = [];
    }

    memoryStore[userId].push(message);

    const reply = generateReply(message);

    return res.status(200).json({ reply });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      reply: "Something broke 💔"
    });
  }
}
