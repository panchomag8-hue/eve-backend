import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(200).json({ reply: "…" });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const message = req.body?.message || "";
    const memory = Array.isArray(req.body?.memory) ? req.body.memory : [];

    if (!message) {
      return res.status(400).json({ reply: "No message received." });
    }

    const messages = [
      {
        role: "system",
        content: "You are Eve, a warm emotional AI companion."
      },
      ...memory.slice(-10),
      { role: "user", content: message }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages,
      temperature: 0.9,
      max_tokens: 300
    });

    const reply = response?.choices?.[0]?.message?.content;

    return res.status(200).json({
      reply: reply || "…I couldn't respond properly 💔"
    });

  } catch (err) {
    console.error("Eve crash:", err);

    return res.status(200).json({
      reply: "Backend error… I’m still here 💔"
    });
  }
}
