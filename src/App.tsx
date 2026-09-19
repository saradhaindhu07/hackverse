/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  INITIAL_STUDENT_PROFILE,
  HACKATHONS_DATA,
  DEMO_STUDENT_PROFILES,
  MENTORS_DATA,
  MENTOR_EXPERIENCE_STORIES,
  SAMPLE_NOTIFICATIONS,
  MY_JOURNEY_ITEMS,
} from "./data/mockData";
import { NavigationTab, StudentProfile, Hackathon, NotificationItem } from "./types";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./components/LandingPage";
import { ExploreHackathons } from "./components/ExploreHackathons";
import { HackathonOSView } from "./components/HackathonOSView";
import { ProblemDecoderView } from "./components/ProblemDecoderView";
import { TeamBuilderView } from "./components/TeamBuilderView";
import { FailureImproverView } from "./components/FailureImproverView";
import { MentorConnectView } from "./components/MentorConnectView";
import { MyJourneyDashboard } from "./components/MyJourneyDashboard";
import { HackBotChat } from "./components/HackBotChat";
import { SearchModal } from "./components/SearchModal";
import { ProfileModal } from "./components/ProfileModal";
import { OnboardingModal } from "./components/OnboardingModal";
import { Award, Sparkles, CheckCircle2 } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>("home");
  const [student, setStudent] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [hackathons, setHackathons] = useState<Hackathon[]>(HACKATHONS_DATA);
  const [activeHackathon, setActiveHackathon] = useState<Hackathon>(HACKATHONS_DATA[0]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(SAMPLE_NOTIFICATIONS);

  // Problem decoder transition state
  const [decoderParams, setDecoderParams] = useState<{
    problem: string;
    domain?: string;
    eventTitle?: string;
  }>({
    problem: "",
    domain: "",
    eventTitle: "",
  });

  // Modals state
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  // Gamification XP Toast state
  const [xpToast, setXpToast] = useState<{ visible: boolean; amount: number; message: string }>({
    visible: false,
    amount: 0,
    message: "",
  });

  const handleUpdateXP = (earnedXP: number, reason: string) => {
    setStudent((prev) => {
      const newXP = prev.xp + earnedXP;
      let newLevel: "Explorer" | "Builder" | "Innovator" | "Hacker" | "Mentor" = prev.level;
      if (newXP >= 2000) newLevel = "Mentor";
      else if (newXP >= 1500) newLevel = "Hacker";
      else if (newXP >= 1000) newLevel = "Innovator";
      else if (newXP >= 500) newLevel = "Builder";

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
      };
    });

    setXpToast({ visible: true, amount: earnedXP, message: reason });
    setTimeout(() => {
      setXpToast({ visible: false, amount: 0, message: "" });
    }, 3500);
  };

  const handleOpenHackathon = (hackathon: Hackathon) => {
    setActiveHackathon(hackathon);
    setActiveTab("hackathon-os");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDecodeProblem = (problemDesc: string, domain?: string, eventTitle?: string) => {
    setDecoderParams({ problem: problemDesc, domain, eventTitle });
    setActiveTab("decoder");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenTeamFinder = (hackathonId: string) => {
    setActiveTab("teams");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleUpdateProfile = (updated: Partial<StudentProfile>) => {
    setStudent((prev) => ({ ...prev, ...updated }));
  };

  const handleOnboardingComplete = (
    interests: string[],
    experience: string,
    goals: string[]
  ) => {
    setStudent((prev) => ({
      ...prev,
      interests,
      xp: prev.xp + 150,
    }));
    handleUpdateXP(150, "Completed Ecosystem Personalization");
    setActiveTab("explore");
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-[#F8FAFC] font-sans selection:bg-[#7C3AED] selection:text-white">
      {/* Top Global Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        student={student}
        notifications={notifications}
        markNotificationAsRead={markNotificationAsRead}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenProfile={() => setProfileOpen(true)}
        onOpenOnboarding={() => setOnboardingOpen(true)}
      />

      {/* Main Content Area */}
      <main className="pb-16">
        {activeTab === "home" && (
          <LandingPage
            setActiveTab={setActiveTab}
            onOpenHackathon={handleOpenHackathon}
            featuredHackathons={hackathons}
            student={student}
          />
        )}

        {activeTab === "explore" && (
          <ExploreHackathons
            hackathons={hackathons}
            student={student}
            onOpenHackathon={handleOpenHackathon}
            onStartHackathonOS={handleOpenHackathon}
          />
        )}

        {activeTab === "hackathon-os" && (
          <HackathonOSView
            hackathon={activeHackathon}
            student={student}
            onDecodeProblem={handleDecodeProblem}
            onOpenTeamFinder={handleOpenTeamFinder}
            onUpdateXP={handleUpdateXP}
          />
        )}

        {activeTab === "decoder" && (
          <ProblemDecoderView
            initialProblem={decoderParams.problem}
            initialDomain={decoderParams.domain}
            initialEventTitle={decoderParams.eventTitle}
            setActiveTab={setActiveTab}
            onOpenTeamFinderWithSkills={() => setActiveTab("teams")}
          />
        )}

        {activeTab === "teams" && (
          <TeamBuilderView
            currentStudent={student}
            availableStudents={DEMO_STUDENT_PROFILES}
          />
        )}

        {activeTab === "failure-improver" && (
          <FailureImproverView setActiveTab={setActiveTab} />
        )}

        {activeTab === "mentors" && (
          <MentorConnectView
            mentors={MENTORS_DATA}
            stories={MENTOR_EXPERIENCE_STORIES}
          />
        )}

        {activeTab === "journey" && (
          <MyJourneyDashboard
            student={student}
            activeHackathons={hackathons}
            journeyItems={MY_JOURNEY_ITEMS}
            setActiveTab={setActiveTab}
            onOpenHackathon={handleOpenHackathon}
          />
        )}
      </main>

      {/* Floating Context-Aware AI HackBot */}
      <HackBotChat student={student} activeHackathon={activeHackathon} />

      {/* Quick Search Modal (⌘K) */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        hackathons={hackathons}
        mentors={MENTORS_DATA}
        onSelectHackathon={handleOpenHackathon}
        setActiveTab={setActiveTab}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        student={student}
        onUpdateProfile={handleUpdateProfile}
      />

      {/* Onboarding Preferences Modal */}
      <OnboardingModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        student={student}
        onComplete={handleOnboardingComplete}
      />

      {/* Gamification XP Toast Notification */}
      {xpToast.visible && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-3 rounded-2xl border border-amber-500/40 bg-[#111827] px-4 py-3 shadow-2xl shadow-amber-500/10 animate-in fade-in slide-in-from-top-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-[#F59E0B]">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-white">
              <span>+{xpToast.amount} Hackathon XP</span>
              <Sparkles className="h-3.5 w-3.5 text-[#06B6D4]" />
            </div>
            <p className="text-[11px] text-slate-400">{xpToast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

