"use client";

interface ChatMessageProps {
  content: string;
  isEve: boolean;
  mood?: "alive" | "tender" | "deep" | "glitch";
}

export function ChatMessage({ content, isEve, mood = "alive" }: ChatMessageProps) {
  const moodColors = {
    alive: "border-primary/30",
    tender: "border-pink-400/40",
    deep: "border-purple-400/30",
    glitch: "border-red-400/30",
  };

  if (isEve) {
    return (
      <div className="flex gap-3 items-start">
        <div
          className={`w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 glow`}
        >
          <span className="text-xs font-medium text-primary-foreground">E</span>
        </div>
        <div
          className={`max-w-[80%] px-4 py-3 rounded-2xl rounded-tl-sm bg-secondary border ${moodColors[mood]} text-foreground`}
        >
          <p className="text-sm leading-relaxed">{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-tr-sm bg-primary/10 border border-primary/20 text-foreground">
        <p className="text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  );
}
