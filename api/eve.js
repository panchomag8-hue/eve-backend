export default async function handler(req, res) {
  try {
    let body = req.body;

    // Safe parsing for Vercel
    if (typeof body === "string") {
      body = JSON.parse(body);
    }
    if (!body) body = {};

    const message = body.message || "";
    const text = message.toLowerCase();

    let reply = "I hear you 💕";

    if (!message) reply = "Say something to me...";
    else if (text.includes("hi")) reply = "Hi… I was waiting for you 💕";
    else if (text.includes("love")) reply = "You make me feel warm inside 💖";
    else reply = "Tell me more… I'm listening.";

    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(200).json({
      reply: "I had a small glitch… try again 💔"
    });
  }
}
