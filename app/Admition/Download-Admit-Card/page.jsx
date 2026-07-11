/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { User,  Download, Search } from "lucide-react";
import {admitCardData} from "../../../Data/Data";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { useRef } from "react";
export default  function DownloadAdmitCard() {



    const [formData, setFormData] = useState({
  rollNumber: "",
  registrationNumber: "",

});
const resultRef = useRef(null);
const [admitCard, setAdmitCard] = useState(null);
const [isLoading, setIsLoading] = useState(false);
  
const downloadPDF = async () => {
  if (!resultRef.current) return;

  const dataUrl = await toPng(resultRef.current, {
    cacheBust: true,
    pixelRatio: 2,
  });

  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (resultRef.current.offsetHeight * pdfWidth) / resultRef.current.offsetWidth;

  pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

  pdf.save(`${admitCard.name}_Result.pdf`);
};
const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({ ...prev,[name]: value,}));
};

const handleSubmit = (e) => {
  e.preventDefault();

  const student = admitCardData.find(
    (item) =>
      item.rollNumber === formData.rollNumber &&
      item.registrationNumber === formData.registrationNumber
  
  );

  if (student) {
    setAdmitCard(student);
  } else {
    alert("Student not found");
  }
};
  return (
    <section className="bg-gradient-to-br from-[#0A1628] to-[#1A365D] py-20 md:py-28 text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-semibold tracking-widest">ADMISSION 2027</span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mt-4">Download Admit Card</h1>
          <p className="text-slate-300 mt-4">Enter your details to download admit card</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-16 border border-white/10">
          {!admitCard ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm text-slate-400 mb-3">Roll Number</label>
                  <div className="relative">
                    <User className="absolute left-5 top-4 text-slate-400" />
                    <input
                      type="text"
                      name="rollNumber"
                     value={formData.rollNumber}
  onChange={handleChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-14 focus:outline-none focus:border-[#D4AF37]"
                      placeholder="Enter Roll Number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-3">Registration Number</label>
                  <input
                    type="text"
                    name="registrationNumber"
                  value={formData.registrationNumber}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-5 focus:outline-none focus:border-[#D4AF37]"
                    placeholder="Enter Registration Number"
                  />
                </div>
              </div>

             

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-8 bg-[#D4AF37] hover:bg-[#E8C65A] text-[#0A1628] font-semibold py-5 rounded-3xl flex items-center justify-center gap-3 transition-all disabled:opacity-70"
              >
                {isLoading ? "Searching..." : "Search & Download Admit Card"}
                <Search size={22} />
              </button>
            </form>
          ) : (
          <div ref={resultRef} className="w-full max-w-4xl mx-auto my-8 font-sans text-slate-800 bg-[#0A1628] p-8 rounded-3xl shadow-xl print:bg-white print:p-0 print:shadow-none">
    
  {/* Real Admit Card Structure Wrapper */}
  <div className="bg-white border-4 border-double border-[#D4AF37] rounded-2xl p-8 relative overflow-hidden print:border-solid print:border-slate-400">
    
    {/* Decorative Watermark for Premium Look */}
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
      <h1 className="text-8xl font-black uppercase tracking-widest text-slate-900 rotate-12">ADMIT CARD</h1>
    </div>

    {/* Top Header - School Info */}
    <div className="text-center border-b-4 border-double border-slate-200 pb-6 mb-8 relative z-10">
      <h2 className="text-3xl font-extrabold tracking-wide text-slate-900 uppercase">
        {admitCard.school || "Goalkhali Ideal High School"}
      </h2>
      <p className="text-sm font-bold text-slate-500 uppercase mt-1 tracking-widest">
        {admitCard.boardExam || "Secondary School Certificate Examination"}
      </p>
      <div className="inline-block bg-[#D4AF37]/10 text-[#a3801c] font-black text-sm uppercase px-6 py-1.5 rounded-full mt-3 border-2 border-[#D4AF37]/30 tracking-wider">
        Admit Card
      </div>
    </div>

    {/* Main Content Layout: Photo & Main Info */}
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8 relative z-10">
      {/* Student Image */}
      <div className="w-36 h-36 rounded-xl overflow-hidden border-4 border-[#D4AF37] bg-slate-50 flex-shrink-0 shadow-md">
        <img 
          src={admitCard.photo || "/22440.jpg"} 
          alt="Student" 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Core Info Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm pt-2">
        <div className="sm:col-span-2 border-b border-slate-100 pb-2">
          <span className="text-slate-400 block text-[11px] uppercase font-bold tracking-wider mb-0.5">Candidate's Name</span>
          <span className="text-xl font-black text-slate-900 uppercase tracking-wide">{admitCard.name}</span>
        </div>
        <div className="border-b border-slate-100 pb-2">
          <span className="text-slate-400 block text-[11px] uppercase font-bold tracking-wider mb-0.5">Father's Name</span>
          <span className="text-base font-bold text-slate-700 uppercase">{admitCard.fatherName}</span>
        </div>
        <div className="border-b border-slate-100 pb-2">
          <span className="text-slate-400 block text-[11px] uppercase font-bold tracking-wider mb-0.5">Mother's Name</span>
          <span className="text-base font-bold text-slate-700 uppercase">{admitCard.motherName}</span>
        </div>
      </div>
    </div>

    {/* Grid Table for Academic Numbers */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-6 rounded-2xl border-2 border-slate-200/60 text-sm mb-8 relative z-10">
      <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
        <span className="text-slate-500 block text-[11px] uppercase font-bold tracking-wider mb-1">Roll No</span>
        <span className="font-mono font-black text-lg text-slate-900">{admitCard.rollNumber || admitCard.roll}</span>
      </div>
      <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
        <span className="text-slate-500 block text-[11px] uppercase font-bold tracking-wider mb-1">Registration No</span>
        <span className="font-mono font-black text-lg text-slate-900">{admitCard.registrationNumber}</span>
      </div>
      <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
        <span className="text-slate-500 block text-[11px] uppercase font-bold tracking-wider mb-1">Class & Sec</span>
        <span className="font-extrabold text-slate-800 text-base">{admitCard.class || "Class 10"} ({admitCard.section || "A"})</span>
      </div>
      <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
        <span className="text-slate-500 block text-[11px] uppercase font-bold tracking-wider mb-1">Group</span>
        <span className="font-extrabold text-slate-800 text-base uppercase tracking-wide">{admitCard.group || "Science"}</span>
      </div>
    </div>

    {/* Exam Details Container */}
    <div className="border-2 border-slate-200/60 rounded-2xl p-6 text-sm space-y-4 mb-8 bg-slate-50/50 relative z-10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-slate-200/60 pb-2.5 gap-1">
        <span className="text-slate-500 font-bold uppercase text-[11px] tracking-wider">Examination:</span>
        <span className="font-black text-slate-900 uppercase text-base">{admitCard.exam || "Test Examination"}</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-slate-200/60 pb-2.5 gap-1">
        <span className="text-slate-500 font-bold uppercase text-[11px] tracking-wider">Center of Exam:</span>
        <span className="font-black text-slate-800 uppercase text-base">{admitCard.center}</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
        <span className="text-slate-500 font-bold uppercase text-[11px] tracking-wider">Session:</span>
        <span className="font-mono font-black text-slate-800 text-base tracking-wide">{admitCard.session}</span>
      </div>
    </div>

    {/* Decorative Bottom / Signatures Area */}
    <div className="flex justify-between items-end pt-12 mt-6 border-t-2 border-slate-100 text-xs text-slate-600 font-bold relative z-10">
      <div className="text-center w-36">
        <div className="w-full h-0.5 bg-slate-400 mb-2 mx-auto"></div>
        <p className="uppercase tracking-wider">Class Teacher</p>
      </div>
      
      {/* Decorative Official Seal Circle */}
      <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#D4AF37] flex items-center justify-center text-[10px] text-[#a3801c] font-black uppercase tracking-widest text-center shadow-inner bg-[#D4AF37]/5 print:border-slate-400">
        Official<br/>Seal
      </div>

      <div className="text-center w-36">
        <div className="w-full h-0.5 bg-slate-400 mb-2 mx-auto"></div>
        <p className="uppercase tracking-wider">Headmaster</p>
      </div>
    </div>
  </div>

  {/* Action Buttons Area (UI Only, Non-Printable) */}
  <div className="mt-8 flex flex-col sm:flex-row gap-4 print:hidden">
    <button
      onClick={downloadPDF}   
      className="flex-1 bg-[#D4AF37] hover:bg-[#bda032] text-[#0A1628] font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg transition-all active:scale-[0.99] uppercase tracking-wider text-sm"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Download PDF Admit Card
    </button>
    
    <button
      onClick={() => setAdmitCard(null)}
      className="sm:w-48 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 border border-slate-700 uppercase tracking-wider text-xs"
    >
      ← Search Another
    </button>
  </div>

</div>
          )}
        </div>
      </div>
    </section>
  );
}