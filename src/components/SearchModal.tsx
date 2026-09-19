import React, { useState, useEffect } from "react";
import {
  Search,
  X,
  Compass,
  GraduationCap,
  HelpCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Hackathon, Mentor, NavigationTab } from "../types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  hackathons: Hackathon[];
  mentors: Mentor[];
  onSelectHackathon: (hackathon: Hackathon) => void;
  setActiveTab: (tab: NavigationTab) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  hackathons,
  mentors,
  onSelectHackathon,
  setActiveTab,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredHacks = hackathons.filter(
    (h) =>
      h.title.toLowerCase().includes(query.toLowerCase()) ||
      h.domain.toLowerCase().includes(query.toLowerCase()) ||
      h.requiredSkills.some((s) => s.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredMentors = mentors.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.domain.some((d) => d.toLowerCase().includes(query.toLowerCase())) ||
      m.role.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 pt-20 animate-in fade-in">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-[#111827] shadow-2xl overflow-hidden">
        {/* Input Bar */}
        <div className="flex items-center border-b border-slate-800 px-4 py-3.5">
          <Search className="h-5 w-5 text-[#06B6D4] mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hackathons, mentors, skills, domains..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
          />
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Quick Shortcuts */}
          {query === "" && (
            <div>
              <div className="text-[10px] uppercase font-semibold text-slate-400 mb-2">
                Quick Navigation
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => {
                    setActiveTab("explore");
                    onClose();
                  }}
                  className="rounded-xl bg-slate-900 p-2.5 text-left border border-slate-800 hover:border-[#06B6D4] text-xs text-slate-300"
                >
                  <Compass className="h-4 w-4 text-[#06B6D4] mb-1" />
                  <span>All Hackathons</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab("decoder");
                    onClose();
                  }}
                  className="rounded-xl bg-slate-900 p-2.5 text-left border border-slate-800 hover:border-[#7C3AED] text-xs text-slate-300"
                >
                  <HelpCircle className="h-4 w-4 text-[#7C3AED] mb-1" />
                  <span>Problem Decoder</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab("teams");
                    onClose();
                  }}
                  className="rounded-xl bg-slate-900 p-2.5 text-left border border-slate-800 hover:border-amber-400 text-xs text-slate-300"
                >
                  <Sparkles className="h-4 w-4 text-amber-400 mb-1" />
                  <span>Team Builder</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab("mentors");
                    onClose();
                  }}
                  className="rounded-xl bg-slate-900 p-2.5 text-left border border-slate-800 hover:border-emerald-400 text-xs text-slate-300"
                >
                  <GraduationCap className="h-4 w-4 text-emerald-400 mb-1" />
                  <span>Mentors</span>
                </button>
              </div>
            </div>
          )}

          {/* Matching Hackathons */}
          {filteredHacks.length > 0 && (
            <div>
              <div className="text-[10px] uppercase font-semibold text-slate-400 mb-2 flex items-center justify-between">
                <span>Hackathons ({filteredHacks.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredHacks.slice(0, 4).map((h) => (
                  <div
                    key={h.id}
                    onClick={() => {
                      onSelectHackathon(h);
                      onClose();
                    }}
                    className="cursor-pointer rounded-xl bg-slate-900/80 hover:bg-slate-800 p-2.5 border border-slate-800 flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={h.logo}
                        alt={h.title}
                        className="h-8 w-8 rounded-lg object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-xs font-bold text-white line-clamp-1">{h.title}</div>
                        <div className="text-[10px] text-slate-400">
                          {h.domain} • {h.organizer}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#10B981]">
                      {h.prizePool.split(" ")[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matching Mentors */}
          {filteredMentors.length > 0 && (
            <div>
              <div className="text-[10px] uppercase font-semibold text-slate-400 mb-2">
                Mentors ({filteredMentors.length})
              </div>
              <div className="space-y-1.5">
                {filteredMentors.slice(0, 3).map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      setActiveTab("mentors");
                      onClose();
                    }}
                    className="cursor-pointer rounded-xl bg-slate-900/80 hover:bg-slate-800 p-2.5 border border-slate-800 flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="h-8 w-8 rounded-xl object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">{m.name}</div>
                        <div className="text-[10px] text-[#06B6D4]">{m.role}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400">{m.wins} wins</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-slate-800 px-4 py-2.5 text-[11px] text-slate-500 flex justify-between">
          <span>Press ESC to close</span>
          <span>HackVerse Search Engine</span>
        </div>
      </div>
    </div>
  );
};
