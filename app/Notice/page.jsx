"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function NoticeContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotices = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/addnotice/allnotice"
        );

        if (!res.ok) {
          throw new Error("Failed to load notices");
        }

        const data = await res.json();

        console.log("Notice API Data:", data);

        setNotices(data.data || []);
      } catch (err) {
        console.log("Notice Load Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadNotices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Loading...
        </h1>
      </div>
    );
  }

  // ===============================
  // ALL NOTICE LIST
  // ===============================

  if (!id) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] py-12 px-5">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl font-bold mb-8">
            All Notices
          </h1>

          {notices.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl text-center">
              No Notice Available
            </div>
          ) : (
            <div className="space-y-4">
              {notices.map((notice) => (
                <Link
                  key={notice.id}
                  href={`/Notice?id=${notice.id}`}
                  className="block bg-white rounded-2xl shadow p-6 hover:shadow-xl transition"
                >
                  <div className="flex gap-4 mb-3">

                    <span className="bg-yellow-100 px-3 py-1 rounded-full">
                      {notice.category}
                    </span>

                    <span>
                      {notice.date}
                    </span>

                    {notice.urgent && (
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
                        Urgent
                      </span>
                    )}

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
          )}

        </div>
      </div>
    );
  }

  // ===============================
  // NOTICE DETAILS
  // ===============================

  const notice = notices.find(
    (item) => String(item.id) === String(id)
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
    <div className="min-h-screen bg-[#F8F5F0] py-10 px-5">

      <div className="max-w-5xl mx-auto">

        <Link
          href="/Notice"
          className="text-yellow-600 font-bold"
        >
          ← Back
        </Link>

        <div className="bg-white rounded-3xl shadow-xl mt-8 p-10">

          <div className="flex gap-5 mb-6">

            <span className="font-semibold">
              {notice.category}
            </span>

            <span>
              {notice.date}
            </span>

            {notice.urgent && (
              <span className="text-red-500 font-bold">
                Urgent
              </span>
            )}

          </div>

          <h1 className="text-5xl font-bold mb-8">
            {notice.title}
          </h1>

          <p className="whitespace-pre-line text-gray-700">
            {notice.description}
          </p>

{notice.attachment && (
  <a
    href={notice.attachment.replace(
      "/raw/upload/",
      "/raw/upload/fl_attachment/"
    )}
    className="inline-flex mt-8 items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl"
  >
    Download Attachment
  </a>
)}

        </div>
      </div>
    </div>
  );
}

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