 "use client";

import { MapPin, Phone, Mail, ArrowRight, ArrowUp } from "lucide-react";
import Image from "next/image";

// Lucide intentionally doesn't include brand/logo icons (Instagram,
// Facebook, YouTube, etc. — that's a deliberate policy of the library),
// so these three are small hand-rolled inline SVGs instead.
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

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
      <path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const QUICK_LINKS = ["Home", "Courses", "About Us", "Gallery", "Contact"];
const COURSE_LINKS = [
  "Makeup Artistry",
  "Hair Styling",
  "Skin & Spa Therapy",
  "Nail Art",
  "Combo Diploma",
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-gradient-to-b from-primary to-[#2c0813]">
      {/* top accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* depth glow, consistent with the rest of the site */}
      <div className="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-secondary/20 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-16 lg:px-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.1fr]">
          {/* ---------- brand + newsletter ---------- */}
          <div>
            <div className="flex items-center">
  <Image
    src="https://res.cloudinary.com/dl6fjer3y/image/upload/v1782383362/belleza_favicon_main_lwrtxm.svg"
    alt="AD Global Logo"
    width={180}
    height={60}
    className="h-12 w-auto"
    unoptimized
  />
</div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-light/65">
              Turning passion into profession since day one — a certified beauty
              &amp; cosmetology academy built for real careers, not just
              certificates.
            </p>

            <p className="mt-8 text-xs font-bold uppercase tracking-[2px] text-light/80">
              Get Course Updates
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-3 flex max-w-sm overflow-hidden rounded-full border border-light/20 bg-light/[0.06] backdrop-blur-sm"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-transparent px-5 py-3 text-sm text-light placeholder:text-light/45 outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex items-center justify-center gap-1.5 bg-accent px-5 text-sm font-bold text-primary transition hover:brightness-105"
              >
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="mt-8 flex gap-3">
              <SocialIcon href="#" icon={InstagramIcon} label="Instagram" />
              <SocialIcon href="#" icon={FacebookIcon} label="Facebook" />
              <SocialIcon href="#" icon={YoutubeIcon} label="YouTube" />
            </div>
          </div>

          {/* ---------- quick links ---------- */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[2px] text-light">
              Quick Links
            </h4>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-light/65 transition hover:pl-1 hover:text-accent"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- courses ---------- */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[2px] text-light">
              Courses
            </h4>
            <ul className="mt-5 space-y-3">
              {COURSE_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-light/65 transition hover:pl-1 hover:text-accent"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- contact ---------- */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[2px] text-light">
              Get In Touch
            </h4>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-accent" />
                <span className="text-sm leading-relaxed text-light/65">
                 2nd Floor, Ram Ganga Bihar Opposite Akash Meghe Dutam HDFC Bank, Moradabad 244001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-accent" />
                <a href="tel:+910000000000" className="text-sm text-light/65 hover:text-accent">
                 : +91 90122 60088
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-accent" />
                <a
                  href="mailto:hello@adglobal.com"
                  className="text-sm text-light/65 hover:text-accent"
                >
                  bellezabeautyschoolmoradabad@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ---------- bottom bar ---------- */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-light/10 pt-8 sm:flex-row">
          <p className="text-xs text-light/50">
            © {new Date().getFullYear()} AD Global — House of Beauty. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-light/50">
            <a href="#" className="hover:text-accent">Privacy Policy</a>
            <a href="#" className="hover:text-accent">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* back-to-top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="absolute bottom-8 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-light/20 bg-light/10 text-light backdrop-blur-sm transition hover:bg-accent hover:text-primary lg:right-12"
      >
        <ArrowUp size={18} />
      </button>
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
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-light/20 text-light/80 transition hover:border-accent hover:bg-accent hover:text-primary"
    >
      <Icon width={17} height={17} />
    </a>
  );
}
