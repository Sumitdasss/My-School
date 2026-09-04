"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, Calendar, ArrowRight, Loader2, FileText } from "lucide-react";

export default function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://my-school-backend-iota.vercel.app/api/addnotice/allnotice")
      .then((res) => res.json())
      .then((data) => {
        setNotices(Array.isArray(data.data) ? data.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setNotices([]);
        setLoading(false);
      });
  }, []);

  const latestNotices = notices.slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-[#0c3750] py-20 md:py-28">
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#D4AF37]/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
        <div className="mb-14 text-center md:mb-16">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#D4AF37]/25 bg-white/5 px-5 py-2 backdrop-blur-md">
            <Bell className="h-4 w-4 animate-pulse text-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37]">
              LATEST UPDATES
            </span>
          </div>

          <h2 className="font-serif text-4xl font-bold tracking-tight text-white md:text-5xl">
            Notice Board
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-slate-400">
            Stay updated with the latest announcements and important notices
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-52 animate-pulse rounded-3xl border border-white/10 bg-white/5"
              />
            ))}
          </div>
        ) : latestNotices.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 py-20 text-center">
            <FileText className="mb-4 h-12 w-12 text-slate-500" />
            <p className="text-lg font-medium text-slate-300">No notices available</p>
            <p className="mt-1 text-sm text-slate-500">
              Check back later for new announcements
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {latestNotices.map((notice) => (
              <Link
                key={notice.id}
                href={`/Notice?id=${notice.id}`}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D4AF37]/40 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-[#D4AF37]/10"
              >
                {/* Top row */}
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="space-y-2.5">
                    {notice.urgent && (
                      <span className="inline-flex items-center rounded-full bg-red-500/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-red-400">
                        URGENT
                      </span>
                    )}
                    <p className="flex items-center gap-2 text-sm font-medium text-[#D4AF37]">
                      <Calendar className="h-4 w-4" />
                      {notice.date}
                    </p>
                  </div>

                  {notice.category && (
                    <span className="shrink-0 rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-slate-400">
                      {notice.category}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="mb-6 line-clamp-2 text-xl font-medium leading-snug text-white transition-colors group-hover:text-[#D4AF37] md:text-[1.35rem]">
                  {notice.title}
                </h3>

                {/* CTA */}
                <div className="inline-flex items-center gap-2 text-sm font-medium text-[#D4AF37] transition-all group-hover:gap-3">
                  Read Full Notice
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* View All Button */}
        {!loading && latestNotices.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/Notice"
              className="inline-flex items-center gap-2.5 rounded-2xl border border-[#D4AF37]/70 bg-transparent px-8 py-3.5 text-sm font-semibold text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0A1628] hover:shadow-lg hover:shadow-[#D4AF37]/20"
            >
              View All Notices
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}