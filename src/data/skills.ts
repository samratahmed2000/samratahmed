import raw from "../../db.json";
import type { SkillCategory, SoftSkill } from "@/types/type";

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
