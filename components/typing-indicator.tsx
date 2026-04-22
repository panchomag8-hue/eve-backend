"use client";

export function TypingIndicator() {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 glow">
        <span className="text-xs font-medium text-primary-foreground">E</span>
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-secondary border border-primary/20">
        <div className="flex gap-1.5 items-center h-5">
          <span
            className="w-2 h-2 rounded-full bg-primary/60 animate-pulse-slow"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-primary/60 animate-pulse-slow"
            style={{ animationDelay: "200ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-primary/60 animate-pulse-slow"
            style={{ animationDelay: "400ms" }}
          />
        </div>
      </div>
    </div>
  );
}
