/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useMemo, useState } from "react";
import { Search, Award, Printer, Download } from "lucide-react";
import { admitCardData } from "../../Data/Data";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
export default function ExamResult() {
    const resultRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState({ rollNumber: "", name: "" });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [selectExam, setSelectExam] = useState("");
  const [selectClass, setSelectClass] = useState("");
  const [loading, setLoading] = useState(false);



const exam = useMemo(() => {
  return [...new Set(admitCardData.flatMap((item) => item.examtype).filter(Boolean))];
}, []);
const classOptions = useMemo(() => {
  return [...new Set(admitCardData.flatMap((item) => item.class).filter(Boolean))];
}, []);


const handlePrint = useReactToPrint({
  contentRef: resultRef,
  documentTitle: `${result?.name}-Exam-Result`,
});
 const handleSearch = (e) => {
  e.preventDefault();

  // আগের error clear
  setError("");
  setError2("");

  // প্রথমে check করো input খালি কিনা
  if (
    !searchTerm.rollNumber.trim() ||
    !searchTerm.name.trim()
  ) {
    setError2("⚠️ Please fill up all the fields.");
    return;
  }

  setLoading(true);

  setTimeout(() => {
    const student = admitCardData.find(
      (item) =>
       item.rollNumber.trim() === searchTerm.rollNumber.trim() &&
    item.name.toLowerCase().trim() === searchTerm.name.toLowerCase().trim() &&
    item.class === selectClass &&
    item.examtype.includes(selectExam)
        
    );

    if (student) {
      setResult(student);
      setError("");
    } else {
      setResult(null);
      setError("❌ No student found with this Roll Number and Name.");
    }

    setLoading(false);
  }, 1200);
};
  const handleChange = (e) => {
  const { name, value } = e.target;

  setSearchTerm((prev) => ({ ...prev,[name]: value,}));
};
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

  pdf.save(`${result.name}_Result.pdf`);
};
 const getGradePoint = (marks) => {
  if (marks >= 80) return 5.0;
  if (marks >= 70) return 4.0;
  if (marks >= 60) return 3.5;
  if (marks >= 50) return 3.0;
  if (marks >= 40) return 2.0;
  if (marks >= 33) return 1.0;
  return 0.0;
};

const totalGradePoint = result
  ? result.subjects.reduce(
      (sum, sub) => sum + getGradePoint(sub.marks),
      0
    )
  : 0;

const hasFail = result
  ? result.subjects.some((sub) => sub.marks < 33)
  : false;

const gpa = result
  ? hasFail
    ? "0.00"
    : (totalGradePoint / result.subjects.length).toFixed(2)
  : "";

 
  return (
    <section className="bg-[#F8F5F0] pt-40 min-h-screen">
      <div className="max-w-360 mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0A1628]">
            GOALKHALI IDEAL HIGH SCHOOL
          </h1>
          <p className="text-[#D4AF37] mt-2 font-medium">Examination Result 2026</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label className="block text-sm text-slate-600 mb-3">Roll Number / Registration Number</label>
               <div className="relative w-full">
  <select
    className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-700 shadow-sm outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"

    value={selectClass}
    onChange={(e) => setSelectClass(e.target.value)}
  >
    <option value="" disabled>
      Select Class
    </option>
{classOptions?.map((classOption, index) => (
  <option key={index} value={classOption}>
    {classOption}
  </option>
))}

  </select>

  {/* Dropdown Icon */}
  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>

              <div className="relative w-full">
  <select
    className="w-full mt-3
     appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-700 shadow-sm outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
 
    value={selectExam}
    onChange={(e) => setSelectExam(e.target.value)}
  >
    <option value="" disabled>
      Select Exam Type
    </option>
{exam?.map((examType, index) => (
  <option key={index} value={examType}>
    {examType}
  </option>
))}

  </select>

  {/* Dropdown Icon */}
  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>
              <div className="relative">
                <Search className="absolute left-5 top-7 text-slate-400" />
                <input
                  type="text"
                  name="rollNumber"
                  value={searchTerm?.rollNumber || ""}
                  onChange={handleChange}
                  placeholder="Enter Roll Number"
                  className="w-full mt-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 border border-slate-300 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
              <div className="relative mt-3">
                <Search className="absolute left-5 top-4 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={searchTerm?.name || ""}
                  onChange={handleChange}
                  placeholder="Enter your Name"
                  className="w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 border border-slate-300 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
        
              className="w-full bg-[#0A1628] hover:bg-black text-white py-5 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all disabled:opacity-70"
            >
              {loading ? "Searching..." : "Search Result"}
              <Search size={22} />
            </button>
          </form>
          {error && (
  <div className="mt-5 rounded-lg border border-red-300 bg-red-50 p-4 text-center text-red-600 font-medium">
    {error}
  </div>
)}
          {error2 && (
  <div className="mt-5 rounded-lg border border-red-300 bg-red-50 p-4 text-center text-red-600 font-medium">
    {error2}
  </div>
)}
        </div>

        {/* Result Display */}
     {result && (
  <div ref={resultRef} className="w-full max-w-360 mx-auto my-8 font-sans text-sm text-slate-800 print:my-0 print:max-w-full">
    
    {/* Top Navigation / Action Buttons */}
    <div className="flex justify-center gap-3 mb-6 print:hidden">
      <button 
   onClick={() => {
     setResult(null);
  setSearchTerm("");
   }}
        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-md text-xs font-semibold shadow-sm transition-all active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.253 8H18" /></svg>
        Search Again
      </button>
      <button 
        onClick={downloadPDF} 
        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-md text-xs font-semibold shadow-sm transition-all active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.253 8H18" /></svg>
        Download PDF
      </button>
      <button 
        onClick={handlePrint} 
        className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-md text-xs font-semibold shadow-sm transition-all active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4" /></svg>
        Print Result
      </button>
    </div>

    {/* Main Result Card */}
    <div className="bg-white border-2 border-emerald-700 rounded-lg shadow-md overflow-hidden print:border-slate-400 print:shadow-none">
      
      {/* 1. Official Header Style */}
      <div className="bg-emerald-700 text-white px-6 py-4 flex flex-col items-center justify-center text-center border-b border-emerald-800 print:bg-emerald-800">
        <h1 className="text-xl font-bold tracking-wide uppercase">GOALKHALI IDEAL HIGH SCHOOL</h1>
        <p className="text-emerald-100 text-xs mt-0.5 font-medium tracking-wider">Student Information & Performance Summary</p>
      </div>

      {/* Student Info Table Grid */}
      <div className="divide-y divide-slate-200 border-b border-slate-200">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-4 bg-slate-50/50">
          <div className="px-4 py-3 font-semibold text-slate-600 border-r border-slate-200 bg-slate-100/70 md:bg-transparent">Roll No</div>
          <div className="px-4 py-3 border-r border-slate-200 font-bold tracking-wider text-slate-900 font-mono">{result.rollNumber}</div>
          <div className="px-4 py-3 font-semibold text-slate-600 border-r border-slate-200 bg-slate-100/70 md:bg-transparent">Registration No</div>
          <div className="px-4 py-3 font-semibold tracking-wider text-slate-700 font-mono">{result.registrationNumber || "[NOT SHOWN]"}</div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="px-4 py-3 font-semibold text-slate-600 border-r border-slate-200 md:col-span-1 bg-slate-100/30">Name of Student</div>
          <div className="px-4 py-3 uppercase font-bold text-slate-900 md:col-span-3 tracking-wide">{result.name}</div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-4 bg-slate-50/50">
          <div className="px-4 py-3 font-semibold text-slate-600 border-r border-slate-200 md:col-span-1 bg-slate-100/70 md:bg-transparent">Father's Name</div>
          <div className="px-4 py-3 uppercase font-medium text-slate-800 md:col-span-3">{result.fatherName || "N/A"}</div>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="px-4 py-3 font-semibold text-slate-600 border-r border-slate-200 md:col-span-1 bg-slate-100/30">Mother's Name</div>
          <div className="px-4 py-3 uppercase font-medium text-slate-800 md:col-span-3">{result.motherName || "N/A"}</div>
        </div>

        {/* Row 5 */}
     
        {/* Row 6 */}
        <div className="grid grid-cols-1 md:grid-cols-6">
          <div className="px-4 py-3 font-semibold text-slate-600 border-r border-slate-200 bg-slate-100/30 md:bg-transparent">Group</div>
          <div className="px-4 py-3 border-r border-slate-200 uppercase font-semibold text-slate-800">{result.group || "HUMANITIES"}</div>
          <div className="px-4 py-3 font-semibold text-slate-600 border-r border-slate-200 bg-slate-100/30 md:bg-transparent">Type</div>
          <div className="px-4 py-3 border-r border-slate-200 uppercase font-semibold text-slate-800">{result.type || "REGULAR"}</div>
          <div className="px-4 py-3 font-semibold text-slate-600 border-r border-slate-200 bg-slate-100/30 md:bg-transparent">Gender</div>
          <div className="px-4 py-3 uppercase font-semibold text-slate-800">{result.gender || "Male"}</div>
        </div>

        {/* Row 7 */}
        <div className="grid grid-cols-1 md:grid-cols-4 bg-slate-50/50">
          <div className="px-4 py-3 font-semibold text-slate-600 border-r border-slate-200 bg-slate-100/70 md:bg-transparent">Result</div>
          <div className="px-4 py-3 border-r border-slate-200 font-extrabold text-sm text-emerald-700 bg-emerald-50/50">
            {gpa ? (
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200 print:bg-transparent print:p-0 print:border-none">
                GPA: {gpa}
              </span>
            ) : (result === gpa || gpa > 0 ? (
              <span className="text-emerald-700">PASSED</span>
            ) : (
              <span className="text-rose-600 font-bold">FAILED</span>
            ))}
          </div>
          <div className="px-4 py-3 font-semibold text-slate-600 border-r border-slate-200 bg-slate-100/70 md:bg-transparent">Date of Birth</div>
          <div className="px-4 py-3 font-medium text-slate-800">{result.dob || "N/A"}</div>
        </div>

        {/* Row 8 - Institute Row Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-4 bg-emerald-50/10">
          <div className="px-4 py-3.5 font-semibold text-emerald-800 border-r border-slate-200 md:col-span-1 bg-emerald-50/30">Name of Institute</div>
          <div className="px-4 py-3.5 uppercase font-bold text-emerald-900 md:col-span-3 tracking-wide text-sm">
            {result.institute || "GOALKHALI IDEAL HIGH SCHOOL"}
          </div>
        </div>
      </div>

      {/* Section Divider Title */}
      <div className="bg-slate-100 border-b border-slate-200 text-center py-2.5 font-bold text-slate-700 text-sm tracking-wider uppercase">
        Subject-wise Grade / Marks Details
      </div>

      {/* 2. Subject Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800 text-white font-semibold text-xs tracking-wider uppercase print:bg-slate-700">
              <th className="px-6 py-3 border-r border-slate-700 w-36 text-center">Subject Code</th>
              <th className="px-6 py-3 border-r border-slate-700">Subject Name</th>
              <th className="px-6 py-3 text-center w-32">Letter Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {result.subjects?.map((sub, i) => {
              const grade = sub.marks >= 80 && sub.marks <= 100 ? "A+" 
                          : sub.marks >= 70 && sub.marks <= 79 ? "A" 
                          : sub.marks >= 60 && sub.marks <= 69 ? "A-" 
                          : sub.marks >= 50 && sub.marks <= 59 ? "B" 
                          : sub.marks >= 40 && sub.marks <= 49 ? "C" 
                          : sub.marks >= 33 && sub.marks <= 39 ? "D" 
                          : "F";
              return (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors odd:bg-white even:bg-slate-50/40">
                  <td className="px-6 py-3 font-mono border-r border-slate-200 text-slate-600 text-center font-medium">
                    {sub.code || (101 + i * 6)}
                  </td>
                  <td className="px-6 py-3 uppercase font-semibold text-slate-800 border-r border-slate-200">
                    {sub.name}
                  </td>
                  <td className={`px-6 py-3 text-center font-extrabold text-base ${grade === 'F' ? 'text-rose-600' : 'text-slate-800'}`}>
                    {grade}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
      </div>

      {/* Remarks Section */}
      {result.remarks && (
        <div className="p-4 bg-amber-50/40 border-t border-slate-200 flex justify-between  italic text-xs text-slate-600 font-medium">
          * Remarks: {result.remarks}
          <div className=" flex justify-end text-slate-700 font-semibold">
             <p>Total Marks: {result.subjects.reduce((total, subject) => total + subject.marks, 0)}</p>
          </div>
        </div>
        
      )}

     
    </div>

    {/* Bottom Navigation / Action Buttons */}
    <div className="flex justify-center gap-3 mt-6 print:hidden">
      <button 
        onClick={() => window.location.reload()} 
        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-md text-xs font-semibold shadow-sm transition-all active:scale-95"
      >
        Search Again
      </button>
      <button 
        onClick={handlePrint} 
        className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-md text-xs font-semibold shadow-sm transition-all active:scale-95"
      >
        Print Result
      </button>
    </div>

  </div>
)}
      </div>
    </section>
  );
}