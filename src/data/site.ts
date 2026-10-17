import raw from "../../db.json";
import type {
  AboutCard,
  EducationEntry,
  NavLink,
  ProcessStep,
  SiteConfig,
} from "@/types";

/**
 * Site-wide configuration derived from `db.json`.
 *
 * Integrity notes:
 * - Only include social links that are real, external URLs. The `portfolio: "#home"`
 *   entry in the source data is an internal anchor, not a social profile, so it is dropped.
 * - `resumeUrl` is only set when a real file exists in `public/`. It currently does not,
 *   so the "Download resume" control is hidden until a PDF is added.
 */
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
  resumeUrl: undefined,
  socials: {
    github: raw.site.socials.github || undefined,
    linkedin: raw.site.socials.linkedin || undefined,
    facebook: raw.site.socials.facebook || undefined,
    whatsapp: raw.site.whatsapp || undefined,
  },
};

/**
 * Anchor links from `db.json` (e.g. `#about`). These point at sections on the
 * home page and are reused for in-page jumps and the footer's "On this page" list.
 */
export const navLinks: NavLink[] = raw.navLinks;

/**
 * Primary site navigation. The portfolio is multi-page, so the header navigates
 * to real routes rather than only in-page anchors.
 */
export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Card content for the About preview / About page. */
export const aboutCards: AboutCard[] = raw.aboutCards;

/** AI-assisted development process steps. */
export const processSteps: ProcessStep[] = raw.processSteps;

/** Education entries, presented exactly as supplied (ongoing stays ongoing). */
export const education: EducationEntry[] = raw.education;
