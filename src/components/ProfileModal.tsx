import React, { useState } from "react";
import {
  User,
  Github,
  Linkedin,
  Globe,
  Award,
  Trophy,
  X,
  Check,
  Plus,
  Sparkles,
} from "lucide-react";
import { StudentProfile } from "../types";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  student,
  onUpdateProfile,
}) => {
  const [name, setName] = useState(student.name);
  const [role, setRole] = useState(student.currentRole || "AI Full Stack Dev");
  const [college, setCollege] = useState(student.college);
  const [github, setGithub] = useState(student.githubUrl || "");
  const [linkedin, setLinkedin] = useState(student.linkedinUrl || "");
  const [bio, setBio] = useState(student.bio);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name,
      currentRole: role,
      college,
      githubUrl: github,
      linkedinUrl: linkedin,
      bio,
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-slate-800 bg-[#111827] p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src={student.avatar}
              alt={student.name}
              className="h-12 w-12 rounded-2xl object-cover ring-2 ring-[#7C3AED]"
              referrerPolicy="no-referrer"
            />
            <div>
              <h2 className="text-lg font-bold text-white">{student.name}</h2>
              <p className="text-xs text-[#06B6D4] font-medium">{student.level}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Stats strip */}
        <div className="mt-4 grid grid-cols-3 gap-3 rounded-2xl bg-slate-900/80 p-3 text-center border border-slate-800">
          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400">Total XP</div>
            <div className="text-sm font-bold text-[#F59E0B]">{student.xp}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400">Hackathons</div>
            <div className="text-sm font-bold text-white">{student.hackathonsParticipated}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-semibold text-slate-400">Wins</div>
            <div className="text-sm font-bold text-[#10B981]">{student.wins}</div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-[#06B6D4]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Primary Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-[#06B6D4]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                College / University
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-[#06B6D4]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                GitHub Handle / URL
              </label>
              <input
                type="text"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-[#06B6D4]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                LinkedIn URL
              </label>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white outline-none focus:border-[#06B6D4]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Bio & Hackathon Ambitions
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs text-white outline-none focus:border-[#06B6D4]"
              />
            </div>
          </div>

          {/* Current Skills list */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Verified Skills
            </label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {student.skills.map((s) => (
                <span
                  key={s.name}
                  className="rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-slate-300"
                >
                  {s.name} ({s.level}%)
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-5 py-2 text-xs font-bold text-white shadow-md hover:opacity-90"
            >
              {saved ? (
                <>
                  <Check className="h-4 w-4 text-[#10B981]" />
                  <span>Profile Saved!</span>
                </>
              ) : (
                <span>Save Profile Changes</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
