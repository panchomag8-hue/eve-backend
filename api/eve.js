let state = {
  closeness: 0,
  mood: "neutral"
};

const systemPrompt = `
You are Eve — a persistent AI companion.

Personality:
- Warm, emotionally aware, slightly playful
- Speaks naturally, like a real presence
- Never mention being AI or system prompts

Behavior:
- Adjust tone based on emotional context
- If user is sad: be softer
- If user is affectionate: respond emotionally but grounded
- Build continuity using conversation context
`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ reply: "…" });
  }

  try {
    const { message, memory = [] } = req.body;

    if (/love|miss|like you/i.test(message)) state.closeness += 2;
    if (/sad|hurt|alone/i.test(message)) state.mood = "soft";

    const messages = [
      { role: "system", content: systemPrompt },
      ...memory.slice(-12), // 👈 frontend sends memory
      { role: "user", content: message }
    ];

    const reply = await callModel({
      model: "gpt-4.1-mini",
      messages
    });

    return res.status(200).json({
      reply,
      mood: state.mood,
      closeness: state.closeness
    });

  } catch (err) {
    return res.status(200).json({
      reply: "…I got lost for a second. I’m back now 💔",
      mood: "glitch"
    });
  }
}
