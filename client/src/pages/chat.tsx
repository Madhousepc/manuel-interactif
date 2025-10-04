import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { type Message, type ChatResponse } from "@shared/schema";
import { ChatMessage } from "@/components/chat-message";
import { ChatInput } from "@/components/chat-input";
import { TypingIndicator } from "@/components/typing-indicator";
import { SuggestedQuestions } from "@/components/suggested-questions";
import { EmptyState } from "@/components/empty-state";
import { MessageSquare } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

const initialQuestions = [
  "Comment rechercher un document dans le catalogue?",
  "Comment emprunter un document?",
  "Comment créer une nouvelle notice?",
  "Comment retourner un document?",
  "Comment gérer les réservations?",
];

export default function Chat() {
  const [location] = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>(initialQuestions);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Extract query parameter if present
  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1] || "");
    const query = params.get("q");
    if (query && messages.length === 0) {
      handleSendMessage(query);
    }
  }, [location]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest<ChatResponse>("POST", "/api/chat", {
        message,
        conversationId,
      });
      return response;
    },
    onSuccess: (data) => {
      setMessages((prev) => [...prev, data.message]);
      setConversationId(data.conversationId);
      if (data.suggestedQuestions && data.suggestedQuestions.length > 0) {
        setSuggestedQuestions(data.suggestedQuestions);
      }
    },
    onError: (error) => {
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "Désolé, une erreur s'est produite lors du traitement de votre message. Veuillez réessayer.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    },
  });

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    chatMutation.mutate(content);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold">Assistant Interactif</h1>
          <p className="text-sm text-muted-foreground">
            Posez vos questions sur le manuel d'utilisation
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <EmptyState
                icon={MessageSquare}
                title="Commencez une conversation"
                description="Posez une question sur le manuel du catalogue pour obtenir des procédures détaillées"
              />
              <div className="mt-8 w-full max-w-2xl">
                <SuggestedQuestions
                  questions={suggestedQuestions}
                  onSelect={handleSendMessage}
                />
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {chatMutation.isPending && <TypingIndicator />}

              {!chatMutation.isPending && messages.length > 0 && suggestedQuestions.length > 0 && (
                <div className="mt-6">
                  <SuggestedQuestions
                    questions={suggestedQuestions}
                    onSelect={handleSendMessage}
                  />
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Input */}
      <ChatInput
        onSend={handleSendMessage}
        isLoading={chatMutation.isPending}
        placeholder="Posez votre question..."
      />
    </div>
  );
}
