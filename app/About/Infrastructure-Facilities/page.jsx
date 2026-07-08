"use client";

import React from "react";
import { BookOpen, Users, Award, Monitor, Microscope, Bus } from "lucide-react";

export default function InfrastructureFacilities() {
  const facilities = [
    {
      icon: <BookOpen className="w-10 h-10" />,
      title: "Modern Library",
      desc: "Well-stocked library with thousands of books, digital resources, and a peaceful reading environment.",
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Smart Classrooms",
      desc: "Technology-enabled classrooms with interactive boards and multimedia facilities.",
    },
    {
      icon: <Microscope className="w-10 h-10" />,
      title: "Science Laboratories",
      desc: "Fully equipped Physics, Chemistry, and Biology labs for practical learning.",
    },
    {
      icon: <Monitor className="w-10 h-10" />,
      title: "Computer Lab",
      desc: "Modern computer lab with high-speed internet and latest software.",
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: "Sports Facilities",
      desc: "Large playground, indoor games, and sports equipment for physical development.",
    },
    {
      icon: <Bus className="w-10 h-10" />,
      title: "School Transport",
      desc: "Safe and reliable bus service for students from different areas.",
    },
  ];

  return (
    <section className="bg-[#F8F5F0] py-20 md:py-28">
      <div className="max-w-360 mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-semibold tracking-widest">OUR CAMPUS</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0A1628] mt-4">
            Infrastructure & Facilities
          </h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            State-of-the-art facilities designed to support holistic learning and student development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-[#D4AF37]/20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37] mb-8 group-hover:scale-110 transition-transform">
                {facility.icon}
              </div>
              
              <h3 className="text-2xl font-semibold text-[#0A1628] mb-4">
                {facility.title}
              </h3>
              
              <p className="text-slate-600 leading-relaxed">
                {facility.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Extra Info */}
        <div className="mt-20 animate-float  text-center bg-white rounded-3xl p-10 md:p-16 shadow">
          <p className="text-2xl font-serif italic text-[#0A1628] max-w-3xl mx-auto">
            Our campus is designed not just for learning, but for inspiring young minds to dream big and achieve more.
          </p>
        </div>
      </div>
    </section>
  );
}