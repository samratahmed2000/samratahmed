import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How this portfolio handles data: no accounts, no tracking scripts, and a contact form that opens your own email client.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "What this site is",
    body: [
      "This is a static portfolio website. It has no user accounts, no sign-in, and no database. It exists to describe my work and let people get in touch.",
    ],
  },
  {
    title: "Data this site collects",
    body: [
      "The site itself does not set cookies and does not include advertising or analytics tracking scripts. I don't build profiles of visitors or sell data.",
      "Like most websites, the provider that hosts these pages may keep standard server logs (for example, IP address, browser type and requested URL) as part of normal hosting and security. That logging is handled by the hosting provider, not by code on these pages.",
    ],
  },
  {
    title: "The contact form",
    body: [
      "The contact form on this site does not send or store anything. When you submit it, it opens your own email application with the message pre-filled, so you send the email from your own address.",
      "Any email you choose to send me is received in my inbox and used only to reply to you. I don't add senders to mailing lists.",
    ],
  },
  {
    title: "External links",
    body: [
      "Links to GitHub, LinkedIn, WhatsApp and other services take you to third-party websites. Once you follow one, that service's own privacy policy applies.",
    ],
  },
  {
    title: "Changes and questions",
    body: [
      "If this site's data practices change, I'll update this page to reflect it. If you have a question about privacy here, email me and I'll answer.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="Privacy, in plain language"
        description="A short, accurate description of what this site does — and does not — do with your information."
      />

      <section className="py-14 sm:py-16">
        <Container className="flex max-w-3xl flex-col gap-8">
          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-sm leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          <div className="rounded-card border border-line bg-card/50 p-5 text-sm text-muted">
            Questions about privacy on this site? Email{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-accent underline underline-offset-2"
            >
              {site.email}
            </a>
            .
          </div>
        </Container>
      </section>
    </>
  );
}
