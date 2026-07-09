"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type MotionStyle,
} from "framer-motion";
import { ArrowRight, ChevronDown, User, Phone, Sparkles, MapPin, MessageSquare } from "lucide-react";



const COURSES = ["Hair Styling", "Makeup Artistry", "Skin & Spa Therapy", "Nail Art"];
const LOCATIONS = ["Rudrapur", "Moradabad", "Dehradun", "Bazpur", "Haldwani"];

// ---------- form data + validation ----------
const initialFormData = { name: "", phone: "", course: "", location: "", message: "" };
type FormData = typeof initialFormData;
type FormErrors = Partial<Record<keyof FormData, string>>;

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) errors.name = "Name is required";
  else if (data.name.trim().length < 2) errors.name = "Name is too short";

  if (!data.phone.trim()) errors.phone = "Phone number is required";
  else if (!/^[+]?[\d\s-]{8,15}$/.test(data.phone.trim()))
    errors.phone = "Enter a valid phone number";

  if (!data.course) errors.course = "Please select a course";
  if (!data.location) errors.location = "Please select a location";
  // message is optional — intentionally not validated

  return errors;
}

export default function HeroSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.4,
  });

  const rotateY = useTransform(smoothProgress, [0, 1], [-18, 0]);
  const rotateX = useTransform(smoothProgress, [0, 1], [6, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [1, 1.22]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const combinedRotateY = useTransform([rotateY, springX], ([ry, mx]) => (ry as number) + (mx as number));
  const combinedRotateX = useTransform([rotateX, springY], ([rx, my]) => (rx as number) - (my as number));

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 8);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 6);
  }

  // Explicitly typed as MotionStyle so `transformStyle: "preserve-3d"`
  // is understood as the literal type framer-motion expects, instead
  // of being widened to a plain `string` (which caused the TS error).
  const stageStyle: MotionStyle = shouldReduceMotion
    ? {}
    : {
        rotateY: combinedRotateY,
        rotateX: combinedRotateX,
        scale,
        transformStyle: "preserve-3d",
      };

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // No errors — safe to send formData to your API here.
    console.log("submitting:", formData);
    setSubmitted(true);
    setFormData(initialFormData);
    setErrors({});
  }

  return (
    // "Breakout" wrapper: forces full 100vw regardless of any parent
    // container. If your layout already spans full width, you can
    // drop the w-screen/left-1/2/-translate-x-1/2 trio safely.
    <div
      ref={scrollContainerRef}
      className="relative left-1/2 min-h-screen md:h-[240vh] w-screen -translate-x-1/2"
    >
      <section
       className="relative md:sticky md:top-0 min-h-screen md:h-screen w-full overflow-hidden bg-[#0d0507]"
        onMouseMove={handleMouseMove}
      >
        {/* ---------- 3D video stage ---------- */}
        <div
          className="absolute inset-0"
          style={{ perspective: "1600px", perspectiveOrigin: "50% 45%" }}
        >
          <motion.div className="absolute -inset-[6%]" style={stageStyle}>
            <video className="h-full w-full object-cover" autoPlay muted loop playsInline>
              <source src="/videos/academy-hero.mp4" type="video/mp4" />
            </video>
          </motion.div>

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                 "linear-gradient(90deg, rgba(121,21,53,0.65) 0%, rgba(121,21,53,0.4) 38%, rgba(121,21,53,0.18) 62%, rgba(253,223,191,0.12) 100%), linear-gradient(180deg, rgba(121,21,53,0.25) 0%, rgba(0,0,0,0.05) 30%, rgba(121,21,53,0.35) 100%)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_20vw_rgba(0,0,0,0.6)]" />
          {/* faint gold atmosphere, premium depth cue */}
          <div className="pointer-events-none absolute -right-40 top-1/4 h-[560px] w-[560px] rounded-full bg-accent/10 blur-[140px]" />
        </div>

        {/* ---------- nav (now a separate component) ---------- */}
        {/* <Navbar /> */}

        {/* ---------- content ---------- */}
        <div className="relative z-10 grid h-[calc(100%-84px)] grid-cols-1 items-center gap-10 px-8 pb-14 md:grid-cols-[1.15fr_0.85fr] md:px-16 lg:px-20">
          <div>
            <div className="mb-6 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[3px] text-accent">
              
              
              <span className="h-px w-10 bg-gradient-to-r from-accent to-transparent" />
            </div>

            <h1 className="max-w-[16ch] text-4xl font-extrabold leading-[1.08] tracking-[-0.01em] text-light md:text-6xl lg:text-[4.6rem]">
              Become a Certified Beauty Professional in{" "}
              <span className="bg-gradient-to-r from-accent via-[#f6c89a] to-accent bg-clip-text text-transparent">
                Moradabad
              </span>
            </h1>

            <p className="mt-7 max-w-[46ch] text-base leading-relaxed text-light/75 md:text-lg">
              Learn professional Makeup, Hair, Nail, Skin &amp; Cosmetology
              with 100% practical training, live model practice, and 100%
              placement support at Belleza Beauty School, Moradabad.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="#start-journey"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary to-[#5c0f27] px-8 py-4 text-sm font-bold tracking-wide text-light shadow-[0_12px_30px_rgba(121,21,53,0.5)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(121,21,53,0.6)]"
              >
                Explore Courses
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </a>
              <a
                href="#start-journey"
                className="inline-flex items-center border-b border-light/40 pb-1 text-sm font-semibold tracking-wide text-light/90 transition hover:border-accent hover:text-accent"
              >
                Book Free Counselling
              </a>
            </div>

            {/* premium trust strip */}
            <div className="mt-14 flex max-w-md items-center gap-6 border-t border-light/10 pt-6 text-light/70">
              <div>
                <p className="text-2xl font-extrabold text-light">4+</p>
                <p className="text-[11px] uppercase tracking-wider">Years Legacy</p>
              </div>
              <div className="h-8 w-px bg-light/15" />
              <div>
                <p className="text-2xl font-extrabold text-light">5,000+</p>
                <p className="text-[11px] uppercase tracking-wider">Graduates</p>
              </div>
              <div className="h-8 w-px bg-light/15" />
              <div>
                <p className="text-2xl font-extrabold text-light">Certified</p>
                <p className="text-[11px] uppercase tracking-wider">Curriculum</p>
              </div>
            </div>
          </div>

          {/* ---------- enquiry form ---------- */}
          <div id="start-journey" className="relative w-full scroll-mt-24 justify-self-end md:w-[380px]">
            <div className="absolute -inset-3 -z-10 rounded-[28px] bg-gradient-to-br from-accent/20 via-transparent to-primary/30 blur-xl" />
            <div className="rounded-[26px] border border-light/15 bg-[#150a0d]/60 p-9 shadow-[0_30px_70px_rgba(0,0,0,0.5)] ring-1 ring-white/5 backdrop-blur-2xl">
              {submitted ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl font-bold text-primary">
                    ✓
                  </div>
                  <h3 className="text-[20px] font-bold text-light">Thank You!</h3>
                  <p className="mt-2 max-w-[26ch] text-[13px] text-light/60">
                    We&apos;ve received your details — our team will reach out shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-[13px] font-semibold text-accent underline underline-offset-4"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-center text-[22px] font-bold tracking-tight text-light">
                    Start Your Journey
                  </h3>
                  <p className="mt-2 mb-7 text-center text-[13px] text-light/60">
                    Fill in your details and we&apos;ll get back to you
                  </p>
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
                    <div>
                      <div className="relative">
                        <User
                          size={16}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-light/40"
                        />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          className={`w-full rounded-xl border py-3.5 pl-11 pr-4 text-sm text-light placeholder:text-light/45 outline-none transition focus:bg-light/10 ${
                            errors.name
                              ? "border-red-400 bg-red-500/10 focus:border-red-400"
                              : "border-light/20 bg-light/[0.06] focus:border-accent"
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1.5 pl-1 text-xs text-red-300">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <div className="relative">
                        <Phone
                          size={16}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-light/40"
                        />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          className={`w-full rounded-xl border py-3.5 pl-11 pr-4 text-sm text-light placeholder:text-light/45 outline-none transition focus:bg-light/10 ${
                            errors.phone
                              ? "border-red-400 bg-red-500/10 focus:border-red-400"
                              : "border-light/20 bg-light/[0.06] focus:border-accent"
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1.5 pl-1 text-xs text-red-300">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className={`w-full rounded-xl border px-4 py-3.5 text-sm text-light outline-none transition focus:bg-light/10 ${
                          errors.course
                            ? "border-red-400 bg-red-500/10 focus:border-red-400"
                            : "border-light/20 bg-light/[0.06] focus:border-accent"
                        }`}
                      >
                        <option value="" disabled className="text-neutral-900">
                          Select a Course
                        </option>
                        {COURSES.map((c) => (
                          <option key={c} value={c} className="text-neutral-900">
                            {c}
                          </option>
                        ))}
                      </select>
                      {errors.course && (
                        <p className="mt-1.5 pl-1 text-xs text-red-300">{errors.course}</p>
                      )}
                    </div>

                    <div>
                      <div className="relative">
                        <MapPin
                          size={16}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-light/40"
                        />
                        <select
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className={`w-full rounded-xl border py-3.5 pl-11 pr-4 text-sm text-light outline-none transition focus:bg-light/10 ${
                            errors.location
                              ? "border-red-400 bg-red-500/10 focus:border-red-400"
                              : "border-light/20 bg-light/[0.06] focus:border-accent"
                          }`}
                        >
                          <option value="" disabled className="text-neutral-900">
                            Select Location
                          </option>
                          {LOCATIONS.map((loc) => (
                            <option key={loc} value={loc} className="text-neutral-900">
                              {loc}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.location && (
                        <p className="mt-1.5 pl-1 text-xs text-red-300">{errors.location}</p>
                      )}
                    </div>

                    <div>
                      <div className="relative">
                        <MessageSquare
                          size={16}
                          className="pointer-events-none absolute left-4 top-3.5 text-light/40"
                        />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Share a message (optional)"
                          rows={3}
                          className="w-full resize-none rounded-xl border border-light/20 bg-light/[0.06] py-3.5 pl-11 pr-4 text-sm text-light placeholder:text-light/45 outline-none transition focus:border-accent focus:bg-light/10"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-2 rounded-xl bg-gradient-to-r from-primary to-[#5c0f27] py-3.5 text-sm font-bold tracking-wide text-light shadow-[0_10px_26px_rgba(121,21,53,0.45)] transition hover:brightness-110"
                    >
                      Submit Enquiry
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ---------- scroll cue ---------- */}
        <motion.div
          className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-light/70"
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={22} />
        </motion.div>
      </section>
    </div>
  );
}
