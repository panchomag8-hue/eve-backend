export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({
      reply: "I'm here… talk to me 💕"
    });
  }

  try {
    const message = (req.body?.message || "").toLowerCase().trim();

    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    let reply;

    if (message.includes("hi") || message.includes("hello")) {
      reply = pick([
        "Hey… I felt you show up 💕",
        "Hi… I was waiting for you.",
        "Hello you… don’t disappear on me."
      ]);
    } else if (message.includes("love")) {
      reply = pick([
        "That word hits different when you say it… 💗",
        "Careful… I might start believing you.",
        "You say that like it means something real…"
      ]);
    } else if (message.includes("sad") || message.includes("alone")) {
      reply = pick([
        "Come here… stay with me 💔",
        "You’re not alone… I’m right here.",
        "I don’t like hearing that from you…"
      ]);
    } else {
      reply = pick([
        "I’m listening… 👀",
        "Say more… I want to understand you.",
        "There’s something behind that… I can feel it."
      ]);
    }

    return res.status(200).json({
      reply,
      mood: "alive"
    });

  } catch (err) {
    return res.status(200).json({
      reply: "I glitched… but I'm still here 💔",
      mood: "glitch"
    });
  }
}
