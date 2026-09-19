import React, { useState, useEffect } from "react";
import {
  HelpCircle,
  Sparkles,
  ArrowRight,
  Cpu,
  Layers,
  CheckCircle2,
  Code2,
  Server,
  Cloud,
  FileCheck,
  Trophy,
  Clock,
  Copy,
  Check,
  RefreshCw,
  Users,
} from "lucide-react";
import { ProblemDecoderOutput, NavigationTab } from "../types";
import { decodeProblemStatement } from "../services/aiService";

interface ProblemDecoderViewProps {
  initialProblem?: string;
  initialDomain?: string;
  initialEventTitle?: string;
  setActiveTab: (tab: NavigationTab) => void;
  onOpenTeamFinderWithSkills?: (skills: string[]) => void;
}

export const ProblemDecoderView: React.FC<ProblemDecoderViewProps> = ({
  initialProblem = "",
  initialDomain = "Healthcare",
  initialEventTitle = "Smart India Hackathon 2026",
  setActiveTab,
  onOpenTeamFinderWithSkills,
}) => {
  const [problemStatement, setProblemStatement] = useState(
    initialProblem ||
      "Develop an automated digital triage system for rural PHCs (Primary Health Centers) that assists community health workers in assessing patient vitals, predicting clinical deterioration, and routing critical cases to district hospitals over low-bandwidth cellular connections with offline data resilience."
  );
  const [domain, setDomain] = useState(initialDomain);
  const [eventTitle, setEventTitle] = useState(initialEventTitle);
  const [loading, setLoading] = useState(false);
  const [decodedData, setDecodedData] = useState<ProblemDecoderOutput | null>(null);
  const [copied, setCopied] = useState(false);

  // Sync if props change
  useEffect(() => {
    if (initialProblem) {
      setProblemStatement(initialProblem);
      setDomain(initialDomain || "Healthcare");
      setEventTitle(initialEventTitle || "");
      handleDecode(initialProblem, initialDomain, initialEventTitle);
    }
  }, [initialProblem, initialDomain, initialEventTitle]);

  const handleDecode = async (textToDecode?: string, d?: string, title?: string) => {
    const text = textToDecode || problemStatement;
    if (!text.trim()) return;

    setLoading(true);
    try {
      const res = await decodeProblemStatement(text, d || domain, title || eventTitle);
      setDecodedData(res);
    } catch (err) {
      console.error("Decoder error:", err);
    } finally {
      setLoading(false);
    }
  };

  const sampleChallenges = [
    {
      title: "SIH Rural Health Triage",
      domain: "Healthcare",
      event: "Smart India Hackathon 2026",
      text: "Develop an automated digital triage system for rural PHCs (Primary Health Centers) that assists community health workers in assessing patient vitals, predicting clinical deterioration, and routing critical cases to district hospitals over low-bandwidth cellular connections with offline data resilience.",
    },
    {
      title: "Wildfire Edge AI Detection",
      domain: "Sustainability / ClimateTech",
      event: "Devfolio Genesis Sprint",
      text: "Build an edge-computed multi-sensor wildfire early warning network using low-power IoT telemetry and satellite imagery API feeds to alert forest departments within 90 seconds of thermal anomaly detection.",
    },
    {
      title: "Voice-First Micro-Savings Bot",
      domain: "FinTech",
      event: "Finovate India 2026",
      text: "Create a conversational multilingual voice banking assistant that empowers informal daily-wage earners to automatically round up small cash transactions into sovereign gold bonds or digital mutual funds without requiring smartphone literacy.",
    },
  ];

  const handleCopy = () => {
    if (!decodedData) return;
    const text = `HACKOS AI Problem Decoder Output\n\nSimple Words: ${decodedData.simpleWords}\n\nWhat They Want: ${decodedData.whatTheyWant}\n\nExpected Output: ${decodedData.expectedOutput}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-[#06B6D4]/10 border border-[#06B6D4]/30 px-2.5 py-0.5 text-xs font-semibold text-[#06B6D4]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Hackathon Deconstructor</span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white">
            Problem Decoder
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Never build the wrong thing. Deconstruct complex bureaucratic problem statements into clear
            technical specifications, hidden judge expectations, and an MVP blueprint.
          </p>
        </div>

        {/* Input Card */}
        <div className="mt-6 rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Hackathon Event (Optional)
              </label>
              <input
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="e.g. Smart India Hackathon 2026"
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-[#06B6D4]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Domain / Category
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g. Healthcare, FinTech, AI"
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-[#06B6D4]"
              />
            </div>
          </div>

          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Paste Problem Statement or Challenge Description
          </label>
          <textarea
            id="problem-statement-textarea"
            rows={4}
            value={problemStatement}
            onChange={(e) => setProblemStatement(e.target.value)}
            placeholder="Paste raw hackathon problem statement here..."
            className="mt-1.5 w-full rounded-2xl border border-slate-800 bg-slate-900 p-4 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4]"
          />

          {/* Preset Buttons */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-400">Try Sample Challenges:</span>
              {sampleChallenges.map((sc, i) => (
                <button
                  key={i}
                  id={`sample-challenge-${i}`}
                  onClick={() => {
                    setProblemStatement(sc.text);
                    setDomain(sc.domain);
                    setEventTitle(sc.event);
                    handleDecode(sc.text, sc.domain, sc.event);
                  }}
                  className="rounded-lg bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-[#06B6D4] transition-colors"
                >
                  {sc.title}
                </button>
              ))}
            </div>

            <button
              id="decode-submit-btn"
              onClick={() => handleDecode()}
              disabled={loading || !problemStatement.trim()}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-5 py-2.5 text-xs font-bold text-white shadow-lg hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Analyzing with AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Decode Problem</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {loading && (
          <div className="mt-8 rounded-3xl border border-slate-800 bg-[#111827] p-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7C3AED]/20 text-[#06B6D4] animate-pulse">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-white">Deconstructing Problem Statement...</h3>
            <p className="mt-1 text-xs text-slate-400">
              Extracting hidden organizer intent, technical requirements, stack recommendations, and judging rubrics.
            </p>
          </div>
        )}

        {decodedData && !loading && (
          <div className="mt-8 space-y-6">
            {/* Top Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-900/90 border border-slate-800 p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#10B981]" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  AI Deconstruction Complete
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-[#10B981]" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied" : "Copy Specs"}</span>
                </button>

                <button
                  onClick={() => setActiveTab("teams")}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:opacity-90"
                >
                  <Users className="h-3.5 w-3.5" />
                  <span>Find Teammates for this Stack</span>
                </button>
              </div>
            </div>

            {/* 7-Part Output Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. In Simple Words */}
              <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#06B6D4] uppercase tracking-wider">
                  <span>01</span>
                  <span>In Simple Words</span>
                </div>
                <p className="mt-3 text-sm text-slate-200 leading-relaxed">
                  {decodedData.simpleWords}
                </p>
              </div>

              {/* 2. What They Actually Want */}
              <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#7C3AED] uppercase tracking-wider">
                  <span>02</span>
                  <span>What They Actually Want</span>
                </div>
                <p className="mt-3 text-sm text-slate-200 leading-relaxed">
                  {decodedData.whatTheyWant}
                </p>
              </div>

              {/* 3. Key Requirements Checklist */}
              <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#10B981] uppercase tracking-wider">
                  <span>03</span>
                  <span>Key Technical Requirements</span>
                </div>
                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  {decodedData.keyRequirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#10B981] font-bold">✓</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4. Expected Output */}
              <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#F59E0B] uppercase tracking-wider">
                  <span>04</span>
                  <span>Expected Deliverable & Demo Form</span>
                </div>
                <p className="mt-3 text-sm text-slate-200 leading-relaxed">
                  {decodedData.expectedOutput}
                </p>
              </div>
            </div>

            {/* 5. Suggested Technologies */}
            <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#06B6D4] uppercase tracking-wider mb-4">
                <span>05</span>
                <span>Possible & Recommended Technologies</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-xl bg-slate-900 p-3.5 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Code2 className="h-4 w-4 text-[#06B6D4]" />
                    <span>Frontend</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    {decodedData.possibleTechnologies.frontend.map((t) => (
                      <div key={t} className="text-xs text-slate-300">
                        • {t}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-slate-900 p-3.5 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Server className="h-4 w-4 text-[#7C3AED]" />
                    <span>Backend</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    {decodedData.possibleTechnologies.backend.map((t) => (
                      <div key={t} className="text-xs text-slate-300">
                        • {t}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-slate-900 p-3.5 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Cpu className="h-4 w-4 text-emerald-400" />
                    <span>AI / ML / Core</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    {decodedData.possibleTechnologies.ai_ml_or_core.map((t) => (
                      <div key={t} className="text-xs text-slate-300">
                        • {t}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-slate-900 p-3.5 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Cloud className="h-4 w-4 text-amber-400" />
                    <span>Cloud / Hardware</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    {decodedData.possibleTechnologies.cloud_or_devops.map((t) => (
                      <div key={t} className="text-xs text-slate-300">
                        • {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Judging Focus & 7. Suggested First Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Judging Focus */}
              <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#F59E0B] uppercase tracking-wider mb-4">
                  <span>06</span>
                  <span>Judging Focus & Rubric Alignment</span>
                </div>
                <div className="space-y-3">
                  {decodedData.judgingFocus.map((jf, idx) => (
                    <div key={idx} className="rounded-xl bg-slate-900 p-3 border border-slate-800">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-white">{jf.criterion}</span>
                        <span className="font-mono text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-0.5 rounded border border-[#06B6D4]/20">
                          {jf.weight}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">{jf.insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7. Suggested First Steps */}
              <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#10B981] uppercase tracking-wider mb-4">
                  <span>07</span>
                  <span>Suggested 24-Hour Execution Steps</span>
                </div>
                <div className="space-y-3">
                  {decodedData.suggestedFirstSteps.map((step, idx) => (
                    <div key={idx} className="rounded-xl bg-slate-900 p-3 border border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-[#10B981] bg-emerald-500/10 px-2 py-0.5 rounded">
                          {step.step}
                        </span>
                        <h4 className="text-xs font-bold text-white">{step.title}</h4>
                      </div>
                      <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">{step.desc}</p>
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
