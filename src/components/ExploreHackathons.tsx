import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Calendar,
  Users,
  Trophy,
  MapPin,
  Sparkles,
  ArrowRight,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Hackathon, StudentProfile } from "../types";
import { computeOpportunityMatch } from "../services/aiService";

interface ExploreHackathonsProps {
  hackathons: Hackathon[];
  student: StudentProfile;
  onOpenHackathon: (hackathon: Hackathon) => void;
  onStartHackathonOS: (hackathon: Hackathon) => void;
}

export const ExploreHackathons: React.FC<ExploreHackathonsProps> = ({
  hackathons,
  student,
  onOpenHackathon,
  onStartHackathonOS,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedParticipation, setSelectedParticipation] = useState<string>("All");
  const [selectedMode, setSelectedMode] = useState<string>("All");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const categories = ["All", "Technical", "Non-Technical", "Creative", "Business", "Research"];
  const domains = [
    "All",
    "AI/ML",
    "Web Development",
    "Cybersecurity",
    "Robotics",
    "IoT",
    "FinTech",
    "BioTech",
    "Sustainability",
  ];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];
  const participationTypes = ["All", "Individual", "Team"];
  const modes = ["All", "Online", "Offline", "Hybrid"];

  // Filter hackathons
  const filteredHackathons = useMemo(() => {
    return hackathons.filter((h) => {
      const matchesSearch =
        searchQuery === "" ||
        h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === "All" || h.category === selectedCategory;
      const matchesDomain = selectedDomain === "All" || h.domain === selectedDomain;
      const matchesDiff = selectedDifficulty === "All" || h.difficulty === selectedDifficulty;
      const matchesPart = selectedParticipation === "All" || h.participation === selectedParticipation;
      const matchesMode = selectedMode === "All" || h.mode === selectedMode;

      return matchesSearch && matchesCat && matchesDomain && matchesDiff && matchesPart && matchesMode;
    });
  }, [hackathons, searchQuery, selectedCategory, selectedDomain, selectedDifficulty, selectedParticipation, selectedMode]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedDomain("All");
    setSelectedDifficulty("All");
    setSelectedParticipation("All");
    setSelectedMode("All");
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedDomain !== "All" ||
    selectedDifficulty !== "All" ||
    selectedParticipation !== "All" ||
    selectedMode !== "All" ||
    searchQuery !== "";

  return (
    <div className="min-h-screen bg-[#0B1020] px-4 py-8 sm:px-6 lg:px-8 text-[#F8FAFC]">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-md bg-[#7C3AED]/20 border border-[#7C3AED]/40 px-2.5 py-0.5 text-xs font-semibold text-[#06B6D4]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Intelligent Hackathon Directory</span>
            </div>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white">
              Explore Hackathons
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Discover opportunities that align with your verified skills and strategic learning goals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-[#111827] px-4 py-2.5 text-xs font-medium text-slate-300 md:hidden hover:border-slate-700"
            >
              <SlidersHorizontal className="h-4 w-4 text-[#06B6D4]" />
              <span>Filters {hasActiveFilters && "•"}</span>
            </button>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-[#06B6D4] hover:underline flex items-center gap-1"
              >
                <X className="h-3.5 w-3.5" /> Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6 relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-5 w-5 text-[#06B6D4]" />
          </div>
          <input
            type="text"
            id="explore-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hackathons, competitions, domains, required skills (e.g. Python, AI, Smart India)..."
            className="w-full rounded-2xl border border-slate-800 bg-[#111827] pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-400 focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] outline-none shadow-inner"
          />
        </div>

        {/* Filters Section */}
        <div className={`mt-6 space-y-4 ${showFiltersMobile ? "block" : "hidden md:block"}`}>
          {/* Domain Filter Pills */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Domain / Track
            </div>
            <div className="flex flex-wrap gap-1.5">
              {domains.map((dom) => (
                <button
                  key={dom}
                  id={`filter-domain-${dom.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setSelectedDomain(dom)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                    selectedDomain === dom
                      ? "bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-sm font-semibold"
                      : "border border-slate-800 bg-[#111827] text-slate-300 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  {dom}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Filter Row: Category, Difficulty, Mode */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Category
              </label>
              <select
                id="filter-category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-[#111827] px-3 py-2 text-xs text-slate-200 outline-none focus:border-[#06B6D4]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Difficulty
              </label>
              <select
                id="filter-difficulty-select"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-[#111827] px-3 py-2 text-xs text-slate-200 outline-none focus:border-[#06B6D4]"
              >
                {difficulties.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Participation
              </label>
              <select
                id="filter-participation-select"
                value={selectedParticipation}
                onChange={(e) => setSelectedParticipation(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-[#111827] px-3 py-2 text-xs text-slate-200 outline-none focus:border-[#06B6D4]"
              >
                {participationTypes.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Format / Mode
              </label>
              <select
                id="filter-mode-select"
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-[#111827] px-3 py-2 text-xs text-slate-200 outline-none focus:border-[#06B6D4]"
              >
                {modes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-8 flex items-center justify-between text-xs text-slate-400">
          <span>
            Showing <strong className="text-white">{filteredHackathons.length}</strong> matching hackathons
          </span>
          <span className="hidden sm:inline">
            Ranked by AI Compatibility with <strong>{student.name}</strong>
          </span>
        </div>

        {/* Hackathon Cards Grid */}
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredHackathons.map((hackathon) => {
            const match = computeOpportunityMatch(student, hackathon);

            return (
              <div
                key={hackathon.id}
                id={`hackathon-card-${hackathon.id}`}
                className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-[#111827] p-5 hover:border-slate-700 hover:shadow-xl hover:shadow-cyan-950/20 transition-all duration-200 group"
              >
                {/* Card Top */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={hackathon.logo}
                        alt={hackathon.organizer}
                        className="h-10 w-10 rounded-xl object-cover ring-1 ring-slate-700"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-[#7C3AED]/20 border border-[#7C3AED]/40 px-2 py-0.5 text-[10px] font-bold text-[#06B6D4]">
                            {hackathon.domain}
                          </span>
                          <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-medium text-slate-300">
                            {hackathon.mode}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-slate-400 line-clamp-1">{hackathon.organizer}</p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        hackathon.difficulty === "Beginner"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : hackathon.difficulty === "Intermediate"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {hackathon.difficulty}
                    </span>
                  </div>

                  <h3 className="mt-3.5 text-base font-bold text-white group-hover:text-[#06B6D4] transition-colors line-clamp-1">
                    {hackathon.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {hackathon.shortDesc}
                  </p>

                  {/* Key Meta row: Prize, Team size, Deadline */}
                  <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-900/80 p-2.5 border border-slate-800/80 text-xs">
                    <div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Trophy className="h-3 w-3 text-amber-400" />
                        <span>Prize Pool</span>
                      </div>
                      <div className="font-bold text-[#10B981] truncate">
                        {hackathon.prizePool.split(" ")[0]}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Users className="h-3 w-3 text-[#06B6D4]" />
                        <span>Team Size</span>
                      </div>
                      <div className="font-bold text-slate-200">
                        {hackathon.teamSizeMin === hackathon.teamSizeMax
                          ? `${hackathon.teamSizeMin} members`
                          : `${hackathon.teamSizeMin}–${hackathon.teamSizeMax} members`}
                      </div>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {hackathon.requiredSkills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded bg-slate-800/60 px-2 py-0.5 text-[10px] font-medium text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                    {hackathon.requiredSkills.length > 3 && (
                      <span className="rounded bg-slate-800/40 px-1.5 py-0.5 text-[10px] text-slate-400">
                        +{hackathon.requiredSkills.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Explainable Compatibility Section */}
                  <div className="mt-3 rounded-xl border border-slate-800 bg-[#0B1020]/90 p-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-[#06B6D4]" />
                        Compatibility
                      </span>
                      <span className="font-mono font-bold text-[#06B6D4]">
                        {match.score}% Match
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400 line-clamp-1">
                      {match.verdict}
                    </p>
                  </div>
                </div>

                {/* Card Actions: Understand first, Start OS */}
                <div className="mt-5 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2">
                  <button
                    id={`understand-btn-${hackathon.id}`}
                    onClick={() => onOpenHackathon(hackathon)}
                    className="rounded-xl border border-slate-700 bg-slate-800/70 py-2 text-xs font-semibold text-slate-200 hover:border-slate-600 hover:text-white transition-all text-center"
                  >
                    Understand
                  </button>

                  <button
                    id={`start-os-btn-${hackathon.id}`}
                    onClick={() => onStartHackathonOS(hackathon)}
                    className="rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] py-2 text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity text-center flex items-center justify-center gap-1"
                  >
                    <span>Start OS</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredHackathons.length === 0 && (
          <div className="mt-12 rounded-2xl border border-slate-800 bg-[#111827] p-12 text-center">
            <Cpu className="mx-auto h-10 w-10 text-slate-500" />
            <h3 className="mt-3 text-lg font-bold text-white">No hackathons found</h3>
            <p className="mt-1 text-xs text-slate-400">
              Try widening your filters or search terms.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-[#06B6D4] hover:bg-slate-700"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
