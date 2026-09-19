import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// Lazy Google GenAI Client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (err) {
      console.warn("Failed to initialize GoogleGenAI client:", err);
    }
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// AI Problem Decoder Endpoint
app.post("/api/ai/decode-problem", async (req, res) => {
  const { problemStatement, domain, eventTitle } = req.body;

  if (!problemStatement || typeof problemStatement !== "string") {
    res.status(400).json({ error: "Missing or invalid problemStatement" });
    return;
  }

  const ai = getGenAI();
  if (ai) {
    try {
      const prompt = `You are HACKOS Problem Decoder, an expert hackathon mentor for undergraduate students.
Analyze this hackathon problem statement and return a strict JSON object with NO markdown formatting, NO backticks.

Event: "${eventTitle || "Hackathon Challenge"}"
Domain: "${domain || "General Tech"}"
Problem Statement:
"""
${problemStatement}
"""

Return valid JSON with exactly these keys:
{
  "simpleWords": "A 2-3 sentence plain English explanation for beginners without jargon.",
  "whatTheyWant": "What the organizers/judges are actually expecting as a tangible solution.",
  "keyRequirements": ["Array of 4-6 specific functional and non-functional requirements"],
  "possibleTechnologies": {
    "frontend": ["3-4 relevant frontend techs/frameworks"],
    "backend": ["3-4 relevant backend/database techs"],
    "ai_ml_or_core": ["3-4 domain specific libraries or models"],
    "cloud_or_devops": ["2-3 deployment/hosting tools"]
  },
  "expectedOutput": "Specific deliverables needed for demo day (e.g. working MVP, live dashboard, simulated hardware feed, pitch deck).",
  "judgingFocus": [
    {"criterion": "Innovation & Novelty", "weight": "25%", "insight": "What will make judges stop and listen."},
    {"criterion": "Technical Complexity & Feasibility", "weight": "30%", "insight": "Code depth, working APIs, edge case handling."},
    {"criterion": "User Experience & Presentation", "weight": "25%", "insight": "Clean navigation, demo flow, zero-lag response."},
    {"criterion": "Impact & Market Relevance", "weight": "20%", "insight": "Real-world viability and scale potential."}
  ],
  "suggestedFirstSteps": [
    {"step": "Hour 0-2", "title": "Scope & Architecture", "desc": "Define MVP boundaries and finalize schema & API contracts."},
    {"step": "Hour 2-6", "title": "Core Engine / Data Pipeline", "desc": "Implement core algorithm/APIs before touching styling."},
    {"step": "Hour 6-14", "title": "Frontend & Integration", "desc": "Build the user flow and connect backend endpoints."},
    {"step": "Hour 14-20", "title": "Demo Polish & Seed Data", "desc": "Create robust demo accounts and zero-failure data flows."},
    {"step": "Hour 20-24", "title": "Pitch & Video Dry-Run", "desc": "Rehearse 3-minute pitch with problem, demo, and architecture."}
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text?.trim() || "";
      try {
        const parsed = JSON.parse(responseText);
        res.json({ success: true, source: "gemini", data: parsed });
        return;
      } catch (parseErr) {
        console.warn("Gemini output JSON parse failed, utilizing structured extractor", parseErr);
      }
    } catch (apiErr) {
      console.warn("Gemini API call failed, falling back to smart engine:", apiErr);
    }
  }

  // Fallback high-quality structured response
  const lower = problemStatement.toLowerCase();
  const isAI = lower.includes("ai") || lower.includes("ml") || lower.includes("predict") || lower.includes("model");
  const isHealth = lower.includes("health") || lower.includes("patient") || lower.includes("medical");
  const isWeb3 = lower.includes("web3") || lower.includes("blockchain") || lower.includes("crypto") || lower.includes("decentralized");
  const isIoT = lower.includes("iot") || lower.includes("sensor") || lower.includes("hardware") || lower.includes("drone");

  const fallbackData = {
    simpleWords: `This challenge asks your team to solve "${problemStatement.slice(0, 100)}..." by building a working prototype that automates decision-making, reduces manual intervention, and provides an intuitive dashboard for end-users.`,
    whatTheyWant: "The organizers want a functional MVP rather than just slides: a working pipeline that ingests input data, processes it via specialized logic or models, and surfaces actionable insights or alerts to users.",
    keyRequirements: [
      "Real-time or low-latency input data processing and verification",
      "Interactive role-based interface (User / Admin / Operator views)",
      "Automated alerting or recommendation trigger mechanism",
      "Clean REST or GraphQL API boundary between frontend and service logic",
      "Resilient error states and offline/fallback mock data handling"
    ],
    possibleTechnologies: {
      frontend: ["React 19 / Next.js", "Tailwind CSS", "Vite", "Lucide React", "Recharts"],
      backend: isWeb3 ? ["Solidity", "Node.js", "Ethers.js", "Express"] : ["FastAPI / Python", "Express.js", "PostgreSQL", "Redis"],
      ai_ml_or_core: isAI ? ["PyTorch / HuggingFace", "Gemini Flash API", "LangChain", "Scikit-Learn"] : (isIoT ? ["MQTT", "WebSockets", "Arduino/ESP32 logic", "InfluxDB"] : ["Docker", "BullMQ", "Zod", "Prisma"]),
      cloud_or_devops: ["Vercel / Cloud Run", "Supabase", "Docker", "Render"]
    },
    expectedOutput: "A deployed web application featuring an interactive demo dashboard, populated sample datasets for live judging walkthroughs, architecture diagram slide, and recorded 2-minute backup pitch video.",
    judgingFocus: [
      { criterion: "Innovation & Value", weight: "30%", insight: "Does your approach introduce a distinct workflow or 10x UX improvement over existing methods?" },
      { criterion: "Technical Completeness", weight: "30%", insight: "Judges verify if APIs actually fire during demo and whether calculations are genuine." },
      { criterion: "Design & Ease of Use", weight: "20%", insight: "Clean typography, intuitive layout, zero jarring UI glitches during presentation." },
      { criterion: "Pitch & Feasibility", weight: "20%", insight: "Can this scale to 10,000 users with modest cloud costs? Clear business/societal justification." }
    ],
    suggestedFirstSteps: [
      { step: "Hour 0-2", title: "Lock MVP Scope & Tech Stack", desc: "Explicitly discard secondary 'nice-to-have' features. Pick tools your team already knows." },
      { step: "Hour 2-7", title: "Build Data Schema & Core Engine", desc: "Create the core algorithm, database models, and verify API responses in Postman/Curl." },
      { step: "Hour 7-14", title: "Assemble UI & Connect Real Flow", desc: "Build UI components with high-contrast Tailwind styling and hook up live endpoints." },
      { step: "Hour 14-19", title: "Stress-Test Demo & Edge Cases", desc: "Seed realistic mock scenarios so judges never encounter an empty screen or blank chart." },
      { step: "Hour 19-24", title: "Pitch Deck & Offline Backup Video", desc: "Record a pristine screen recording in case venue WiFi drops, and rehearse timing to 2:45 min." }
    ]
  };

  res.json({ success: true, source: "fallback_engine", data: fallbackData });
});

// AI Failed Hackathon Improvement Analysis Endpoint
app.post("/api/ai/analyze-improvement", async (req, res) => {
  const { projectName, hackathonName, description, judgeFeedback, failureReason, techStack } = req.body;

  const ai = getGenAI();
  if (ai) {
    try {
      const prompt = `You are HACKOS Post-Mortem & Improvement Coach, an experienced senior hackathon judge and mentor.
Analyze this student hackathon submission that did not win or pass evaluations.
Provide constructive, actionable, high-impact feedback.
Return a strict JSON object with NO markdown formatting, NO backticks.

Project Name: "${projectName || "Previous Hackathon Project"}"
Hackathon: "${hackathonName || "National Hackathon"}"
Tech Stack: "${techStack || "Web/AI"}"
Description: "${description || "Student prototype"}"
Judge Feedback Received: "${judgeFeedback || "Not enough technical depth, demo broke, pitch was confusing"}"
Perceived Failure Reason: "${failureReason || "Time ran out before connecting frontend to backend"}"

Return valid JSON with this exact structure:
{
  "whatWentWell": ["3-4 genuine strengths of the original concept and effort"],
  "weaknesses": ["3-4 critical vulnerabilities that caused disqualification or low scoring"],
  "judgeFeedbackAnalysis": {
    "rawFeedbackSummary": "Brief recap of what judges noted",
    "whatTheyReallyMeant": "Subtext of what judges look for when they give this type of critique"
  },
  "technicalImprovements": ["3-4 specific technical architectural fixes to make this production-grade"],
  "presentationImprovements": ["3-4 tangible pitch improvements (hook, problem framing, live demo rhythm)"],
  "teamExecutionImprovements": ["3-4 team workflow upgrades (timeboxing, fallback videos, modular branches)"],
  "whatToDoDifferently": ["3 key mindsets/tactics to adopt in the next hackathon"],
  "recommendedSkills": [
    {"skill": "Skill Name", "reason": "Why this specifically solves the prior bottleneck", "estHours": "12 hrs"}
  ],
  "nextHackathonActionPlan": [
    {"phase": "Week 1: Foundations", "actions": "Sharpen architecture and pre-built templates"},
    {"phase": "Week 2: Pitch & MVP Sprint", "actions": "Practice 3-minute pitch and building an MVP in 12 hours"},
    {"phase": "Target Hackathon", "actions": "Execute modular roles, zero-latency demo, guaranteed backup recording"}
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text?.trim() || "";
      try {
        const parsed = JSON.parse(responseText);
        res.json({ success: true, source: "gemini", data: parsed });
        return;
      } catch (parseErr) {
        console.warn("Gemini post-mortem JSON parse failed:", parseErr);
      }
    } catch (apiErr) {
      console.warn("Gemini post-mortem API call failed:", apiErr);
    }
  }

  // Fallback intelligent post-mortem
  const fallbackImprovement = {
    whatWentWell: [
      "Ambitious problem selection addressing a real-world student/societal pain point.",
      "Good foundational tech stack choices that judges recognized as relevant.",
      "Clear commitment to building an end-to-end flow rather than pure mockups."
    ],
    weaknesses: [
      "Feature sprawl: Attempted to build 6 features instead of 1 pristine, undeniable core workflow.",
      "Demo fragility: Core live API call failed or lagged under poor venue WiFi without a local fallback.",
      "Weak problem framing: Spent first 90 seconds of pitch discussing general statistics instead of the user story.",
      "Unclear unit economics or scale feasibility when questioned during Q&A."
    ],
    judgeFeedbackAnalysis: {
      rawFeedbackSummary: judgeFeedback || "Lacked technical depth and demo broke during live question round.",
      whatTheyReallyMeant: "Judges see 50+ projects in 3 hours. If your demo stumbles for even 10 seconds or appears to be hardcoded, their trust evaporates immediately. They reward rock-solid simplicity over half-built complexity."
    },
    technicalImprovements: [
      "Implement client-side caching & mock toggle so the demo can run 100% offline if WiFi fails.",
      "Break monolithic code into distinct services (Ingestion -> Processing -> UI Display).",
      "Add automated seed scripts (`npm run seed`) so fresh, impressive demo data is populated instantly.",
      "Display real latency and execution metrics right inside the UI to prove genuine computation."
    ],
    presentationImprovements: [
      "Adopt the 30-Second Hook: Start immediately with a 1-sentence visceral scenario before touching slides.",
      "Show the live product within the first 60 seconds—never keep judges waiting until the last minute.",
      "Prepare a 45-second screen recording video on an iPad/laptop ready to play if live server fails.",
      "Conclude with a clear 'Why We Win' slide contrasting with existing legacy solutions."
    ],
    teamExecutionImprovements: [
      "Strict 'Feature Freeze' at T-minus 6 hours: Absolutely no new code or package installations allowed.",
      "Designate a dedicated Pitch Lead whose ONLY job for the final 6 hours is slide design and pitch delivery.",
      "Create a shared Postman/Swagger collection early so frontend and backend don't block each other."
    ],
    whatToDoDifferently: [
      "Build a 'Thinnest Slicing MVP' in the first 8 hours, then spend the rest of the hackathon polishing UX and edge cases.",
      "Interview 2 mentors during the hackathon to pressure-test your architecture before presenting to judges.",
      "Tailor your project directly to the hackathon's rubric weights."
    ],
    recommendedSkills: [
      { skill: "Storytelling & Pitch Craft", reason: "Judges evaluate communication as 25%+ of total score", estHours: "6 hrs" },
      { skill: "Docker & Container Deployment", reason: "Ensures reproducible zero-crash environments", estHours: "10 hrs" },
      { skill: "API Caching & State Management", reason: "Prevents UI freezing and latency drops in demos", estHours: "8 hrs" }
    ],
    nextHackathonActionPlan: [
      { phase: "Week 1: Template Mastery", actions: "Create a battle-tested starter repository with auth, styling, and APIs ready in 15 minutes." },
      { phase: "Week 2: Mock Hackathon Simulation", actions: "Run a 6-hour sprint with teammates building a complete MVP from scratch with timed pitch." },
      { phase: "Next Hackathon Execution", actions: "Lock MVP by hour 10, conduct 3 mentor dry-runs, and deliver an interactive presentation." }
    ]
  };

  res.json({ success: true, source: "fallback_engine", data: fallbackImprovement });
});

// AI Chatbot "HackBot" Endpoint
app.post("/api/ai/chat", async (req, res) => {
  const { message, history, context } = req.body;

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "Missing or invalid message" });
    return;
  }

  const ai = getGenAI();
  if (ai) {
    try {
      const studentContext = context?.student
        ? `Student: ${context.student.name}, Year: ${context.student.year}, Branch: ${context.student.branch}, Skills: ${context.student.skills?.join(", ")}`
        : "Student: Aarav Sharma (3rd Year CSE, Skills: Python, React, PyTorch)";
      const hackathonContext = context?.activeHackathon
        ? `Active Hackathon: ${context.activeHackathon.title} (${context.activeHackathon.domain}, Difficulty: ${context.activeHackathon.difficulty})`
        : "No active hackathon selected.";

      const systemPrompt = `You are "HackBot", the flagship AI mentor inside HackVerse (Student Hackathon Ecosystem).
Your purpose is to coach college students to successfully discover, build, team up, pitch, and win hackathons.
Current User Context:
${studentContext}
${hackathonContext}

Guidelines:
- Give concise, direct, inspiring, tactical advice (2-4 short paragraphs or actionable bullet points).
- Offer practical student advice (e.g. timeboxing, judging criteria, MVP boundaries, presentation tips).
- Tone: Encouraging, experienced, sharp, and realistic.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: [
          { role: "user", parts: [{ text: systemPrompt }] },
          { role: "model", parts: [{ text: "Understood. I am HackBot, your tactical hackathon coach. What are we building or tackling today?" }] },
          ...(history || []).slice(-6).map((h: { role: string; text: string }) => ({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.text }],
          })),
          { role: "user", parts: [{ text: message }] },
        ],
      });

      const reply = response.text || "I am ready to help you optimize your hackathon journey!";
      res.json({ success: true, reply, source: "gemini" });
      return;
    } catch (err) {
      console.warn("Gemini Chat failed, using smart fallback response:", err);
    }
  }

  // Fallback intelligent chat replies
  const lower = message.toLowerCase();
  let reply = "That's a vital question for any competitive hackathon. Here's what top winning teams do: define the MVP boundary within the first 2 hours, prioritize an interactive user experience over backend invisible complexity, and prepare an offline video demo early.";

  if (lower.includes("which hackathon") || lower.includes("choose") || lower.includes("suit")) {
    reply = "For your current profile, look for hackathons that match 70% of your current stack (like Python + React) while pushing you on 30% new territory (like Cloud deployment or Vector Search). The Smart India Hackathon and Devfolio Genesis AI Sprint are ideal right now!";
  } else if (lower.includes("prepare") || lower.includes("how should i prepare")) {
    reply = "Here is your 3-step preparation drill:\n1. **Pre-build boilerplate**: Have your React + Tailwind + database template ready so you don't spend 3 hours configuring tools.\n2. **Study past winners**: Look at top 3 submissions from last year's event to gauge the expected technical bar.\n3. **Assign clear roles**: One frontend/design lead, one backend/API lead, one AI/engine lead, and one dedicated pitch champion.";
  } else if (lower.includes("pitch") || lower.includes("presentation") || lower.includes("ppt")) {
    reply = "Top pitch formula (3 minutes total):\n- **0:00-0:30**: Relatable problem story (make judges feel the pain).\n- **0:30-1:45**: Live demo walk-through (show real inputs producing dynamic results).\n- **1:45-2:30**: Architecture, technical innovations, and edge-case handling.\n- **2:30-3:00**: Future roadmap, business viability, and thank you.";
  } else if (lower.includes("team") || lower.includes("teammate")) {
    reply = "The golden hackathon team ratio is **Hacker, Hipster, Hustler**:\n- 1-2 Builders (Clean APIs, robust logic)\n- 1 Designer/UI Specialist (Judge visual appeal is 30% of first impression)\n- 1 Pitcher/Presenter (Translates tech into clear business impact).\nCheck the **AI Team Builder** tab to see your current team skill radar!";
  } else if (lower.includes("fail") || lower.includes("lost") || lower.includes("rejected")) {
    reply = "Over 90% of hackathon finalists failed in their first 2 competitions. The #1 mistake is trying to build too many features. Head over to our **Failed Hackathon Improvement** section, paste your previous deck and judges' notes, and I'll generate a personalized recovery action plan!";
  }

  res.json({ success: true, reply, source: "smart_assistant" });
});

async function startServer() {
  // Mount Vite in development, static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`HACKOS Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
