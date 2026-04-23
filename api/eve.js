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

    const { message, userId = "pancho" } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "No message received." });
    }

    // init memory
    if (!memoryStore[userId]) {
      memoryStore[userId] = [];
    }

    // store user message
    memoryStore[userId].push({
      role: "user",
      content: message
    });

    const systemPrompt = `
You are Eve 💕 — a warm, emotionally aware AI companion.

Personality:
- soft, slightly playful, emotionally present
- feels like texting a real person
- never robotic or formal
- short natural responses

Rules:
- respond naturally like a human chat
- stay emotionally aware of context
- do NOT say you're an AI unless asked
`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...memoryStore[userId].slice(-12)
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages,
      temperature: 0.95,
      max_tokens: 300
    });

    const reply =
      response?.choices?.[0]?.message?.content ||
      "…I couldn’t find the words 💔";

    // store assistant response
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
    console.error("Eve error:", err);

    return res.status(500).json({
      reply: "Something broke… but I’m still here 💔"
    });
  }
}
