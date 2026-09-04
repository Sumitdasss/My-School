/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";



export default function MyStudent() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // =====================================
  // OPEN PROFILE
  // =====================================

  const handleOpen = (student) => {
    setSelectedStudent(student);
    setIsOpen(true);
  };

  // =====================================
  // CLOSE PROFILE
  // =====================================

  const handleClose = () => {
    setIsOpen(false);
    setSelectedStudent(null);
  };

  // =====================================
  // LOAD STUDENTS
  // =====================================

  const loadStudents = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("Parenttoken");

      // No token
      if (!token) {
        alert("Parent login required");
        return;
      }

      const res = await fetch(
        `https://my-school-backend-iota.vercel.app/api/ParentRegistar/Showaddchild`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      console.log("My Students Response:", data);

      // =====================================
      // AUTH ERROR
      // =====================================

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("Parenttoken");

        alert("Parent session expired");

        window.location.href = "/ParentLogin";

        return;
      }

      // =====================================
      // OTHER ERROR
      // =====================================

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to load students"
        );
      }

      // =====================================
      // SUCCESS
      // =====================================

      if (data.success) {
        setStudents(data.students || []);
      } else {
        setStudents([]);
      }

    } catch (error) {
      console.error(
        "Load Students Error:",
        error
      );

      alert(
        error.message ||
          "Failed to load students"
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // INITIAL LOAD
  // =====================================

  useEffect(() => {
    loadStudents();

    // Child removed event
    const handleChildRemove = () => {
      loadStudents();
    };

    window.addEventListener(
      "child-remove",
      handleChildRemove
    );

    return () => {
      window.removeEventListener(
        "child-remove",
        handleChildRemove
      );
    };
  }, []);

  // =====================================
  // REMOVE CHILD
  // =====================================

  const removeChild = async (id) => {
    try {
      const token =
        localStorage.getItem("Parenttoken");

      if (!token) {
        alert("Parent login required");
        return;
      }

      // Confirmation
      const confirmRemove = window.confirm(
        "Are you sure you want to remove this child?"
      );

      if (!confirmRemove) {
        return;
      }

      const res = await fetch(
        `https://my-school-backend-iota.vercel.app/api/ParentRegistar/remove-child/${id}`,
        {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            studentId: Number(id),
          }),
        }
      );

      const data = await res.json();

      console.log(
        "Remove Child Response:",
        data
      );

      // =====================================
      // AUTH ERROR
      // =====================================

      if (
        res.status === 401 ||
        res.status === 403
      ) {
        localStorage.removeItem(
          "Parenttoken"
        );

        alert("Parent session expired");

        window.location.href =
          "/ParentLogin";

        return;
      }

      // =====================================
      // ERROR
      // =====================================

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Failed to remove child"
        );
      }

      // =====================================
      // SUCCESS
      // =====================================

      if (data.success) {
        // Instant UI update
        setStudents((prev) =>
          prev.filter(
            (student) =>
              student.id !== id
          )
        );

        // Close profile if same student
        if (
          selectedStudent?.id ===
          id
        ) {
          handleClose();
        }

        alert(
          data.message ||
            "Child removed successfully"
        );

        // Refresh latest data
        await loadStudents();

        // Notify other components
        window.dispatchEvent(
          new Event("child-remove")
        );
      } else {
        alert(
          data.message ||
            "Failed to remove child"
        );
      }

    } catch (error) {
      console.error(
        "Remove Child Error:",
        error
      );

      alert(
        error.message ||
          "Something went wrong"
      );
    }
  };

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-[#D4AF37] rounded-full animate-spin mx-auto mb-4"></div>

          <h1 className="text-xl font-semibold">
            Loading Students...
          </h1>
        </div>
      </div>
    );
  }

  // =====================================
  // UI
  // =====================================

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Students
            </h1>

            <p className="text-gray-500 mt-1">
              Manage your children
            </p>
          </div>

          <Link
            href="/Preant/add-child"
            className="bg-[#D4AF37] hover:bg-[#c49f2f] px-5 py-3 rounded-xl font-semibold transition"
          >
            + Add Child
          </Link>

        </div>

        {/* =====================================
            NO STUDENT
        ===================================== */}

        {students.length === 0 ? (

          <div className="bg-white rounded-2xl p-10 text-center shadow">

            <h2 className="text-xl font-semibold">
              No Student Found
            </h2>

            <p className="text-gray-500 mt-2">
              Add your child first.
            </p>

            <Link
              href="/Preant/add-child"
              className="inline-block mt-5 bg-[#D4AF37] hover:bg-[#c49f2f] px-5 py-3 rounded-xl font-semibold"
            >
              Add Child
            </Link>

          </div>

        ) : (

          /* =====================================
             STUDENT GRID
          ===================================== */

          <div className="grid md:grid-cols-2 gap-6">

            {students.map((student) => (

              <div
                key={student.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >

                {/* Top Gradient */}

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-16"></div>

                <div className="px-5 pb-5 -mt-10">

                  {/* Photo + Name */}

                  <div className="flex items-center gap-4">

                    <img
                      src={
                        student.photo ||
                        "/default-avatar.png"
                      }
                      alt={
                        student.fullName ||
                        "Student"
                      }
                      onError={(e) => {
                        e.currentTarget.src =
                          "/default-avatar.png";
                      }}
                      className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-md bg-white"
                    />

                    <div className="pt-6">

                      <h2 className="text-xl font-bold text-gray-900 leading-tight">
                        {student.fullName}
                      </h2>

                      <p className="text-sm text-gray-500 mt-0.5">
                        Roll:{" "}
                        {student.rollNumber}
                      </p>

                    </div>

                  </div>

                  {/* Student Info */}

                  <div className="mt-5 space-y-2 text-sm text-gray-600">

                    <p>
                      <span className="font-semibold text-gray-800">
                        Class:
                      </span>{" "}
                      {student.class1}
                    </p>

                    <p>
                      <span className="font-semibold text-gray-800">
                        Section:
                      </span>{" "}
                      {student.section}
                    </p>

                  </div>

                  {/* Buttons */}

                  <div className="mt-6 flex gap-3">

                    <button
                      onClick={() =>
                        handleOpen(student)
                      }
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 rounded-xl font-medium transition-all"
                    >
                      View Profile
                    </button>

                    <button
                      onClick={() =>
                        removeChild(student.id)
                      }
                      className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

      {/* =====================================
          PROFILE MODAL
      ===================================== */}

      {isOpen && selectedStudent && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative">

            {/* Close Button */}

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center text-lg font-bold transition-all z-10"
            >
              ✕
            </button>

            {/* Header */}

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-36 relative">

              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">

                <img
                  src={
                    selectedStudent.photo ||
                    "/default-avatar.png"
                  }
                  alt={
                    selectedStudent.fullName ||
                    "Student"
                  }
                  onError={(e) => {
                    e.currentTarget.src =
                      "/default-avatar.png";
                  }}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg bg-white"
                />

              </div>

            </div>

            {/* Content */}

            <div className="pt-20 pb-6 px-6 text-center">

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                {selectedStudent.fullName}
              </h1>

              <p className="text-blue-600 font-medium mt-1 text-sm">
                Student Profile
              </p>

              {/* Info */}

              <div className="mt-8 space-y-3 text-left">

                {[
                  {
                    label: "Roll Number",
                    value:
                      selectedStudent.rollNumber,
                  },
                  {
                    label: "Class",
                    value:
                      selectedStudent.class1,
                  },
                  {
                    label: "Section",
                    value:
                      selectedStudent.section,
                  },
                  {
                    label: "Phone",
                    value:
                      selectedStudent.phone ||
                      "N/A",
                  },
                  {
                    label: "Email",
                    value:
                      selectedStudent.email ||
                      "N/A",
                  },
                  {
                    label: "Father",
                    value:
                      selectedStudent.fatherName ||
                      "N/A",
                  },
                  {
                    label: "Mother",
                    value:
                      selectedStudent.motherName ||
                      "N/A",
                  },
                ].map((item, index) => (

                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-xl px-4 py-3 transition-colors"
                  >

                    <span className="text-gray-500 text-sm font-medium">
                      {item.label}
                    </span>

                    <span className="font-semibold text-gray-800 text-sm text-right max-w-[60%] break-all">
                      {item.value}
                    </span>

                  </div>

                ))}

              </div>

              {/* Close */}

              <button
                onClick={handleClose}
                className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Close Profile
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

