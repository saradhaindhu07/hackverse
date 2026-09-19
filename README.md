# HackVerse — AI-Powered Student Hackathon Ecosystem

> **“Don’t just find hackathons. Build your way through them.”**

**HackVerse** is an AI-powered student platform designed to navigate the complete hackathon lifecycle:  
**Discover → Understand → Prepare → Team Up → Build → Pitch → Submit → Learn → Improve → Connect**

---

## 🚀 Key Modules & Capabilities

- **🎯 Hackathon Discovery & AI Match Scoring**: Filterable directory across domains (AI/ML, Web, FinTech, IoT, BioTech) with personalized compatibility scores calculated against the student's verified skills, highlighting strategic skill gaps and teammate recommendations.
- **🧠 Problem Statement Decoder**: Deconstructs official challenge briefs into plain English, clearly differentiates core requirements from optional features, recommends optimized full-stack tech stacks, and flags jury evaluation criteria.
- **🛠️ Hackathon OS Workspace**: Interactive sprint tracker covering registration, Git repository setup, offline failover strategies, 36-hour sprint milestones, and XP gamification rewards.
- **👥 Squad Builder & Skill Radar**: Real-time multi-role squad visualizer mapping Frontend, Backend, AI/ML, Design, Hardware, and Pitch coverage with instant balance ratings and talent discovery across engineering institutions.
- **📈 Post-Mortem & Failure Improver**: Diagnostic engine analyzing past hackathon rejections, translating judge feedback subtext into actionable technical pivots, and generating a 4-week project resurrection roadmap.
- **🤝 Mentor Network & Experience Debriefs**: Direct connection to verified podium winners and mentors alongside authentic student post-mortems highlighting venue WiFi lessons, architecture decisions, and pitch delivery strategies.
- **🤖 HackBot AI Co-Pilot**: Floating, context-aware AI assistant equipped with preset strategy prompts, quick search (`⌘K`), ecosystem personalization onboarding, and a student profile modal.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide React
- **Build Tool**: Vite 8, `tsx`, `esbuild`
- **Backend / API**: Express 4, Node.js (with secure server-side API proxying)
- **AI Integration**: Google Gemini API (`@google/genai` TypeScript SDK)

---

## 📂 Project Structure

```
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore configuration
├── index.html                # HTML entry point with metadata tags
├── metadata.json             # Applet metadata configuration
├── package.json              # Dependencies and build scripts
├── server.ts                 # Full-stack Express server + Gemini proxy routes
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite build configuration
├── src/
│   ├── main.tsx              # React DOM entry point
│   ├── App.tsx               # Main application router and state management
│   ├── index.css             # Tailwind styling definitions
│   ├── types.ts              # TypeScript interfaces and shared types
│   ├── components/           # UI Component library
│   │   ├── Navbar.tsx        # Navigation header with XP & notifications
│   │   ├── LandingPage.tsx   # Hero section & core feature tour
│   │   ├── ExploreHackathons.tsx # Hackathon discovery & filters
│   │   ├── HackathonOSView.tsx # 7-stage workspace & countdown timers
│   │   ├── ProblemDecoderView.tsx # AI challenge brief analyzer
│   │   ├── TeamBuilderView.tsx # Squad coverage radar & builder directory
│   │   ├── FailureImproverView.tsx # Post-mortem diagnostic engine
│   │   ├── MentorConnectView.tsx # Mentor network & experience stories
│   │   ├── MyJourneyDashboard.tsx # Student dashboard & skill radar
│   │   ├── HackBotChat.tsx   # Context-aware floating AI co-pilot
│   │   ├── SearchModal.tsx   # Quick search modal (⌘K)
│   │   ├── ProfileModal.tsx  # Student profile editor
│   │   └── OnboardingModal.tsx # Student preference wizard
│   ├── data/
│   │   └── mockData.ts       # Realistic Indian college student & hackathon data
│   └── services/
│       └── aiService.ts      # Client-side API caller to /api/* endpoints
```

---

## 💻 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/hackverse.git
cd hackverse
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the project root:
```bash
cp .env.example .env
```

Add your Google Gemini API key:
```env
GEMINI_API_KEY="your-gemini-api-key-here"
```
*(You can obtain a free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey))*

### 4. Start the development server
```bash
npm run dev
```
The application will start on `http://localhost:3000`.

---

## 🏗️ Production Build

To compile both client and backend bundles:
```bash
npm run build
```

To run the production build:
```bash
npm start
```

---

## 📤 How to Export to GitHub from Google AI Studio

You can export this project directly to GitHub in two ways:

### Method A: Using Google AI Studio Export (Recommended)
1. In the top-right corner of the Google AI Studio Build workspace, click on the **Settings** / **Options** menu (gear or three-dots icon).
2. Select **Export to GitHub** (or **Download ZIP**).
3. Connect your GitHub account and select or create the target repository.

### Method B: Manual Git CLI Push
If you downloaded the ZIP or want to push via terminal:
```bash
git init
git add .
git commit -m "feat: Initial commit for HackVerse"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hackverse.git
git push -u origin main
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
