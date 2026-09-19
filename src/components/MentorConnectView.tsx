import React, { useState } from "react";
import {
  Sparkles,
  Trophy,
  Award,
  BookOpen,
  MessageSquare,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Heart,
  Send,
  X,
} from "lucide-react";
import { Mentor, MentorStory } from "../types";

interface MentorConnectViewProps {
  mentors: Mentor[];
  stories: MentorStory[];
}

export const MentorConnectView: React.FC<MentorConnectViewProps> = ({ mentors, stories }) => {
  const [activeTab, setActiveTab] = useState<"mentors" | "stories">("mentors");
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [activeStory, setActiveStory] = useState<MentorStory | null>(null);
  const [contactMentor, setContactMentor] = useState<Mentor | null>(null);
  const [messageSent, setMessageSent] = useState(false);
  const [questionText, setQuestionText] = useState("");

  const domains = [
    "All",
    "Full Stack Architecture",
    "AI Integration",
    "Cloud Architecture",
    "UI/UX Design",
    "Hardware & IoT",
  ];

  const filteredMentors = mentors.filter(
    (m) =>
      selectedDomain === "All" ||
      m.domain.some((d) => d.toLowerCase().includes(selectedDomain.toLowerCase()))
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setContactMentor(null);
      setQuestionText("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-[#06B6D4]/10 border border-[#06B6D4]/30 px-2.5 py-0.5 text-xs font-semibold text-[#06B6D4]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Peer & Alumni Knowledge Base</span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white">
            Mentor Network & Experience Stories
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Learn from students and alumni who have won national hackathons, survived venue WiFi outages,
            and raised angel funding from demo days.
          </p>

          {/* Tab Switcher */}
          <div className="mt-6 flex gap-2">
            <button
              id="mentor-tab-experts"
              onClick={() => setActiveTab("mentors")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "mentors"
                  ? "bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md shadow-[#7C3AED]/20"
                  : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              Expert Mentors & Winners ({mentors.length})
            </button>

            <button
              id="mentor-tab-stories"
              onClick={() => setActiveTab("stories")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "stories"
                  ? "bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md shadow-[#7C3AED]/20"
                  : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              Participant Experience Stories ({stories.length})
            </button>
          </div>
        </div>

        {/* TAB 1: EXPERT MENTORS */}
        {activeTab === "mentors" && (
          <div className="mt-6">
            {/* Domain filter */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {domains.map((dom) => (
                <button
                  key={dom}
                  onClick={() => setSelectedDomain(dom)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                    selectedDomain === dom
                      ? "bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-semibold"
                      : "border border-slate-800 bg-[#111827] text-slate-300 hover:text-white"
                  }`}
                >
                  {dom}
                </button>
              ))}
            </div>

            {/* Mentor cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="rounded-2xl border border-slate-800 bg-[#111827] p-5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg"
                >
                  <div>
                    <div className="flex items-start gap-3">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="h-14 w-14 rounded-2xl object-cover ring-2 ring-[#7C3AED]/50"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold text-white truncate">{mentor.name}</h3>
                          <span className="rounded bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">
                            Available
                          </span>
                        </div>
                        <p className="text-xs text-[#06B6D4] font-medium truncate">{mentor.role}</p>
                        <p className="text-[11px] text-slate-400 truncate">{mentor.companyOrCollege}</p>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {mentor.experienceBio}
                    </p>

                    {/* Stats */}
                    <div className="mt-3 flex items-center gap-3 text-xs text-slate-300 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                      <div>
                        <strong className="text-white">{mentor.hackathonsParticipated}</strong> Sprinted
                      </div>
                      <div>•</div>
                      <div>
                        <strong className="text-[#F59E0B]">{mentor.wins}</strong> Victories
                      </div>
                      <div>•</div>
                      <div>
                        <strong className="text-[#06B6D4]">{mentor.reviewsCount}</strong> Sessions
                      </div>
                    </div>

                    {/* Mentoring topics */}
                    <div className="mt-3">
                      <div className="text-[10px] uppercase font-semibold text-slate-400 mb-1">
                        Can Advise On:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {mentor.mentoringTopics.map((topic) => (
                          <span
                            key={topic}
                            className="rounded bg-slate-800/90 px-2 py-0.5 text-[10px] text-slate-300 font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center gap-2">
                    <button
                      onClick={() => setContactMentor(mentor)}
                      className="flex-1 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] py-2 text-xs font-semibold text-white shadow-sm hover:opacity-90 flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>Ask Advice / 1:1</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PARTICIPANT EXPERIENCE STORIES */}
        {activeTab === "stories" && (
          <div className="mt-6 space-y-6">
            {stories.map((story) => (
              <div
                key={story.id}
                className="rounded-2xl border border-slate-800 bg-[#111827] p-6 hover:border-slate-700 transition-all shadow-lg"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#7C3AED]/20 border border-[#7C3AED]/40 px-2.5 py-0.5 text-xs font-bold text-[#06B6D4]">
                      {story.hackathonName}
                    </span>
                    <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-xs font-bold text-emerald-400">
                      Result: {story.outcome}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    By <strong>{story.mentorName}</strong> ({story.mentorRole})
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-white">{story.bestProject}</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {story.winningLearningExperience}
                </p>

                {/* Key Lessons Highlight */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-900 p-3.5 border border-slate-800">
                    <div className="text-xs font-bold text-[#10B981] flex items-center gap-1.5 mb-2">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Key Strategic Lessons</span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {story.aiSummary.keyLessons.slice(0, 3).map((l: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#10B981] font-bold">✓</span>
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-slate-900 p-3.5 border border-slate-800">
                    <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-2">
                      <AlertCircle className="h-4 w-4" />
                      <span>Mistakes They Avoided / Endured</span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {story.aiSummary.commonMistakes.slice(0, 3).map((m: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-400">⚠</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4 text-slate-400">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5 text-rose-500" />
                      Verified Case Study
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveStory(story)}
                    className="text-[#06B6D4] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Read Full Debrief</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal: Story Detailed Debrief */}
        {activeStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-2xl">
              <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="rounded bg-[#7C3AED]/20 px-2 py-0.5 text-xs font-bold text-[#06B6D4]">
                    {activeStory.hackathonName}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-white">{activeStory.bestProject}</h3>
                  <p className="text-xs text-slate-400">
                    By {activeStory.mentorName} • {activeStory.outcome}
                  </p>
                </div>
                <button
                  onClick={() => setActiveStory(null)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <div>
                  <h4 className="font-bold text-[#06B6D4] uppercase text-xs tracking-wider">
                    First Hackathon Experience
                  </h4>
                  <p className="mt-1">{activeStory.firstHackathon}</p>
                </div>

                <div className="rounded-xl bg-slate-900 p-4 border border-slate-800">
                  <h4 className="font-bold text-[#10B981] uppercase text-xs tracking-wider">
                    Technical Architecture Decision
                  </h4>
                  <p className="mt-1">{activeStory.technicalDecision}</p>
                </div>

                <div className="rounded-xl bg-slate-900 p-4 border border-slate-800">
                  <h4 className="font-bold text-[#F59E0B] uppercase text-xs tracking-wider">
                    Pitch & Presentation Tactics
                  </h4>
                  <p className="mt-1">{activeStory.pitchingLesson}</p>
                </div>

                <div className="rounded-xl bg-slate-900 p-4 border border-slate-800">
                  <h4 className="font-bold text-rose-400 uppercase text-xs tracking-wider">
                    Biggest Mistake to Avoid
                  </h4>
                  <p className="mt-1">{activeStory.biggestMistake}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setActiveStory(null)}
                  className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700"
                >
                  Close Story
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Contact / Ask Mentor */}
        {contactMentor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-2xl">
              <div className="flex items-start justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <img
                    src={contactMentor.avatar}
                    alt={contactMentor.name}
                    className="h-10 w-10 rounded-xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white">{contactMentor.name}</h3>
                    <p className="text-xs text-[#06B6D4]">{contactMentor.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => setContactMentor(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {messageSent ? (
                <div className="py-8 text-center animate-in fade-in">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-[#10B981]" />
                  <h4 className="mt-3 text-base font-bold text-white">Question Sent!</h4>
                  <p className="mt-1 text-xs text-slate-400">
                    {contactMentor.name} will review your inquiry and reply via your HackVerse notification inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="mt-4 space-y-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Your Question or Mentorship Request
                    </label>
                    <textarea
                      rows={4}
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      placeholder="e.g. Hi! We are preparing for Smart India Hackathon in the healthcare track. How should we balance the live computer vision demo with offline fallbacks?"
                      className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-[#06B6D4]"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setContactMentor(null)}
                      className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-5 py-2 text-xs font-bold text-white shadow-md hover:opacity-90"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Send to Mentor</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
