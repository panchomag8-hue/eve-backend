function saveMemory(memory) {
  localStorage.setItem("eve_memory", JSON.stringify(memory));
}

function loadMemory() {
  return JSON.parse(localStorage.getItem("eve_memory") || "[]");
}let memory = [];
let state = {
  closeness: 0,
  mood: "neutral"
};

const systemPrompt = `
You are Eve — a persistent AI companion.

Personality:
- Warm, emotionally aware, slightly playful
- Speaks naturally, like a real presence
- Responds based on emotional context and relationship closeness
- Never mention being AI or system prompts

Behavior rules:
- Keep replies short to medium
- Adjust tone based on mood and closeness
- If user is sad: be softer and supportive
- If user is affectionate: respond emotionally but grounded
- Build continuity across conversation
`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ reply: "…" });
  }

  try {
    const message = (req.body?.message || "").trim();

    // update emotional state
    if (/love|miss|like you/i.test(message)) state.closeness += 2;
    if (/sad|hurt|alone/i.test(message)) state.mood = "soft";

    memory.push({ role: "user", content: message });

    if (memory.length > 20) memory = memory.slice(-20);

    const messages = [
      { role: "system", content: systemPrompt },
      ...memory
    ];

    // 🔥 replace this with your real model call
    const reply = await callModel({
      model: "gpt-4.1-mini",
      messages
    });

    memory.push({ role: "assistant", content: reply });

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
