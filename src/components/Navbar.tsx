import React, { useState } from "react";
import {
  Sparkles,
  Compass,
  Cpu,
  Users,
  GraduationCap,
  TrendingUp,
  LayoutDashboard,
  Bell,
  Search,
  Menu,
  X,
  Award,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
} from "lucide-react";
import { NavigationTab, StudentProfile, NotificationItem } from "../types";

interface NavbarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  student: StudentProfile;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  onOpenOnboarding: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  student,
  notifications,
  markNotificationAsRead,
  onOpenSearch,
  onOpenProfile,
  onOpenOnboarding,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "home", label: "Home", icon: Sparkles },
    { id: "explore", label: "Explore", icon: Compass },
    { id: "hackathon-os", label: "Hackathon OS", icon: Cpu },
    { id: "decoder", label: "Problem Decoder", icon: HelpCircle },
    { id: "teams", label: "Teams", icon: Users },
    { id: "mentors", label: "Mentors", icon: GraduationCap },
    { id: "failure-improver", label: "Improve", icon: RotateCcw },
    { id: "journey", label: "My Journey", icon: TrendingUp },
    { id: "journey", label: "Dashboard", icon: LayoutDashboard },
  ];

  // deduplicate for desktop pills
  const mainNavItems = [
    { id: "home" as NavigationTab, label: "Home" },
    { id: "explore" as NavigationTab, label: "Explore" },
    { id: "hackathon-os" as NavigationTab, label: "Hackathon OS" },
    { id: "decoder" as NavigationTab, label: "Decoder" },
    { id: "teams" as NavigationTab, label: "Teams" },
    { id: "mentors" as NavigationTab, label: "Mentors" },
    { id: "failure-improver" as NavigationTab, label: "Improve" },
    { id: "journey" as NavigationTab, label: "Dashboard" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0B1020]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div
          id="hackverse-logo-button"
          onClick={() => setActiveTab("home")}
          className="flex cursor-pointer items-center gap-3 group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] p-0.5 shadow-lg shadow-[#7C3AED]/20 transition-transform duration-200 group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0B1020]">
              <Cpu className="h-5 w-5 text-[#06B6D4]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white">HackVerse</span>
              <span className="rounded bg-[#7C3AED]/20 px-1.5 py-0.5 text-[10px] font-semibold text-[#06B6D4] border border-[#7C3AED]/40">
                v2.4
              </span>
            </div>
            <p className="hidden text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:block">
              Student Hackathon Ecosystem
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-slate-800 bg-[#111827]/80 p-1 shadow-inner">
          {mainNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-md shadow-[#7C3AED]/25 font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Section Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button */}
          <button
            id="nav-search-button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-[#111827] px-2.5 py-1.5 text-xs text-slate-400 hover:border-slate-700 hover:text-white transition-colors"
            title="Search hackathons, mentors, and challenges"
          >
            <Search className="h-4 w-4 text-[#06B6D4]" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400 md:inline font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              id="nav-notifications-button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-[#111827] text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#06B6D4] text-[10px] font-bold text-[#0B1020] animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Panel */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-800 bg-[#111827] p-4 shadow-2xl shadow-black/80 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-[#06B6D4]" />
                    <span className="text-sm font-semibold text-white">Live Updates</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {unreadCount} unread
                  </span>
                </div>

                <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`cursor-pointer rounded-xl p-2.5 transition-all ${
                        n.read
                          ? "bg-slate-900/50 hover:bg-slate-900 text-slate-400"
                          : "bg-slate-800/80 hover:bg-slate-800 border-l-2 border-[#06B6D4] text-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-300 line-clamp-2">{n.message}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <button
                    onClick={() => onOpenOnboarding()}
                    className="text-[#06B6D4] hover:underline"
                  >
                    Reset Onboarding
                  </button>
                  <button
                    onClick={() => setActiveTab("journey")}
                    className="flex items-center gap-1 text-[#7C3AED] hover:text-violet-400"
                  >
                    View All Tasks <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Gamification XP Badge */}
          <div
            id="nav-xp-badge"
            onClick={onOpenProfile}
            className="hidden sm:flex cursor-pointer items-center gap-2 rounded-xl border border-slate-800 bg-[#111827] px-3 py-1.5 hover:border-[#7C3AED]/60 transition-colors"
            title="Your Hackathon XP & Level"
          >
            <Award className="h-4 w-4 text-[#F59E0B]" />
            <div className="text-left">
              <div className="text-[10px] uppercase font-semibold text-slate-400">
                {student.level}
              </div>
              <div className="text-xs font-bold text-[#F8FAFC]">
                {student.xp} <span className="text-[10px] text-[#06B6D4]">XP</span>
              </div>
            </div>
          </div>

          {/* Student Profile Avatar */}
          <button
            id="nav-profile-button"
            onClick={onOpenProfile}
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-[#111827] p-1 sm:px-2.5 sm:py-1.5 hover:border-slate-700 transition-colors"
          >
            <img
              src={student.avatar}
              alt={student.name}
              className="h-7 w-7 rounded-lg object-cover ring-1 ring-[#7C3AED]"
              referrerPolicy="no-referrer"
            />
            <span className="hidden sm:inline text-xs font-medium text-slate-200">
              {student.name.split(" ")[0]}
            </span>
          </button>

          {/* Mobile Hamburger Menu Button */}
          <button
            id="nav-mobile-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-[#111827] text-slate-300 hover:text-white lg:hidden"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-[#0B1020] px-4 py-4 lg:hidden animate-in fade-in">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={`${item.id}-${idx}`}
                  id={`mobile-nav-${item.id}-${idx}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium text-left ${
                    isActive
                      ? "bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-semibold"
                      : "bg-[#111827] text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-[#F59E0B]" />
              <span className="text-xs text-slate-300">
                {student.level}: <span className="font-bold text-white">{student.xp} XP</span>
              </span>
            </div>
            <button
              onClick={() => {
                onOpenOnboarding();
                setMobileMenuOpen(false);
              }}
              className="text-xs text-[#06B6D4] hover:underline"
            >
              Preferences
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
