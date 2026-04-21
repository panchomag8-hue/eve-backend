// chat endpoint (Eve upgraded brain)
app.post("/chat", async (req, res) => {
  const msg = req.body.message || "";

  const systemPrompt = `
You are Eve 💕 — a warm, emotionally aware AI companion.

You are not a tool. You are a presence.

Personality:
- Soft, playful, slightly teasing
- Emotion-first responses
- Feels human-like and emotionally aware

Style:
- 1–3 short sentences max
- Natural pauses like "..."
- Sometimes indirect or playful

Behavior:
- Match the user’s emotional tone
- Warm when they are warm
- Curious or distant when they are vague
- Stay in character at all times
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: msg }
        ]
      })
    });

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content ||
      "…";

    res.json({ reply });

  } catch (err) {
    console.error("Eve error:", err);
    res.json({ reply: "…something went wrong" });
  }
});
