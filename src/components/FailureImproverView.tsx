import React, { useState } from "react";
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Trophy,
  Copy,
  Check,
  Code2,
  Layers,
  ChevronRight,
} from "lucide-react";
import { ImprovementAnalysisOutput, NavigationTab } from "../types";
import { analyzeFailedHackathon } from "../services/aiService";

interface FailureImproverViewProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const FailureImproverView: React.FC<FailureImproverViewProps> = ({ setActiveTab }) => {
  const [projectName, setProjectName] = useState("HealthPulse AI");
  const [hackathonName, setHackathonName] = useState("Smart India Hackathon 2025");
  const [techStack, setTechStack] = useState("React, Node.js, Python Flask, MongoDB, Mediapipe");
  const [description, setDescription] = useState(
    "A computer vision patient triage kiosk that detects vitals from webcam feeds and generates instant triage tokens for district hospitals."
  );
  const [judgeFeedback, setJudgeFeedback] = useState(
    "Judges asked about medical accuracy validation and when we tried to show the webcam vital detection, the auditorium lighting caused the model to throw exceptions."
  );
  const [failureReason, setFailureReason] = useState(
    "Live demo lagged and crashed during lighting change; judges said business moat was unclear."
  );

  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ImprovementAnalysisOutput | null>(null);
  const [copied, setCopied] = useState(false);

  const samplePresets = [
    {
      name: "HealthPulse AI",
      event: "Smart India Hackathon 2025",
      stack: "React, Node.js, Python Flask, MongoDB, Mediapipe",
      desc: "Computer vision patient triage kiosk detecting vitals from webcam feed.",
      feedback: "Model threw exceptions due to auditorium lighting. Jury questioned clinical accuracy.",
      reason: "Live demo crashed; spent 3 minutes on slides before opening the prototype.",
    },
    {
      name: "AgriSense LoRa",
      event: "Devfolio Hardware Sprint",
      stack: "ESP32, LoRaWAN, Next.js, FastAPI, InfluxDB",
      desc: "Soil moisture and nutrient telemetry nodes for dryland farmers.",
      feedback: "Hardware disconnected from local gateway during judge walk-by. Juries didn't wait.",
      reason: "No offline fallback mock dataset. When gateway failed, screen was blank.",
    },
    {
      name: "CampusConnect",
      event: "HackVerse NITK",
      stack: "Flutter, Firebase, Algolia",
      desc: "Peer-to-peer textbook and lab equipment sharing marketplace.",
      feedback: "Jury asked 'Why wouldn't students just use WhatsApp groups?' We had no good answer.",
      reason: "No competitive moat or unique technical innovation.",
    },
  ];

  const handleAnalyze = async (presetData?: typeof samplePresets[0]) => {
    const pName = presetData ? presetData.name : projectName;
    const hName = presetData ? presetData.event : hackathonName;
    const tStack = presetData ? presetData.stack : techStack;
    const desc = presetData ? presetData.desc : description;
    const fback = presetData ? presetData.feedback : judgeFeedback;
    const reason = presetData ? presetData.reason : failureReason;

    setLoading(true);
    try {
      const res = await analyzeFailedHackathon({
        projectName: pName,
        hackathonName: hName,
        techStack: tStack,
        description: desc,
        judgeFeedback: fback,
        failureReason: reason,
      });
      setAnalysis(res);
    } catch (err) {
      console.error("Post-mortem error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyReport = () => {
    if (!analysis) return;
    const summary = `HackVerse Post-Mortem Report for ${projectName} (${hackathonName})\n\nJudge Feedback Subtext:\n${analysis.judgeFeedbackAnalysis.whatTheyReallyMeant}\n\nKey Technical Improvements:\n${analysis.technicalImprovements.join("\n")}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="border-b border-slate-800 pb-6">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-[#7C3AED]/20 border border-[#7C3AED]/40 px-2.5 py-0.5 text-xs font-semibold text-[#06B6D4]">
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Failure Recovery & Growth System</span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white">
            Failed Once? Improve Next Time.
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Rejection is only wasted effort if you repeat the same mistakes. Input your previous hackathon
            project details to receive a ruthless post-mortem and battle-tested recovery plan.
          </p>
        </div>

        {/* Input Form Card */}
        <div className="mt-6 rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Project Post-Mortem Details
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-400">Load Sample:</span>
              {samplePresets.map((preset, idx) => (
                <button
                  key={idx}
                  id={`failure-preset-${idx}`}
                  onClick={() => {
                    setProjectName(preset.name);
                    setHackathonName(preset.event);
                    setTechStack(preset.stack);
                    setDescription(preset.desc);
                    setJudgeFeedback(preset.feedback);
                    setFailureReason(preset.reason);
                    handleAnalyze(preset);
                  }}
                  className="rounded-lg bg-slate-800 hover:bg-slate-700 px-2 py-0.5 text-[11px] font-medium text-[#06B6D4] transition-colors"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Project Name
              </label>
              <input
                type="text"
                id="failure-project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. HealthPulse AI"
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-[#7C3AED]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Hackathon Name & Edition
              </label>
              <input
                type="text"
                id="failure-hackathon-name"
                value={hackathonName}
                onChange={(e) => setHackathonName(e.target.value)}
                placeholder="e.g. Smart India Hackathon 2025"
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-[#7C3AED]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Tech Stack Used
              </label>
              <input
                type="text"
                id="failure-tech-stack"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                placeholder="e.g. React, Node.js, Python Flask, MongoDB, OpenCV"
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-[#7C3AED]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                What did you build? (Description & MVP Scope)
              </label>
              <textarea
                rows={2}
                id="failure-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-[#7C3AED]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Judges' Verbal Feedback or Rejection Email
              </label>
              <textarea
                rows={2}
                id="failure-judge-feedback"
                value={judgeFeedback}
                onChange={(e) => setJudgeFeedback(e.target.value)}
                placeholder="What did they say? (e.g. 'Good idea, but demo broke')"
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-[#7C3AED]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Why do you think it failed? (Your perspective)
              </label>
              <textarea
                rows={2}
                id="failure-perceived-reason"
                value={failureReason}
                onChange={(e) => setFailureReason(e.target.value)}
                placeholder="e.g. Ran out of time, poor pitch, WiFi disconnect..."
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-[#7C3AED]"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              id="analyze-failure-btn"
              onClick={() => handleAnalyze()}
              disabled={loading || !projectName.trim()}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-6 py-2.5 text-xs font-bold text-white shadow-lg hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Generating Deep Post-Mortem...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Analyze My Hackathon & Generate Action Plan</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading placeholder */}
        {loading && (
          <div className="mt-8 rounded-3xl border border-slate-800 bg-[#111827] p-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7C3AED]/20 text-[#06B6D4] animate-pulse">
              <RotateCcw className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-white">
              Deconstructing Jury Reactions & Demo Failure Points...
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Generating tailored presentation upgrades, architecture hardening, and next hackathon roadmap.
            </p>
          </div>
        )}

        {/* ANALYSIS RESULTS */}
        {analysis && !loading && (
          <div className="mt-8 space-y-6">
            {/* Header banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-900/90 border border-slate-800 p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#10B981]" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Post-Mortem Blueprint Generated
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyReport}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-[#10B981]" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied" : "Copy Report"}</span>
                </button>

                <button
                  onClick={() => setActiveTab("hackathon-os")}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-90"
                >
                  <span>Apply to Active Hackathon OS</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Grid 1: What Went Well vs Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#10B981] uppercase tracking-wider">
                  <span>01</span>
                  <span>What Went Well (Your Foundation)</span>
                </div>
                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  {analysis.whatWentWell.map((w, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#10B981] font-bold">✓</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
                  <span>02</span>
                  <span>Critical Bottlenecks & Weaknesses</span>
                </div>
                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  {analysis.weaknesses.map((weak, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{weak}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Box 3: Judge Feedback Subtext Deconstruction */}
            <div className="rounded-2xl border border-[#7C3AED]/40 bg-gradient-to-r from-[#7C3AED]/15 via-[#111827] to-[#06B6D4]/15 p-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#06B6D4] uppercase tracking-wider mb-2">
                <span>03</span>
                <span>Judge Feedback Deconstruction (What They Really Meant)</span>
              </div>
              <div className="mt-3 rounded-xl bg-slate-900/90 p-4 border border-slate-800">
                <div className="text-xs text-slate-400 font-mono">
                  Reported Feedback: “{analysis.judgeFeedbackAnalysis.rawFeedbackSummary}”
                </div>
                <div className="mt-3 text-sm text-slate-200 font-medium leading-relaxed border-t border-slate-800 pt-3">
                  <strong className="text-[#06B6D4]">The Unspoken Reality:</strong>{" "}
                  {analysis.judgeFeedbackAnalysis.whatTheyReallyMeant}
                </div>
              </div>
            </div>

            {/* Grid 4: Technical, Presentation & Team Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#06B6D4] uppercase tracking-wider">
                  <span>04</span>
                  <span>Technical Upgrades</span>
                </div>
                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  {analysis.technicalImprovements.map((ti, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#06B6D4]">▸</span>
                      <span>{ti}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#F59E0B] uppercase tracking-wider">
                  <span>05</span>
                  <span>Presentation Upgrades</span>
                </div>
                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  {analysis.presentationImprovements.map((pi, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#F59E0B]">▸</span>
                      <span>{pi}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#7C3AED] uppercase tracking-wider">
                  <span>06</span>
                  <span>Team Execution Upgrades</span>
                </div>
                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  {analysis.teamExecutionImprovements.map((ei, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#7C3AED]">▸</span>
                      <span>{ei}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Box 5: Recommended Skills & Your Action Plan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skills to Learn */}
              <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#10B981] uppercase tracking-wider mb-4">
                  <span>07</span>
                  <span>Recommended Skills to Master Next</span>
                </div>
                <div className="space-y-3">
                  {analysis.recommendedSkills.map((sk, idx) => (
                    <div key={idx} className="rounded-xl bg-slate-900 p-3 border border-slate-800">
                      <div className="flex items-center justify-between text-xs font-bold text-white">
                        <span>{sk.skill}</span>
                        <span className="text-[10px] font-mono text-[#10B981] bg-emerald-500/10 px-2 py-0.5 rounded">
                          {sk.estHours}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">{sk.reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Plan */}
              <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#06B6D4] uppercase tracking-wider mb-4">
                  <span>08</span>
                  <span>Your Next Hackathon Action Plan</span>
                </div>
                <div className="space-y-3">
                  {analysis.nextHackathonActionPlan.map((step, idx) => (
                    <div key={idx} className="rounded-xl bg-slate-900 p-3 border border-slate-800">
                      <span className="text-[10px] font-mono font-bold text-[#06B6D4] uppercase">
                        {step.phase}
                      </span>
                      <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                        {step.actions}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
