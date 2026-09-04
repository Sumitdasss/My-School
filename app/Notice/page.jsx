/* eslint-disable react-hooks/static-components */
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const INK = "#16213E";
const INK_SOFT = "#4B5768";
const BRASS = "#A2801F";
const BRICK = "#A63D2F";
const LINE = "#D8DEE6";
const PAPER = "#F2F4F7";

function parseDateParts(raw) {
  if (!raw) return null;
  const d = new Date(raw);
  if (isNaN(d.getTime())) return null;
  return {
    day: d.getDate().toString().padStart(2, "0"),
    month: d.toLocaleString("en-US", { month: "short" }),
  };
}

function NoticeContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotices = async () => {
      try {
        const res = await fetch(
          "https://my-school-backend-iota.vercel.app/api/addnotice/allnotice"
        );

        if (!res.ok) {
          throw new Error("Failed to load notices");
        }

        const data = await res.json();
        setNotices(data.data || []);
      } catch (err) {
        console.log("Notice Load Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadNotices();
  }, []);

  const fontSerif = "font-['Source_Serif_4',_Georgia,_serif]";
  const fontSans = "font-['Inter',_sans-serif]";

  const FontImport = () => (
    <style jsx global>{`
      @import url("https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700&family=Inter:wght@400;500;600&display=swap");
    `}</style>
  );

  if (loading) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center gap-4 ${fontSans}`}
        style={{ backgroundColor: PAPER }}
      >
        <FontImport />
        <div className="w-10 h-px animate-pulse" style={{ backgroundColor: BRASS }} />
        <p className="text-sm tracking-wide" style={{ color: INK_SOFT }}>
          Loading notices
        </p>
      </div>
    );
  }

  // ===============================
  // ALL NOTICE LIST
  // ===============================

  if (!id) {
    return (
      <div className="min-h-screen max-w-360 mt-20 mx-auto" style={{ backgroundColor: PAPER }}>
        <FontImport />
        <div className=" px-6 pt-16 pb-24">
          <header className="mb-10">
            <h1
              className={`${fontSerif} text-4xl sm:text-5xl font-semibold tracking-tight`}
              style={{ color: INK }}
            >
              Notices
            </h1>
            <p className={`${fontSans} mt-3 text-base`} style={{ color: INK_SOFT }}>
              Official announcements, posted as they happen.
            </p>
            <div className="mt-6 h-px w-16" style={{ backgroundColor: BRASS }} />
          </header>

          {notices.length === 0 ? (
            <div
              className="rounded-sm border py-16 px-8 text-center"
              style={{ borderColor: LINE, backgroundColor: "#FFFFFF" }}
            >
              <p className={`${fontSerif} text-xl`} style={{ color: INK }}>
                Nothing posted yet
              </p>
              <p className={`${fontSans} mt-2 text-sm`} style={{ color: INK_SOFT }}>
                Check back later for updates.
              </p>
            </div>
          ) : (
            <div className="border-t divide-y" style={{ borderColor: LINE }}>
              {notices.map((notice) => {
                const parts = parseDateParts(notice.date);
                return (
                  <Link
                    key={notice.id}
                    href={`/Notice?id=${notice.id}`}
                    className="group flex items-start gap-5 sm:gap-8 py-7 hover:bg-white/70 transition-colors -mx-2 px-2 rounded-sm"
                    style={{ borderColor: LINE }}
                  >
                    <div className="w-14 sm:w-16 shrink-0 pt-0.5">
                      {parts ? (
                        <>
                          <div
                            className={`${fontSerif} text-2xl leading-none`}
                            style={{ color: INK }}
                          >
                            {parts.day}
                          </div>
                          <div
                            className={`${fontSans} text-xs mt-1`}
                            style={{ color: INK_SOFT }}
                          >
                            {parts.month}
                          </div>
                        </>
                      ) : (
                        <div className={`${fontSans} text-xs`} style={{ color: INK_SOFT }}>
                          {notice.date}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div
                        className={`${fontSans} flex items-center gap-3 flex-wrap text-xs`}
                        style={{ color: INK_SOFT }}
                      >
                        <span>{notice.category}</span>
                        {notice.urgent && (
                          <span
                            className="inline-flex items-center gap-1.5"
                            style={{ color: BRICK }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: BRICK }}
                            />
                            Urgent
                          </span>
                        )}
                      </div>

                      <h2
                        className={`${fontSerif} text-xl sm:text-2xl font-semibold mt-1.5 transition-colors`}
                        style={{ color: INK }}
                      >
                        {notice.title}
                      </h2>

                      <p
                        className={`${fontSans} mt-1.5 text-sm leading-relaxed line-clamp-2`}
                        style={{ color: INK_SOFT }}
                      >
                        {notice.shortDescription}
                      </p>
                    </div>

                    <div
                      className="hidden sm:block pt-2 opacity-0 group-hover:opacity-100 transition-opacity text-lg"
                      style={{ color: BRASS }}
                    >
                      →
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ===============================
  // NOTICE DETAILS
  // ===============================

  const notice = notices.find((item) => String(item.id) === String(id));

  if (!notice) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center gap-3 ${fontSans}`}
        style={{ backgroundColor: PAPER }}
      >
        <FontImport />
        <p className={`${fontSerif} text-2xl`} style={{ color: INK }}>
          Notice not found
        </p>
        <Link href="/Notice" className="text-sm font-medium hover:underline" style={{ color: BRASS }}>
          ← Back to notices
        </Link>
      </div>
    );
  }

  const parts = parseDateParts(notice.date);

  return (
    <div className="min-h-screen" style={{ backgroundColor: PAPER }}>
      <FontImport />
      <div className="max-w-360 mx-auto px-6 py-14 sm:py-20">
        <Link
          href="/Notice"
          className={`${fontSans} inline-flex items-center gap-2 text-sm font-medium hover:underline`}
          style={{ color: BRASS }}
        >
          ← Back to notices
        </Link>

        <article
          className="mt-8 bg-white border overflow-hidden"
          style={{ borderColor: LINE }}
        >
          <div className="h-1" style={{ backgroundColor: BRASS }} />

          <div className="px-8 py-10 sm:px-12 sm:py-14">
            <div
              className={`${fontSans} flex items-center flex-wrap gap-4 text-xs mb-6`}
              style={{ color: INK_SOFT }}
            >
              <span>{notice.category}</span>
              <span className="w-px h-3" style={{ backgroundColor: LINE }} />
              <span>{parts ? `${parts.month} ${parts.day}` : notice.date}</span>
              {notice.urgent && (
                <>
                  <span className="w-px h-3" style={{ backgroundColor: LINE }} />
                  <span className="inline-flex items-center gap-1.5 font-medium" style={{ color: BRICK }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BRICK }} />
                    Urgent
                  </span>
                </>
              )}
            </div>

            <h1
              className={`${fontSerif} text-3xl sm:text-4xl font-semibold leading-tight`}
              style={{ color: INK }}
            >
              {notice.title}
            </h1>

            <p
              className={`${fontSerif} whitespace-pre-line mt-8 text-lg leading-relaxed max-w-[65ch]`}
              style={{ color: "#33465E" }}
            >
              {notice.description}
            </p>

            {notice.attachment && (
              <a
                href={notice.attachment.replace(
                  "/raw/upload/",
                  "/raw/upload/fl_attachment/"
                )}
                className={`${fontSans} inline-flex mt-10 items-center gap-2.5 text-white text-sm font-medium px-6 py-3.5 transition-colors`}
                style={{ backgroundColor: INK }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRASS)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v13m0 0l-5-5m5 5l5-5M4 21h16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download attachment
              </a>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

export default function Notice() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: PAPER }}>
          <p className="text-sm" style={{ color: INK_SOFT }}>
            Loading...
          </p>
        </div>
      }
    >
      <NoticeContent />
    </Suspense>
  );
}
