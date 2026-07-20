/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { User, Mail, Phone, UserRound } from "lucide-react";

export default function ChildrenPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
  async function loadChildren() {
    const parent = JSON.parse(localStorage.getItem("Parent"));

    if (!parent) {
      setLoading(false);
      return;
    }

    const res = await fetch(
      `/api/ParentRegistar/children?childName=${encodeURIComponent(parent.childName)}&childRoll=${encodeURIComponent(parent.childRoll)}`
    );

    const data = await res.json();

    if (data.success) {
      setStudents(data.students);
    } else {
      setStudents([]);
    }

    setLoading(false);
  }

  loadChildren();
}, []);

  const filteredStudents = students.filter((student) =>
    (student.fullName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" bg-gray-50 dark:bg-gray-950 py-10">
      <div className="max-w-360 mx-auto px-6 mt-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              My Children
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {students.length} {students.length === 1 ? "child" : "children"} registered
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <User className="absolute left-4 top-3.5 text-gray-400" size={24} />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white dark:bg-gray-900 rounded-3xl p-6 h-96" />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && students.length === 0 && (
          <div className="text-center py-20">
            <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 text-4xl">
              👨‍👩‍👧
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">No children found</h3>
            <p className="text-gray-500 mt-3">Add your children to get started</p>
          </div>
        )}

        {/* Children Grid */}
        {!loading && filteredStudents.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Photo Section */}
                <div className="relative h-56 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  {student.photo ? (
                    <img
                      src={student.photo}
                      alt={student.fullName}
                      className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-xl"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl bg-white/20 flex items-center justify-center">
                      <User className="text-white" size={48} />
                    </div>
                  )}
                </div>

                {/* Info Section */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
                    {student.fullName}
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <Mail className="w-5 h-5" />
                      <p className="truncate">{student.email}</p>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <Phone className="w-5 h-5" />
                      <p>{student.phone}</p>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <UserRound className="w-5 h-5" />
                      <p>Father: <span className="font-medium text-gray-800 dark:text-gray-200">{student.fatherName}</span></p>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <UserRound className="w-5 h-5" />
                      <p>Mother: <span className="font-medium text-gray-800 dark:text-gray-200">{student.motherName}</span></p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-100 dark:border-gray-800 p-4 flex gap-3">
                  <button className="flex-1 py-3 text-sm font-semibold rounded-2xl bg-blue-600 hover:bg-blue-700 text-white transition">
                    View Details
                  </button>
                  <button className="flex-1 py-3 text-sm font-semibold rounded-2xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No search results */}
        {!loading && students.length > 0 && filteredStudents.length === 0 && (
          <p className="text-center text-gray-500 py-10">No children match your search.</p>
        )}
      </div>
    </div>
  );
}