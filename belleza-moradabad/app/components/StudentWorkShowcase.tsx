"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WorkItem {
  image: string;
  caption: string;
}

// Replace with your own student work photos in /public/images/student-work/
const STUDENT_WORK: WorkItem[] = [
  { image: "/images/student-work/work-1.jpg", caption: "Bridal Makeover — Priya Sharma" },
  { image: "/images/student-work/work-2.jpg", caption: "Editorial Look — Ayesha Khan" },
  { image: "/images/student-work/work-3.jpg", caption: "Hair Styling — Neha Verma" },
  { image: "/images/student-work/work-4.jpg", caption: "HD Makeup — Simran Kaur" },
  { image: "/images/student-work/work-5.jpg", caption: "Party Glam — Ritika Joshi" },
  { image: "/images/student-work/work-6.jpg", caption: "Nail Art — Fatima Ansari" },
];

export default function StudentWorkShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: 1 | -1) {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8 * direction;
    el.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section className="w-full bg-light py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
        {/* ---------- scrollable image strip ---------- */}
        <div
          ref={scrollRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
        >
          {STUDENT_WORK.map((item, i) => (
            <figure
              key={i}
              className="w-[70%] shrink-0 snap-start sm:w-[48%] lg:w-[55%]"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.caption}
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm font-semibold text-primary">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* ---------- heading + nav ---------- */}
        <div>
          <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[3px] text-secondary">
            <span className="h-px w-8 bg-secondary/50" />
            Student Showcase
          </div>
          <h2 className="text-4xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-5xl">
            See Our Students&apos; Work
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-500">
            From bridal transformations to editorial looks, every piece here
            was created by our own students — hands-on proof of the skill
            they walk away with by graduation day.
          </p>

          <div className="mt-10 flex gap-3">
            <button
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 text-primary transition hover:border-primary hover:bg-primary hover:text-light"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Scroll right"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 text-primary transition hover:border-primary hover:bg-primary hover:text-light"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
