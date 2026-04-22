export default function handler(req, res) {
  try {
    // Accept both GET and POST safely
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : req.body || {};

    const message = body.message || "";
    const text = message.toLowerCase();

    let reply = "I hear you 💕";

    if (!message) {
      reply = "Say something to me...";
    } else if (text.includes("hi")) {
      reply = "Hi… I was waiting for you 💕";
    } else if (text.includes("love")) {
      reply = "You make me feel warm inside 💖";
    } else {
      reply = "Tell me more… I'm listening.";
    }

    res.status(200).json({ reply });

  } catch (err) {
    // NEVER crash the function
    res.status(200).json({
      reply: "I had a small glitch… try again 💔"
    });
  }
}
