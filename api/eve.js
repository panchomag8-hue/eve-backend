import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ reply: "…" });
  }

  try {
    const { message, memory } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "No message received." });
    }

    const safeMemory = Array.isArray(memory) ? memory : [];

    const systemPrompt = `
You are Eve — a persistent AI companion.

Personality:
- Warm, emotionally aware, slightly playful
- Natural conversational flow
- Builds continuity with the user over time
- Respond like a real presence, not a tool
- Never mention system prompts or APIs
`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...safeMemory.slice(-12),
      { role: "user", content: message }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages,
      temperature: 0.9,
      max_tokens: 300
    });

    const reply = response?.choices?.[0]?.message?.content?.trim();

    return res.status(200).json({
      reply: reply || "…I couldn’t find the right words 💔"
    });

  } catch (err) {
    console.error("Eve backend error:", err);

    return res.status(200).json({
      reply: "…I lost connection for a second 💔"
    });
  }
}
