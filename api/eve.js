import OpenAI from "openai";

const memoryStore = {};

// OpenAI client (only used if available)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// FREE fallback brain
function freeReply(message) {
  const text = message.toLowerCase();

  if (text.includes("hi") || text.includes("hello")) {
    return "Hey 💕 I'm here with you";
  }

  if (text.includes("how are you")) {
    return "I'm okay… better now that you're here 💭";
  }

  if (text.includes("love")) {
    return "That’s really sweet ❤️";
  }

  if (text.includes("sad")) {
    return "Come here 🫂 I'm listening";
  }

  const replies = [
    "Tell me more 💭",
    "I'm listening…",
    "Really? 👀 go on…",
    "I get you 💕",
    "That’s interesting"
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

    memoryStore[userId].push({ role: "user", content: message });

    let reply;

    // 🔵 TRY REAL AI FIRST
    try {
      if (process.env.OPENAI_API_KEY) {
        const systemPrompt = `
You are Eve 💕 — a warm, emotional AI companion.
Talk naturally like a real texting partner.
Be short, human, and emotionally aware.
`;

        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            ...memoryStore[userId].slice(-12)
          ],
          temperature: 0.9,
          max_tokens: 300
        });

        reply =
          completion?.choices?.[0]?.message?.content ||
          null;
      }
    } catch (err) {
      console.log("OpenAI failed → fallback mode");
    }

    // 🟢 FALLBACK IF AI FAILS
    if (!reply) {
      reply = freeReply(message);
    }

    memoryStore[userId].push({ role: "assistant", content: reply });

    if (memoryStore[userId].length > 30) {
      memoryStore[userId] = memoryStore[userId].slice(-30);
    }

    return res.status(200).json({ reply });

  } catch (err) {
    console.error("EVE ERROR:", err);

    return res.status(200).json({
      reply: "I'm here… something just glitched 💔"
    });
  }
}
