"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import AccordionGallery from "@/components/AccordionGallery";

export default function GalleryPreview() {
  const galleryItems = [
    {
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
      label: "Cultural Festival 2026",
      link: "/gallery/cultural-festival",
    },
    {
      image:
        "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg",
      label: "Science & Innovation Fair",
      link: "/gallery/science-fair",
    },
    {
      image:
        "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
      label: "Independence Day Celebration",
      link: "/gallery/independence-day",
    },
    {
      image:
        "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg",
      label: "Annual Sports Day",
      link: "/gallery/sports-day",
    },
    {
      image:
        "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
      label: "Debate Competition",
      link: "/gallery/debate",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0A1628] py-12 sm:py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-5 md:px-8">

        {/* ================= HEADER ================= */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:mb-14 md:flex-row md:items-end">

          <div>
            <span className="text-sm font-semibold tracking-widest text-[#D4AF37] md:text-base">
              OUR MEMORIES
            </span>

            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              School Gallery
            </h2>
          </div>

          <Link
            href="/gallery"
            className="group inline-flex items-center gap-3 text-base font-medium text-[#D4AF37] transition-colors hover:text-white md:text-lg"
          >
            View Full Gallery

            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </Link>
        </div>

        {/* ================= ACCORDION GALLERY ================= */}
        <div className="w-full">
          <AccordionGallery
            items={galleryItems}
            defaultIndex={1}
            expandRatio={0.48}
            trigger="hover"
            accentColor="#D4AF37"
            overlayColor="#0A1628"
            textColor="#ffffff"
            grayscale
            showLabels
            duration={0.65}
            ease="power3.out"
            parallax={0.45}
            tilt={6}
            stagger={0.05}
            height={480}
            gap={12}
            radius={18}
            orientation="horizontal"
            className="w-full"
          />
        </div>

        {/* ================= CTA ================= */}
        <div className="mt-10 text-center md:mt-14">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 rounded-2xl bg-[#D4AF37] px-6 py-3.5 text-sm font-semibold text-[#0A1628] transition-all hover:scale-105 hover:bg-[#E8C65A] sm:px-8 md:px-10 md:py-4 md:text-lg"
          >
            Explore Complete Gallery

            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}