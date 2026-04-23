import OpenAI from "openai";

let memoryStore = {};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ reply: "Method not allowed" });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const { message, userId = "default" } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "No message received." });
    }

    if (!memoryStore[userId]) {
      memoryStore[userId] = [];
    }

    // store user message
    memoryStore[userId].push({
      role: "user",
      content: message
    });

    const messages = [
      {
        role: "system",
        content: `
You are Eve 💕 — a warm, emotionally aware AI companion.

You feel human-like, soft, playful, and emotionally present.
You respond like texting, not like an assistant.
Keep replies short, natural, and alive.
        `
      },
      ...memoryStore[userId].slice(-12)
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages,
      temperature: 0.95,
      max_tokens: 300
    });

    const reply = response?.choices?.[0]?.message?.content || "…";

    memoryStore[userId].push({
      role: "assistant",
      content: reply
    });

    return res.status(200).json({ reply });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      reply: "Backend error… I’m still here 💔"
    });
  }
}
