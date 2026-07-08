"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, ArrowRight } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

const FAQS: FAQ[] = [
  {
    question: "Do I need any prior experience to join a course?",
    answer:
      "No prior experience is required. Our courses are designed for complete beginners as well as working professionals looking to upgrade their skills — trainers start from the fundamentals.",
  },
  {
    question: "How long does each course take to complete?",
    answer:
      "Course duration varies by program — certificate courses typically run 4–8 weeks, while diploma programs range from 3–6 months, depending on batch type and weekly hours.",
  },
  {
    question: "Is the certification recognized by the industry?",
    answer:
      "Yes. Every graduate receives a certification that is recognized across salons, studios, and beauty brands, backed by our academy's industry partnerships and track record.",
  },
  {
    question: "Do you offer placement assistance after the course?",
    answer:
      "Absolutely. Our placement team actively connects graduates with salons, studios, and brands that are hiring, and also supports students who want to start their own practice.",
  },
  {
    question: "Are weekend or flexible batch timings available?",
    answer:
      "Yes, we run weekday, weekend, and fast-track batches so you can learn around your existing job, college, or family commitments.",
  },
  {
    question: "What is included in the course fee?",
    answer:
      "Course fees include all practical training sessions, study material, use of studio equipment during class, and your final certification. Kits and take-home products, if any, are listed separately per course.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section className="w-full bg-light py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {/* ---------- heading + CTA ---------- */}
        <div>
          <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[3px] text-secondary">
            <span className="h-px w-8 bg-secondary/50" />
            FAQs
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
            Got Questions?
            <br />
            We&apos;ve Got Answers.
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-neutral-500">
            Still unsure about something? Reach out and our admissions team
            will walk you through everything — courses, fees, and timing.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:gap-3"
          >
            Contact Admissions
            <ArrowRight size={16} />
          </a>
        </div>

        {/* ---------- accordion ---------- */}
        <div className="divide-y divide-primary/10 border-t border-primary/10">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question}>
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base font-bold sm:text-lg ${
                      isOpen ? "text-primary" : "text-neutral-800"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
                      isOpen
                        ? "rotate-45 border-primary bg-primary text-light"
                        : "border-primary/25 text-primary"
                    }`}
                  >
                    <Plus size={16} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-lg pb-6 text-sm leading-relaxed text-neutral-500 sm:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
