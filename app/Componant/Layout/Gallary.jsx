"use client";

import React from "react";
import Link from "next/link";

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
    <section className="bg-[#0A1628] py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-360 mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-[#D4AF37] tracking-widest font-semibold">OUR MEMORIES</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mt-3">
              School Gallery
            </h2>
          </div>
          <Link
            href="/gallery"
            className="mt-6 md:mt-0 inline-flex items-center gap-3 text-[#D4AF37] hover:text-white transition-colors font-medium group"
          >
            View Full Gallery 
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl aspect-[4/3] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <img
                src={image.src}
                alt={image.alt}
           
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-lg font-medium leading-tight">
                  {image.title}
                </p>
              </div>

              {/* Hover Indicator */}
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                View
              </div>
            </div>
          ))}
        </div>

        {/* Extra Call to Action */}
        <div className="text-center mt-16">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#D4AF37] hover:bg-[#E8C65A] text-[#0A1628] font-semibold rounded-2xl transition-all hover:scale-105"
          >
            Explore Complete Gallery
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}