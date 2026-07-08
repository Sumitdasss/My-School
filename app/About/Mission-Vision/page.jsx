"use client";

import React from "react";
import { Target, Eye } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-360 mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Mission */}
          <div className="bg-[#0A1628] text-white rounded-3xl p-10 md:p-14">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#D4AF37] p-4 rounded-2xl">
                <Target className="w-10 h-10 text-[#0A1628]" />
              </div>
              <h2 className="text-4xl font-serif font-bold">Our Mission</h2>
            </div>
            
            <p className="text-slate-300 text-lg leading-relaxed">
              To provide a high-quality, holistic education that nurtures academic excellence, 
              moral values, and leadership skills in every student. We strive to create a 
              learning environment where students develop critical thinking, creativity, 
              and a strong sense of social responsibility.
            </p>
            
            <div className="mt-10 grid grid-cols-2 gap-6 text-sm">
              <div className="border-l-4 border-[#D4AF37] pl-4">
                Academic Excellence
              </div>
              <div className="border-l-4 border-[#D4AF37] pl-4">
                Character Building
              </div>
              <div className="border-l-4 border-[#D4AF37] pl-4">
                Innovation & Creativity
              </div>
              <div className="border-l-4 border-[#D4AF37] pl-4">
                Community Service
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-[#F8F5F0] rounded-3xl p-10 md:p-14">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#0A1628] p-4 rounded-2xl">
                <Eye className="w-10 h-10 text-[#D4AF37]" />
              </div>
              <h2 className="text-4xl font-serif font-bold text-[#0A1628]">Our Vision</h2>
            </div>
            
            <p className="text-slate-700 text-lg leading-relaxed">
              To be a center of educational excellence that produces confident, 
              compassionate, and competent individuals who contribute positively to 
              society and become future leaders of Bangladesh.
            </p>

            <div className="mt-12 space-y-8">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#D4AF37] flex-shrink-0 mt-1" />
                <p className="text-slate-600">Producing future-ready citizens</p>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#D4AF37] flex-shrink-0 mt-1" />
                <p className="text-slate-600">Promoting ethical and moral values</p>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#D4AF37] flex-shrink-0 mt-1" />
                <p className="text-slate-600">Fostering innovation and creativity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}