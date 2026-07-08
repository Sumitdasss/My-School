"use client";

import React from "react";
import Link from "next/link";
import { Bell, Calendar, ArrowRight } from "lucide-react";
import { notices } from "../../../Data/Data"; // আপনার ডাটা ফাইল

export default function NoticeBoard() {
  // শুধু Admission Related Notices ফিল্টার করা হয়েছে
  const admissionNotices = notices
    .filter(notice => 
      notice.category?.toLowerCase().includes("admission") || 
      notice.title?.toLowerCase().includes("admission")
    )
   // সর্বোচ্চ ৪টা দেখাবে

  return (
    <section className="bg-[#0c3750] py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        
        {/* Animated Headline */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-[#D4AF37]/30 mb-6">
            <Bell className="text-[#D4AF37] animate-bounce" size={22} />
            <span className="text-[#D4AF37] font-semibold tracking-widest text-sm">ADMISSION UPDATES</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Admission Notice Board
          </h2>
          <p className="text-slate-400 mt-4 max-w-md mx-auto">
            Latest admission related announcements and important notices
          </p>
        </div>

        {/* Notice Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {admissionNotices.length > 0 ? (
            admissionNotices.map((notice) => (
              <Link
                key={notice.id}
                href={`/Notice?id=${notice.id}`}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#D4AF37]/40 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#D4AF37]/10"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    {notice.urgent && (
                      <span className="inline-block px-4 py-1 text-xs font-semibold bg-red-500/10 text-red-400 rounded-full mb-3">
                        URGENT
                      </span>
                    )}
                    <p className="text-[#D4AF37] text-sm font-medium flex items-center gap-2">
                      <Calendar size={16} />
                      {notice.date}
                    </p>
                  </div>

                  <span className="text-xs uppercase tracking-widest text-slate-400 bg-white/5 px-3 py-1 rounded-full">
                    {notice.category}
                  </span>
                </div>

                <h3 className="text-white text-xl md:text-2xl font-medium leading-tight mb-6 group-hover:text-[#D4AF37] transition-colors">
                  {notice.title}
                </h3>

                <div className="inline-flex items-center gap-2 text-[#D4AF37] group-hover:gap-3 transition-all">
                  Read Full Notice
                  <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 text-slate-400">
              No admission notices available at the moment.
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/admission/notice"
            className="inline-flex items-center gap-3 px-10 py-4 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A1628] rounded-2xl font-semibold transition-all"
          >
            View All Admission Notices
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>



      
    </section>
  );
}

