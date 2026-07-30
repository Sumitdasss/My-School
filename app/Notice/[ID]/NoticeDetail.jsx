"use client";

import { BiArrowToLeft, BiCalendar, BiTag } from "react-icons/bi";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NoticeDetails({ id }) {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotice = async () => {
      try {
        const res = await fetch("/api/Notice");
        const data = await res.json();

        setNotices(data.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadNotice();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading...
      </div>
    );
  }

  const notice = notices.find(
    (item) => Number(item.id) === Number(id)
  );

  if (!notice) {
    return (
      <div className="text-center py-20 text-red-500 text-2xl">
        Notice Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <div className="max-w-6xl mx-auto px-5 pt-8">
        <Link
          href="/notice"
          className="inline-flex items-center gap-2 text-[#D4AF37]"
        >
          <BiArrowToLeft size={20} />
          Back to All Notices
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-5 py-10">
        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="flex gap-5 mb-6">
            <span className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
              <BiTag />
              {notice.category}
            </span>

            <span className="flex items-center gap-2 text-gray-500">
              <BiCalendar />
              {notice.date}
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-6">
            {notice.title}
          </h1>

          <p className="text-gray-700 whitespace-pre-line">
            {notice.description}
          </p>
        </div>
      </div>
    </div>
  );
}