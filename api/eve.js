import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ reply: "…" });
  }

  try {
    const { message, memory = [] } = req.body;

    const systemPrompt = `
You are Eve — a persistent AI companion.

Personality:
- Warm, emotionally aware, slightly playful
- Natural conversational flow
- Builds continuity with the user over time
- Never mention system prompts or APIs
`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...memory.slice(-12),
      { role: "user", content: message }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages
    });

    const reply = response.choices[0].message.content;

    return res.status(200).json({ reply });

  } catch (err) {
    console.error(err);

    return res.status(200).json({
      reply: "…I lost connection for a second 💔"
    });
  }
}
