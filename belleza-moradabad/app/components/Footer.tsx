"use client";

import { useEffect, useState } from "react";
import { Phone, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Lucide intentionally doesn't include brand/logo icons (Instagram,
// Facebook, YouTube, etc.), so these are small hand-rolled inline SVGs.
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.25-1.5 1.55-1.5H16.7V3.2C16.4 3.15 15.4 3 14.2 3c-2.4 0-4 1.45-4 4.15v2.65H7.5v3.2h2.7V21h3.3z" />
    </svg>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="M3 6.5l9 6.5 9-6.5" />
    </svg>
  );
}

// ⚠️ Apna actual backend base URL yahan set karo (.env me NEXT_PUBLIC_API_URL rakho)
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

interface SiteSettings {
  academyName?: string; // e.g. "Belleza"
  academySuffix?: string; // e.g. "Beauty School"
  branchName?: string; // e.g. "Dehradun Branch"
  tagline?: string;
  phone?: string;
  email?: string;
  website?: string;
  socials?: {
    facebook?: string;
    instagram?: string;
  };
  year?: number;
}

// Sensible defaults, shown while loading or if the settings API is unavailable
const DEFAULTS: SiteSettings = {
  academyName: "Belleza",
  academySuffix: "Beauty School",
  branchName: "",
  tagline:
    "Professional Makeup, Hair, Nail, Beauty, Skin & Cosmetology Courses. Empowering the next generation of beauty professionals.",
  phone: "+91",
  email: "",
  website: "",
  socials: {},
  year: new Date().getFullYear(),
};

const ACADEMY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Training Timeline", href: "/timeline" },
  { label: "Contact", href: "/contact" },
];

const STUDENT_LIFE_LINKS = [
  { label: "Career Opportunities", href: "/career" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQs", href: "/faq" },
];

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSettings() {
      try {
        const res = await fetch(`${API_BASE}/settings`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Settings fetch failed");

        const json = await res.json();
        if (json?.success && json.data) {
          setSettings({ ...DEFAULTS, ...json.data });
        }
      } catch {
        // Settings API not available or failed — keep defaults, fail silently
        // so the footer still renders instead of breaking the page.
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
    return () => controller.abort();
  }, []);

  return (
    <footer className="w-full bg-primary">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* ---------- brand ---------- */}
          <div>
            <h3 className="text-2xl font-extrabold text-light">
              {settings.academyName}{" "}
              <span className="font-normal">{settings.academySuffix}</span>
            </h3>
            {settings.branchName && (
              <p className="mt-1 text-xs font-bold uppercase tracking-[2px] text-accent">
                {settings.branchName}
              </p>
            )}

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-light/70">
              {settings.tagline}
            </p>

            <div className="mt-6 flex gap-3">
              {settings.socials?.facebook && (
                <SocialIcon
                  href={settings.socials.facebook}
                  icon={FacebookIcon}
                  label="Facebook"
                />
              )}
              {settings.socials?.instagram && (
                <SocialIcon
                  href={settings.socials.instagram}
                  icon={InstagramIcon}
                  label="Instagram"
                />
              )}
              {settings.email && (
                <SocialIcon
                  href={`mailto:${settings.email}`}
                  icon={MailIcon}
                  label="Email"
                />
              )}
              {/* Fallback icons if no dynamic socials are configured yet */}
              {!settings.socials?.facebook &&
                !settings.socials?.instagram &&
                !settings.email && (
                  <>
                    <SocialIcon href="#" icon={FacebookIcon} label="Facebook" />
                    <SocialIcon href="#" icon={InstagramIcon} label="Instagram" />
                    <SocialIcon href="#" icon={MailIcon} label="Email" />
                  </>
                )}
            </div>
          </div>

          {/* ---------- academy links ---------- */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[2px] text-light">
              Academy
            </h4>
            <ul className="mt-5 space-y-3">
              {ACADEMY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-light/70 transition hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- student life links ---------- */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[2px] text-light">
              Student Life
            </h4>
            <ul className="mt-5 space-y-3">
              {STUDENT_LIFE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-light/70 transition hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- visit us ---------- */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[2px] text-light">
              Visit Us
            </h4>
            <ul className="mt-5 space-y-4">
              {settings.phone && (
                <li className="flex items-center gap-3">
                  <Phone size={18} className="shrink-0 text-accent" />
                  <a
                    href={`tel:${settings.phone}`}
                    className="text-sm text-light/70 hover:text-accent"
                  >
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings.website && (
                <li className="flex items-center gap-3">
                  <Globe size={18} className="shrink-0 text-accent" />
                  <a
                    href={settings.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-light/70 hover:text-accent"
                  >
                    {settings.website.replace(/^https?:\/\//, "")}
                  </a>
                </li>
              )}
              {!settings.website && (
                <li className="flex items-center gap-3">
                  <Globe size={18} className="shrink-0 text-accent" />
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* ---------- bottom bar ---------- */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-light/15 pt-8 sm:flex-row">
          <p className="text-xs text-light/60">
            © {settings.year} {settings.academyName} {settings.academySuffix}. All
            rights reserved.
          </p>
          <p className="text-xs text-light/60">
            Developed by{" "}
            <span className="font-bold text-accent">VIPPROW</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  label: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-light/30 text-light transition hover:border-accent hover:bg-accent hover:text-primary"
    >
      <Icon width={16} height={16} />
    </a>
  );
}
