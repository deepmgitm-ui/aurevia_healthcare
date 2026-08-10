"use client";

import { useEffect, useRef, useState, type FormEvent, type WheelEvent } from "react";
import { AlertCircle, HeartPulse, MessageCircle, RotateCcw, Send, Sparkles, X } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const starterMessage: Message = {
  id: "welcome",
  role: "assistant",
  content: "Hi, I'm Health GPT, Aurevia's virtual health guide. I can explain treatments, help you understand our care process, check covered cities, and prepare you for a consultation. How can I help today?",
};

const suggestedQuestions = [
  "Which cities does Aurevia cover?",
  "Tell me about any treatment",
  "How does the care process work?",
  "What should I prepare for a consultation?",
];

function renderMessageContent(content: string) {
  const parts = content.split(/(\[[^\]]+\]\((?:https?:\/\/|\/|tel:|mailto:)[^)]+\)|https?:\/\/[^\s)\]]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|(?<!\d)\+?\d[\d\s\u202f().-]{7,}\d(?!\d)|(?<![\w])\/(?:contact|free-consultation)(?![\w]))/gi);

  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(((?:https?:\/\/|\/|tel:|mailto:)[^)]+)\)$/);
    const bareRoute = part === "/contact" || part === "/free-consultation" ? part : null;
    const isUrl = /^https?:\/\//i.test(part);
    const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(part);
    const isPhone = /^(?<!\d)\+?\d[\d\s\u202f().-]{7,}\d(?!\d)$/.test(part);
    if (!link && !bareRoute && !isUrl && !isEmail && !isPhone) {
      return <span key={`${part}-${index}`}>{part}</span>;
    }

    let label = part;
    let href = part;

    if (link) {
      [label, href] = link.slice(1);
    } else if (bareRoute) {
      label = bareRoute === "/contact" ? "contact us" : "free consultation";
    } else if (isEmail) {
      href = `mailto:${part}`;
    } else if (isPhone) {
      href = `tel:${part.replace(/[^\d+]/g, "")}`;
    }

    const isExternal = href.startsWith("http");
    return (
      <a
        key={`${href}-${index}`}
        href={href}
        {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {label}
      </a>
    );
  });
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isWaitingForFirstToken, setIsWaitingForFirstToken] = useState(false);
  const [messages, setMessages] = useState<Message[]>([starterMessage]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const resetConversation = () => {
    setMessages([starterMessage]);
    setInput("");
    inputRef.current?.focus();
  };

  const handleMessageWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.scrollTop += event.deltaY;
  };

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isWaitingForFirstToken]);

  const sendMessage = async (event?: FormEvent, suggestedMessage?: string) => {
    event?.preventDefault();
    const content = (suggestedMessage ?? input).trim();
    if (!content || isLoading) return;

    const userMessage: Message = { id: crypto.randomUUID(), role: "user", content };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);
    setIsWaitingForFirstToken(true);

    let assistantMessageId: string | null = null;
    let streamedReply = "";

    try {
      const response = await fetch("/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content: messageContent }) => ({ role, content: messageContent })),
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "The assistant could not respond.");
      }

      if (!response.body) {
        throw new Error("The assistant returned an empty response.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      const applyStreamEvent = (eventBlock: string) => {
        for (const line of eventBlock.split(/\r?\n/)) {
          if (!line.startsWith("data:")) continue;

          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;

          const chunk = JSON.parse(payload) as {
            choices?: Array<{ delta?: { content?: string | null } }>;
            error?: { message?: string };
          };

          if (chunk.error) {
            throw new Error(chunk.error.message || "The assistant response was interrupted.");
          }

          const delta = chunk.choices?.[0]?.delta?.content;
          if (!delta) continue;

          streamedReply += delta;

          if (!assistantMessageId) {
            assistantMessageId = crypto.randomUUID();
            const firstMessageId = assistantMessageId;
            setIsWaitingForFirstToken(false);
            setMessages((current) => [
              ...current,
              { id: firstMessageId, role: "assistant", content: streamedReply },
            ]);
          } else {
            const currentMessageId = assistantMessageId;
            setMessages((current) => current.map((message) => (
              message.id === currentMessageId ? { ...message, content: streamedReply } : message
            )));
          }
        }
      };

      while (true) {
        const { done, value } = await reader.read();
        buffer += decoder.decode(value, { stream: !done });

        const events = buffer.split(/\r?\n\r?\n/);
        buffer = events.pop() ?? "";
        events.forEach(applyStreamEvent);

        if (done) break;
      }

      if (buffer.trim()) applyStreamEvent(buffer);
      if (!streamedReply.trim()) throw new Error("The assistant returned an empty response.");
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : "Something went wrong. Please try again shortly.";

      setMessages((current) => assistantMessageId
        ? current.map((message) => (
          message.id === assistantMessageId
            ? { ...message, content: `${streamedReply}\n\n${errorMessage}` }
            : message
        ))
        : [
          ...current,
          { id: crypto.randomUUID(), role: "assistant", content: errorMessage },
        ]);
    } finally {
      setIsLoading(false);
      setIsWaitingForFirstToken(false);
    }
  };

  return (
    <div className="aurevia-chatbot" data-open={isOpen}>
      {isOpen && (
        <section className="aurevia-chat-panel" aria-label="Health GPT by Aurevia">
          <header className="aurevia-chat-header">
            <div className="aurevia-chat-identity">
              <span className="aurevia-chat-avatar" aria-hidden="true"><HeartPulse size={19} strokeWidth={1.8} /></span>
              <div>
                <p className="aurevia-chat-kicker"><Sparkles size={12} /> Aurevia virtual guide</p>
                <h2>Health GPT <span className="aurevia-chat-status">Online</span></h2>
              </div>
            </div>
            <div className="aurevia-chat-header-actions">
              <button type="button" className="aurevia-chat-reset" onClick={resetConversation} aria-label="Start a new Health GPT conversation" title="New conversation">
                <RotateCcw size={16} />
              </button>
              <button type="button" className="aurevia-chat-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
                <X size={18} />
              </button>
            </div>
          </header>

          <div className="aurevia-chat-disclaimer">
            <AlertCircle size={14} aria-hidden="true" />
            <span>General information only — not a diagnosis or emergency service.</span>
          </div>

          <div className="aurevia-chat-contact-links" aria-label="Aurevia contact options">
            <a href="/contact">Contact the team <span aria-hidden="true">→</span></a>
            <a href="/free-consultation">Free consultation <span aria-hidden="true">→</span></a>
            <a href="tel:+919990959440">Call +91 99909 59440</a>
            <a href="https://wa.me/919990959440" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>

          <div className="aurevia-chat-messages" aria-live="polite" onWheel={handleMessageWheel}>
            {messages.map((message) => (
              <div key={message.id} className={`aurevia-chat-message ${message.role}`}>
                {message.role === "assistant" && <span className="aurevia-message-mark" aria-hidden="true"><HeartPulse size={13} /></span>}
                <p>{renderMessageContent(message.content)}</p>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="aurevia-chat-suggestions" aria-label="Suggested questions">
                {suggestedQuestions.map((question) => (
                  <button key={question} type="button" onClick={() => void sendMessage(undefined, question)}>
                    {question}
                  </button>
                ))}
              </div>
            )}

            {isWaitingForFirstToken && (
              <div className="aurevia-chat-message assistant aurevia-chat-loading" aria-label="Assistant is typing">
                <span className="aurevia-message-mark" aria-hidden="true"><HeartPulse size={13} /></span>
                <span className="aurevia-typing-dots"><i /><i /><i /></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="aurevia-chat-form" onSubmit={sendMessage}>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask Health GPT a question..."
              aria-label="Message Health GPT"
              maxLength={2000}
              disabled={isLoading}
            />
            <button type="submit" aria-label="Send message" disabled={!input.trim() || isLoading}>
              <Send size={17} />
            </button>
          </form>
          <p className="aurevia-chat-footnote">Please don&apos;t share private medical records or payment details.</p>
        </section>
      )}

      <button
        type="button"
        className="aurevia-chat-trigger"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close Health GPT" : "Open Health GPT"}
        aria-expanded={isOpen}
      >
        <span className="aurevia-chat-trigger-icon">{isOpen ? <X size={22} /> : <MessageCircle size={22} />}</span>
        {!isOpen && <span className="aurevia-chat-trigger-label">Health GPT</span>}
        {!isOpen && <span className="aurevia-chat-trigger-pulse" aria-hidden="true" />}
      </button>
    </div>
  );
}
