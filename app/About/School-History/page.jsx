"use client";

import React from "react";

export default function SchoolHistory() {
  const timeline = [
    {
      year: "1998",
      title: "Foundation",
      desc: "Goalkhali Ideal High School was established with a vision to provide quality education to the children of Goalkhali and surrounding areas.",
    },
    {
      year: "2005",
      title: "First SSC Batch",
      desc: "Our first batch of students appeared in the SSC examination and achieved outstanding results, setting a strong academic foundation.",
    },
    {
      year: "2012",
      title: "Infrastructure Development",
      desc: "New academic building, science labs, and library were constructed to support modern education.",
    },
    {
      year: "2018",
      title: "National Recognition",
      desc: "The school received national awards for consistent academic excellence and co-curricular activities.",
    },
    {
      year: "2025",
      title: "Digital Transformation",
      desc: "Smart classrooms, computer labs, and digital learning initiatives were introduced for 21st century education.",
    },
  ];

  return (
    <section className="bg-[#F8F5F0] py-20 md:py-28">
      <div className="max-w-360 mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-semibold tracking-widest">OUR LEGACY</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0A1628] mt-4">
            School History
          </h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            A journey of dedication, excellence, and community service since 1998
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-8 bottom-8 w-0.5 bg-[#D4AF37]/30" />

          <div className="space-y-16">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-12 items-start ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Year */}
                <div className="flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-[#D4AF37] text-[#0A1628] flex items-center justify-center font-serif font-bold text-2xl z-10 shadow-md">
                  {item.year}
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-semibold text-[#0A1628] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Message */}
        <div className="text-center mt-20 max-w-2xl mx-auto">
          <p className="text-2xl font-serif italic text-[#0A1628]">
            From a small beginning to a center of excellence — our journey continues with pride and purpose.
          </p>
        </div>
      </div>
    </section>
  );
}