"use client";

import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="absolute inset-x-0 top-0 z-20  flex items-center justify-between px-8 py-7 md:px-16">
      {/* <div className="flex items-center">
        <Image
           src="https://res.cloudinary.com/dl6fjer3y/image/upload/v1782383362/belleza_favicon_main_lwrtxm.svg"
          alt="AD Global Logo"
          width={180}
          height={60}
          className="h-12 w-auto"
          unoptimized
        />
      </div> */}

      <div className="hidden gap-11 text-sm font-medium text-light/80 md:flex">
        <a href="#" className="transition hover:text-accent">Home</a>
        <a href="#" className="transition hover:text-accent">Courses</a>
        <a href="#" className="transition hover:text-accent">About</a>
        <a href="#" className="transition hover:text-accent">Contact</a>
        <a href="#start-journey" className="transition hover:text-accent">
          Start Your Journey
        </a>
      </div>

      <a
        href="#start-journey"
        className="rounded-full bg-accent px-6 py-3 text-[13px] font-bold tracking-wide text-primary shadow-[0_8px_24px_rgba(253,223,191,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(253,223,191,0.35)]"
      >
        Apply Now
      </a>
    </nav>
  );
}
