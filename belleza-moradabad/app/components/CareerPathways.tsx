"use client";

import {
  Sparkles,
  Scissors,
  Paintbrush,
  Briefcase,
  HeartHandshake,
  Flower2,
  GraduationCap,
  Presentation,
  type LucideIcon,
} from "lucide-react";

interface CareerPath {
  icon: LucideIcon;
  title: string;
  description: string;
}

const CAREER_PATHS: CareerPath[] = [
  {
    icon: Sparkles,
    title: "Beauty Advisor",
    description:
      "Help clients choose the best beauty products and services to enhance their appearance.",
  },
  {
    icon: Scissors,
    title: "Hair Stylist",
    description:
      "Create stunning hairstyles and keep up with the latest trends to make your clients feel confident.",
  },
  {
    icon: Paintbrush,
    title: "Makeup Artist",
    description:
      "Transform your clients' looks with artistic makeup techniques for various occasions.",
  },
  {
    icon: Briefcase,
    title: "Salon Manager",
    description:
      "Oversee salon operations, ensuring everything runs smoothly and customers are satisfied.",
  },
  {
    icon: HeartHandshake,
    title: "Beauty Therapist",
    description:
      "Provide skincare, massage, and other beauty treatments to help clients look and feel their best.",
  },
  {
    icon: Flower2,
    title: "Spa Manager",
    description:
      "Manage spa operations, delivering exceptional service and relaxation experiences to clients.",
  },
  {
    icon: GraduationCap,
    title: "Beauty Educator",
    description:
      "Teach aspiring beauty professionals the skills and techniques they need to succeed.",
  },
  {
    icon: Presentation,
    title: "Master Trainer",
    description:
      "Train and inspire other beauty professionals by sharing your expertise and knowledge.",
  },
];

export default function CareerPathways() {
  return (
    <section className="w-full bg-light py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          Career Pathways
        </h2>
        <p className="mt-5 text-base leading-relaxed text-neutral-500">
          Graduates of our beauty &amp; cosmetology programs have numerous
          career opportunities, including:
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-7 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {CAREER_PATHS.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="group rounded-2xl border border-primary/15 bg-light p-8 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/5 transition group-hover:bg-accent/40">
              <Icon size={30} strokeWidth={1.6} className="text-primary" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-500">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
