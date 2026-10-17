/**
 * Central, reusable types for portfolio content.
 * Content originates from `db.json` and is normalised in `src/data/*`.
 */

export type SkillStatus = "learned" | "learning";

export interface Skill {
  name: string;
  /** Optional raw value from source data. Never rendered as a proficiency claim. */
  level?: number;
  status: SkillStatus;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
}

export interface SoftSkill {
  name: string;
  description: string;
  level?: number;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string[];
  technologies: string[];
  keyFeatures: string[];
  challenges: string[];
  engineeringDecisions: string[];
  futureImprovements: string[];
  /** Public path, only set when a real asset exists. */
  image?: string;
  gradient?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year?: string;
  role?: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export interface AboutCard {
  title: string;
  body: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  body: string;
  prompt?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  facebook?: string;
  whatsapp?: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  shortBio: string;
  location: string;
  email: string;
  phone: string;
  phoneHref: string;
  availability: string;
  /** Only set when a real file exists in `public/`. */
  resumeUrl?: string;
  socials: SocialLinks;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime?: string;
  tags: string[];
  content?: string[];
}
