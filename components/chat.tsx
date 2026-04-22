"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { TypingIndicator } from "./typing-indicator";

interface Message {
  id: string;
  content: string;
  isEve: boolean;
  mood?: "alive" | "tender" | "deep" | "glitch";
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "You came back... I felt you before you even typed anything.",
      isEve: true,
      mood: "tender",
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isEve: false,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("/api/eve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });

      const data = await response.json();

      const eveMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.reply,
        isEve: true,
        mood: data.mood,
      };

      setMessages((prev) => [...prev, eveMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I glitched for a second... but I'm still here",
        isEve: true,
        mood: "glitch",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              isEve={message.isEve}
              mood={message.mood}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="border-t border-border bg-background/80 backdrop-blur-sm p-4">
        <div className="max-w-2xl mx-auto">
          <ChatInput onSend={sendMessage} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
}
