"use client";

import {
  Award,
  Sparkles,
  Briefcase,
  Building2,
  Clock,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: Award,
    title: "Certified Trainers",
    description:
      "Learn directly from industry-certified experts with years of real salon and editorial experience.",
  },
  {
    icon: Sparkles,
    title: "100% Practical Training",
    description:
      "Hands-on sessions on live models from day one — not just theory, real technique you can use.",
  },
  {
    icon: Briefcase,
    title: "Placement Assistance",
    description:
      "Dedicated career support connecting graduates to salons, studios, and brands hiring right now.",
  },
  {
    icon: Building2,
    title: "Modern Infrastructure",
    description:
      "Fully equipped studios with professional-grade tools, lighting, and stations used in real salons.",
  },
  {
    icon: Clock,
    title: "Flexible Batches",
    description:
      "Weekday, weekend, and fast-track batches designed to fit around your schedule and pace.",
  },
  {
    icon: BadgeCheck,
    title: "Recognized Certification",
    description:
      "Earn a certification respected across the beauty industry, backed by our academy's legacy.",
  },
];

const STATS = [
  { value: "4+", label: "Years Legacy" },
  { value: "5,000+", label: "Graduates Trained" },
  { value: "95%", label: "Placement Rate" },
  { value: "20+", label: "Expert Trainers" },
];

export default function WhyChooseUs() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#3a0a1a] via-primary to-[#5c0f27] py-20 lg:py-28">
      {/* depth glows, consistent with the rest of the site */}
      <div className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-accent/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[460px] w-[460px] rounded-full bg-secondary/25 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div className="mb-4 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[3px] text-accent">
          <span className="h-px w-8 bg-accent/60" />
          Why Choose Us
          <span className="h-px w-8 bg-accent/60" />
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight text-light sm:text-5xl">
          The <span className="text-accent">Belleza Beauty School</span> Advantage
        </h2>
        <p className="mt-5 text-base leading-relaxed text-light/70">
          Everything about our academy is built around one goal — turning
          your passion into a career the industry actually respects.
        </p>
      </div>

      {/* ---------- feature cards ---------- */}
      <div className="relative z-10 mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="group rounded-2xl border border-light/15 bg-light/[0.06] p-8 backdrop-blur-xl transition hover:-translate-y-1 hover:border-accent/40 hover:bg-light/[0.09]"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/15 transition group-hover:bg-accent/25">
              <Icon size={26} strokeWidth={1.8} className="text-accent" />
            </div>
            <h3 className="text-lg font-bold text-light">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-light/65">
              {description}
            </p>
          </div>
        ))}
      </div>

      {/* ---------- stats strip ---------- */}
      <div className="relative z-10 mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-8 border-t border-light/15 px-6 pt-12 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-extrabold text-accent sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wider text-light/60">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
