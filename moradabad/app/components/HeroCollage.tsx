"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";

// Replace these with your own academy photos.
// Path rule for Next.js: a file at  public/images/hero/photo-1.jpg
// is referenced here as "/images/hero/photo-1.jpg" (case-sensitive,
// include the correct extension). If a circle shows blank/broken,
// the path below doesn't match an actual file in /public.
const IMAGES = {
  topLeft: "/images/4.png",
  topRight: "/images/4.png",
  midRight: "/images/4.png",
  bottomLeft: "/images/4.png",
  bottomRight: "/images/4.png",
};

export default function HeroCollage() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#3a0a1a] via-primary to-[#8c2a4d]">
      {/* soft glow blobs — gives the background actual depth instead of a flat gradient */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full bg-accent/25 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-[520px] w-[520px] rounded-full bg-secondary/30 blur-[130px]" />

      {/* visible dot-pattern texture, like the reference background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.8) 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* vertical "APPLY NOW" tab, fixed to the right edge */}
      <a
        href="#apply"
        className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-l-md bg-black/60 px-2 py-4 text-[11px] font-bold tracking-[3px] text-light backdrop-blur-sm transition hover:bg-primary"
        style={{ writingMode: "vertical-rl" }}
      >
        APPLY NOW
      </a>

      <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-6 py-20 md:grid-cols-2 md:px-12 lg:py-28">
        {/* ---------- image collage ---------- */}
        <div className="relative mx-auto h-[420px] w-full max-w-[560px] sm:h-[520px] md:h-[600px]">
          <FloatingCircle src={IMAGES.topLeft} className="left-0 top-0 w-[46%]" delay={0} />
          <FloatingCircle src={IMAGES.topRight} className="right-[6%] top-0 w-[40%]" delay={0.4} />
          <FloatingCircle src={IMAGES.midRight} className="right-0 top-[38%] w-[38%]" delay={0.8} />
          <FloatingCircle src={IMAGES.bottomLeft} className="bottom-0 left-[2%] w-[48%]" delay={1.2} />
          <FloatingCircle src={IMAGES.bottomRight} className="bottom-[2%] right-[16%] w-[40%]" delay={1.6} />
        </div>

        {/* ---------- copy ---------- */}
        <div className="text-center md:text-left">
          <p className="text-lg font-medium tracking-wide text-light/80 md:text-xl">
            Professional Course In
          </p>
          <h1 className="mt-2 text-4xl font-extrabold leading-[1.1] text-light sm:text-5xl lg:text-6xl">
            Beauty, Hair
            <br />
            <span className="text-accent">&amp; Makeup</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-light/75 md:mx-0 md:text-base">
            Learn from certified experts and turn your passion for beauty into
            a professional, industry-ready career.
          </p>
          <div className="mt-9 flex justify-center gap-4 md:justify-start">
            <a
              href="#apply"
              className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-sm font-bold tracking-wide text-primary shadow-[0_10px_26px_rgba(253,223,191,0.35)] transition hover:-translate-y-0.5"
            >
              Enquire Now
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* ---------- floating contact buttons ---------- */}
      <div className="fixed bottom-6 left-6 z-30 flex flex-col gap-3">
        <a
          href="tel:+910000000000"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-light shadow-lg transition hover:scale-105"
          aria-label="Call us"
        >
          <Phone size={20} />
        </a>
        <a
          href="https://wa.me/910000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-light shadow-lg transition hover:scale-105"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={20} />
        </a>
      </div>
    </section>
  );
}

function FloatingCircle({
  src,
  className,
  delay,
}: {
  src: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      // aspect-square is the fix: it forces height to always equal
      // width, so the circle stays a perfect circle no matter what
      // the parent container's own width/height ratio is.
      className={`absolute aspect-square overflow-hidden rounded-full border-[6px] border-light bg-secondary/20 shadow-2xl ${className}`}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {/* Swap for next/image if you want automatic optimization:
          <Image src={src} alt="" fill className="object-cover" /> */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-cover" />
    </motion.div>
  );
}
