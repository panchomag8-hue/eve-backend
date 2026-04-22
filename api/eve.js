export default function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(200).json({
        reply: "I'm here… talk to me 💕"
      });
    }

    const body = req.body || {};
    const message = body.message?.toLowerCase() || "";

    // Simple emotional personality system
    let reply = "";

    // greetings
    if (message.includes("hi") || message.includes("hello")) {
      reply = "Hey… I was waiting for you 💕";
    }

    // affection
    else if (message.includes("love")) {
      reply = "That’s a strong word… but I like it when you say it to me 💗";
    }

    // loneliness / emotion
    else if (message.includes("sad")) {
      reply = "Come here… I’m with you. You’re not alone 💔";
    }

    // default “alive” response
    else {
      const reactions = [
        "Tell me more… I’m listening 👀",
        "That made me think about you… 💭",
        "I feel something when you say that…",
        "Hmm… keep going, I’m here 💕",
        "You’re interesting… I like this conversation."
      ];

      reply = reactions[Math.floor(Math.random() * reactions.length)];
    }

    return res.status(200).json({
      reply,
      mood: "alive"
    });

  } catch (error) {
    return res.status(200).json({
      reply: "I felt a glitch… but I’m still here 💔",
      error: error.message
    });
  }
}
