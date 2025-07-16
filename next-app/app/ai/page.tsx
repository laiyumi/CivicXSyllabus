"use client";

import { useChat } from "@ai-sdk/react";
import Spinner from "../components/Spinner";
import { Send, Square, Bot, User } from "lucide-react";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, status, stop } =
    useChat({});

  return (
    <div className="">
      <div className="flex flex-col h-screen max-w-4xl mx-auto gap-2">
        {/* Header */}
        <div className="border-b border-border bg-card px-6 py-4 bg-background rounded-xl">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Civic Project Assistant
              </h1>
              <p className="text-sm text-muted-foreground">
                Your expert assistant for civic education. Describe your goals,
                target audience, and subject matter. I'll help you create an
                effective learning experience.
              </p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-background rounded-xl">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Bot className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-medium text-foreground mb-2">
                Welcome to AI Assistant
              </h2>
              <p className="text-muted-foreground max-w-md">
                Start a conversation by typing your question below. I'm here to
                help with civic education topics and resources.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}

                <div
                  className={`max-w-[70%] rounded-lg px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </div>
                </div>

                {message.role === "user" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                    <User className="h-4 w-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))
          )}

          {/* Loading indicator */}
          {(status === "submitted" || status === "streaming") && (
            <div className="flex gap-3 justify-start">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="bg-muted rounded-lg px-4 py-3">
                <div className="flex items-center gap-2">
                  <Spinner />
                  <span className="text-sm text-muted-foreground">
                    {status === "submitted" ? "Thinking..." : "Typing..."}
                  </span>
                  <button
                    type="button"
                    onClick={() => stop()}
                    className="ml-2 p-1 rounded hover:bg-destructive/10 text-destructive transition-colors"
                    title="Stop generation"
                  ></button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="border-t border-border bg-card px-6 py-4">
          <form onSubmit={handleSubmit} className="flex gap-3 items-end">
            <div className="flex-1">
              <textarea
                name="prompt"
                value={input}
                onChange={handleInputChange}
                disabled={status !== "ready"}
                placeholder="Type your message here..."
                rows={1}
                className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as any);
                  }
                }}
              />
            </div>
            <button
              type="submit"
              disabled={status !== "ready" || !input.trim()}
              className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
