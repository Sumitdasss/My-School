"use client";

import React from "react";
import Link from "next/link";
import { School, Users, Award } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source 
          src="https://www.pexels.com/download/video/31889457/" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/50 via-[#0A1628]/50 to-[#0A1628]/50" />

      {/* Gold Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-5 sm:px-8 max-w-5xl mx-auto pt-16 pb-20 md:pt-20">
        
        {/* Badge */}
        <div className="inline-flex items-center pt-30 md:pt-0 gap-2 bg-white/10 backdrop-blur-lg px-6 py-2.5 rounded-full border border-[#D4AF37]/30 mb-6">
          <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
          <span className="text-[#D4AF37] text-sm font-medium tracking-widest">
            ESTD 1998 • GOALKHALI IDEAL HIGH SCHOOL
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.05] tracking-tighter mb-6">
          Shaping the <span className="text-[#D4AF37]">Future</span><br />
          of Education
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-10 md:mb-12">
          Goalkhali Ideal High School – Where Tradition Meets Excellence
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/admission/apply"
            className="group w-full sm:w-auto px-8 sm:px-12 py-4 bg-[#D4AF37] hover:bg-[#E8C65A] text-[#0A1628] font-semibold text-lg rounded-2xl transition-all hover:scale-105 shadow-xl shadow-[#D4AF37]/50 flex items-center justify-center gap-3"
          >
            Apply for Admission
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>

          <Link
            href="/about/virtual-tour"
            className="w-full sm:w-auto px-8 sm:px-12 py-4 border-2 border-white/80 hover:border-white text-white font-semibold text-lg rounded-2xl transition-all hover:bg-white/10 backdrop-blur-md"
          >
            Virtual Campus Tour
          </Link>
        </div>

        {/* Stats Section - 3 Columns with Proper Icons */}
        <div className="mt-16 md:mt-24 grid grid-cols-3 gap-8 sm:gap-12 text-center">
          
          {/* Students */}
          <div className="flex flex-col items-center">
            <School className="w-11 h-11 md:w-12 md:h-12 text-[#D4AF37] mb-4" />
            <p className="font-bold text-white text-3xl md:text-4xl">1000+</p>
            <p className="text-slate-300 mt-1">Students</p>
          </div>

          {/* Teachers */}
          <div className="flex flex-col items-center">
            <Users className="w-11 h-11 md:w-12 md:h-12 text-[#D4AF37] mb-4" />
            <p className="font-bold text-white text-3xl md:text-4xl">60+</p>
            <p className="text-slate-300 mt-1">Experienced Teachers</p>
          </div>

          {/* Years of Excellence */}
          <div className="flex flex-col items-center">
            <Award className="w-11 h-11 md:w-12 md:h-12 text-[#D4AF37] mb-4" />
            <p className="font-bold text-white text-3xl md:text-4xl">25+</p>
            <p className="text-slate-300 mt-1">Years of Excellence</p>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center text-white/60">
        <p className="text-xs tracking-widest mb-2">SCROLL TO EXPLORE</p>
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A1628] to-transparent" />
    </section>
  );
}