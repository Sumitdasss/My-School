"use client";

import React from "react";
import { BookOpen, Download, Award } from "lucide-react";

export default function CurriculumSyllabus() {
  const curriculumData = [
    {
      level: "Class VI - VIII",
      curriculum: "National Curriculum (NCTB)",
      focus: "Foundation Building",
      subjects: "Bangla, English, Mathematics, Science, Social Science, Religion, Arts & Crafts",
      description: "Strong emphasis on basic concepts, creativity and moral education.",
    },
    {
      level: "Class IX - X",
      curriculum: "National Curriculum (NCTB)",
      focus: "SSC Preparation",
      subjects: "Bangla, English, Mathematics, Science, Social Science, Religion, ICT, Optional Subjects",
      description: "In-depth subject knowledge with practical learning and exam preparation.",
    },
  ];

  return (
    <section className="bg-[#F8F5F0] py-20 md:py-28">
      <div className="max-w-360 mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-semibold tracking-widest">ACADEMIC PROGRAM</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0A1628] mt-4">
            Curriculum & Syllabus
          </h2>
          <p className="text-slate-600 mt-4 max-w-lg mx-auto">
            Following the National Curriculum and Textbook Board (NCTB) with modern teaching approaches
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {curriculumData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#D4AF37]/10 p-4 rounded-2xl">
                  <BookOpen className="w-10 h-10 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-[#0A1628]">{item.level}</h3>
                  <p className="text-[#D4AF37] font-medium">{item.curriculum}</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-sm text-slate-500 mb-2">FOCUS AREA</p>
                  <p className="font-semibold text-lg">{item.focus}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500 mb-3">MAIN SUBJECTS</p>
                  <div className="flex flex-wrap gap-2">
                    {item.subjects.split(", ").map((subject, i) => (
                      <span
                        key={i}
                        className="bg-[#F8F5F0] px-5 py-2 text-sm rounded-full text-[#0A1628]"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed border-t border-slate-100 pt-6">
                  {item.description}
                </p>
              </div>

              <button className="mt-10 w-full flex items-center justify-center gap-3 bg-[#0A1628] hover:bg-black text-white py-4 rounded-2xl transition-all">
                <Download size={20} />
                Download Syllabus (PDF)
              </button>
            </div>
          ))}
        </div>

        {/* Extra Info */}
        <div className="mt-20 text-center bg-white rounded-3xl p-10 md:p-16 shadow">
          <Award className="mx-auto text-[#D4AF37] mb-6" size={48} />
          <p className="text-2xl font-serif italic max-w-2xl mx-auto text-[#0A1628]">
            Our curriculum is designed to develop not just knowledgeable students, but responsible and creative future leaders.
          </p>
        </div>
      </div>
    </section>
  );
}