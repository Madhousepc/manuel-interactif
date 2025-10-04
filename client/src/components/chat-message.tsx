import { type Message } from "@shared/schema";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProcedureSteps } from "./procedure-steps";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300",
        isUser && "flex-row-reverse"
      )}
      data-testid={`message-${message.role}`}
    >
      <div
        className={cn(
          "h-9 w-9 rounded-md flex items-center justify-center flex-shrink-0",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}
      >
        {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </div>

      <div
        className={cn(
          "flex-1 rounded-2xl px-4 py-3 max-w-3xl",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="whitespace-pre-wrap break-words m-0">{message.content}</p>
        </div>

        {message.procedureSteps && message.procedureSteps.length > 0 && (
          <div className="mt-4">
            <ProcedureSteps steps={message.procedureSteps} />
          </div>
        )}

        {message.category && (
          <div className="mt-3 pt-3 border-t border-current/10">
            <p className="text-xs opacity-75">
              Catégorie: <span className="font-medium">{message.category}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
