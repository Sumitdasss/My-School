"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BiArrowToLeft, BiCalendar, BiTag } from "react-icons/bi";
import { notices } from "../../Data/Data";

function NoticeContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // ---------- id নাই → List Page দেখাও ----------
  if (!id) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] py-12 px-5">
        <div className="max-w-360 mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0A1628] mb-8">
            All Notices
          </h1>

          <div className="space-y-4">
            {notices.map((notice) => (
              <Link
                key={notice.id}
                href={`/Notice?id=${notice.id}`}
                className="block bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all"
              >
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <span className="inline-flex items-center gap-2 bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full text-sm font-medium">
                    <BiTag size={14} />
                    {notice.category}
                  </span>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <BiCalendar size={16} />
                    {notice.date}
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-[#0A1628]">
                  {notice.title}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ---------- id আছে → Detail Page দেখাও ----------
  const notice = notices.find((item) => item.id === Number(id));

  if (!notice) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F5F0]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0A1628] mb-4">
            Notice not found
          </h1>
          <Link href="/Notice" className="text-[#D4AF37] font-medium">
            Back to All Notices
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* Back Button */}
      <div className="max-w-360 mx-auto px-5 pt-8">
        <Link
          href="/Notice"
          className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#0A1628] font-medium transition-colors"
        >
          <BiArrowToLeft size={20} />
          Back to All Notices
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-5 md:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {/* Category & Date */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="inline-flex items-center gap-2 bg-[#D4AF37]/10 text-[#D4AF37] px-4 py-2 rounded-full text-sm font-medium">
              <BiTag size={16} />
              {notice.category}
            </span>

            <div className="flex items-center gap-2 text-slate-500">
              <BiCalendar size={18} />
              <span>{notice.date}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1628] leading-tight mb-10">
            {notice.title}
          </h1>

          {/* Description */}
          <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed whitespace-pre-line">
            {notice.description}
          </div>

          {/* Download Button (Optional) */}
          {notice.attachment && (
            <div className="mt-12 pt-8 border-t">
              <a
                href={notice.attachment}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] hover:bg-[#E8C65A] text-[#0A1628] font-semibold rounded-2xl transition-all"
              >
                Download Attachment (PDF)
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// useSearchParams ব্যবহার করলে Suspense দিয়ে wrap করা must (Next.js requirement)
export default function NoticePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F8F5F0]">
          <p className="text-slate-500">Loading...</p>
        </div>
      }
    >
      <NoticeContent />
    </Suspense>
  );
}
