/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

export default function AttendancePage() {
  const [students, setStudents] = useState([]);
const [classes, setClasses] = useState([]);
const [sections, setSections] = useState([]);

const [class1, setClass1] = useState("");
const [section, setSection] = useState("");

const [date, setDate] = useState(
  new Date().toISOString().split("T")[0]
);

const [loading, setLoading] = useState(false);
  // তোমার API থেকে Student + Attendance লোড করবে


const loadFilters = async () => {
  const res = await fetch("/api/attendance?filters=true");
  const data = await res.json();

  setClasses(data.classes);
  setSections(data.sections);
};
   
useEffect(() => {
  loadFilters();

}, []);


  const loadAttendance = async () => {
  try {
    setLoading(true);

    let url = `/api/attendance?date=${date}`;

    if (class1) {
      url += `&class1=${class1}`;
    }

    if (section) {
      url += `&section=${section}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setStudents(data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadAttendance();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date,class1,section]);

  const changeStatus = (studentId, status) => {
    setStudents((prev) =>
      prev.map((item) =>
        item.id === studentId
          ? {
              ...item,
              status,
            }
          : item
      )
    );
  };

  const saveAttendance = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/attendance", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

       body: JSON.stringify({
  date,
  attendance: students.map((s) => ({
    studentId: s.id,
    status: s.status || "No",
  })),
}),
      });

      const data = await res.json();

      alert(data.message);
    } catch (err) {
      console.log(err);
      alert("Save Failed");
    } finally {
      setLoading(false);
    }
  };
const Clearfilter=()=>{
    setClass1("")
    setSection("")
}
  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-blue-50 py-10 px-4">
  <div className="max-w-360 mt-20 mx-auto">
    
    {/* Main Card */}
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 sm:px-8 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Student Attendance
        </h1>
        <p className="text-blue-100 text-sm mt-1">
          Select class, section & date then load students
        </p>
      </div>

      {/* Filters Section */}
      <div className="px-6 sm:px-8 pt-6 pb-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Class Select */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Class
            </label>
            <select
              value={class1}
              onChange={(e) => setClass1(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Select Class</option>
              {classes.map((c) => (
                <option key={c.class1} value={c.class1}>
                  {c.class1}
                </option>
              ))}
            </select>
          </div>

          {/* Section Select */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Section
            </label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Select Section</option>
              {sections.map((s) => (
                <option key={s.section} value={s.section}>
                  {s.section}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Load Button */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-transparent uppercase tracking-wide select-none">
              Action
            </label>
            <button
              onClick={Clearfilter}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl px-4 py-2.5 text-sm transition-all shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Clear Filter
            </button>
          </div>
        </div>
      </div>

      {/* Table / Loading */}
      <div className="px-6 sm:px-8 py-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-slate-500 font-medium">Loading students...</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-24">
                    Roll
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center w-52">
                    Attendance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((student, index) => (
                  <tr
                    key={student.id}
                    className={`transition-colors hover:bg-blue-50/40 ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                    }`}
                  >
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center justify-center min-w-[36px] h-9 px-2 rounded-lg bg-slate-100 text-slate-700 font-semibold text-sm">
                        {student.rollNumber}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-medium text-slate-800">
                        {student.fullName}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-3">
                        
                        {/* Yes */}
                        <label
                          className={`flex items-center gap-2 cursor-pointer select-none px-4 py-2 rounded-full border transition-all ${
                            student.status === "Yes"
                              ? "bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm"
                              : "bg-white border-slate-200 text-slate-500 hover:border-emerald-200 hover:bg-emerald-50/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`status-${student.id}`}
                            checked={student.status === "Yes"}
                            onChange={() => changeStatus(student.id, "Yes")}
                            className="sr-only"
                          />
                          <span
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              student.status === "Yes"
                                ? "border-emerald-500 bg-emerald-500"
                                : "border-slate-300"
                            }`}
                          >
                            {student.status === "Yes" && (
                              <span className="w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                          </span>
                          <span className="text-sm font-medium">Yes</span>
                        </label>

                        {/* No */}
                        <label
                          className={`flex items-center gap-2 cursor-pointer select-none px-4 py-2 rounded-full border transition-all ${
                            student.status === "No"
                              ? "bg-rose-50 border-rose-300 text-rose-700 shadow-sm"
                              : "bg-white border-slate-200 text-slate-500 hover:border-rose-200 hover:bg-rose-50/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`status-${student.id}`}
                            checked={student.status === "No"}
                            onChange={() => changeStatus(student.id, "No")}
                            className="sr-only"
                          />
                          <span
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              student.status === "No"
                                ? "border-rose-500 bg-rose-500"
                                : "border-slate-300"
                            }`}
                          >
                            {student.status === "No" && (
                              <span className="w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                          </span>
                          <span className="text-sm font-medium">No</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            {students.length > 0 && (
              <>
                Total students:{" "}
                <span className="font-semibold text-slate-700">
                  {students.length}
                </span>
              </>
            )}
          </p>

          <button
            onClick={saveAttendance}
            disabled={loading || students.length === 0}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Save Attendance
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}