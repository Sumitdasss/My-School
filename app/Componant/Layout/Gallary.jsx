"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function GalleryPreview() {
  const galleryImages = [
    {
      src: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
      alt: "Annual Cultural Program",
      title: "Cultural Festival 2026",
    },
    {
      src: "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg",
      alt: "Science Fair",
      title: "Science & Innovation Fair",
    },
    {
      src: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
      alt: "Independence Day",
      title: "Independence Day Celebration",
    },
    {
      src: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg",
      alt: "Sports Day",
      title: "Annual Sports Day",
    },
  ];

  return (
    <section className="bg-[#0A1628] py-12 sm:py-16 md:py-24 lg:py-28 relative overflow-hidden">
      <div className="max-w-360 mx-auto px-4 sm:px-5 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 md:mb-12">
          <div>
            <span className="text-[#D4AF37] tracking-widest font-semibold text-sm md:text-base">
              OUR MEMORIES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mt-3 leading-tight">
              School Gallery
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 text-[#D4AF37] hover:text-white transition-colors font-medium group text-base md:text-lg"
          >
            View Full Gallery
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </Link>
        </div>

        {/* Gallery Grid - Responsive: 1 col mobile, 2 col tablet, 3 col md-lg, 4 col xl */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl aspect-[4/3] md:aspect-[5/4] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <img
                src={image.src}
                alt={image.alt}
             
               
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm sm:text-base md:text-lg font-medium leading-tight">
                  {image.title}
                </p>
              </div>

              {/* Hover Indicator */}
              <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/10 backdrop-blur-md text-white text-xs px-3 md:px-4 py-1 md:py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                View Photo
              </div>
            </div>
          ))}
        </div>

        {/* Extra Call to Action */}
        <div className="text-center mt-12 md:mt-16">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 px-6 sm:px-8 md:px-10 py-3.5 md:py-4 bg-[#D4AF37] hover:bg-[#E8C65A] text-[#0A1628] font-semibold rounded-2xl transition-all hover:scale-105 text-sm sm:text-base md:text-lg"
          >
            Explore Complete Gallery
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}