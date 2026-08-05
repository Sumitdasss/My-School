"use client";

import { useEffect, useState } from "react";
import {
  Search,
  User,
 
  Hash,
} from "lucide-react";

export default function ResultSearchPage() {
  const [roll, setRoll] = useState("");
  const [name, setName] = useState("");
  const [class1, setClass1] = useState("");
  const [section, setSection] = useState("");
  const [examName, setExamName] = useState("");
const [classes, setClasses] = useState([]);
const [sections, setSections] = useState([]);
const [exams, setExams] = useState([]);

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

 const searchResult = async () => {

  if (!roll && !name && !class1 && !section) {
    setResults([]);
    alert("Please select at least one search option");
    return;
  }


  setLoading(true);

  try {

    const params = new URLSearchParams();

    if (roll) params.append("roll", roll);
    if (name) params.append("name", name);
    if (class1) params.append("class", class1);
    if (section) params.append("section", section);
    if (examName) params.append("examName", examName);


    const res = await fetch(
      `/api/AllStudentresult?${params.toString()}`
    );


    const data = await res.json();


    if (data.success) {
      setResults(data.data);
    } else {
      setResults([]);
    }
 setClasses(data.classes);
  setSections(data.sections);

  } catch (err) {

    console.log(err);
    setResults([]);

  } finally {

    setLoading(false);

  }

};

useEffect(() => {

  const loadFilters = async () => {

    try {

      const res = await fetch("/api/AllStudentresult");

      const data = await res.json();


      if(data.success){

        setClasses(data.classes || []);
        setSections(data.sections || []);
        setExams(data.exams  || []);

      }


    } catch(error){

      console.log(error);

    }

  };


  loadFilters();


}, []);


  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 p-4 sm:p-6 lg:p-8">
  <div className="max-w-360 mx-auto">

    {/* ========== SEARCH CARD ========== */}
    <div className="bg-white/80 backdrop-blur-sm rounded-[2rem] shadow-2xl shadow-blue-900/5 border border-white/60 p-6 sm:p-8 lg:p-10 mb-8">
      
      {/* Title */}
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          Student Result Search
        </h1>
        <p className="mt-2 text-gray-500 text-sm sm:text-base">
          Find student results by roll, name, class or section
        </p>
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

        {/* Roll Number */}
        <div className="relative group">
          <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Roll Number"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-12 pr-4 py-3.5 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white transition-all"
          />
        </div>

        {/* Student Name */}
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-12 pr-4 py-3.5 text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white transition-all"
          />
        </div>

        {/* Class */}
        <div className="relative">
          <select
            value={class1}
            onChange={(e) => setClass1(e.target.value)}
            className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white transition-all cursor-pointer"
          >
            <option value="">All Class</option>
            {classes?.map((item, index) => (
              <option key={index} value={item.class1}>
                Class {item.class1}
              </option>
            ))}
          </select>
        </div>

        {/* Section */}
        <div className="relative">
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white transition-all cursor-pointer"
          >
            <option value="">All Section</option>
            {sections?.map((item, index) => (
              <option key={index} value={item.section}>
                Section {item.section}
              </option>
            ))}
          </select>
        </div>
        <div className="relative">
          <select
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white transition-all cursor-pointer"
          >
            <option value="">All Exams</option>
            {exams?.map((item, index) => (
              <option key={index} value={item.examName}>
                {item.examName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-7 sm:mt-8 flex justify-center">
        <button
          onClick={searchResult}
          className="group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold px-8 sm:px-10 py-3.5 rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
        >
          <Search size={20} className="group-hover:scale-110 transition-transform" />
          Search Result
        </button>
      </div>
    </div>

    {/* ========== RESULT CARD ========== */}
    <div className="bg-white/80 backdrop-blur-sm rounded-[2rem] shadow-2xl shadow-blue-900/5 border border-white/60 overflow-hidden">

      {/* Header */}
      <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Search Result
          </h2>
        </div>
        {!loading && results.length > 0 && (
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {results.length} found
          </span>
        )}
      </div>

      {/* Loading */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Searching results...</p>
        </div>
      ) : results.length === 0 ? (
        /* Empty State */
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-center px-6">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2">
            <Search className="w-7 h-7 text-gray-400" />
          </div>
          <p className="text-lg font-medium text-gray-600">No Result Found</p>
          <p className="text-sm text-gray-400">Try adjusting your search filters</p>
        </div>
      ) : (
        /* Table - Desktop + Mobile cards */
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Roll</th>
                  <th className="px-6 py-4">Class</th>
                  <th className="px-6 py-4">Section</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4 text-center">Marks</th>
                  <th className="px-6 py-4 text-center">Total</th>
                  <th className="px-6 py-4 text-center">Percentage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {results.map((item) => {
                  const percentage = ((item.marks / item.totalMarks) * 100).toFixed(2);
                  const isGood = percentage >= 60;

                  return (
                    <tr
                      key={item.resultId}
                      className="hover:bg-indigo-50/40 transition-colors"
                    >
                      {/* Student */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.photo || "/default-avatar.png"}
                            alt={item.fullName}
                            className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                          />
                          <span className="font-semibold text-gray-900">
                            {item.fullName}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-700 font-medium">
                        {item.rollNumber}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{item.class1}</td>
                      <td className="px-6 py-4 text-gray-700">{item.section}</td>
                      <td className="px-6 py-4 text-gray-700">{item.subjectName}</td>

                      <td className="px-6 py-4 text-center font-semibold text-gray-800">
                        {item.marks}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">
                        {item.totalMarks}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold tracking-wide ${
                            isGood
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {percentage}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-gray-100">
            {results.map((item) => {
              const percentage = ((item.marks / item.totalMarks) * 100).toFixed(2);
              const isGood = percentage >= 60;

              return (
                <div
                  key={item.resultId}
                  className="p-5 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={item.photo || "/default-avatar.png"}
                      alt={item.fullName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate">
                        {item.fullName}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Roll: {item.rollNumber} • Class {item.class1}-{item.section}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.subjectName}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="text-sm">
                          <span className="font-semibold text-gray-800">{item.marks}</span>
                          <span className="text-gray-400"> / {item.totalMarks}</span>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            isGood
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  </div>
</div>
  );
}