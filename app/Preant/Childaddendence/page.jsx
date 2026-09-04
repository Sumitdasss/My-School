/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Calendar,
  BarChart3,
} from "lucide-react";

export default function ParentAttendancePage() {
 const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("30");

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("Parenttoken");

    if (!token) {
      alert("Parent login required");
      window.location.href = "/Preant";
      return;
    }

    const res = await fetch(
      "https://my-school-backend-iota.vercel.app/api/ParentRegistar/getParentAttendance",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await res.json();

    console.log("Attendance Response:", result);

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("Parenttoken");

        alert("Parent session expired");

        window.location.href = "/ParentLogin";

        return;
      }

      throw new Error(
        result.message || "Failed to load attendance"
      );
    }

    if (result.success) {
      setChildren(result.children || []);
    } else {
      setChildren([]);
    }

  } catch (err) {
    console.error("Attendance Error:", err);

    alert(
      err.message || "Failed to load attendance"
    );

  } finally {
    setLoading(false);
  }
};
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

 if (children.length === 0) {
  return (
    <div className="h-screen flex items-center justify-center">
      No Attendance Found
    </div>
  );
}

 
  return (
   <div className="min-h-screen mt-20 bg-gray-100 p-6">
  <div className="max-w-360  mx-auto">

   {children.map((child) => {

  const filteredAttendance = child.attendance.filter((item) => {

    if (filter === "all") return true;

    const today = new Date();
    const attendanceDate = new Date(item.attendanceDate);

    if (filter === "today") {
      return attendanceDate.toDateString() === today.toDateString();
    }

    const diff =
      (today - attendanceDate) / (1000 * 60 * 60 * 24);

    return diff <= Number(filter);

  });

  const percent =
    child.summary.totalDays === 0
      ? 0
      : Math.round(
          (child.summary.present /
            child.summary.totalDays) *
            100
        );

      return (

      <div
      key={child.student.id}
      className="bg-white o rounded-[2rem] shadow-2xl shadow-blue-900/10 mb-12 overflow-hidden border border-gray-100/80"
    >
      {/* ========== HEADER ========== */}
      <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-8 md:p-10 text-white overflow-hidden">
        {/* subtle decorative glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl"></div>

        <div className="relative flex flex-col sm:flex-row items-center gap-6 md:gap-8">
          <div className="relative">
            <img
              src={child.student.photo || "/default-avatar.png"}
              alt={child.student.fullName}
              className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white/90 object-cover shadow-2xl shadow-black/20"
            />
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-400 border-4 border-white rounded-full"></div>
          </div>

          <div className="text-center sm:text-left">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {child.student.fullName}
            </h1>
            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-1 text-blue-100/90 text-sm md:text-base">
              <span className="flex items-center gap-1.5">
                <span className="opacity-70">Roll</span>
                <span className="font-semibold text-white">{child.student.rollNumber}</span>
              </span>
              <span className="hidden sm:inline opacity-40">•</span>
              <span className="flex items-center gap-1.5">
                <span className="opacity-70">Class</span>
                <span className="font-semibold text-white">{child.student.class1}</span>
              </span>
              <span className="hidden sm:inline opacity-40">•</span>
              <span className="flex items-center gap-1.5">
                <span className="opacity-70">Section</span>
                <span className="font-semibold text-white">{child.student.section}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========== SUMMARY CARDS ========== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-6 md:p-8 -mt-2">
        {/* Present */}
        <div className="group bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-5 md:p-6 text-center border border-emerald-100/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
            <CheckCircle className="text-emerald-600 w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-emerald-700/80">Present</p>
          <h2 className="text-3xl font-bold text-emerald-800 mt-1">
            {child.summary.present}
          </h2>
        </div>

        {/* Absent */}
        <div className="group bg-gradient-to-br from-rose-50 to-red-50 rounded-2xl p-5 md:p-6 text-center border border-rose-100/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-rose-100 flex items-center justify-center group-hover:scale-110 transition-transform">
            <XCircle className="text-rose-600 w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-rose-700/80">Absent</p>
          <h2 className="text-3xl font-bold text-rose-800 mt-1">
            {child.summary.absent}
          </h2>
        </div>

        {/* Total Days */}
        <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 md:p-6 text-center border border-blue-100/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Calendar className="text-blue-600 w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-blue-700/80">Total Days</p>
          <h2 className="text-3xl font-bold text-blue-800 mt-1">
            {child.summary.totalDays}
          </h2>
        </div>

        {/* Attendance % */}
        <div className="group bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 md:p-6 text-center border border-amber-100/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
            <BarChart3 className="text-amber-600 w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-amber-700/80">Attendance</p>
          <h2 className="text-3xl font-bold text-amber-800 mt-1">
            {percent}%
          </h2>
        </div>
      </div>

      {/* ========== MISSED CLASSES ========== */}
      <div className="px-6 md:px-8 pb-2">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1.5 h-6 bg-rose-500 rounded-full"></div>
          <h2 className="text-xl font-bold text-gray-800">
            Missed Classes
          </h2>
        </div>

        {child.absentDates.length === 0 ? (
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
            <p className="text-emerald-700 font-medium text-lg">
              No Absent Record 🎉
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {child.absentDates.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-rose-50/70 hover:bg-rose-50 border border-rose-100 rounded-xl px-5 py-3.5 transition-colors"
              >
                <span className="font-medium text-gray-700">{item.date}</span>
                <span className="text-xs font-bold tracking-wide uppercase text-rose-600 bg-rose-100 px-3 py-1 rounded-full">
                  Absent
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========== ATTENDANCE HISTORY ========== */}
      <div className="p-6 md:p-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-800">
              Attendance History
            </h2>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
          >
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAttendance.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/70 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {item.attendanceDate}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide ${
                        item.status === "Yes" || item.status === "Present"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

      );

    })}

  </div>
</div>
  );
}