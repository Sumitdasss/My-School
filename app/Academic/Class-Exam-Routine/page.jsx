/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";
import { Clock, Calendar } from "lucide-react";
import { useState } from "react";
import { classRoutine } from "../../../Data/Data";
import { examRoutine } from "../../../Data/Data";
import { useMemo } from "react";
export default function ClassExamRoutine() {
 

 

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
});

const [selectedClass, setSelectedClass] = useState("10");
const [selectedSection, setSelectedSection] = useState("A");
const [selectedShift, setSelectedShift] = useState("Morning");
const [selectedday, setSelectedday] = useState(today);

const todayRoutine = classRoutine .find(
  (item) =>
    item.day === selectedday &&
    item.class === selectedClass &&
  
    item.section === selectedSection &&
       item.shift === selectedShift
);
const filteredExamRoutine = examRoutine.filter(
  (item) => String(item.class) === String(selectedClass)
);
const classoptionns =useMemo(() => {
    return [...new Set(classRoutine.map((item) => item.class).filter(Boolean))];
}, []);
const SectionOptions =useMemo(() => {
    return [...new Set(classRoutine.map((item) => item.section).filter(Boolean))];
}, []);
const DayOptions =useMemo(() => {
    return [...new Set(classRoutine.map((item) => item.day).filter(Boolean))];
}, []);
const ShiftOptions =useMemo(() => {
    return [...new Set(classRoutine.map((item) => item.shift).filter(Boolean))];
}, []);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-360 mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-semibold tracking-widest">ACADEMIC SCHEDULE</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0A1628] mt-4">
            Class & Exam Routine
          </h2>
        </div>
<div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-12">
  {/* Class Select */}
  <div className="relative w-full sm:w-64">
    <label className="block text-sm font-semibold text-[#0A1628] mb-2">
      Select Class
    </label>

    <select
      value={selectedClass}
      onChange={(e) => setSelectedClass(e.target.value)}
      className="w-full appearance-none rounded-2xl border border-[#D4AF37]/30 bg-white px-5 py-4 pr-12 text-[#0A1628] font-medium shadow-md outline-none transition-all duration-300 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20"
    >
      
      {classoptionns.map((cls) => (
        <option key={cls} value={cls}>
          Class {cls}
        </option>
      ))}
    </select>

    <span className="absolute right-5 top-[52px] -translate-y-1/2 text-[#D4AF37] pointer-events-none">
      ▼
    </span>
  </div>

  {/* Section Select */}
  <div className="relative w-full sm:w-64">
    <label className="block text-sm font-semibold text-[#0A1628] mb-2">
      Select Section
    </label>

    <select
      value={selectedSection}
      onChange={(e) => setSelectedSection(e.target.value)}
      className="w-full appearance-none rounded-2xl border border-[#D4AF37]/30 bg-white px-5 py-4 pr-12 text-[#0A1628] font-medium shadow-md outline-none transition-all duration-300 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20"
    >
     {SectionOptions.map((section) => (
        <option key={section} value={section}>
          Section {section}
        </option>
      ))}
    </select>

    <span className="absolute right-5 top-[52px] -translate-y-1/2 text-[#D4AF37] pointer-events-none">
      ▼
    </span>
  </div>
  <div className="relative w-full sm:w-64">
    <label className="block text-sm font-semibold text-[#0A1628] mb-2">
      Select Day
    </label>

    <select
      value={selectedday}
      onChange={(e) => setSelectedday(e.target.value)}
      className="w-full appearance-none rounded-2xl border border-[#D4AF37]/30 bg-white px-5 py-4 pr-12 text-[#0A1628] font-medium shadow-md outline-none transition-all duration-300 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20"
    >
     {DayOptions.map((day) => (
        <option key={day} value={day}>
          {day}
        </option>
      ))}
    </select>

    <span className="absolute right-5 top-[52px] -translate-y-1/2 text-[#D4AF37] pointer-events-none">
      ▼
    </span>
  </div>
  <div className="relative w-full sm:w-64">
    <label className="block text-sm font-semibold text-[#0A1628] mb-2">
      Select Shift
    </label>

    <select
      value={selectedShift}
      onChange={(e) => setSelectedShift(e.target.value)}
      className="w-full appearance-none rounded-2xl border border-[#D4AF37]/30 bg-white px-5 py-4 pr-12 text-[#0A1628] font-medium shadow-md outline-none transition-all duration-300 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20"
    >
     {ShiftOptions.map((shift) => (
        <option key={shift} value={shift}>
          {shift}
        </option>
      ))}
    </select>

    <span className="absolute right-5 top-[52px] -translate-y-1/2 text-[#D4AF37] pointer-events-none">
      ▼
    </span>
  </div>
</div>
        <div className="grid md:grid-cols-2 gap-10">
        {todayRoutine && (
  <div className="bg-[#F8F5F0] rounded-3xl p-8 md:p-12 border border-[#D4AF37]/20">
    {/* Header */}
    <div className="flex items-center gap-4 mb-8">
      <Clock className="text-[#D4AF37] w-10 h-10" />

      <div>
        <h3 className="text-2xl font-semibold text-[#0A1628]">
          Todays Class Routine
        </h3>

        <p className="text-[#D4AF37]">
          {todayRoutine.day} • Class {todayRoutine.class} • Section{" "}
          {todayRoutine.section}
        </p>
      </div>
    </div>

    {/* Routine */}
    <div className="space-y-4">
      {todayRoutine.classes.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-5 shadow-sm flex justify-between items-center"
        >
          <div>
            <p className="text-sm text-slate-500">
              Period {item.period}
            </p>

            <h4 className="text-lg font-semibold text-[#0A1628]">
              {item.subject}
            </h4>

            <p className="text-[#D4AF37] text-sm">
              {item.teacher}
            </p>
          </div>

          <div className="text-right">
            <p className="font-medium text-slate-700">
              {item.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


<div className="bg-[#F8F5F0] rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-10">
              <Calendar className="text-[#D4AF37] w-10 h-10" />
              <div>
                <h3 className="text-3xl font-bold text-[#0A1628]">1st Term Exam 2026</h3>
                <p className="text-[#D4AF37]">10 June - 20 June, 2026</p>
              </div>
            </div>

            <div className="space-y-4">
  {filteredExamRoutine.map((exam, index) => (
    <div
      key={index}
      className="bg-white rounded-2xl p-6 flex flex-col md:flex-row justify-between"
    >
      <div>
        <p className="font-bold">{exam.dateexam}</p>
      </div>

      <div className="flex-1 px-6">
        <h4 className="font-semibold">{exam.subjectexam}</h4>
        <p>{exam.timeexam}</p>
      </div>
      <div className="flex-1 px-6">
        <h4 className="font-semibold">class:{exam.class}</h4>
        
      </div>

      <div>{exam.room}</div>
    </div>
  ))}
</div>
          </div>


        </div>


        <div className="text-center mt-16 text-sm text-slate-500">
          * Routine may be subject to change. Please check the notice board for updates.
        </div>
      </div>
    </section>
  );
}