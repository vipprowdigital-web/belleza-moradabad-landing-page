"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  name: string;
  course: string;
  avatar: string;
  rating: number;
  quote: string;
}

// Replace avatars with your own student photos in /public/images/testimonials/
const TESTIMONIALS: Testimonial[] = [
  {
    name: "Priya Sharma",
    course: "Advance Diploma in Pro Artistry Makeup",
    avatar: "/images/testimonials/student-1.jpg",
    rating: 5,
    quote:
      "The hands-on training here completely changed how confident I feel with a brush in my hand. Within weeks of graduating, I was already booking bridal clients on my own.",
  },
  {
    name: "Ayesha Khan",
    course: "Certificate in Art of Makeup (AMU)",
    avatar: "/images/testimonials/student-2.jpg",
    rating: 5,
    quote:
      "Trainers actually sit with you and correct your technique in real time. That one-on-one attention is the reason I improved so much faster than I expected.",
  },
  {
    name: "Neha Verma",
    course: "Professional Hair Styling Certification",
    avatar: "/images/testimonials/student-3.jpg",
    rating: 4,
    quote:
      "From blow-dry basics to advanced updos, every class built on the last. I left with a portfolio I was genuinely proud to show clients.",
  },
  {
    name: "Simran Kaur",
    course: "Complete Beauty & Hair Combo Diploma",
    avatar: "/images/testimonials/student-4.jpg",
    rating: 5,
    quote:
      "Best decision I made for my career. The placement support team helped me land a job at a salon within a month of finishing the course.",
  },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  function go(dir: 1 | -1) {
    setDirection(dir);
    setIndex((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  const current = TESTIMONIALS[index];

  return (
    <section className="relative w-full overflow-hidden bg-light py-20 lg:py-28">
      {/* faint decorative glow, kept subtle since the section is on white */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/25 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div className="mb-4 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[3px] text-secondary">
          <span className="h-px w-8 bg-secondary/50" />
          Student Voices
          <span className="h-px w-8 bg-secondary/50" />
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
          What Our Students Say
        </h2>
      </div>

      <div className="relative z-10 mx-auto mt-14 max-w-3xl px-6">
        <div className="relative rounded-[28px] border border-primary/10 bg-light p-10 shadow-[0_25px_60px_rgba(121,21,53,0.12)] sm:p-14">
          <Quote size={44} className="mx-auto mb-6 text-accent" fill="currentColor" strokeWidth={0} />

          <div className="relative min-h-[210px] overflow-hidden sm:min-h-[170px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="text-center"
              >
                <p className="mx-auto max-w-xl text-lg leading-relaxed text-neutral-700 sm:text-xl">
                  {current.quote}
                </p>

                <div className="mt-8 flex items-center justify-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < current.rating ? "fill-accent text-accent" : "text-neutral-200"}
                    />
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-accent">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={current.avatar}
                      alt={current.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-primary">{current.name}</p>
                    <p className="text-xs text-neutral-500">{current.course}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* nav arrows */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="absolute left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-primary/15 bg-light p-2.5 text-primary shadow-md transition hover:bg-primary hover:text-light sm:flex"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-primary/15 bg-light p-2.5 text-primary shadow-md transition hover:bg-primary hover:text-light sm:flex"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* dot indicators */}
        <div className="mt-8 flex justify-center gap-2.5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-7 bg-primary" : "w-2.5 bg-primary/20"
              }`}
            />
          ))}
        </div>

        {/* mobile arrows, below the card since they're hidden on the card itself at small sizes */}
        <div className="mt-6 flex justify-center gap-3 sm:hidden">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 text-primary"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 text-primary"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
