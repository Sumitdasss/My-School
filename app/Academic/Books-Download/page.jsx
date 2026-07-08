"use client";

import React from "react";
import { Download, BookOpen, FileText } from "lucide-react";

export default function BooksDownload() {
  const books = [
    {
      title: "Class 6 All Books",
      subject: "NCTB 2026",
      format: "PDF",
      size: "45 MB",
      link: "#",
    },
    {
      title: "Class 7 Mathematics",
      subject: "Mathematics",
      format: "PDF",
      size: "18 MB",
      link: "#",
    },
    {
      title: "Class 8 English",
      subject: "English",
      format: "PDF",
      size: "22 MB",
      link: "#",
    },
    {
      title: "Class 9 Science",
      subject: "Science",
      format: "PDF",
      size: "35 MB",
      link: "#",
    },
    {
      title: "Class 10 Bangla",
      subject: "Bangla",
      format: "PDF",
      size: "28 MB",
      link: "#",
    },
  ];

  return (
    <section className="bg-[#F8F5F0] py-20 md:py-28">
      <div className="max-w-360 mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-semibold tracking-widest">FREE RESOURCES</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0A1628] mt-4">
            Books Download
          </h2>
          <p className="text-slate-600 mt-4 max-w-md mx-auto">
            Download all NCTB textbooks and reference materials
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-8 hover:shadow-xl transition-all border border-transparent hover:border-[#D4AF37]/30"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-[#D4AF37]/10 p-4 rounded-2xl text-[#D4AF37]">
                  <BookOpen className="w-9 h-9" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl text-[#0A1628] group-hover:text-[#D4AF37] transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-slate-500">{book.subject}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm mb-8">
                <span className="flex items-center gap-2">
                  <FileText size={16} /> {book.format}
                </span>
                <span className="text-slate-500">{book.size}</span>
              </div>

              <a
                href={book.link}
                className="w-full flex items-center justify-center gap-3 bg-[#0A1628] hover:bg-black text-white py-4 rounded-2xl transition-all font-medium"
              >
                <Download size={20} />
                Download PDF
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-sm text-slate-500">
            All books are according to NCTB 2026 curriculum
          </p>
        </div>
      </div>
    </section>
  );
}