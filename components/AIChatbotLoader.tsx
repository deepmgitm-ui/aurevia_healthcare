"use client";

import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import { Bot } from "lucide-react";

export default function AIChatbotLoader() {
  const [Chatbot, setChatbot] = useState<ComponentType | null>(null);
  const loadingRef = useRef(false);
  const openWhenReadyRef = useRef(false);

  const loadChatbot = useCallback(() => {
    openWhenReadyRef.current = true;
    if (Chatbot || loadingRef.current) return;

    loadingRef.current = true;
    void import("./AIChatbot").then(({ default: LoadedChatbot }) => {
      setChatbot(() => LoadedChatbot);
    }).catch(() => {
      loadingRef.current = false;
    });
  }, [Chatbot]);

  useEffect(() => {
    if (!Chatbot || !openWhenReadyRef.current) return;
    openWhenReadyRef.current = false;
    window.requestAnimationFrame(() => {
      document.dispatchEvent(new Event("aurevia:open-health-gpt"));
    });
  }, [Chatbot]);

  useEffect(() => {
    const openFromPage = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest("[data-open-health-gpt]")) {
        loadChatbot();
      }
    };
    document.addEventListener("click", openFromPage);
    return () => document.removeEventListener("click", openFromPage);
  }, [loadChatbot]);

  if (Chatbot) return <Chatbot />;

  return (
    <button
      type="button"
      className="aurevia-chat-trigger"
      onClick={loadChatbot}
      aria-label="Open Health GPT"
      aria-expanded={false}
      aria-controls="aurevia-health-gpt"
    >
      <span className="aurevia-chat-trigger-icon"><Bot size={24} strokeWidth={1.8} /></span>
      <span className="aurevia-chat-trigger-label">Health GPT</span>
      <span className="aurevia-chat-trigger-pulse" aria-hidden="true" />
    </button>
  );
}
