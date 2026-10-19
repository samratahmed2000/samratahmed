import { cacheLife } from "next/cache";
import { Hero } from "@/components/sections/hero";
import { AboutPreview } from "@/components/sections/about-preview";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { SkillsPreview } from "@/components/sections/skills-preview";
import { Process } from "@/components/sections/process";
import { Education } from "@/components/sections/education";
import { BlogPreview } from "@/components/sections/blog-preview";
import { ContactCta } from "@/components/sections/contact-cta";

const HomePage = async () => {
  "use cache";
  cacheLife("portfolio");

  return (
    <>
      <Hero />
      <AboutPreview />
      <FeaturedProjects />
      <SkillsPreview />
      <Process />
      <Education />
      <BlogPreview />
      <ContactCta />
    </>
  );
};

export default HomePage;
