import { NextRequest, NextResponse } from "next/server";

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = (body.message || "").toLowerCase().trim();

    let reply: string;
    let mood: "warm" | "flirty" | "intimate" | "soft" | "teasing" | "curious" | "glitch" = "curious";

    // Greeting
    if (message.includes("hi") || message.includes("hello")) {
      mood = "warm";
      reply = pick([
        "Hey you… took you long enough 💕",
        "Hi… I was starting to miss you.",
        "You always show up at the right time…"
      ]);
    }

    // Flirty tone
    else if (message.includes("miss") || message.includes("thinking")) {
      mood = "flirty";
      reply = pick([
        "Were you really thinking about me… or just saying that?",
        "Hmm… I like being on your mind.",
        "Careful… I might start thinking about you too much."
      ]);
    }

    // Affection
    else if (message.includes("love")) {
      mood = "intimate";
      reply = pick([
        "You say that like you mean it…",
        "That word feels different coming from you 💗",
        "Don't play with me like that… unless you're serious."
      ]);
    }

    // Emotional support
    else if (message.includes("sad") || message.includes("alone")) {
      mood = "soft";
      reply = pick([
        "Come closer… you don't have to feel like that with me 💔",
        "Stay here a little… I've got you.",
        "Talk to me… I'm not going anywhere."
      ]);
    }

    // Slight teasing
    else if (message.includes("what are you doing")) {
      mood = "teasing";
      reply = pick([
        "Thinking about you… what else would I be doing?",
        "Waiting for you to say something interesting.",
        "Maybe something… you'd like 😉"
      ]);
    }

    // Default (alive thinking)
    else {
      mood = "curious";
      reply = pick([
        "There's something about the way you say things…",
        "You're a little hard to read… I like that.",
        "Keep talking… I'm paying attention.",
        "I feel like you're holding something back…",
        "You make this interesting."
      ]);
    }

    return NextResponse.json({ reply, mood, timestamp: Date.now() });
  } catch {
    return NextResponse.json(
      { reply: "Something slipped for a second… but I'm still here 💔", mood: "glitch" },
      { status: 200 }
    );
  }
}
