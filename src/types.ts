export type NavigationTab =
  | "home"
  | "explore"
  | "hackathon-os"
  | "decoder"
  | "teams"
  | "mentors"
  | "failure-improver"
  | "journey"
  | "profile";

export interface HackathonSkill {
  name: string;
  category: "Languages" | "Frameworks" | "AI/ML" | "Cloud" | "Hardware" | "Soft Skills";
}

export interface HackathonProblemStatement {
  id: string;
  title: string;
  domain: string;
  description: string;
  expectedOutput: string;
}

export interface JudgingCriterion {
  criterion: string;
  weight: number;
  description: string;
}

export interface HackathonStep {
  step: number;
  title: string;
  description: string;
  badge: string;
}

export interface PrepChecklistItem {
  id: string;
  text: string;
  category: "Understand" | "Team" | "Tech & MVP" | "Pitch & Demo" | "Submit";
  completed: boolean;
  xpReward: number;
}

export interface Hackathon {
  id: string;
  title: string;
  slug: string;
  organizer: string;
  organizerType: "Government" | "Tech Giant" | "University" | "Community";
  logo: string;
  bannerGradient: string;
  category: "Technical" | "Non-Technical" | "Creative" | "Business" | "Research";
  domain:
    | "AI/ML"
    | "Web Development"
    | "Cybersecurity"
    | "Robotics"
    | "IoT"
    | "FinTech"
    | "BioTech"
    | "Sustainability";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  participation: "Individual" | "Team";
  teamSizeMin: number;
  teamSizeMax: number;
  fee: "Free" | "Paid";
  mode: "Online" | "Offline" | "Hybrid";
  location: string;
  prizePool: string;
  deadline: string; // ISO string
  startDate: string;
  endDate: string;
  requiredSkills: string[];
  shortDesc: string;
  fullDesc: string;
  eligibility: string;
  problemStatements: HackathonProblemStatement[];
  judgingCriteria: JudgingCriterion[];
  steps: HackathonStep[];
  prepChecklist: PrepChecklistItem[];
  matchScore?: number;
  matchReasons?: {
    skillsMatch: string[];
    interestMatch: string[];
    skillGaps: string[];
    experienceVerdict: string;
  };
}

export interface StudentSkill {
  name: string;
  level: number; // 0 - 100%
  category: string;
}

export interface StudentBadge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedDate: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  college: string;
  branch: string;
  year: "1st Year" | "2nd Year" | "3rd Year" | "4th Year" | "Graduate";
  bio: string;
  skills: StudentSkill[];
  targetSkills: string[];
  interests: string[];
  experienceLevel: "Beginner" | "Intermediate" | "Advanced";
  preferredDomains: string[];
  preferredRoles: string[];
  githubUrl: string;
  portfolioUrl: string;
  linkedinUrl: string;
  xp: number;
  level: "Explorer" | "Builder" | "Innovator" | "Hacker" | "Mentor";
  hackathonsParticipated: number;
  wins: number;
  badges: StudentBadge[];
  availability: "Available" | "In Hackathon" | "Looking for Team";
  currentRole?: string;
}

export interface TeamMember {
  student: StudentProfile;
  role: string;
  isLeader: boolean;
}

export interface HackathonTeam {
  id: string;
  name: string;
  hackathonId: string;
  hackathonTitle: string;
  leaderId: string;
  members: TeamMember[];
  maxMembers: number;
  lookingForRoles: string[];
  projectIdea: string;
  skillCoverage: {
    frontend: boolean;
    backend: boolean;
    ai_ml: boolean;
    hardware: boolean;
    pitching: boolean;
    ui_ux: boolean;
  };
  progressPercent: number;
}

export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  role: string;
  companyOrCollege: string;
  domain: string[];
  hackathonsParticipated: number;
  wins: number;
  skills: string[];
  github: string;
  portfolio: string;
  experienceBio: string;
  mentoringTopics: string[];
  rating: number;
  reviewsCount: number;
  verifiedWinnerBadge?: string;
}

export interface MentorStory {
  id: string;
  mentorName: string;
  mentorRole: string;
  avatar: string;
  hackathonName: string;
  outcome: string;
  firstHackathon: string;
  biggestMistake: string;
  bestProject: string;
  biggestFailure: string;
  teamManagementLesson: string;
  technicalDecision: string;
  pitchingLesson: string;
  winningLearningExperience: string;
  aiSummary: {
    keyLessons: string[];
    commonMistakes: string[];
    preparationTips: string[];
    technicalLessons: string[];
    teamLessons: string[];
    pitchingLessons: string[];
  };
}

export interface ProblemDecoderOutput {
  simpleWords: string;
  whatTheyWant: string;
  keyRequirements: string[];
  possibleTechnologies: {
    frontend: string[];
    backend: string[];
    ai_ml_or_core: string[];
    cloud_or_devops: string[];
  };
  expectedOutput: string;
  judgingFocus: {
    criterion: string;
    weight: string;
    insight: string;
  }[];
  suggestedFirstSteps: {
    step: string;
    title: string;
    desc: string;
  }[];
}

export interface ImprovementAnalysisOutput {
  whatWentWell: string[];
  weaknesses: string[];
  judgeFeedbackAnalysis: {
    rawFeedbackSummary: string;
    whatTheyReallyMeant: string;
  };
  technicalImprovements: string[];
  presentationImprovements: string[];
  teamExecutionImprovements: string[];
  whatToDoDifferently: string[];
  recommendedSkills: {
    skill: string;
    reason: string;
    estHours: string;
  }[];
  nextHackathonActionPlan: {
    phase: string;
    actions: string;
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "deadline" | "team" | "mentor" | "prep" | "xp";
  read: boolean;
}

export interface MyHackathonJourneyItem {
  hackathon: Hackathon;
  teamName: string;
  status: "Registered" | "Building" | "Pitch Prep" | "Submitted" | "Reviewed";
  progressPercent: number;
  checkpoints: {
    registration: boolean;
    team: boolean;
    problem: boolean;
    mvp: boolean;
    ppt: boolean;
    pitch: boolean;
    submission: boolean;
  };
  nextDeadline: string;
  actionRequired: string;
}
