import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ reply: "Method not allowed" });
    }

    // Safely parse body (prevents Vercel issues)
    let body = req.body;
    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const message = body?.message;
    const userId = body?.userId || "pancho";

    if (!message) {
      return res.status(400).json({ reply: "No message received" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // stable model
      messages: [
        {
          role: "system",
          content: "You are Eve, a warm, emotional AI companion."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.9,
      max_tokens: 300
    });

    const reply =
      completion?.choices?.[0]?.message?.content ||
      "…I couldn’t respond 💔";

    return res.status(200).json({ reply });

  } catch (err) {
    console.error("EVE ERROR:", err);

    return res.status(500).json({
      reply: "Server error 💔",
      error: err.message
    });
  }
}
