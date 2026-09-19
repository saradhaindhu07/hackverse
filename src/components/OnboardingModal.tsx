import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Check,
  Cpu,
  Trophy,
  Users,
  Code2,
  Briefcase,
  X,
} from "lucide-react";
import { StudentProfile } from "../types";

interface OnboardingModalProps {
  student: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (updatedInterests: string[], experience: string, goals: string[]) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  student,
  isOpen,
  onClose,
  onComplete,
}) => {
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(student.interests);
  const [selectedExperience, setSelectedExperience] = useState<string>("Intermediate");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    "Win competitions & cash prizes",
    "Build real projects for portfolio",
  ]);

  if (!isOpen) return null;

  const interestOptions = [
    "AI & Machine Learning",
    "Web Development",
    "Cybersecurity",
    "Robotics & IoT",
    "FinTech",
    "Healthcare & BioTech",
    "Sustainability & ClimateTech",
    "UI/UX Design",
    "Business & Venture Pitching",
  ];

  const experienceOptions = [
    {
      level: "Beginner",
      desc: "New to hackathons. Looking to learn how sprints work and make my first submission.",
    },
    {
      level: "Intermediate",
      desc: "Participated in 1–3 hackathons. Want to win podium finishes and improve my pitch.",
    },
    {
      level: "Advanced / Winner",
      desc: "Regular finalist or winner. Looking for elite teammates and high-stakes national events.",
    },
  ];

  const goalOptions = [
    "Learn industry-grade skills",
    "Build real projects for portfolio",
    "Win competitions & cash prizes",
    "Find reliable teammates",
    "Connect with experienced mentors",
    "Get job/internship opportunities",
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleFinish = () => {
    onComplete(selectedInterests, selectedExperience, selectedGoals);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-3xl border border-slate-800 bg-[#111827] p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full ${
                s <= step ? "bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]" : "bg-slate-800"
              }`}
            />
          ))}
        </div>

        {/* STEP 1: WELCOME */}
        {step === 1 && (
          <div className="text-center py-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] text-white shadow-lg shadow-[#7C3AED]/30">
              <Cpu className="h-8 w-8 text-white" />
            </div>
            <h2 className="mt-5 text-2xl font-extrabold text-white">
              Welcome to HackVerse
            </h2>
            <p className="mt-2 text-sm text-[#06B6D4] font-medium">
              “Don’t just find hackathons. Build your way through them.”
            </p>
            <p className="mt-4 text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Let's tailor your HackVerse experience. We'll calibrate your opportunity recommendations,
              highlight strategic skill gaps, and match you with compatible teammates.
            </p>

            <button
              onClick={() => setStep(2)}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-6 py-3 text-xs font-bold text-white shadow-lg hover:opacity-90"
            >
              <span>Personalize My Ecosystem</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* STEP 2: INTERESTS */}
        {step === 2 && (
          <div>
            <span className="text-xs font-mono font-bold text-[#06B6D4] uppercase">
              Step 02 of 04
            </span>
            <h2 className="mt-1 text-xl font-bold text-white">What are you interested in?</h2>
            <p className="mt-1 text-xs text-slate-400">
              Select the domains and tracks you want to compete or build in.
            </p>

            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {interestOptions.map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`rounded-xl p-3 text-left border text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-[#7C3AED]/20 border-[#06B6D4] text-white"
                        : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{interest}</span>
                      {isSelected && <Check className="h-3.5 w-3.5 text-[#06B6D4] shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-5 py-2 text-xs font-bold text-white shadow-sm hover:opacity-90"
              >
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: EXPERIENCE LEVEL */}
        {step === 3 && (
          <div>
            <span className="text-xs font-mono font-bold text-[#06B6D4] uppercase">
              Step 03 of 04
            </span>
            <h2 className="mt-1 text-xl font-bold text-white">What's your experience level?</h2>
            <p className="mt-1 text-xs text-slate-400">
              This calibrates problem complexity and checklist difficulty.
            </p>

            <div className="mt-5 space-y-3">
              {experienceOptions.map((opt) => {
                const isSelected = selectedExperience === opt.level;
                return (
                  <div
                    key={opt.level}
                    onClick={() => setSelectedExperience(opt.level)}
                    className={`cursor-pointer rounded-2xl p-4 border transition-all ${
                      isSelected
                        ? "bg-[#7C3AED]/20 border-[#06B6D4] text-white shadow-md"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{opt.level}</h4>
                      {isSelected && <Check className="h-4 w-4 text-[#06B6D4]" />}
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{opt.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-5 py-2 text-xs font-bold text-white shadow-sm hover:opacity-90"
              >
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: GOALS */}
        {step === 4 && (
          <div>
            <span className="text-xs font-mono font-bold text-[#06B6D4] uppercase">
              Step 04 of 04
            </span>
            <h2 className="mt-1 text-xl font-bold text-white">What do you want to achieve?</h2>
            <p className="mt-1 text-xs text-slate-400">
              Select what matters most to you in your hackathon journey.
            </p>

            <div className="mt-5 space-y-2.5">
              {goalOptions.map((goal) => {
                const isSelected = selectedGoals.includes(goal);
                return (
                  <div
                    key={goal}
                    onClick={() => toggleGoal(goal)}
                    className={`cursor-pointer rounded-xl p-3 border text-xs font-medium flex items-center justify-between transition-all ${
                      isSelected
                        ? "bg-[#7C3AED]/20 border-[#06B6D4] text-white"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <span>{goal}</span>
                    {isSelected && <Check className="h-4 w-4 text-[#06B6D4]" />}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(3)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-6 py-2.5 text-xs font-bold text-white shadow-lg hover:opacity-90"
              >
                <span>Enter HackVerse Workspace</span>
                <Sparkles className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
