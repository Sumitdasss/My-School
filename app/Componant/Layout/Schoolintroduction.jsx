"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Award, Users, Clock } from "lucide-react";

export default function SchoolIntroduction() {
  return (
    <section className="bg-gradient-to-r from-[#0A1628] via-[#10243D] to-[#1A365D] py-16 md:py-24 lg:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Image (Now on top in mobile) */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-3xl -rotate-2 transition-transform group-hover:rotate-1" />
            
            <img 
              src="https://images.pexels.com/photos/31862778/pexels-photo-31862778.jpeg" 
              alt="Goalkhali Ideal High School Campus"
              className="relative rounded-3xl shadow-2xl w-full h-full object-cover aspect-[16/10] md:aspect-[4/3]"
            />

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-4 md:-right-6 bg-[#0A1628] border animate-float border-[#D4AF37]/30 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#D4AF37]/10 rounded-xl">
                  <GraduationCap className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm md:text-base">Excellence Since 1998</p>
                  <p className="text-[#D4AF37] text-xs md:text-sm">25+ Years of Legacy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            <div>
              <span className="text-[#D4AF37] font-semibold tracking-widest text-sm">WELCOME TO</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight mt-3">
                Goalkhali Ideal<br />High School
              </h2>
            </div>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              Welcome to Goalkhali Ideal High School, where academic excellence meets character development. 
              For over 25 years, we have been nurturing young minds with quality education, strong values, 
              and a passion for lifelong learning.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-4">
                <Award className="w-8 h-8 text-[#D4AF37] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold">Academic Excellence</h4>
                  <p className="text-slate-400 text-sm">100% pass rate in SSC for last 8 years</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Users className="w-8 h-8 text-[#D4AF37] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold">Holistic Development</h4>
                  <p className="text-slate-400 text-sm">Sports, Arts, Debate & Leadership</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="w-8 h-8 text-[#D4AF37] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold">Modern Facilities</h4>
                  <p className="text-slate-400 text-sm">Smart Classrooms & Science Labs</p>
                </div>
              </div>

              <div className="flex gap-4">
                <GraduationCap className="w-8 h-8 text-[#D4AF37] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold">Dedicated Faculty</h4>
                  <p className="text-slate-400 text-sm">60+ Experienced Teachers</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 group px-8 py-4 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A1628] font-semibold rounded-2xl transition-all text-base"
              >
                Know Our Story
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}