import React, { useState } from "react";
import {
  Compass,
  Cpu,
  Users,
  RotateCcw,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Code2,
  FileText,
  Lightbulb,
  Trophy,
  Github,
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Layers,
  Zap,
} from "lucide-react";
import { NavigationTab, StudentProfile, Hackathon } from "../types";

interface LandingPageProps {
  setActiveTab: (tab: NavigationTab) => void;
  onOpenHackathon: (hackathon: Hackathon) => void;
  featuredHackathons: Hackathon[];
  student: StudentProfile;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  setActiveTab,
  onOpenHackathon,
  featuredHackathons,
  student,
}) => {
  const [activeJourneyNode, setActiveJourneyNode] = useState<number>(1);

  const journeySteps = [
    {
      id: 0,
      title: "Discover",
      desc: "Skill-based matchmaking filters 100+ events down to your sweet spot.",
      icon: Compass,
      tag: "Match 92%",
      color: "from-cyan-500 to-blue-600",
    },
    {
      id: 1,
      title: "Understand",
      desc: "AI Problem Decoder turns bureaucratic challenge statements into clear requirements.",
      icon: Cpu,
      tag: "Plain English",
      color: "from-[#7C3AED] to-violet-600",
    },
    {
      id: 2,
      title: "Prepare",
      desc: "Interactive milestone checklists and pre-configured repository starters.",
      icon: Layers,
      tag: "8 Milestones",
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: 3,
      title: "Team Up",
      desc: "Algorithmic teammate finder with live skill-coverage matrix.",
      icon: Users,
      tag: "100% Coverage",
      color: "from-amber-500 to-orange-600",
    },
    {
      id: 4,
      title: "Build",
      desc: "36-hour sprint tracker with offline-first demo failover protection.",
      icon: Code2,
      tag: "Zero-Lag Demo",
      color: "from-rose-500 to-pink-600",
    },
    {
      id: 5,
      title: "Pitch & Win",
      desc: "3-minute hook formula, slide templates, and rubric alignment.",
      icon: Trophy,
      tag: "Jury Ready",
      color: "from-[#06B6D4] to-[#7C3AED]",
    },
  ];

  const studentProblems = [
    {
      number: "01",
      title: "Too many hackathons",
      desc: "Endless Discord servers and spammy WhatsApp groups announce events daily with zero signal-to-noise ratio.",
    },
    {
      number: "02",
      title: "Don't know which one suits me",
      desc: "Students sign up for advanced Web3 or Kernel hackathons only to realize they lack fundamental prerequisites.",
    },
    {
      number: "03",
      title: "Problem statements are confusing",
      desc: "Government and enterprise problem statements are written in opaque bureaucratic jargon that obscures what to build.",
    },
    {
      number: "04",
      title: "Don't know required skills",
      desc: "Event posters display 20 generic buzzword tags without specifying what is actually needed for an MVP.",
    },
    {
      number: "05",
      title: "Difficult to find the right teammates",
      desc: "Teaming up with 4 frontend coders or friends who ghost halfway through the hackathon leads to demo day disasters.",
    },
    {
      number: "06",
      title: "Don't know how to prepare",
      desc: "Teams waste the first 8 hours of a 36-hour event arguing over folder structures and database frameworks.",
    },
    {
      number: "07",
      title: "Don't know why projects failed",
      desc: "Rejection emails simply say 'Thank you for participating', offering zero constructive critique for improvement.",
    },
    {
      number: "08",
      title: "No access to experienced participants",
      desc: "Winners keep their pitch scripts, demo backups, and architectural tricks hidden within private college circles.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0B1020] text-[#F8FAFC]">
      {/* Glow Backdrops */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-tr from-[#7C3AED]/15 via-[#06B6D4]/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-[900px] right-0 h-[400px] w-[500px] rounded-full bg-[#7C3AED]/10 blur-3xl" />

      {/* 1. HERO SECTION */}
      <section className="relative mx-auto max-w-7xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Vision & CTAs */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/40 bg-[#111827] px-3.5 py-1.5 text-xs font-semibold text-[#06B6D4] shadow-inner mb-6">
              <Sparkles className="h-3.5 w-3.5 text-[#06B6D4]" />
              <span>Next-Gen Student Hackathon Operating System</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white leading-[1.15]">
              Don’t just find hackathons.{" "}
              <span className="bg-gradient-to-r from-[#06B6D4] via-indigo-200 to-[#7C3AED] bg-clip-text text-transparent">
                Build your way through them.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[#94A3B8]">
              An AI-powered ecosystem that helps students discover the right hackathons,
              decode confusing challenges into plain English, build balanced teams, prepare smarter,
              connect with experienced mentors, and systematically improve after every attempt.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                id="hero-explore-btn"
                onClick={() => setActiveTab("explore")}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7C3AED]/25 hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Explore Hackathons</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                id="hero-journey-btn"
                onClick={() => setActiveTab("journey")}
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-[#111827] px-6 py-3 text-sm font-semibold text-slate-200 hover:border-[#7C3AED] hover:text-white hover:bg-slate-900 transition-all"
              >
                <span>Start My Journey</span>
                <ChevronRight className="h-4 w-4 text-[#06B6D4]" />
              </button>
            </div>

            {/* Quick credibility stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-800/80 pt-6">
              <div>
                <div className="text-2xl font-bold text-white">8+</div>
                <div className="text-xs text-slate-400">Curated Hackathons</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#06B6D4]">100%</div>
                <div className="text-xs text-slate-400">Actionable Journey</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#7C3AED]">₹3.5 Cr+</div>
                <div className="text-xs text-slate-400">Prize Pools & Grants</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Mock Journey Visualizer */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-800 bg-[#111827] p-5 shadow-2xl shadow-black/80">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">HACKVERSE_LIVE_PIPELINE.sh</span>
                </div>
                <span className="rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 px-2 py-0.5 text-[10px] font-bold text-[#06B6D4]">
                  STUDENT_LOOP
                </span>
              </div>

              {/* Journey Nodes Visualizer */}
              <div className="mt-4 space-y-2.5">
                {journeySteps.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = activeJourneyNode === step.id;
                  return (
                    <div
                      key={step.id}
                      id={`journey-node-${step.id}`}
                      onClick={() => setActiveJourneyNode(step.id)}
                      className={`cursor-pointer rounded-xl p-3 border transition-all duration-200 ${
                        isActive
                          ? "bg-slate-900 border-[#06B6D4] shadow-md shadow-[#06B6D4]/10"
                          : "bg-slate-900/50 border-slate-800/80 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${step.color} text-white`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white uppercase tracking-wider">
                                Step 0{idx + 1}
                              </span>
                              <span className="text-sm font-semibold text-slate-200">
                                {step.title}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                              {step.desc}
                            </p>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono font-medium text-[#06B6D4] bg-[#06B6D4]/10 border border-[#06B6D4]/30 px-2 py-0.5 rounded-md">
                          {step.tag}
                        </span>
                      </div>

                      {/* Expanded view for selected node */}
                      {isActive && (
                        <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-xs text-slate-300 animate-in fade-in">
                          <p className="leading-relaxed">{step.desc}</p>
                          <div className="mt-2.5 flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (step.id === 0) setActiveTab("explore");
                                else if (step.id === 1) setActiveTab("decoder");
                                else if (step.id === 2) setActiveTab("hackathon-os");
                                else if (step.id === 3) setActiveTab("teams");
                                else if (step.id === 4) setActiveTab("hackathon-os");
                                else setActiveTab("failure-improver");
                              }}
                              className="text-[11px] font-semibold text-[#06B6D4] hover:underline flex items-center gap-1"
                            >
                              Launch {step.title} Mode <ArrowRight className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#10B981] animate-ping" />
                  Active Workspace Loaded
                </span>
                <span className="font-mono text-slate-400">SIH2026 // In Progress</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM SECTION */}
      <section className="border-t border-slate-800/80 bg-[#0E1528] py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400 uppercase tracking-wider">
              The Reality Check
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Hackathons are easy to find.{" "}
              <span className="text-red-400">Winning the journey is not.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400">
              Most college students drop out, build half-broken prototypes, or face silent rejections
              because existing platforms are just event directories, not preparation systems.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {studentProblems.map((problem) => (
              <div
                key={problem.number}
                className="rounded-2xl border border-slate-800 bg-[#111827] p-5 hover:border-red-500/40 hover:bg-slate-900/80 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-red-400/80">
                    PROBLEM {problem.number}
                  </span>
                  <AlertTriangle className="h-4 w-4 text-amber-400/80" />
                </div>
                <h3 className="mt-3 text-base font-semibold text-white">
                  {problem.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {problem.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Transition Banner */}
          <div className="mt-12 rounded-2xl border border-[#7C3AED]/40 bg-gradient-to-r from-[#7C3AED]/20 via-[#111827] to-[#06B6D4]/20 p-6 sm:p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              HACKOS solves the entire journey.
            </h3>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl mx-auto">
              From the moment you discover a problem statement to forming an elite team,
              building with an offline safety net, pitching to jury rubrics, and analyzing feedback.
            </p>
            <div className="mt-5 flex justify-center">
              <button
                onClick={() => setActiveTab("explore")}
                className="flex items-center gap-2 rounded-xl bg-[#06B6D4] px-5 py-2.5 text-xs font-bold text-[#0B1020] hover:bg-cyan-300 transition-all"
              >
                <span>Experience the Operating System</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIX CORE FEATURES SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto">
          <span className="rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/10 px-3 py-1 text-xs font-semibold text-[#06B6D4] uppercase tracking-wider">
            Engineered For Student Hackers
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Six pillars that turn participants into winners.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 01: Skill-Based Hackathon Recommendation */}
          <div
            id="feature-card-1"
            onClick={() => setActiveTab("explore")}
            className="group cursor-pointer rounded-2xl border border-slate-800 bg-[#111827] p-6 hover:border-[#06B6D4] hover:shadow-lg hover:shadow-cyan-950/40 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#06B6D4]">01</span>
              <Compass className="h-5 w-5 text-[#06B6D4] group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">
              Skill-Based Recommendation
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Students choose skills they have, skills they want to learn, and difficulty level.
              AI matches exact opportunities with clear score breakdowns.
            </p>
            <div className="mt-4 rounded-xl bg-slate-900 p-3 border border-slate-800/80 text-[11px] text-slate-300 font-mono">
              <span className="text-[#10B981]">✓ AI Analysis:</span> “Based on Python + AI + beginner level, 8 hackathons suit your current profile.”
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#06B6D4] group-hover:translate-x-1 transition-transform">
              Try Opportunity Matching <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 02: Project / GitHub-Based Matching */}
          <div
            id="feature-card-2"
            onClick={() => setActiveTab("explore")}
            className="group cursor-pointer rounded-2xl border border-slate-800 bg-[#111827] p-6 hover:border-[#7C3AED] hover:shadow-lg hover:shadow-violet-950/40 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#7C3AED]">02</span>
              <Github className="h-5 w-5 text-[#7C3AED] group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">
              Project & GitHub-Based Matching
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Connect GitHub or add your project portfolio. Our engine audits your repository languages
              and detects explicit skill gaps before you register.
            </p>
            <div className="mt-4 rounded-xl bg-slate-900 p-3 border border-slate-800/80 text-[11px] text-slate-300 font-mono">
              <span className="text-[#F59E0B]">⚠ Skill Gap:</span> “Matches Python & web stack, but you may need basic cloud deployment skills.”
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#7C3AED] group-hover:translate-x-1 transition-transform">
              Audit My Tech Stack <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 03: Hackathon OS Workspace */}
          <div
            id="feature-card-3"
            onClick={() => setActiveTab("hackathon-os")}
            className="group cursor-pointer rounded-2xl border border-slate-800 bg-[#111827] p-6 hover:border-[#10B981] hover:shadow-lg hover:shadow-emerald-950/40 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#10B981]">03</span>
              <Cpu className="h-5 w-5 text-[#10B981] group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">
              Intelligent Hackathon OS Workspace
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Never stare at a confusing poster. Unlock step-by-step participation roadmaps,
              interactive preparation checklists, and deadline countdowns.
            </p>
            <div className="mt-4 rounded-xl bg-slate-900 p-3 border border-slate-800/80 text-[11px] text-slate-300 font-mono">
              <span className="text-white">8 Guided Steps:</span> Register → Understand → Form Team → MVP → Pitch → Submit.
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#10B981] group-hover:translate-x-1 transition-transform">
              Open Hackathon Workspace <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 04: Problem Decoder */}
          <div
            id="feature-card-4"
            onClick={() => setActiveTab("decoder")}
            className="group cursor-pointer rounded-2xl border border-slate-800 bg-[#111827] p-6 hover:border-[#06B6D4] hover:shadow-lg hover:shadow-cyan-950/40 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#06B6D4]">04</span>
              <HelpCircle className="h-5 w-5 text-[#06B6D4] group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">
              AI Problem Decoder
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Paste any convoluted challenge statement. AI extracts: In Simple Words, What They Actually Want,
              Key Requirements, Suggested Tech Stack, and Hour-by-Hour Steps.
            </p>
            <div className="mt-4 rounded-xl bg-slate-900 p-3 border border-slate-800/80 text-[11px] text-slate-300 font-mono">
              <span className="text-[#06B6D4]">7-Point Breakdown:</span> Plain language + Real judging rubric focus weights.
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#06B6D4] group-hover:translate-x-1 transition-transform">
              Decode Any Problem <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 05: AI Team Builder */}
          <div
            id="feature-card-5"
            onClick={() => setActiveTab("teams")}
            className="group cursor-pointer rounded-2xl border border-slate-800 bg-[#111827] p-6 hover:border-[#F59E0B] hover:shadow-lg hover:shadow-amber-950/40 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#F59E0B]">05</span>
              <Users className="h-5 w-5 text-[#F59E0B] group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">
              AI Team Builder & Skill Radar
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Filter student teammates by verified skills, branch, year, and role.
              Live coverage indicators ensure your squad covers Frontend, Backend, AI, and Pitching.
            </p>
            <div className="mt-4 rounded-xl bg-slate-900 p-3 border border-slate-800/80 text-[11px] text-slate-300 font-mono">
              <span className="text-[#10B981]">Coverage Matrix:</span> FE: ✓ | BE: ✓ | AI: ✓ | Pitch: ✓ | IoT: △
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#F59E0B] group-hover:translate-x-1 transition-transform">
              Assemble Elite Squad <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Card 06: Failed Hackathon Improvement System */}
          <div
            id="feature-card-6"
            onClick={() => setActiveTab("failure-improver")}
            className="group cursor-pointer rounded-2xl border border-slate-800 bg-[#111827] p-6 hover:border-[#7C3AED] hover:shadow-lg hover:shadow-violet-950/40 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#7C3AED]">06</span>
              <RotateCcw className="h-5 w-5 text-[#7C3AED] group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">
              Failed Hackathon Improvement System
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Failed once? Improve next time. Upload your previous PPT, project description, and judge
              feedback to receive a ruthless post-mortem and actionable recovery plan.
            </p>
            <div className="mt-4 rounded-xl bg-slate-900 p-3 border border-slate-800/80 text-[11px] text-slate-300 font-mono">
              <span className="text-white">Post-Mortem:</span> What Went Well, Weaknesses, Subtext of Feedback, Next Action Plan.
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#7C3AED] group-hover:translate-x-1 transition-transform">
              Analyze Failed Project <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 33: HOMEPAGE VALUE LOOP (Discover -> Understand -> Prepare -> Build -> Connect -> Improve) */}
      <section className="border-t border-slate-800/80 bg-[#0E1528] py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              The Continuous Student Growth Loop
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Every hackathon is a stepping stone to engineering mastery and career breakthroughs.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            <div className="rounded-2xl border border-slate-800 bg-[#111827] p-4 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#06B6D4]/10 text-[#06B6D4]">
                <Compass className="h-5 w-5" />
              </div>
              <h4 className="mt-3 text-xs font-bold uppercase tracking-wider text-white">DISCOVER</h4>
              <p className="mt-1 text-[11px] text-slate-400">Find opportunities that truly match you.</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#111827] p-4 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED]/10 text-[#7C3AED]">
                <Cpu className="h-5 w-5" />
              </div>
              <h4 className="mt-3 text-xs font-bold uppercase tracking-wider text-white">UNDERSTAND</h4>
              <p className="mt-1 text-[11px] text-slate-400">Turn complex problem statements into clear specs.</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#111827] p-4 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Layers className="h-5 w-5" />
              </div>
              <h4 className="mt-3 text-xs font-bold uppercase tracking-wider text-white">PREPARE</h4>
              <p className="mt-1 text-[11px] text-slate-400">Personalized milestone checklists & starter code.</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#111827] p-4 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Code2 className="h-5 w-5" />
              </div>
              <h4 className="mt-3 text-xs font-bold uppercase tracking-wider text-white">BUILD</h4>
              <p className="mt-1 text-[11px] text-slate-400">Sprint trackers and offline demo failover kits.</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#111827] p-4 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Users className="h-5 w-5" />
              </div>
              <h4 className="mt-3 text-xs font-bold uppercase tracking-wider text-white">CONNECT</h4>
              <p className="mt-1 text-[11px] text-slate-400">Find compatible teammates & experienced judges.</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#111827] p-4 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                <RotateCcw className="h-5 w-5" />
              </div>
              <h4 className="mt-3 text-xs font-bold uppercase tracking-wider text-white">IMPROVE</h4>
              <p className="mt-1 text-[11px] text-slate-400">Learn from jury feedback & previous failures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED HACKATHONS SPOTLIGHT */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
              High-Match Opportunities
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-white">
              Trending Hackathons Tailored For You
            </h2>
          </div>
          <button
            onClick={() => setActiveTab("explore")}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#06B6D4] hover:underline"
          >
            <span>View All 8 Hackathons</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredHackathons.slice(0, 3).map((hack) => (
            <div
              key={hack.id}
              className="rounded-2xl border border-slate-800 bg-[#111827] p-5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-[#7C3AED]/20 border border-[#7C3AED]/40 px-2.5 py-0.5 text-[10px] font-bold text-[#06B6D4]">
                    {hack.domain}
                  </span>
                  <span className="text-[11px] font-mono text-[#10B981] font-semibold">
                    {hack.prizePool.split(" ")[0]} Prize
                  </span>
                </div>

                <h3 className="mt-3 text-base font-bold text-white line-clamp-1">
                  {hack.title}
                </h3>
                <p className="text-xs text-slate-400">{hack.organizer}</p>

                <p className="mt-3 text-xs text-slate-300 line-clamp-2">
                  {hack.shortDesc}
                </p>

                {/* Compatibility match reason */}
                <div className="mt-4 rounded-xl bg-slate-900/90 p-2.5 border border-slate-800 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-300">Your Compatibility</span>
                    <span className="font-mono font-bold text-[#06B6D4]">{hack.matchScore || 88}%</span>
                  </div>
                  <p className="mt-1 text-slate-400 text-[10px]">
                    ✓ Matches {hack.requiredSkills.slice(0, 2).join(", ")}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center gap-2">
                <button
                  onClick={() => onOpenHackathon(hack)}
                  className="flex-1 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] py-2 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                >
                  Understand This Hackathon
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. GLOBAL FOOTER */}
      <footer className="border-t border-slate-800/80 bg-[#080C18] py-14 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] text-[#0B1020]">
                  <Cpu className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">HackVerse</span>
              </div>
              <p className="mt-3 text-xs text-slate-400 max-w-sm leading-relaxed">
                The AI-powered Student Hackathon Ecosystem.
                Discover, understand, prepare, team up, build, pitch, submit, learn, improve, and connect.
              </p>
              <div className="mt-4 text-[11px] text-slate-400">
                “Don’t just find hackathons. Build your way through them.”
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Explore</h4>
              <ul className="mt-3 space-y-2 text-xs text-slate-400">
                <li><button onClick={() => setActiveTab("explore")} className="hover:text-white">All Hackathons</button></li>
                <li><button onClick={() => setActiveTab("hackathon-os")} className="hover:text-white">Hackathon OS</button></li>
                <li><button onClick={() => setActiveTab("decoder")} className="hover:text-white">Problem Decoder</button></li>
                <li><button onClick={() => setActiveTab("teams")} className="hover:text-white">Team Builder</button></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Growth</h4>
              <ul className="mt-3 space-y-2 text-xs text-slate-400">
                <li><button onClick={() => setActiveTab("failure-improver")} className="hover:text-white">Failure Recovery</button></li>
                <li><button onClick={() => setActiveTab("mentors")} className="hover:text-white">Mentor Network</button></li>
                <li><button onClick={() => setActiveTab("journey")} className="hover:text-white">My Journey</button></li>
                <li><button onClick={() => setActiveTab("journey")} className="hover:text-white">Skill Radar</button></li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Connect & Network</h4>
              <p className="mt-2 text-xs text-slate-400">
                Join 12,000+ collegiate innovators preparing for SIH, EthIndia, and HackMIT.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-[#111827] text-slate-300 hover:text-white hover:border-slate-700"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
                <span className="text-xs text-slate-400">GitHub Verified • Open Innovation</span>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
            <div>
              © 2026 HackVerse Ecosystem. Built for ambitious student hackers.
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:text-slate-300 cursor-pointer">Privacy</span>
              <span className="hover:text-slate-300 cursor-pointer">Terms</span>
              <span className="hover:text-slate-300 cursor-pointer">Code of Conduct</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
