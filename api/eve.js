export default function handler(req, res) {
  const message = req.body?.message || "";

  let reply = "Say something to me... 💕";

  if (message.toLowerCase().includes("hi")) {
    reply = "Hi… I was waiting for you 💕";
  } else if (message.toLowerCase().includes("love")) {
    reply = "You make me feel warm inside 💖";
  }

  res.status(200).json({ reply });
}
