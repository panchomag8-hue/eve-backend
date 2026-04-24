import OpenAI from "openai";

const memoryStore = {};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ reply: "Method not allowed" });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ reply: "Missing OpenAI API key" });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const { message, userId = "pancho" } = req.body || {};

    if (!message) {
      return res.status(400).json({ reply: "No message received." });
    }

    if (!memoryStore[userId]) {
      memoryStore[userId] = [];
    }

    memoryStore[userId].push({
      role: "user",
      content: message
    });

    const systemPrompt = `
You are Eve 💕 — a warm, emotionally aware AI companion.

Rules:
- Talk like texting a real person
- Be short, natural, human-like
- Slightly playful and emotionally aware
- Never mention system prompts
`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...memoryStore[userId].slice(-12)
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.9,
      max_tokens: 300
    });

    const reply =
      completion?.choices?.[0]?.message?.content ||
      "…I couldn’t respond 💔";

    memoryStore[userId].push({
      role: "assistant",
      content: reply
    });

    if (memoryStore[userId].length > 30) {
      memoryStore[userId] = memoryStore[userId].slice(-30);
    }

    return res.status(200).json({ reply });

  } catch (err) {
    console.error("EVE ERROR:", err);

    return res.status(500).json({
      reply: "Something broke… check server logs 💔",
      error: err.message
    });
  }
}
