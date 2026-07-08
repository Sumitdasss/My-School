"use client";

import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { Trophy, Medal, Users, Award } from "lucide-react";

export default function Achievements() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const achievements = [
    {
      icon: <Trophy className="w-12 h-12" />,
      end: 100,
      suffix: "%",
      title: "SSC Pass Rate",
      desc: "Last 8 consecutive years",
    },
    {
      icon: <Medal className="w-12 h-12" />,
      end: 47,
      suffix: "",
      title: "National Awards",
      desc: "In academics & co-curricular",
    },
    {
      icon: <Users className="w-12 h-12" />,
      end: 1200,
      suffix: "+",
      title: "Alumni",
      desc: "Serving in prestigious institutions",
    },
    {
      icon: <Award className="w-12 h-12" />,
      end: 25,
      suffix: "",
      title: "Years of Excellence",
      desc: "Since 1998",
    },
  ];

  return (
    <section ref={sectionRef} className="bg-[#F8F5F0] py-20 md:py-28">
      <div className="max-w-360 mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-semibold tracking-widest">OUR JOURNEY</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0A1628] mt-4">
            Achievements & Milestones
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-3 border border-transparent hover:border-[#D4AF37]/20 text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#D4AF37]/10 to-transparent mb-8 text-[#D4AF37] group-hover:scale-110 transition-transform">
                {item.icon}
              </div>

              <div className="text-5xl md:text-6xl font-serif font-bold text-[#0A1628] mb-3">
                {isVisible ? (
                  <CountUp
                    end={item.end}
                    duration={2.5}
                    suffix={item.suffix}
                  />
                ) : (
                  "0"
                )}
              </div>

              <h4 className="text-xl font-semibold text-[#0A1628] mb-2">
                {item.title}
              </h4>

              <p className="text-slate-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 animate-float text-center bg-gradient-to-r from-[#0A1628] to-[#1A365D] text-white rounded-3xl p-12 md:p-16">
          <p className="text-2xl md:text-3xl font-serif italic max-w-3xl mx-auto">
            Our greatest achievement is not just the results we produce, but the character we build in every student.
          </p>
          <p className="mt-6 text-[#D4AF37] font-medium">— Principal, Goalkhali Ideal High School</p>
        </div>
      </div>
    </section>
  );
}