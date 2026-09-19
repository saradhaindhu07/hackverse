import {
  ProblemDecoderOutput,
  ImprovementAnalysisOutput,
  StudentProfile,
  Hackathon,
} from "../types";

export async function decodeProblemStatement(
  problemStatement: string,
  domain?: string,
  eventTitle?: string
): Promise<ProblemDecoderOutput> {
  try {
    const res = await fetch("/api/ai/decode-problem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problemStatement, domain, eventTitle }),
    });
    if (!res.ok) {
      throw new Error(`Decoder API error: ${res.status}`);
    }
    const data = await res.json();
    if (data.data) {
      return data.data;
    }
    throw new Error("Invalid response format");
  } catch (err) {
    console.warn("Falling back to local smart problem decoder:", err);
    // Client fallback
    const lower = problemStatement.toLowerCase();
    const isHealth = lower.includes("health") || lower.includes("patient") || lower.includes("medic");
    const isCyber = lower.includes("security") || lower.includes("attack") || lower.includes("scada");

    return {
      simpleWords: `This challenge asks your team to solve "${problemStatement.slice(0, 110)}..." by building a resilient prototype that automates triage/action, minimizes manual overhead, and gives end users instant visibility.`,
      whatTheyWant:
        "Judges are searching for an end-to-end working pipeline instead of static slide decks: real data intake, intelligent transformation via specialized logic, and an intuitive actionable user interface.",
      keyRequirements: [
        "Low-latency input processing with input sanitization and verification",
        "Role-based responsive dashboard (Admin / Specialist / Field Operator)",
        "Automated event or anomaly alerting engine",
        "Clean decoupling between frontend interface and backend service contracts",
        "Resilient offline-fallback handling to guarantee demo survivability"
      ],
      possibleTechnologies: {
        frontend: ["React 19 / Next.js", "Tailwind CSS", "Lucide React", "Motion"],
        backend: isCyber ? ["Go / Rust", "Python FastAPI", "eBPF Probes"] : ["Python FastAPI", "Node.js / Express", "PostgreSQL", "Redis"],
        ai_ml_or_core: isHealth ? ["PyTorch", "ONNX Web / TFLite", "FastAPI"] : ["Gemini Flash API", "Scikit-Learn", "Vector Search (Qdrant)"],
        cloud_or_devops: ["Docker", "Vercel / Cloud Run", "Supabase", "IndexedDB"]
      },
      expectedOutput:
        "A live interactive web dashboard with populated sample scenarios, offline failure protection, modular API layer, and an executive 3-minute pitch deck.",
      judgingFocus: [
        { criterion: "Innovation & Distinct Advantage", weight: "30%", insight: "Does this introduce a noticeable UX or workflow upgrade over existing legacy software?" },
        { criterion: "Technical Completeness", weight: "30%", insight: "Judges verify whether APIs actually trigger during live evaluation without smoke-and-mirrors." },
        { criterion: "Design Polish & Clarity", weight: "20%", insight: "High-contrast layout, responsive controls, zero visual clutter during demo." },
        { criterion: "Market Scalability & Pitch", weight: "20%", insight: "Can this deploy at university/city scale with predictable infrastructure overhead?" }
      ],
      suggestedFirstSteps: [
        { step: "Hour 0-2", title: "Lock MVP Scope & Boundaries", desc: "Explicitly discard secondary 'nice-to-have' features. Agree on strict API schemas." },
        { step: "Hour 2-7", title: "Build Core Engine & Schema", desc: "Write backend data contracts and verify endpoint responses via curl/Postman." },
        { step: "Hour 7-14", title: "Assemble UI & Connect Real Flow", desc: "Build views with Tailwind styling and hook up real endpoint state." },
        { step: "Hour 14-19", title: "Stress-Test Demo & Seed Data", desc: "Seed 30 realistic test accounts so judges never see empty tables." },
        { step: "Hour 19-24", title: "Pitch Deck & Offline Backup Video", desc: "Record a 90-second backup video in case venue WiFi stumbles on stage." }
      ]
    };
  }
}

export async function analyzeFailedHackathon(data: {
  projectName: string;
  hackathonName: string;
  techStack: string;
  description: string;
  judgeFeedback: string;
  failureReason: string;
}): Promise<ImprovementAnalysisOutput> {
  try {
    const res = await fetch("/api/ai/analyze-improvement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Improvement API error: ${res.status}`);
    }
    const json = await res.json();
    if (json.data) {
      return json.data;
    }
    throw new Error("Invalid response format");
  } catch (err) {
    console.warn("Falling back to local smart improvement analysis:", err);
    return {
      whatWentWell: [
        "Bold problem selection addressing an authentic student or societal bottleneck.",
        "Good foundational stack choices recognized as industry-standard.",
        "Commendable ambition in attempting an end-to-end full stack architecture."
      ],
      weaknesses: [
        "Feature sprawl: Attempted 5 complex sub-features instead of 1 flawless core flow.",
        "Fragile live demo: The live server or API lagged under poor auditorium network conditions.",
        "Delayed live demonstration: Spent the first 2 minutes on slides before showing code.",
        "Unclear unit economics and scale limits when pressed by technical jury members."
      ],
      judgeFeedbackAnalysis: {
        rawFeedbackSummary: data.judgeFeedback || "Lacked technical depth and demo broke during live question round.",
        whatTheyReallyMeant: "Judges review dozens of projects in a single afternoon. If a demo hesitates or appears hardcoded, jury confidence plunges. They strongly reward rock-solid execution over ambitious half-finished complexity."
      },
      technicalImprovements: [
        "Implement a DEMO_MODE toggle that loads realistic pre-cached datasets if WiFi collapses.",
        "Decouple heavy calculation jobs from the main UI thread with asynchronous progress indicators.",
        "Provide an automated seed button (`npm run seed`) to reload demo state between judge visits in 1 second.",
        "Surface live execution metrics (latency, payload size, model confidence) directly on-screen."
      ],
      presentationImprovements: [
        "Adopt the 30-Second Hook: Open directly with a 1-sentence visceral scenario before touching slides.",
        "Show the live product within the first 45 seconds of your pitch.",
        "Prepare an unedited 60-second screen recording on an iPad/phone as an emergency backup.",
        "Conclude with an explicit 'Why Our Solution Beats the Alternatives' competitive slide."
      ],
      teamExecutionImprovements: [
        "Strict Feature Freeze at T-minus 6 hours: Absolutely no new packages or structural changes allowed.",
        "Designate a dedicated Pitch Champion whose only focus after Hour 24 is slide design and timing.",
        "Document an API contract in Hour 1 to prevent backend/frontend blocking."
      ],
      whatToDoDifferently: [
        "Build a 'Thinnest Slicing MVP' by Hour 8, leaving 20+ hours for UX polish and rehearsing.",
        "Pressure-test architecture with 2 roaming hackathon mentors around Hour 12.",
        "Map your project milestones directly against the official judging criteria weights."
      ],
      recommendedSkills: [
        { skill: "Venture Storytelling & Pitch Craft", reason: "Presentation and articulation directly control 25%+ of total score", estHours: "6 hrs" },
        { skill: "Docker & Container Deployment", reason: "Eliminates 'it worked on my machine' demo failures", estHours: "10 hrs" },
        { skill: "Offline State Management & PWA Caching", reason: "Guarantees your app loads instantly in offline auditoriums", estHours: "8 hrs" }
      ],
      nextHackathonActionPlan: [
        { phase: "Week 1: Starter Boilerplate", actions: "Assemble a battle-tested repository with auth, styling, and database ready in 15 minutes." },
        { phase: "Week 2: Mock Hackathon Simulation", actions: "Run a 6-hour sprint with teammates building a complete MVP from scratch with a timed pitch." },
        { phase: "Next Hackathon Sprint", actions: "Enforce feature freeze at Hour 30, conduct 2 mentor dry-runs, and deliver an interactive presentation." }
      ]
    };
  }
}

export async function askHackBot(
  message: string,
  history: { role: string; text: string }[],
  context: { student?: StudentProfile; activeHackathon?: Hackathon | null }
): Promise<string> {
  try {
    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history, context }),
    });
    if (!res.ok) {
      throw new Error(`Chat API error: ${res.status}`);
    }
    const json = await res.json();
    return json.reply || "I am ready to help you optimize your hackathon journey!";
  } catch (err) {
    console.warn("Falling back to local smart chat:", err);
    const lower = message.toLowerCase();
    if (lower.includes("which hackathon") || lower.includes("choose")) {
      return "For your current profile, look for hackathons that match 70% of your stack (like Python + React) while pushing you on 30% new ground (like Edge AI or Cloud deployment). Smart India Hackathon and Devfolio Genesis AI Sprint are ideal right now!";
    }
    if (lower.includes("prepare") || lower.includes("how")) {
      return "Here is your 3-step preparation drill:\n1. **Pre-build your boilerplate**: Have your React + Tailwind + database template ready so you don't waste 3 hours setting up dependencies.\n2. **Study past winners**: Review previous winning submissions to gauge the expected technical bar.\n3. **Assign clear roles**: One frontend/UI lead, one backend/API lead, one AI/engine lead, and one dedicated pitch champion.";
    }
    if (lower.includes("pitch") || lower.includes("presentation") || lower.includes("ppt")) {
      return "Top 3-Minute Hackathon Pitch Formula:\n- **0:00-0:30**: Relatable problem story (make judges feel the urgency).\n- **0:30-1:45**: Live demo walk-through (show real inputs producing dynamic results).\n- **1:45-2:30**: Architecture, technical innovations, and edge-case handling.\n- **2:30-3:00**: Future roadmap, business viability, and thank you.";
    }
    if (lower.includes("team") || lower.includes("teammate")) {
      return "The golden hackathon team ratio is **Hacker, Hipster, Hustler**:\n- 1-2 Builders (Clean APIs, robust logic)\n- 1 Designer/UI Specialist (Judge visual appeal is 30% of first impression)\n- 1 Pitcher/Presenter (Translates tech into clear business impact).\nCheck the **AI Team Builder** tab to see your current team skill coverage!";
    }
    return "The most critical advice for winning hackathons is: define a strict MVP boundary in the first 2 hours, enforce a feature freeze at Hour 30, and always build an offline mock toggle so venue WiFi never ruins your live demo!";
  }
}

export function computeOpportunityMatch(
  student: StudentProfile,
  hackathon: Hackathon
): {
  score: number;
  skillsMatch: string[];
  interestMatch: string[];
  skillGaps: string[];
  verdict: string;
} {
  const studentSkillNames = student.skills.map((s) => s.name.toLowerCase());
  const required = hackathon.requiredSkills;

  const matchedSkills: string[] = [];
  const gaps: string[] = [];

  for (const req of required) {
    const isMatched = studentSkillNames.some((s) => s.includes(req.toLowerCase()) || req.toLowerCase().includes(s));
    if (isMatched) {
      matchedSkills.push(req);
    } else {
      gaps.push(req);
    }
  }

  const interestMatch = student.interests.filter(
    (i) => i.toLowerCase().includes(hackathon.domain.toLowerCase()) || hackathon.domain.toLowerCase().includes(i.toLowerCase())
  );

  const skillCoveragePercent = required.length > 0 ? (matchedSkills.length / required.length) * 70 : 50;
  const interestBonus = interestMatch.length > 0 ? 25 : 10;
  const finalScore = Math.min(98, Math.max(45, Math.round(skillCoveragePercent + interestBonus)));

  let verdict = "Solid match! You have the primary stack needed.";
  if (finalScore >= 85) {
    verdict = `Outstanding match (${finalScore}%)! Your ${matchedSkills.slice(0, 2).join(" & ")} skills provide a dominant head-start.`;
  } else if (finalScore >= 70) {
    verdict = `Good match (${finalScore}%). You cover core requirements but need support in ${gaps.slice(0, 1).join(", ")}.`;
  } else {
    verdict = `Challenging match (${finalScore}%). Pair with a specialist in ${gaps.slice(0, 2).join(", ")} via Team Builder.`;
  }

  return {
    score: finalScore,
    skillsMatch: matchedSkills,
    interestMatch: interestMatch.length > 0 ? interestMatch : [hackathon.domain],
    skillGaps: gaps,
    verdict,
  };
}
