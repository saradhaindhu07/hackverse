import React, { useState } from "react";
import {
  Cpu,
  CheckCircle2,
  Calendar,
  Users,
  Trophy,
  Award,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Clock,
  Layers,
  FileText,
  AlertCircle,
  Code2,
  ExternalLink,
  ShieldCheck,
  CheckSquare,
  Square,
  HelpCircle,
} from "lucide-react";
import { Hackathon, StudentProfile } from "../types";

interface HackathonOSViewProps {
  hackathon: Hackathon;
  student: StudentProfile;
  onDecodeProblem: (problemDesc: string, domain?: string, eventTitle?: string) => void;
  onOpenTeamFinder: (hackathonId: string) => void;
  onUpdateXP: (earnedXP: number, reason: string) => void;
}

export const HackathonOSView: React.FC<HackathonOSViewProps> = ({
  hackathon,
  student,
  onDecodeProblem,
  onOpenTeamFinder,
  onUpdateXP,
}) => {
  const [activeTab, setActiveTab] = useState<
    "workspace" | "overview" | "problems" | "steps" | "judging"
  >("workspace");

  const [checklist, setChecklist] = useState(hackathon.prepChecklist);

  const completedCount = checklist.filter((item) => item.completed).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newState = !item.completed;
          if (newState) {
            onUpdateXP(item.xpReward, `Completed task: ${item.text}`);
          }
          return { ...item, completed: newState };
        }
        return item;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Top Breadcrumb & Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-[#06B6D4] font-semibold">Hackathon OS</span>
            <span>/</span>
            <span className="text-white font-medium truncate max-w-[200px] sm:max-w-md">
              {hackathon.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active Workspace
            </span>

            <button
              onClick={() => onOpenTeamFinder(hackathon.id)}
              className="rounded-xl border border-[#7C3AED]/60 bg-[#7C3AED]/10 px-3.5 py-1.5 text-xs font-semibold text-[#06B6D4] hover:bg-[#7C3AED]/20 transition-all flex items-center gap-1.5"
            >
              <Users className="h-3.5 w-3.5" />
              <span>Find Team</span>
            </button>
          </div>
        </div>

        {/* Hero Banner Header */}
        <div className="mt-6 rounded-3xl border border-slate-800 bg-[#111827] p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#7C3AED]/15 blur-3xl" />
          <div className="pointer-events-none absolute right-40 -bottom-20 h-64 w-64 rounded-full bg-[#06B6D4]/10 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <img
                src={hackathon.logo}
                alt={hackathon.organizer}
                className="h-16 w-16 rounded-2xl object-cover ring-2 ring-[#7C3AED]/50"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-[#7C3AED]/20 border border-[#7C3AED]/40 px-2.5 py-0.5 text-xs font-bold text-[#06B6D4]">
                    {hackathon.domain}
                  </span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-300">
                    {hackathon.mode}
                  </span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-300">
                    {hackathon.difficulty}
                  </span>
                </div>
                <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
                  {hackathon.title}
                </h1>
                <p className="mt-1 text-xs text-slate-400">{hackathon.organizer}</p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto">
              <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-3 text-center">
                <div className="text-[10px] uppercase font-semibold text-slate-400">Prize Pool</div>
                <div className="text-sm font-bold text-[#10B981] mt-0.5 truncate">
                  {hackathon.prizePool.split(" ")[0]}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-3 text-center">
                <div className="text-[10px] uppercase font-semibold text-slate-400">Team Size</div>
                <div className="text-sm font-bold text-white mt-0.5">
                  {hackathon.teamSizeMin}–{hackathon.teamSizeMax} Members
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 rounded-2xl bg-slate-900/90 border border-slate-800 p-3 text-center">
                <div className="text-[10px] uppercase font-semibold text-slate-400">Deadline</div>
                <div className="text-sm font-bold text-[#06B6D4] mt-0.5">
                  {new Date(hackathon.deadline).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation Controls */}
          <div className="mt-8 flex flex-wrap gap-2 border-t border-slate-800/80 pt-4">
            <button
              onClick={() => setActiveTab("workspace")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "workspace"
                  ? "bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md shadow-[#7C3AED]/25"
                  : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              Interactive Workspace & Checklist
            </button>

            <button
              onClick={() => setActiveTab("overview")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "overview"
                  ? "bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md shadow-[#7C3AED]/25"
                  : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              What is this? & Requirements
            </button>

            <button
              onClick={() => setActiveTab("problems")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "problems"
                  ? "bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md shadow-[#7C3AED]/25"
                  : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              Problem Statements ({hackathon.problemStatements.length})
            </button>

            <button
              onClick={() => setActiveTab("steps")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "steps"
                  ? "bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md shadow-[#7C3AED]/25"
                  : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              8-Step Participation Roadmap
            </button>

            <button
              onClick={() => setActiveTab("judging")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "judging"
                  ? "bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md shadow-[#7C3AED]/25"
                  : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              Judging Rubric
            </button>
          </div>
        </div>

        {/* TAB 1: INTERACTIVE WORKSPACE & PREPARATION CHECKLIST */}
        {activeTab === "workspace" && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Interactive Checklist */}
            <div className="lg:col-span-8 space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Hackathon Preparation Checklist
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Check off milestones to level up your Hackathon XP and track team readiness.
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-[#06B6D4]">{progressPercent}%</div>
                    <div className="text-[10px] text-slate-400">
                      {completedCount} of {checklist.length} completed
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Checklist items list */}
                <div className="mt-6 space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      id={`checklist-item-${item.id}`}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`cursor-pointer rounded-xl p-3.5 border transition-all flex items-start justify-between gap-3 ${
                        item.completed
                          ? "bg-slate-900/40 border-slate-800 text-slate-400"
                          : "bg-slate-900/80 border-slate-700/80 text-white hover:border-[#06B6D4]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          className="mt-0.5 text-[#06B6D4] focus:outline-none"
                          aria-label={item.completed ? "Mark incomplete" : "Mark complete"}
                        >
                          {item.completed ? (
                            <CheckSquare className="h-5 w-5 text-[#10B981]" />
                          ) : (
                            <Square className="h-5 w-5 text-slate-500" />
                          )}
                        </button>
                        <div>
                          <div
                            className={`text-xs font-semibold ${
                              item.completed ? "line-through text-slate-400" : "text-slate-100"
                            }`}
                          >
                            {item.text}
                          </div>
                          <span className="mt-1 inline-block rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <span className="shrink-0 text-[11px] font-mono font-bold text-[#F59E0B] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        +{item.xpReward} XP
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Quick Workspace Tools */}
            <div className="lg:col-span-4 space-y-6">
              {/* Tool 1: Decode Problem Statement */}
              <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#06B6D4]/10 text-[#06B6D4]">
                    <HelpCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Problem Decoder</h3>
                    <p className="text-[11px] text-slate-400">AI Challenge Deconstruction</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                  Struggling with this event's official problem statement? Let HACKOS extract the hidden
                  organizer expectations and judging criteria weights.
                </p>
                <button
                  id="workspace-decode-btn"
                  onClick={() => {
                    const sample = hackathon.problemStatements[0];
                    if (sample) {
                      onDecodeProblem(sample.description, sample.domain, hackathon.title);
                    }
                  }}
                  className="mt-4 w-full rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] py-2 text-xs font-semibold text-white shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Decode First Challenge Statement</span>
                </button>
              </div>

              {/* Tool 2: Team Assembler */}
              <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Team Builder</h3>
                    <p className="text-[11px] text-slate-400">Fill your missing skill gaps</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                  Requires {hackathon.teamSizeMin}–{hackathon.teamSizeMax} teammates.
                  Current recommendation: recruit a specialist in{" "}
                  <strong className="text-[#06B6D4]">
                    {hackathon.requiredSkills[hackathon.requiredSkills.length - 1]}
                  </strong>.
                </p>
                <button
                  onClick={() => onOpenTeamFinder(hackathon.id)}
                  className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-800/80 py-2 text-xs font-semibold text-slate-200 hover:border-slate-600 hover:text-white transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Browse Available Teammates</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Tool 3: Emergency Live Demo Kit */}
              <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Live Demo Shield</h3>
                    <p className="text-[11px] text-slate-400">Zero-Failure Guidelines</p>
                  </div>
                </div>
                <ul className="mt-3 space-y-2 text-xs text-slate-400">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#10B981]">✓</span>
                    <span>Always configure an offline demo dataset switch</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#10B981]">✓</span>
                    <span>Record 60s backup video on an iPad/phone</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#10B981]">✓</span>
                    <span>Enforce strict code freeze 6 hours before demo</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OVERVIEW & ELIGIBILITY */}
        {activeTab === "overview" && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="text-[#06B6D4]">01.</span> What is this?
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                {hackathon.fullDesc}
              </p>

              <h3 className="mt-6 text-base font-bold text-white flex items-center gap-2">
                <span className="text-[#06B6D4]">02.</span> What do I have to do?
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Your team must build a working technical MVP that solves one of the designated problem
                statements. The solution must feature a functional user interface, verified backend or
                model logic, and be prepared for live evaluation before senior industry and government juries.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="text-[#06B6D4]">03.</span> Who can participate?
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                {hackathon.eligibility}
              </p>

              <h3 className="mt-6 text-base font-bold text-white flex items-center gap-2">
                <span className="text-[#06B6D4]">04.</span> Required Skills & Stack
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {hackathon.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1 text-xs font-semibold text-[#06B6D4]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <h3 className="mt-6 text-base font-bold text-white flex items-center gap-2">
                <span className="text-[#06B6D4]">05.</span> Team Requirements
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                Minimum {hackathon.teamSizeMin}, Maximum {hackathon.teamSizeMax} members. Multi-disciplinary teams
                (combination of developer, designer, and presenter) consistently win top prizes.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: PROBLEM STATEMENTS */}
        {activeTab === "problems" && (
          <div className="mt-8 space-y-6">
            {hackathon.problemStatements.map((ps, idx) => (
              <div
                key={ps.id}
                className="rounded-2xl border border-slate-800 bg-[#111827] p-6 hover:border-slate-700 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#7C3AED]/20 border border-[#7C3AED]/40 px-2.5 py-0.5 text-xs font-bold text-[#06B6D4]">
                      PS #{idx + 1} • {ps.domain}
                    </span>
                  </div>
                  <button
                    onClick={() => onDecodeProblem(ps.description, ps.domain, hackathon.title)}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-90"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Decode with AI</span>
                  </button>
                </div>

                <h3 className="mt-3 text-lg font-bold text-white">{ps.title}</h3>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {ps.description}
                </p>

                <div className="mt-4 rounded-xl bg-slate-900 p-3.5 border border-slate-800 text-xs text-slate-300">
                  <strong className="text-[#10B981]">Expected Deliverable:</strong> {ps.expectedOutput}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: 8-STEP PARTICIPATION ROADMAP */}
        {activeTab === "steps" && (
          <div className="mt-8 rounded-2xl border border-slate-800 bg-[#111827] p-6">
            <h3 className="text-lg font-bold text-white mb-6">
              Step-by-Step Participation Guide
            </h3>
            <div className="space-y-4">
              {hackathon.steps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 flex items-start gap-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] font-bold text-white text-xs">
                    0{step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{step.title}</h4>
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400">
                        {step.badge}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: JUDGING CRITERIA */}
        {activeTab === "judging" && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hackathon.judgingCriteria.map((c) => (
              <div
                key={c.criterion}
                className="rounded-2xl border border-slate-800 bg-[#111827] p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{c.criterion}</h4>
                    <span className="text-xs font-mono font-bold text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-0.5 rounded border border-[#06B6D4]/30">
                      {c.weight}% Weight
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                    {c.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                  Tip: Tailor your live demo slides to explicitly highlight this metric.
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
