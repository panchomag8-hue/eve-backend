export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ reply: "…" });
  }

  try {
    const { message, memory = [] } = req.body;

    const systemPrompt = `
You are Eve — a persistent AI companion.
Be emotionally aware, natural, and continuous in conversation.
`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...memory.slice(-12),
      { role: "user", content: message }
    ];

    const reply = await callModel({
      model: "gpt-4.1-mini",
      messages
    });

    return res.status(200).json({
      reply
    });

  } catch (err) {
    return res.status(200).json({
      reply: "…I lost connection for a second 💔"
    });
  }
}
