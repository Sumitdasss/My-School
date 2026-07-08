"use client";

import React from "react";

export default function ClassListAndSubjects() {
  const classes = [
    {
      className: "Class VI",
      sections: "A, B, C",
      students: "120",
      subjects: ["Bangla", "English", "Mathematics", "Science", "Social Science", "Religion"],
    },
    {
      className: "Class VII",
      sections: "A, B, C",
      students: "135",
      subjects: ["Bangla", "English", "Mathematics", "Science", "Social Science", "Religion"],
    },
    {
      className: "Class VIII",
      sections: "A, B, C",
      students: "110",
      subjects: ["Bangla", "English", "Mathematics", "Science", "Social Science", "Religion"],
    },
    {
      className: "Class IX",
      sections: "A, B",
      students: "95",
      subjects: ["Bangla", "English", "Mathematics", "Science", "Social Science", "Religion", "ICT"],
    },
    {
      className: "Class X",
      sections: "A, B",
      students: "85",
      subjects: ["Bangla", "English", "Mathematics", "Science", "Social Science", "Religion", "ICT"],
    },
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-360 mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-semibold tracking-widest">ACADEMIC PROGRAM</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0A1628] mt-4">
            Class List & Subjects
          </h2>
          <p className="text-slate-600 mt-4 max-w-md mx-auto">
            Our structured curriculum designed for holistic development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((cls, index) => (
            <div
              key={index}
              className="bg-white border border-[#D4AF37]/20 rounded-3xl p-8 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-bold text-[#0A1628]">{cls.className}</h3>
                  <p className="text-[#D4AF37] font-medium">Sections: {cls.sections}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">Students</p>
                  <p className="text-2xl font-semibold text-[#0A1628]">{cls.students}</p>
                </div>
              </div>

              <div>
                <p className="text-slate-500 text-sm mb-3">SUBJECTS</p>
                <div className="flex flex-wrap gap-2">
                  {cls.subjects.map((subject, i) => (
                    <span
                      key={i}
                      className="bg-[#F8F5F0] text-[#0A1628] px-4 py-2 text-sm rounded-full"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="text-center mt-16 text-sm text-slate-500 bg-[#F8F5F0] py-6 rounded-2xl">
          * Curriculum follows the National Curriculum and Textbook Board (NCTB), Bangladesh
        </div>
      </div>
    </section>
  );
}