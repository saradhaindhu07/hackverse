import React from "react";
import {
  TrendingUp,
  Award,
  Sparkles,
  Trophy,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ChevronRight,
  Shield,
  Zap,
} from "lucide-react";
import { StudentProfile, MyHackathonJourneyItem, Hackathon, NavigationTab } from "../types";

interface MyJourneyDashboardProps {
  student: StudentProfile;
  activeHackathons: Hackathon[];
  journeyItems: MyHackathonJourneyItem[];
  setActiveTab: (tab: NavigationTab) => void;
  onOpenHackathon: (hackathon: Hackathon) => void;
}

export const MyJourneyDashboard: React.FC<MyJourneyDashboardProps> = ({
  student,
  activeHackathons,
  journeyItems,
  setActiveTab,
  onOpenHackathon,
}) => {
  return (
    <div className="min-h-screen bg-[#0B1020] text-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Top Welcome Header */}
        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#7C3AED]/20 blur-3xl" />
          <div className="pointer-events-none absolute right-40 -bottom-20 h-64 w-64 rounded-full bg-[#06B6D4]/15 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={student.avatar}
                alt={student.name}
                className="h-16 w-16 rounded-2xl object-cover ring-2 ring-[#7C3AED]"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#7C3AED]/20 border border-[#7C3AED]/40 px-2.5 py-0.5 text-xs font-bold text-[#06B6D4]">
                    {student.level}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {student.college}
                  </span>
                </div>
                <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
                  Welcome back, {student.name.split(" ")[0]}!
                </h1>
                <p className="text-xs text-slate-300 mt-1">
                  You are tracking <strong className="text-white">{journeyItems.length} active hackathons</strong>.
                  Keep building momentum.
                </p>
              </div>
            </div>

            {/* Gamification summary pill */}
            <div className="flex items-center gap-4 bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs uppercase font-semibold text-slate-400">Total Hackathon XP</div>
                <div className="text-xl font-black text-white">
                  {student.xp} <span className="text-xs font-semibold text-[#06B6D4]">XP</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  {student.wins} podium finishes • {student.hackathonsParticipated} sprinted
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ACTIVE HACKATHONS PROGRESS & WORKSPACES */}
        <div className="mt-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white">Your Active Hackathon Sprints</h2>
              <p className="text-xs text-slate-400">
                Live workspaces with real-time milestone checklists and team synchronizations.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("explore")}
              className="text-xs font-semibold text-[#06B6D4] hover:underline flex items-center gap-1"
            >
              <span>Explore New Events</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {journeyItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-[#111827] p-5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-[#7C3AED]/20 border border-[#7C3AED]/40 px-2.5 py-0.5 text-xs font-bold text-[#06B6D4]">
                      {item.teamName}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {item.progressPercent}% Complete
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-white">{item.hackathon.title}</h3>
                  <p className="text-xs text-slate-400">{item.hackathon.organizer}</p>

                  {/* 7-Step Mini Progress Indicator */}
                  <div className="mt-4">
                    <div className="text-[10px] uppercase font-semibold text-slate-400 mb-1.5 flex justify-between">
                      <span>Milestone Checklist</span>
                      <span>Next: {item.nextDeadline}</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Object.entries(item.checkpoints).map(([key, done]) => (
                        <div
                          key={key}
                          title={`${key}: ${done ? "Done" : "Pending"}`}
                          className={`h-1.5 rounded-full ${
                            done ? "bg-[#10B981]" : "bg-slate-800"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Immediate Next Task */}
                  <div className="mt-4 rounded-xl bg-slate-900/90 p-3 border border-slate-800 text-xs">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-[#06B6D4]" />
                      <span>Action Required:</span>
                    </div>
                    <p className="mt-1 text-slate-300 text-[11px]">
                      {item.actionRequired}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Status: {item.status}
                  </span>
                  <button
                    onClick={() => onOpenHackathon(item.hackathon)}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-90"
                  >
                    <span>Open Hackathon OS</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SKILL RADAR & SKILL GAP ANALYSIS */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Skill Radar & Gauges */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#111827] p-6 shadow-lg">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Your Technical Skill Radar</h3>
                <p className="text-xs text-slate-400">
                  Verified competencies evaluated across previous hackathon submissions.
                </p>
              </div>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-[#06B6D4]">
                Aggregated
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {student.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-200">{skill.name}</span>
                    <span className="font-mono text-slate-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Skill Gap Alert */}
            <div className="mt-6 rounded-xl bg-[#7C3AED]/15 border border-[#7C3AED]/30 p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#06B6D4]">
                <AlertCircle className="h-4 w-4" />
                <span>Strategic Skill Gap Alert</span>
              </div>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                Upcoming national hackathons on your watchlist require{" "}
                <strong className="text-white">Cloud Containerization (Docker)</strong> and{" "}
                <strong className="text-white">Live Pitch Delivery</strong>. Pair with an experienced
                presenter via the Team Builder to boost your winning probability by 35%.
              </p>
              <button
                onClick={() => setActiveTab("teams")}
                className="mt-3 text-xs font-semibold text-[#06B6D4] hover:underline flex items-center gap-1"
              >
                <span>Find Teammates with these skills</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Right: Unlocked Achievements & Milestones */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#111827] p-6 shadow-lg">
            <h3 className="text-base font-bold text-white mb-1">Unlocked Badges & Honors</h3>
            <p className="text-xs text-slate-400 mb-4">
              Badges that enhance your student profile credibility.
            </p>

            <div className="space-y-3">
              {student.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="rounded-xl bg-slate-900 p-3.5 border border-slate-800 flex items-start gap-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{badge.name}</h4>
                      <span className="text-[10px] text-slate-400">{badge.earnedDate}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick action banner */}
            <div className="mt-6 pt-4 border-t border-slate-800 text-center">
              <button
                onClick={() => setActiveTab("decoder")}
                className="w-full rounded-xl bg-slate-800 py-2.5 text-xs font-semibold text-[#06B6D4] hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Launch Problem Statement Decoder</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
