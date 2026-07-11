"use client";

import { useEffect, useState } from "react";
import { Star, ArrowRight, Loader2 } from "lucide-react";

// ⚠️ Apna actual backend base URL yahan set karo (.env me NEXT_PUBLIC_API_URL rakho)
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

type CourseType = "offline" | "online" | "all";

interface CategoryRef {
  _id: string;
  name: string;
  slug?: string;
}

interface Course {
  _id: string;
  title: string;
  slug: string;
  category?: CategoryRef | null;
  // ⚠️ "type" field abhi backend schema me nahi hai.
  // Isko kaam karwane ke liye course.model.js me ye add karo:
  // type: { type: String, enum: ["offline", "online"], default: "offline" }
  type?: CourseType;
  thumbnail?: string | null;
  short_description?: string;
  description?: string;
  level?: string;
  rating?: number; // agar backend me rating field nahi hai to ye undefined rahega
}

interface ApiResponse {
  success: boolean;
  data: Course[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const FALLBACK_IMAGE = "/images/course-placeholder.jpg";

export default function CoursesSection() {
  const [courseType, setCourseType] = useState<CourseType>("all");
  const [category, setCategory] = useState<string>("all");
  const [categories, setCategories] = useState<CategoryRef[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Backend se courses fetch karo (category filter, page, limit ke sath)
  useEffect(() => {
    const controller = new AbortController();

    async function fetchCourses() {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", "9");
        if (category !== "all") params.set("categories", category);

        const res = await fetch(`${API_BASE}/course?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const json: ApiResponse = await res.json();

        if (!json.success) throw new Error("Courses fetch failed");

        let list = json.data || [];

        // NOTE: backend course model me "type" field exist nahi karta.
        // Isliye ONLINE/OFFLINE toggle ko type-based filter nahi karte.
        // Course display ke liye primary filter isActive + category (backend) hai.
        // Agar aap course me type chahte ho, to backend course model/schema me type add karna hoga.
        if (courseType !== "all") {
          // keep current list; no type filtering
        }


        setCourses(list);
        setTotalPages(json.pagination?.totalPages || 1);

        // Categories ko courses response se hi derive kar lo
        // (agar alag se /api/categories endpoint ho to wahan se fetch karna behtar hoga)
        setCategories((prev) => {
          const map = new Map(prev.map((c) => [c._id, c]));
          list.forEach((c) => {
            if (c.category?._id) map.set(c.category._id, c.category);
          });
          return Array.from(map.values());
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError((err as Error).message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
    return () => controller.abort();
  }, [category, courseType, page]);

  return (
    <section className="w-full bg-light py-20 lg:py-28">
      {/* ---------- offline / online toggle bar ---------- */}
      <div className="mb-10 grid grid-cols-2 border-y border-primary/10">
        <button
          onClick={() => {
            setCourseType("offline");
            setPage(1);
          }}
          className={`py-5 text-center text-sm font-bold tracking-[2px] transition ${
            courseType === "offline"
              ? "bg-accent text-primary"
              : "bg-light text-primary/50 hover:text-primary/80"
          }`}
        >
          OFFLINE COURSES
        </button>
        <button
          onClick={() => {
            setCourseType("online");
            setPage(1);
          }}
          className={`py-5 text-center text-sm font-bold tracking-[2px] transition ${
            courseType === "online"
              ? "bg-primary text-light"
              : "bg-light text-primary/50 hover:text-primary/80"
          }`}
        >
          ONLINE COURSES
        </button>
      </div>

      {/* ---------- category filter pills (dynamic, backend se) ---------- */}
      <div className="mb-14 flex flex-wrap items-center justify-center gap-3 px-6">
        <button
          onClick={() => {
            setCategory("all");
            setPage(1);
          }}
          className={`rounded-full border px-6 py-2.5 text-sm font-semibold capitalize transition ${
            category === "all"
              ? "border-primary bg-primary text-light"
              : "border-primary/25 bg-transparent text-primary/70 hover:border-primary/50 hover:text-primary"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => {
              setCategory(cat._id);
              setPage(1);
            }}
            className={`rounded-full border px-6 py-2.5 text-sm font-semibold capitalize transition ${
              category === cat._id
                ? "border-primary bg-primary text-light"
                : "border-primary/25 bg-transparent text-primary/70 hover:border-primary/50 hover:text-primary"
            }`}
          >
            {cat.name}
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

      {/* ---------- loading / error states ---------- */}
      {loading && (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      )}

      {!loading && error && (
        <p className="col-span-full py-16 text-center text-red-500">
          {error}
        </p>
      )}

      {/* ---------- course grid ---------- */}
      {!loading && !error && (
        <>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}

            {courses.length === 0 && (
              <p className="col-span-full py-16 text-center text-neutral-400">
                No courses found in this category yet.
              </p>
            )}
          </div>

          {/* ---------- pagination ---------- */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-full border border-primary/25 px-5 py-2 text-sm font-semibold text-primary/70 disabled:opacity-40"
              >
                Prev
              </button>
              <span className="text-sm text-neutral-500">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-full border border-primary/25 px-5 py-2 text-sm font-semibold text-primary/70 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function CourseCard({ course }: { course: Course }) {
  const rating = course.rating ?? 0;

  return (
    <div className="group overflow-hidden rounded-2xl border border-primary/10 bg-light shadow-sm transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-72 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={course.thumbnail || FALLBACK_IMAGE}
          alt={course.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {course.category?.name && (
          <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary shadow">
            {course.category.name}
          </span>
        )}
      </div>

      <div className="p-6">
        {rating > 0 && (
          <div className="mb-3 flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={15}
                className={i < rating ? "fill-accent text-accent" : "text-neutral-200"}
              />
            ))}
            <span className="ml-1 text-xs font-medium text-neutral-400">
              ({rating}/5)
            </span>
          </div>
        )}

        <h3 className="text-lg font-bold leading-snug text-primary">
          {course.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">
          {course.short_description || course.description}
        </p>

        <a
          href={`/course/${course.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-secondary transition group-hover:gap-2.5 hover:text-primary"
        >
          View Details
          <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}
