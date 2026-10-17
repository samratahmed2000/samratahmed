import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "@/components/ui/social-links";
import { ContactForm } from "@/components/contact/contact-form";
import { ArrowUpRight, Mail, MapPin, Phone, Whatsapp } from "@/components/ui/icons";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} by email, phone or WhatsApp. Open to internships, freelance work and junior roles.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const methods = [
    {
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
      external: false,
      Icon: Mail,
    },
    {
      label: "Phone",
      value: site.phone,
      href: site.phoneHref,
      external: false,
      Icon: Phone,
    },
    site.socials.whatsapp
      ? {
          label: "WhatsApp",
          value: "Message me on WhatsApp",
          href: site.socials.whatsapp,
          external: true,
          Icon: Whatsapp,
        }
      : null,
  ].filter(
    (
      method,
    ): method is {
      label: string;
      value: string;
      href: string;
      external: boolean;
      Icon: typeof Mail;
    } => method !== null,
  );

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about what you're building"
        description={`I'm ${site.availability.toLowerCase()}. Tell me a little about the project or role, and I'll get back to you as soon as I can.`}
      />

      <section className="py-14 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Direct ways to reach me
              </h2>
              <p className="text-sm leading-relaxed text-muted">
                Email is best for anything detailed. Phone and WhatsApp are fine
                for a quick conversation.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {methods.map(({ label, value, href, external, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex items-center gap-4 rounded-card border border-line bg-card/50 p-4 transition-colors hover:border-accent/40"
                  >
                    <span
                      aria-hidden
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-surface text-accent"
                    >
                      <Icon />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-xs text-muted">{label}</span>
                      <span className="truncate text-sm font-medium text-foreground">
                        {value}
                      </span>
                    </span>
                    {external ? (
                      <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted" />
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>

            <div className="rounded-card border border-line bg-card/50 p-5">
              <p className="inline-flex items-center gap-2 text-sm text-muted">
                <MapPin className="h-4 w-4 text-accent" />
                {site.location}
              </p>
              <p className="mt-3 font-mono text-xs tracking-[0.15em] text-muted uppercase">
                Find me online
              </p>
              <SocialLinks className="mt-3" showLabels />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Send a message
            </h2>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
