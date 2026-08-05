/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadStudent();
    }
  }, [id]);

  const loadStudent = async () => {
    try {
      const res = await fetch(`/api/student?id=${id}`);

      if (!res.ok) {
        setLoading(false);
        return;
      }

      const data = await res.json();
      setStudent(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1 className="text-center mt-20">Loading...</h1>;
  }

  if (!student) {
    return <h1 className="text-center mt-20">Student Not Found</h1>;
  }

  return (
<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-10">
  <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/60 w-full max-w-lg overflow-hidden border border-gray-100">

    {/* Top Gradient Banner */}
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32 relative">
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
        <img
          src={student.photo || "/default-avatar.png"}
          alt={student.fullName}
          onError={(e) => {
            e.currentTarget.src = "/default-avatar.png";
          }}
          className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg bg-white"
        />
      </div>
    </div>

    {/* Content */}
    <div className="pt-20 pb-8 px-8 text-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
        {student.fullName}
      </h1>
      <p className="text-blue-600 font-medium mt-1">
        Student Profile
      </p>

      {/* Info Cards */}
      <div className="mt-8 space-y-4 text-left">
        <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
            R
          </div>
          <div>
            <p className="text-xs text-gray-500">Roll Number</p>
            <p className="font-semibold text-gray-800">{student.rollNumber}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
            C
          </div>
          <div>
            <p className="text-xs text-gray-500">Class</p>
            <p className="font-semibold text-gray-800">{student.class1}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-sm">
            S
          </div>
          <div>
            <p className="text-xs text-gray-500">Section</p>
            <p className="font-semibold text-gray-800">{student.section}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">
            P
          </div>
          <div>
            <p className="text-xs text-gray-500">Phone</p>
            <p className="font-semibold text-gray-800">{student.phone || "N/A"}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
            E
          </div>
          <div>
            <p className="text-xs text-gray-500">Email</p>
            <p className="font-semibold text-gray-800 break-all">{student.email || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}