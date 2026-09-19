import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Sparkles,
  X,
  Send,
  Bot,
  User,
  RefreshCw,
  HelpCircle,
  Zap,
} from "lucide-react";
import { StudentProfile, Hackathon } from "../types";
import { askHackBot } from "../services/aiService";

interface HackBotChatProps {
  student: StudentProfile;
  activeHackathon: Hackathon | null;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  time: string;
}

export const HackBotChat: React.FC<HackBotChatProps> = ({ student, activeHackathon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      text: `Hey ${student.name.split(" ")[0]}! I'm HackBot, your AI hackathon strategist. Ask me anything about choosing hackathons, decoding problems, forming teams, preparing PPTs, or avoiding demo failures!`,
      time: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    "Which hackathon suits my profile best?",
    "How should I structure my 3-minute jury pitch?",
    "What is the golden team ratio?",
    "How to prevent live demo crashes on stage?",
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, text: m.text }));
      const botReply = await askHackBot(text, history, { student, activeHackathon });

      const replyMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, replyMsg]);
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          id="hackbot-open-trigger"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-4 py-3 text-xs font-bold text-white shadow-xl shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          <div className="relative">
            <Bot className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span>Ask HackBot</span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div
          id="hackbot-chat-drawer"
          className="flex h-[520px] w-[350px] sm:w-[400px] flex-col rounded-3xl border border-slate-800 bg-[#111827] shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-bottom-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-3.5 rounded-t-3xl">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] text-white">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  HackBot AI Co-Pilot
                  <span className="rounded bg-[#7C3AED]/30 px-1.5 py-0.2 text-[9px] text-[#06B6D4]">
                    Online
                  </span>
                </h3>
                <p className="text-[10px] text-slate-400">
                  {activeHackathon ? `Context: ${activeHackathon.title.slice(0, 22)}...` : "Student Hackathon Advisor"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#7C3AED]/20 text-[#06B6D4]">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-medium"
                      : "bg-slate-900 border border-slate-800 text-slate-200"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <div className="mt-1 text-[9px] text-slate-400 text-right">{msg.time}</div>
                </div>

                {msg.role === "user" && (
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="h-7 w-7 rounded-lg object-cover ring-1 ring-slate-700"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
                <RefreshCw className="h-3.5 w-3.5 animate-spin text-[#06B6D4]" />
                <span>HackBot is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompt chips */}
          <div className="px-3 py-1.5 border-t border-slate-800/80 bg-slate-950/60 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap rounded-full border border-slate-800 bg-slate-900 px-2.5 py-0.5 text-[10px] text-slate-300 hover:border-[#06B6D4] hover:text-white"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-slate-800 flex items-center gap-2 bg-slate-900/90 rounded-b-3xl"
          >
            <input
              type="text"
              id="hackbot-chat-input"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything about hackathons..."
              className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-[#06B6D4]"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] p-2 text-white shadow-sm hover:opacity-90 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
