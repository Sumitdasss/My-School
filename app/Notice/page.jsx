"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

function NoticeContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const targetRef = useRef();

  useEffect(() => {
    const loadNotices = async () => {
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

    loadNotices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  // ----------- Notice List ----------
  if (!id) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] py-12 px-5">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">All Notices</h1>

          <div className="space-y-4">
            {notices.map((notice) => (
              <Link
                key={notice.id}
                href={`/Notice?id=${notice.id}`}
                className="block bg-white rounded-2xl shadow p-6 hover:shadow-xl"
              >
                <div className="flex gap-4 mb-3">
                  <span className="bg-yellow-100 px-3 py-1 rounded-full">
                    {notice.category}
                  </span>

                  <span>{notice.date}</span>
                </div>

                <h2 className="text-2xl font-bold">
                  {notice.title}
                </h2>

                <p className="mt-2 text-gray-600">
                  {notice.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ----------- Notice Details ----------

  const notice = notices.find(
    (item) => Number(item.id) === Number(id)
  );

  if (!notice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Notice Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5F0] py-10">
      <div className="max-w-5xl mx-auto">

        <Link
          href="/Notice"
          className="text-yellow-600 font-bold"
        >
          ← Back
        </Link>

        <div className="bg-white rounded-3xl shadow-xl mt-8 p-10">

          <div className="flex gap-5 mb-6">
            <span>{notice.category}</span>
            <span>{notice.date}</span>
          </div>

          <h1 className="text-5xl font-bold mb-8">
            {notice.title}
          </h1>

          <p className="whitespace-pre-line">
            {notice.description}
          </p>

          <a
            href={notice.attachment}
            download
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl"
          >
            Download PDF
          </a>

        </div>
      </div>
    </div>
  );
}


// ========================================
// MAIN PAGE
// ========================================

export default function Notice() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-2xl font-bold">
            Loading...
          </h1>
        </div>
      }
    >
      <NoticeContent />
    </Suspense>
  );
}