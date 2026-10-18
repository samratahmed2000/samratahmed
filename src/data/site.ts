import raw from "../../db.json";
import type {
  AboutCard,
  EducationEntry,
  NavLink,
  ProcessStep,
  SiteConfig,
} from "@/types/type";

export const site: SiteConfig = {
  name: raw.site.name,
  role: raw.site.role,
  tagline: raw.site.tagline,
  shortBio: raw.site.shortBio,
  location: raw.site.location,
  email: raw.site.email,
  phone: raw.site.phone,
  phoneHref: raw.site.phoneHref,
  availability: raw.site.availability,
  // The supplied file lives at public/resume.pdf. Keep this pointing at a file
  // that actually exists so the resume page never links to a 404.
  resumeUrl: "/resume.pdf",
  socials: {
    github: raw.site.socials.github || undefined,
    linkedin: raw.site.socials.linkedin || undefined,
    facebook: raw.site.socials.facebook || undefined,
    whatsapp: raw.site.whatsapp || undefined,
  },
};

export const navLinks: NavLink[] = raw.navLinks;

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const aboutCards: AboutCard[] = raw.aboutCards;
export const processSteps: ProcessStep[] = raw.processSteps;
export const education: EducationEntry[] = raw.education;
