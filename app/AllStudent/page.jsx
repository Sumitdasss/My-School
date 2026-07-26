/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [roll, setRoll] = useState("");
  const [class1, setClass1] = useState("");
  const [section, setSection] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const [classes, setClasses] = useState([]);
const [sections, setSections] = useState([]);
  const getStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (roll.trim()) params.append("roll", roll.trim());
      if (class1) params.append("class", class1);
      if (section) params.append("section", section);







      
      const res = await fetch(`/api/Teacher/student?${params.toString()}`);

      if (!res.ok) throw new Error("Failed to fetch students");

      const data = await res.json();

      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load students.");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getStudents();
    }, 300);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roll, class1, section]);



const getFilters = async () => {
  const res = await fetch("/api/Teacher/student-filters");
  const data = await res.json();

  setClasses(data.classes);
  setSections(data.sections);
};

useEffect(() => {
  getFilters();
}, []);

  return (
    <div className="w-full">
    <div className="max-w-360 mx-auto px- md:px-0 py-8 mt-20">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-gray-500 mt-1">
            Manage and view all students
          </p>
        </div>

        <div className="mt-4 md:mt-0 bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold">
          Total Students : {students.length}
        </div>

      </div>

      {/* Filter */}
      <div className="grid lg:grid-cols-4 gap-4 mb-8">

        <input
          type="text"
          placeholder="Search Roll..."
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

      <select
  value={class1}
  onChange={(e) => setClass1(e.target.value)}
  className="border rounded-xl p-3"
>
  <option value="">All Class</option>

  {classes.map((item) => (
    <option key={item.class1} value={item.class1}>
      Class {item.class1}
    </option>
  ))}
</select>

       <select
  value={section}
  onChange={(e) => setSection(e.target.value)}
  className="border rounded-xl p-3"
>
  <option value="">All Section</option>

  {sections.map((item) => (
    <option key={item.section} value={item.section}>
      Section {item.section}
    </option>
  ))}
</select>

        <button
          onClick={() => {
            setRoll("");
            setClass1("");
            setSection("");
          }}
          className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
        >
          Reset Filter
        </button>

      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="text-center text-red-500 font-semibold py-10">
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && students.length === 0 && (
        <div className="text-center py-20">

          <h2 className="text-2xl font-bold">
            No Student Found
          </h2>

          <p className="text-gray-500 mt-2">
            Try changing Roll, Class or Section.
          </p>

        </div>
      )}

      {/* Student Grid */}

      {!loading && !error && students.length > 0 && (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {students.map((student) => (

            <div
              key={student.id}
              className="bg-white rounded-2xl border shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300 overflow-hidden"
            >

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-20"></div>

              <div className="-mt-10 flex justify-center">

                <img
                  src={student.photo || "/default-avatar.png"}
                  alt={student.fullName}
                  onError={(e) => {
                    e.currentTarget.src = "/default-avatar.png";
                  }}
                  className="w-24 h-24 rounded-full border-4 border-white object-cover bg-white"
                />

              </div>

              <div className="p-5">

                <h2 className="text-xl font-bold text-center">
                  {student.fullName}
                </h2>

                <div className="mt-5 space-y-2 text-sm">

                  <p>
                    <span className="font-semibold">Roll :</span>{" "}
                    {student.rollNumber}
                  </p>

                  <p>
                    <span className="font-semibold">Class :</span>{" "}
                    {student.class1}
                  </p>

                  <p>
                    <span className="font-semibold">Section :</span>{" "}
                    {student.section}
                  </p>

                  <p>
                    <span className="font-semibold">Phone :</span>{" "}
                    {student.phone || "N/A"}
                  </p>

                </div>

                <Link
                  href={`/teacher/student/${student.id}`}
                  className="block mt-6 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
                >
                  View Profile
                </Link>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
    </div>
  );
}