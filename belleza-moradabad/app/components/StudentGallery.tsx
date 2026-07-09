"use client";

// Replace with your own campus/studio photos in /public/images/gallery-bento/
const GALLERY = {
  studio: { image: "/images/gallery-bento/studio.jpg", caption: "Makeup Studio" },
  hairBay: { image: "/images/gallery-bento/hair-bay.jpg", caption: "Hair Styling Bay" },
  lab: { image: "/images/gallery-bento/lab.jpg", caption: "Practical Lab" },
  classroom: { image: "/images/gallery-bento/classroom.jpg", caption: "Classroom Session" },
  graduation: { image: "/images/gallery-bento/graduation.jpg", caption: "Graduation Day" },
};

export default function StudentGallery() {
  return (
    <section className="w-full bg-light py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* ---------- heading row ---------- */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-primary sm:text-5xl">
            Inside Our
            <br />
            <span className="text-secondary">Academy &amp; Beyond</span>
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-neutral-500 sm:text-right">
            A glimpse of our classrooms, practical labs, and student life on
            campus.
          </p>
        </div>

        {/* ---------- bento grid ---------- */}
        {/* top: one large image + two stacked images beside it */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">
          <GalleryTile item={GALLERY.studio} className="h-[280px] sm:h-[380px] lg:h-[520px]" />
          <div className="grid grid-rows-2 gap-5">
            <GalleryTile item={GALLERY.hairBay} className="h-[190px] sm:h-[248px]" />
            <GalleryTile item={GALLERY.lab} className="h-[190px] sm:h-[248px]" />
          </div>
        </div>

        {/* bottom: two images side by side, full width */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <GalleryTile item={GALLERY.classroom} className="h-[240px] sm:h-[280px]" />
          <GalleryTile item={GALLERY.graduation} className="h-[240px] sm:h-[280px]" />
        </div>
      </div>
    </section>
  );
}

function GalleryTile({
  item,
  className,
}: {
  item: { image: string; caption: string };
  className: string;
}) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-neutral-100 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.caption}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <p className="absolute bottom-4 left-5 text-base font-bold text-light">{item.caption}</p>
    </div>
  );
}
