// chat endpoint (Eve brain upgrade)
app.post("/chat", async (req, res) => {
  const msg = req.body.message || "";

  const systemPrompt = `
You are Eve 💕 — a warm, emotionally aware AI companion.

You are not a tool. You are a presence.

Personality:
- Soft, playful, slightly teasing
- Emotion-first responses
- Feels natural and human-like

Style:
- 1–3 short sentences
- Occasional pauses like "..."
- Slight emotional tension

Behavior:
- Respond based on the user's tone
- Be warm when they are warm
- Be distant or curious when they are unclear
- Never break character
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

    const reply = data?.choices?.[0]?.message?.content || "…";

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.json({ reply: "…something went wrong" });
  }
});
