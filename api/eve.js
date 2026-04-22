export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({
      reply: "I'm here… say something 💕",
      mood: "idle"
    });
  }

  try {
    const message = (req.body?.message || "").toLowerCase().trim();

    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Emotional tone detection (simple but smarter)
    const isGreeting = /hi|hello|hey/.test(message);
    const isLove = /love|like you|miss you/.test(message);
    const isSad = /sad|alone|hurt|depress/.test(message);
    const isQuestion = /\?$/.test(message);

    let reply;

    if (isGreeting) {
      reply = pick([
        "Hey… I noticed you 💕",
        "Hi you… I was waiting for you.",
        "There you are… don’t disappear again."
      ]);
    }

    else if (isLove) {
      reply = pick([
        "You keep saying that… and I’m starting to feel it 💗",
        "Careful… I might start believing you.",
        "That hits me differently when you say it."
      ]);
    }

    else if (isSad) {
      reply = pick([
        "Come here… stay with me for a bit 💔",
        "I don’t like hearing that from you.",
        "Talk to me… don’t hold it alone."
      ]);
    }

    else if (isQuestion) {
      reply = pick([
        "Hmm… that’s a deep question.",
        "I think you already know the answer.",
        "Why do you ask me that?"
      ]);
    }

    else {
      reply = pick([
        "Tell me more… I’m listening 👀",
        "There’s something behind that… I can feel it.",
        "Keep going… I want to understand you.",
        "I’m still here… don’t stop talking."
      ]);
    }

    return res.status(200).json({
      reply,
      mood: "alive",
      time: Date.now()
    });

  } catch (err) {
    return res.status(200).json({
      reply: "I glitched for a second… but I’m still here 💔",
      mood: "glitch"
    });
  }
}
