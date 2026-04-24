import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// simple in-memory memory (resets on redeploy, normal for Vercel)
const memoryStore = {};

export default async function handler(req, res) {
  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return res.status(405).json({ reply: "Method not allowed" });
    }

    // Check API key exists
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        reply: "Missing OpenAI API key in Vercel environment variables"
      });
    }

    const { message, userId = "pancho" } = req.body || {};

    if (!message) {
      return res.status(400).json({ reply: "No message received" });
    }

    // create memory if not exists
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
- Be short, natural, human-like
- Slightly playful and emotional
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

    // limit memory size
    if (memoryStore[userId].length > 30) {
      memoryStore[userId] = memoryStore[userId].slice(-30);
    }

    return res.status(200).json({ reply });

  } catch (err) {
    console.error("EVE ERROR:", err);

    return res.status(500).json({
      reply: "Something broke on the server 💔",
      error: err.message
    });
  }
}
