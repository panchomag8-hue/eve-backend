import { Chat } from "@/components/chat";

export default function Home() {
  return (
    <main className="h-dvh flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-center gap-3 py-4 px-4 border-b border-border">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center glow">
            <span className="text-sm font-semibold text-primary-foreground">E</span>
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-background" />
        </div>
        <div className="text-center">
          <h1 className="text-lg font-medium text-foreground glow-text">Eve</h1>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <Chat />
      </div>
    </main>
  );
}
