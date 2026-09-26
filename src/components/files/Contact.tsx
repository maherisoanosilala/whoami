
import { profile } from "@/lib/data";
import { Mail, MessageCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";

const socials = [
  {
    key: "email",
    label: "Email",
    icon: Mail,
    href: `mailto:${profile.contact.email}`,
    value: profile.contact.email,
    external: false,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: FaWhatsapp,
    href: profile.contact.whatsappUrl,
    value: profile.contact.whatsapp,
    external: true,
  },
  {
    key: "github",
    label: "GitHub",
    icon: FaGithub,
    href: profile.contact.github,
    value: profile.contact.githubLabel,
    external: true,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: FaLinkedin,
    href: profile.contact.linkedin,
    value: profile.contact.linkedinLabel,
    external: true,
  },
  {
    key: "twitter",
    label: "X",
    icon: FaTwitter,
    href: profile.contact.twitter,
    value: profile.contact.twitterLabel,
    external: true,
  },
] as const;

export function Contact() {
  return (
    <article className="max-w-2xl space-y-6">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-nosy-fg">
          Contact
        </h2>
        <p className="text-[13px] text-nosy-dim">
          Dispo pour missions freelance. Réponse sous 24h.
        </p>
      </header>

      <div className="grid gap-2">
        {socials.map(({ key, label, icon: Icon, href, value, external }) => (
          <a
            key={key}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md border border-nosy-border bg-nosy-surface hover:border-nosy-choc-dn transition-colors group"
          >
            <Icon
              size={15}
              strokeWidth={1.75}
              className="text-nosy-dim group-hover:text-nosy-choc-up transition-colors"
            />
            <span className="text-[13px] text-nosy-soft group-hover:text-nosy-fg transition-colors">
              {label}
            </span>
            <span className="ml-auto text-[12px] text-nosy-dim font-mono">
              {value}
            </span>
          </a>
        ))}
      </div>
    </article>
  );
}
