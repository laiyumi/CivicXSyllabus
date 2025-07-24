"use client";

import { useChat } from "@ai-sdk/react";
import Spinner from "../components/Spinner";
import { Send, Square, Bot, User, MessageSquare } from "lucide-react";

export default function Page() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    stop,
    error,
    reload,
  } = useChat({});

  return (
    <div className="h-screen flex flex-col max-w-4xl mx-auto gap-2">
      {/* Header */}
      <div className="border-b border-border py-4 rounded-xl">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              // You can replace this with your feedback functionality
              window.open(
                "mailto:feedback@civicxsyllabus.com?subject=AI Assistant Feedback",
                "_blank"
              );
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-background hover:bg-muted rounded-lg border border-border transition-colors"
            title="Send feedback"
          >
            <MessageSquare className="h-4 w-4" />
            Feedback
          </button>
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
              Welcome to Civic Project AI Assistant
            </h2>
            <p className="text-muted-foreground max-w-md">
              Your expert assistant for civic education. Describe your goals,
              target audience, and subject matter. I'll help you create an
              effective learning experience.
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

      {error && (
        <>
          <div>An error occurred.</div>
          <button type="button" onClick={() => reload()}>
            Retry
          </button>
        </>
      )}

      {/* Input Form */}
      <div className="border-t border-border py-4">
        <form onSubmit={handleSubmit} className="flex gap-3 items-center">
          <div className="flex-1">
            <textarea
              name="prompt"
              value={input}
              onChange={(e) => {
                handleInputChange(e);
                // Auto-resize textarea
                const textarea = e.target;
                textarea.style.height = "auto";
                textarea.style.height =
                  Math.min(textarea.scrollHeight, 200) + "px";
              }}
              disabled={status !== "ready" || error != null}
              placeholder="Type your message here..."
              rows={1}
              style={{ minHeight: "48px", maxHeight: "200px" }}
              className="w-full resize-none rounded-lg border border-input  px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 overflow-y-auto"
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
  );
}
