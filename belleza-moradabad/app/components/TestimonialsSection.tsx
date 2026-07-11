"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// ⚠️ Apna actual backend base URL yahan set karo (.env me NEXT_PUBLIC_API_URL rakho)
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

interface Testimonial {
  _id: string;
  name: string;
  designation?: string;
  description: string;
  shortDescription?: string;
  avatar: string | null;
  thumbnail?: string | null;
  rating: number;
  read_time?: string;
}

interface ApiResponse {
  success: boolean;
  data: Testimonial[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const FALLBACK_AVATAR = "/images/testimonial-avatar-placeholder.jpg";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Backend se active testimonials fetch karo
  useEffect(() => {
    const controller = new AbortController();

    async function fetchTestimonials() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${API_BASE}/testimonial/public?page=1&limit=20`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const json: ApiResponse = await res.json();
        if (!json.success) throw new Error("Testimonials fetch failed");

        setTestimonials(json.data || []);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError((err as Error).message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
    return () => controller.abort();
  }, []);

  function go(dir: 1 | -1) {
    setDirection(dir);
    setIndex(
      (prev) => (prev + dir + testimonials.length) % testimonials.length
    );
  }

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

      {/* loading state */}
      {loading && (
        <div className="relative z-10 flex justify-center py-16">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      )}

      {/* error state */}
      {!loading && error && (
        <p className="relative z-10 py-16 text-center text-red-500">
          {error}
        </p>
      )}

      {/* empty state */}
      {!loading && !error && testimonials.length === 0 && (
        <p className="relative z-10 py-16 text-center text-neutral-400">
          No testimonials yet.
        </p>
      )}

      {/* carousel */}
      {!loading && !error && testimonials.length > 0 && (
        <div className="relative z-10 mx-auto mt-14 max-w-3xl px-6">
          <div className="relative rounded-[28px] border border-primary/10 bg-light p-10 shadow-[0_25px_60px_rgba(121,21,53,0.12)] sm:p-14">
            <Quote
              size={44}
              className="mx-auto mb-6 text-accent"
              fill="currentColor"
              strokeWidth={0}
            />

            <div className="relative min-h-[210px] overflow-hidden sm:min-h-[170px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={testimonials[index]._id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="text-center"
                >
                  <p className="mx-auto max-w-xl text-lg leading-relaxed text-neutral-700 sm:text-xl">
                    {testimonials[index].shortDescription ||
                      testimonials[index].description}
                  </p>

                  <div className="mt-8 flex items-center justify-center gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < testimonials[index].rating
                            ? "fill-accent text-accent"
                            : "text-neutral-200"
                        }
                      />
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-accent">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={testimonials[index].avatar || FALLBACK_AVATAR}
                        alt={testimonials[index].name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-primary">
                        {testimonials[index].name}
                      </p>
                      {testimonials[index].designation && (
                        <p className="text-xs text-neutral-500">
                          {testimonials[index].designation}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* nav arrows — only show if more than 1 testimonial */}
            {testimonials.length > 1 && (
              <>
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
              </>
            )}
          </div>

          {/* dot indicators */}
          {testimonials.length > 1 && (
            <div className="mt-8 flex justify-center gap-2.5">
              {testimonials.map((_, i) => (
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
          )}

          {/* mobile arrows, below the card since they're hidden on the card itself at small sizes */}
          {testimonials.length > 1 && (
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
          )}
        </div>
      )}
    </section>
  );
}
