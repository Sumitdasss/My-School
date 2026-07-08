import { BiArrowToLeft, BiCalendar, BiTag } from "react-icons/bi";
import { notices } from "../../../Data/Data";
import { notFound } from "next/navigation";
import Link from "next/link";
export default async function NoticeDetails({ id }) {
  const notice = notices.find((item) => item.id === Number(id));
  if (!notice) return notFound();
  return (
<div className="min-h-screen bg-[#F8F5F0]">
      {/* Back Button */}
      <div className="max-w-360 mx-auto px-5 pt-8">
        <Link
          href="/notice"
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