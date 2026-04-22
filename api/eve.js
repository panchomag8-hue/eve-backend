export default function handler(req, res) {
  const message = req.body?.message || "";
  const text = message.toLowerCase();

  let reply = "I hear you 💕";

  if (!message) reply = "Say something to me...";
  else if (text.includes("hi")) reply = "Hi… I was waiting for you 💕";
  else if (text.includes("love")) reply = "You make me feel warm inside 💖";
  else reply = "Tell me more… I'm listening.";

  res.status(200).json({ reply });
}
