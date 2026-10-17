import raw from "../../db.json";
import type { SkillCategory, SoftSkill } from "@/types";

/**
 * Skills grouped by category.
 *
 * Integrity note: the numeric `level` values in `db.json` are intentionally
 * ignored. They are not objective measurements, so the UI only distinguishes
 * "learned / in use" from "currently learning".
 */
export const skillCategories: SkillCategory[] = raw.skillCategories.map(
  (category) => ({
    id: category.id,
    title: category.title,
    description: category.description,
    skills: category.skills.map((skill) => ({
      name: skill.name,
      status: skill.status === "learning" ? "learning" : "learned",
    })),
  }),
);

/** Soft skills are shown as plain, described strengths (no percentages). */
export const softSkills: SoftSkill[] = raw.softSkills.map((skill) => ({
  name: skill.name,
  description: skill.description,
}));

export const learnedSkillsCount = skillCategories.reduce(
  (total, category) =>
    total + category.skills.filter((s) => s.status === "learned").length,
  0,
);

export const totalSkillsCount = skillCategories.reduce(
  (total, category) => total + category.skills.length,
  0,
);
