"use client";

import { useState } from "react";
import { Star, ArrowRight } from "lucide-react";

type CourseType = "offline" | "online";
type Category = "all" | "makeup" | "hair" | "combo";

interface Course {
  id: string;
  title: string;
  category: Exclude<Category, "all">;
  type: CourseType;
  image: string;
  rating: number;
  description: string;
}

// Replace image paths with your own course photos in /public/images/courses/
const COURSES: Course[] = [
  {
    id: "1",
    title: "Certificate in Basic Beauty Therapist",
    category: "makeup",
    type: "offline",
    image: "/images/courses/course-1.jpg",
    rating: 4,
    description:
      "Cosmetology, health & hygiene, sterilization & sanitation, skin diseases & disorders, nail art basics.",
  },
  {
    id: "2",
    title: "Certificate in Art of Makeup (AMU)",
    category: "makeup",
    type: "offline",
    image: "/images/courses/course-2.jpg",
    rating: 4,
    description:
      "Self makeup, day/night party makeup, cocktail makeup, haldi makeup, and bridal styling fundamentals.",
  },
  {
    id: "3",
    title: "Advance Diploma in Pro Artistry Makeup",
    category: "makeup",
    type: "online",
    image: "/images/courses/course-3.jpg",
    rating: 4,
    description:
      "Advanced art of makeup, editorial & HD makeup, portfolio building, and professional bridal packages.",
  },
  {
    id: "4",
    title: "Professional Hair Styling Certification",
    category: "hair",
    type: "offline",
    image: "/images/courses/course-4.jpg",
    rating: 5,
    description:
      "Cutting techniques, blow-dry styling, updos, hair coloring fundamentals, and modern trending looks.",
  },
  {
    id: "5",
    title: "Advanced Hair Color & Texture",
    category: "hair",
    type: "online",
    image: "/images/courses/course-5.jpg",
    rating: 4,
    description:
      "Global colouring techniques, balayage, keratin treatments, and hair texture correction methods.",
  },
  {
    id: "6",
    title: "Complete Beauty & Hair Combo Diploma",
    category: "combo",
    type: "offline",
    image: "/images/courses/course-6.jpg",
    rating: 5,
    description:
      "Our flagship program covering makeup artistry, hair styling, skin therapy, and salon business basics.",
  },
];

const CATEGORY_TABS: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Makeup", value: "makeup" },
  { label: "Hair", value: "hair" },
  { label: "Combo", value: "combo" },
];

export default function CoursesSection() {
  const [courseType, setCourseType] = useState<CourseType>("offline");
  const [category, setCategory] = useState<Category>("all");

  const filtered = COURSES.filter(
    (c) => c.type === courseType && (category === "all" || c.category === category)
  );

  return (
    <section className="w-full bg-light py-20 lg:py-28">
      {/* ---------- offline / online toggle bar ---------- */}
      <div className="mb-10 grid grid-cols-2 border-y border-primary/10">
        <button
          onClick={() => setCourseType("offline")}
          className={`py-5 text-center text-sm font-bold tracking-[2px] transition ${
            courseType === "offline"
              ? "bg-accent text-primary"
              : "bg-light text-primary/50 hover:text-primary/80"
          }`}
        >
          OFFLINE COURSES
        </button>
        <button
          onClick={() => setCourseType("online")}
          className={`py-5 text-center text-sm font-bold tracking-[2px] transition ${
            courseType === "online"
              ? "bg-primary text-light"
              : "bg-light text-primary/50 hover:text-primary/80"
          }`}
        >
          ONLINE COURSES
        </button>
      </div>

      {/* ---------- category filter pills ---------- */}
      <div className="mb-14 flex flex-wrap items-center justify-center gap-3 px-6">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setCategory(tab.value)}
            className={`rounded-full border px-6 py-2.5 text-sm font-semibold capitalize transition ${
              category === tab.value
                ? "border-primary bg-primary text-light"
                : "border-primary/25 bg-transparent text-primary/70 hover:border-primary/50 hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ---------- heading ---------- */}
      <div className="mx-auto mb-16 max-w-2xl px-6 text-center">
        <div className="mb-4 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[3px] text-secondary">
          <span className="h-px w-8 bg-secondary/50" />
          Explore &amp; Enroll
          <span className="h-px w-8 bg-secondary/50" />
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
          Our Professional Courses
        </h2>
        <p className="mt-5 text-base leading-relaxed text-neutral-500">
          Our globally recognized curriculum and career-focused approach help
          students master beauty skills and confidently step into the
          professional industry.
        </p>
      </div>

      {/* ---------- course grid ---------- */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full py-16 text-center text-neutral-400">
            No courses found in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-primary/10 bg-light shadow-sm transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-72 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary shadow">
          {course.category}
        </span>
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={15}
              className={i < course.rating ? "fill-accent text-accent" : "text-neutral-200"}
            />
          ))}
          <span className="ml-1 text-xs font-medium text-neutral-400">
            ({course.rating}/5)
          </span>
        </div>

        <h3 className="text-lg font-bold leading-snug text-primary">{course.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">
          {course.description}
        </p>

        <a
          href="#"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-secondary transition group-hover:gap-2.5 hover:text-primary"
        >
          View Details
          <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}
