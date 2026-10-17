import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonClasses } from "@/components/ui/button";
import { SocialLinks } from "@/components/ui/social-links";
import { ArrowRight, Mail, MapPin, Phone, Whatsapp } from "@/components/ui/icons";
import { site } from "@/data/site";

export function ContactCta() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 sm:py-20"
    >
      <Container>
        <div className="relative overflow-hidden rounded-card border border-line bg-card/60 p-8 sm:p-12">
          <div
            aria-hidden
            className="bg-grid pointer-events-none absolute inset-0 opacity-30"
          />
          <div className="relative flex flex-col gap-8">
            <SectionHeading
              id="contact-heading"
              eyebrow="Contact"
              title="Let's build something together"
              description={`I'm ${site.availability.toLowerCase()}. Email is the fastest way to reach me — I usually reply within a day or two.`}
            />

            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${site.email}`}
                className={buttonClasses("primary", "lg")}
              >
                <Mail />
                Email me
              </a>
              {site.socials.whatsapp ? (
                <a
                  href={site.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses("secondary", "lg")}
                >
                  <Whatsapp />
                  WhatsApp
                </a>
              ) : null}
              <Link href="/contact" className={buttonClasses("ghost", "lg")}>
                Contact page
                <ArrowRight />
              </Link>
            </div>

            <div className="flex flex-col gap-3 text-sm text-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                {site.location}
              </span>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 transition-colors hover:text-accent"
              >
                <Phone className="h-4 w-4 text-accent" />
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4 text-accent" />
                {site.email}
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-mono text-xs tracking-[0.15em] text-muted uppercase">
                Find me online
              </p>
              <SocialLinks showLabels />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
