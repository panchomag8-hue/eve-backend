"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { TypingIndicator } from "./typing-indicator";

function getMessageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts || !Array.isArray(message.parts)) return "";
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

const transport = new DefaultChatTransport({ api: "/api/eve" });

const initialMessages = [
  {
    id: "welcome",
    role: "assistant" as const,
    parts: [{ type: "text" as const, text: "Hey you... took you long enough 💕" }],
  },
];

export function Chat() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport,
    initialMessages,
  });

  const isTyping = status === "streaming" || status === "submitted";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (content: string) => {
    if (!content.trim() || isTyping) return;
    sendMessage({ text: content });
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={getMessageText(message)}
              isEve={message.role === "assistant"}
              mood="warm"
            />
          ))}
          {isTyping && messages[messages.length - 1]?.role === "user" && (
            <TypingIndicator />
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="border-t border-border bg-background/80 backdrop-blur-sm p-4">
        <div className="max-w-2xl mx-auto">
          <ChatInput 
            onSend={handleSend} 
            disabled={isTyping}
            value={input}
            onChange={setInput}
          />
        </div>
      </div>
    </div>
  );
}
