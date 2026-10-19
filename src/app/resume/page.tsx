import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { PageHeader } from "@/components/layout/page-header";
import { buttonClasses } from "@/components/ui/button";
import { ArrowRight, Download } from "@/components/ui/icons";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `View, preview or download the resume of ${site.name} - an AI-driven web application engineer. The full document in a single PDF.`,
  alternates: { canonical: "/resume" },
};

const resumeUrl = site.resumeUrl;

export default async function ResumePage() {
  "use cache";
  cacheLife("portfolio");

  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title="You can view it, or take a copy"
        description="The complete document in a single PDF. Open it in a new tab, or download a copy to keep."
      >
        {resumeUrl ? (
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={resumeUrl}
              download
              className={buttonClasses("primary", "lg")}
            >
              <Download />
              Download PDF
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("secondary", "lg")}
            >
              Open in new tab
              <ArrowRight />
            </a>
          </div>
        ) : null}
      </PageHeader>
    </>
  );
}
