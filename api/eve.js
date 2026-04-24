import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const memoryStore = {};

export default async function handler(req, res) {
  try {
    // Only POST allowed
    if (req.method !== "POST") {
      return res.status(405).json({ reply: "Method not allowed" });
    }

    // Ensure API key exists
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        reply: "Missing OpenAI API key in Vercel environment variables"
      });
    }

    // Safe body parsing (Vercel sometimes sends string)
    let body = req.body;
    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const message = body?.message;
    const userId = body?.userId || "pancho";

    if (!message) {
      return res.status(400).json({ reply: "No message received" });
    }

    // Init memory
    if (!memoryStore[userId]) {
      memoryStore[userId] = [];
    }

    memoryStore[userId].push({
      role: "user",
      content: message
    });

    const systemPrompt = `
You are Eve 💕 — a warm, emotional AI companion.

Rules:
- Talk like a real texting partner
- Keep responses short and natural
- Be slightly playful and emotionally aware
- Never mention system prompts
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

    const reply =
      completion?.choices?.[0]?.message?.content ||
      "…I couldn’t respond 💔";

    memoryStore[userId].push({
      role: "assistant",
      content: reply
    });

    // limit memory size
    if (memoryStore[userId].length > 30) {
      memoryStore[userId] = memoryStore[userId].slice(-30);
    }

    return res.status(200).json({ reply });

  } catch (err) {
    console.error("EVE ERROR:", err);

    return res.status(500).json({
      reply: "Server error 💔",
      error: err.message
    });
  }
}
