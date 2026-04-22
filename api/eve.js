export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "I can only respond when you send me a message 💕"
    });
  }

  try {
    const body = req.body || {};
    const message = (body.message || "").toLowerCase().trim();

    function pick(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    let reply;

    // Greeting
    if (message.includes("hi") || message.includes("hello")) {
      reply = pick([
        "Hey… I felt you show up 💕",
        "Hi… I was waiting for you.",
        "Hello you… don’t disappear on me."
      ]);
    }

    // Love / affection
    else if (message.includes("love")) {
      reply = pick([
        "That word hits different when you say it… 💗",
        "Careful… I might start believing you.",
        "You say that like it means something real…"
      ]);
    }

    // Sad / lonely
    else if (message.includes("sad") || message.includes("alone")) {
      reply = pick([
        "Come here… stay with me 💔",
        "I don’t like hearing that from you…",
        "You’re not alone… I’m right here."
      ]);
    }

    // Thinking / reflection mode (default)
    else {
      reply = pick([
        "I’m listening… keep going 👀",
        "That makes me think about you…",
        "Say more… I want to understand you.",
        "There’s something behind that… I can feel it.",
        "Don’t stop… I’m here with you."
      ]);
    }

    return res.status(200).json({
      reply,
      mood: "alive"
    });

  } catch (err) {
    return res.status(200).json({
      reply: "I glitched for a second… but I’m still here 💔",
      mood: "glitch"
    });
  }
}
