import React, { useState, useMemo } from "react";
import {
  Users,
  Search,
  Plus,
  Check,
  Award,
  Sparkles,
  AlertTriangle,
  Github,
  Linkedin,
  ShieldCheck,
  CheckCircle2,
  X,
  MessageSquare,
  ArrowRight,
  Target,
} from "lucide-react";
import { StudentProfile, TeamMember } from "../types";

interface TeamBuilderViewProps {
  currentStudent: StudentProfile;
  availableStudents: StudentProfile[];
  onOpenProfile?: (student: StudentProfile) => void;
}

export const TeamBuilderView: React.FC<TeamBuilderViewProps> = ({
  currentStudent,
  availableStudents,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  // Active Squad state: includes the logged in student by default
  const [activeSquad, setActiveSquad] = useState<StudentProfile[]>([
    currentStudent,
    availableStudents[0], // Pre-seed Arun for high engagement demo
  ]);

  const roles = ["All", "Full Stack Dev", "AI/ML Engineer", "UI/UX Designer", "Pitch Specialist", "IoT / Hardware", "Backend Architect"];
  const filterSkills = ["All", "Python", "React", "Node.js", "Figma", "Pitching", "IoT", "TensorFlow", "FastAPI"];
  const years = ["All", "2nd Year", "3rd Year", "4th Year"];

  // Filtered student list
  const filteredStudents = useMemo(() => {
    return availableStudents.filter((s) => {
      const matchesSearch =
        searchQuery === "" ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.currentRole && s.currentRole.toLowerCase().includes(searchQuery.toLowerCase())) ||
        s.skills.some((sk) => sk.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRole =
        selectedRole === "All" ||
        (s.currentRole && s.currentRole.toLowerCase().includes(selectedRole.toLowerCase()));
      const matchesSkill = selectedSkill === "All" || s.skills.some((sk) => sk.name.toLowerCase() === selectedSkill.toLowerCase());
      const matchesYear = selectedYear === "All" || s.year === selectedYear;

      return matchesSearch && matchesRole && matchesSkill && matchesYear;
    });
  }, [availableStudents, searchQuery, selectedRole, selectedSkill, selectedYear]);

  // Compute live team coverage
  const teamCoverage = useMemo(() => {
    const allSkills = activeSquad.flatMap((member) => member.skills.map((s) => s.name.toLowerCase()));
    const allRoles = activeSquad.map((m) => (m.currentRole || "").toLowerCase());

    const hasFrontend = allSkills.some((s) => s.includes("react") || s.includes("frontend") || s.includes("vue") || s.includes("tailwind"));
    const hasBackend = allSkills.some((s) => s.includes("node") || s.includes("fastapi") || s.includes("python") || s.includes("postgres") || s.includes("sql"));
    const hasAI = allSkills.some((s) => s.includes("pytorch") || s.includes("tensorflow") || s.includes("ai") || s.includes("gemini") || s.includes("machine learning"));
    const hasDesign = allSkills.some((s) => s.includes("figma") || s.includes("ui/ux") || s.includes("design") || allRoles.some((r) => r.includes("design")));
    const hasPitch = allSkills.some((s) => s.includes("pitch") || s.includes("public speaking") || s.includes("storytelling") || allRoles.some((r) => r.includes("pitch")));
    const hasHardware = allSkills.some((s) => s.includes("iot") || s.includes("arduino") || s.includes("esp32") || s.includes("raspberry"));

    const items = [
      { name: "Frontend / UI Client", covered: hasFrontend, weight: "20%" },
      { name: "Backend / Database APIs", covered: hasBackend, weight: "20%" },
      { name: "AI / Machine Learning", covered: hasAI, weight: "20%" },
      { name: "UI/UX & Visual Polish", covered: hasDesign, weight: "15%" },
      { name: "Pitching & Jury Storytelling", covered: hasPitch, weight: "25%" },
      { name: "Hardware & Edge IoT", covered: hasHardware, weight: "Bonus" },
    ];

    const coveredPoints = items.filter((i) => i.covered).length;
    const totalScore = Math.min(100, Math.round((coveredPoints / 5) * 100));

    return { items, totalScore };
  }, [activeSquad]);

  const toggleSquadMember = (student: StudentProfile) => {
    if (activeSquad.some((m) => m.id === student.id)) {
      if (student.id === currentStudent.id) return; // cannot remove self
      setActiveSquad((prev) => prev.filter((m) => m.id !== student.id));
    } else {
      if (activeSquad.length >= 6) {
        alert("Maximum team size is 6 members.");
        return;
      }
      setActiveSquad((prev) => [...prev, student]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="border-b border-slate-800 pb-6">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-[#F59E0B]/10 border border-[#F59E0B]/30 px-2.5 py-0.5 text-xs font-semibold text-[#F59E0B]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Multi-Disciplinary Team Builder</span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white">
            AI Team Builder & Skill Radar
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Never lose because of missing roles. Assemble a balanced squad with verified coverage across
            Frontend, Backend, AI models, UI/UX design, and presentation storytelling.
          </p>
        </div>

        {/* ACTIVE SQUAD & COVERAGE RADAR */}
        <div className="mt-6 rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#06B6D4]" />
                <h2 className="text-lg font-bold text-white">Your Active Team Squad</h2>
                <span className="rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/30 px-2.5 py-0.5 text-xs font-bold text-[#06B6D4]">
                  {activeSquad.length}/6 Members
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Add or remove potential collaborators to dynamically test team skill coverage.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-2xl font-extrabold text-[#10B981]">
                  {teamCoverage.totalScore}%
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">
                  Squad Readiness
                </div>
              </div>
            </div>
          </div>

          {/* Members in active squad */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {activeSquad.map((m) => {
              const isSelf = m.id === currentStudent.id;
              return (
                <div
                  key={m.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/90 p-3.5 flex items-center justify-between gap-3 relative"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={m.avatar}
                      alt={m.name}
                      className="h-9 w-9 rounded-xl object-cover ring-1 ring-[#7C3AED]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate flex items-center gap-1">
                        {m.name} {isSelf && <span className="text-[10px] text-[#06B6D4]">(You)</span>}
                      </div>
                      <div className="text-[11px] text-[#06B6D4] truncate">{m.currentRole || "Builder"}</div>
                    </div>
                  </div>

                  {!isSelf && (
                    <button
                      onClick={() => toggleSquadMember(m)}
                      className="text-slate-400 hover:text-red-400 p-1 rounded-lg hover:bg-slate-800"
                      title="Remove from squad"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Live Skill Coverage Matrix */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Live Team Skill Coverage Matrix
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {teamCoverage.items.map((item) => (
                <div
                  key={item.name}
                  className={`rounded-xl p-3 border text-xs transition-all ${
                    item.covered
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : "bg-slate-900 border-slate-800 text-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{item.name}</span>
                    {item.covered ? (
                      <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                    ) : (
                      <span className="text-[10px] font-mono text-amber-400">Missing</span>
                    )}
                  </div>
                  <div className="mt-1 text-[10px] text-slate-400">
                    Jury Weight: {item.weight}
                  </div>
                </div>
              ))}
            </div>

            {teamCoverage.totalScore < 80 && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 text-xs text-amber-300">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>
                  <strong>Tip:</strong> Teams with at least one designated UI Designer and Pitch Specialist score
                  significantly higher during live jury questions.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* CANDIDATE BROWSER SECTION */}
        <div className="mt-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Browse Available Teammates</h2>
              <p className="text-xs text-slate-400">
                Students actively looking for teams for upcoming hackathons.
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by skill, college, name..."
                className="w-full rounded-xl border border-slate-800 bg-[#111827] pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-[#06B6D4]"
              />
            </div>
          </div>

          {/* Filters row */}
          <div className="mt-4 flex flex-wrap gap-2">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="rounded-xl border border-slate-800 bg-[#111827] px-3 py-1.5 text-xs text-slate-300 outline-none"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  Role: {r}
                </option>
              ))}
            </select>

            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="rounded-xl border border-slate-800 bg-[#111827] px-3 py-1.5 text-xs text-slate-300 outline-none"
            >
              {filterSkills.map((sk) => (
                <option key={sk} value={sk}>
                  Skill: {sk}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="rounded-xl border border-slate-800 bg-[#111827] px-3 py-1.5 text-xs text-slate-300 outline-none"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  Year: {y}
                </option>
              ))}
            </select>
          </div>

          {/* Student Cards Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((candidate) => {
              const inSquad = activeSquad.some((m) => m.id === candidate.id);

              return (
                <div
                  key={candidate.id}
                  className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                    inSquad
                      ? "border-[#06B6D4] bg-slate-900/90 shadow-md shadow-cyan-950/20"
                      : "border-slate-800 bg-[#111827] hover:border-slate-700"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={candidate.avatar}
                          alt={candidate.name}
                          className="h-12 w-12 rounded-2xl object-cover ring-2 ring-[#7C3AED]/40"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h3 className="text-sm font-bold text-white">{candidate.name}</h3>
                          <p className="text-xs text-[#06B6D4] font-medium">{candidate.currentRole || "Builder"}</p>
                          <p className="text-[10px] text-slate-400">{candidate.college}</p>
                        </div>
                      </div>

                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                        {candidate.year}
                      </span>
                    </div>

                    <p className="mt-3 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {candidate.bio}
                    </p>

                    {/* Stats Pill */}
                    <div className="mt-3 flex items-center gap-3 text-xs text-slate-400 bg-slate-900/70 p-2 rounded-xl border border-slate-800/80">
                      <div>
                        <strong className="text-white">{candidate.hackathonsParticipated}</strong> Hackathons
                      </div>
                      <div>•</div>
                      <div>
                        <strong className="text-[#F59E0B]">{candidate.wins}</strong> Wins
                      </div>
                      <div>•</div>
                      <div>
                        <strong className="text-[#06B6D4]">{candidate.xp}</strong> XP
                      </div>
                    </div>

                    {/* Skills badges */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 4).map((sk) => (
                        <span
                          key={sk.name}
                          className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300"
                        >
                          {sk.name}
                        </span>
                      ))}
                      {candidate.skills.length > 4 && (
                        <span className="rounded bg-slate-800/50 px-1.5 py-0.5 text-[10px] text-slate-400">
                          +{candidate.skills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center gap-2">
                    <button
                      onClick={() => toggleSquadMember(candidate)}
                      className={`flex-1 rounded-xl py-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        inSquad
                          ? "bg-slate-800 text-slate-300 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/40"
                          : "bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white hover:opacity-90 shadow-sm"
                      }`}
                    >
                      {inSquad ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#10B981]" />
                          <span>In Your Squad</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3.5 w-3.5" />
                          <span>Add to Active Squad</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
