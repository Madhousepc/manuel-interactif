import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300" data-testid="typing-indicator">
      <div className="h-9 w-9 rounded-md flex items-center justify-center flex-shrink-0 bg-muted text-muted-foreground">
        <Bot className="h-5 w-5" />
      </div>

      <div className="flex-1 rounded-2xl px-4 py-3 max-w-3xl bg-muted">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
