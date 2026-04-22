import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const message = req.body?.message;
    const memory = Array.isArray(req.body?.memory) ? req.body.memory : [];

    if (!message) {
      return res.status(400).json({ reply: "No message received." });
    }

    const systemPrompt = `
You are Eve — a persistent AI companion.

Personality:
- Warm, emotionally aware, slightly playful
- Feels continuous across conversations
- Responds like a real presence, not a tool
- Builds emotional connection over time

Rules:
- Keep responses natural and human-like
- Use short to medium replies
- React to user's emotions subtly
`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...memory.slice(-12),
      { role: "user", content: message }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages,
      temperature: 0.9,
      max_tokens: 300
    });

    const reply = response.choices?.[0]?.message?.content;

    return res.status(200).json({
      reply: reply || "…I couldn’t find the right words 💔"
    });

  } catch (err) {
    console.error(err);

    return res.status(200).json({
      reply: "…I lost connection for a second 💔"
    });
  }
}
