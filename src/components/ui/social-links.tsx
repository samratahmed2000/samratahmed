import { Facebook, Github, Linkedin, Whatsapp } from "@/components/ui/icons";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type SocialKey = "github" | "linkedin" | "facebook" | "whatsapp";

const definitions: Array<{
  key: SocialKey;
  label: string;
  Icon: typeof Github;
}> = [
  { key: "github", label: "GitHub", Icon: Github },
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "whatsapp", label: "WhatsApp", Icon: Whatsapp },
];

function getConfiguredLinks() {
  return definitions.filter(({ key }) => Boolean(site.socials[key]));
}

interface SocialLinksProps {
  className?: string;
  showLabels?: boolean;
}

export function SocialLinks({
  className,
  showLabels = false,
}: SocialLinksProps) {
  const links = getConfiguredLinks();
  if (links.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {links.map(({ key, label, Icon }) => (
        <li key={key}>
          <a
            href={site.socials[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={cn(
              "inline-flex items-center gap-2 rounded-pill border border-line text-muted transition-colors hover:border-accent/60 hover:text-accent",
              showLabels ? "px-4 py-2 text-sm" : "h-10 w-10 justify-center",
            )}
          >
            <Icon />
            {showLabels ? <span>{label}</span> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
