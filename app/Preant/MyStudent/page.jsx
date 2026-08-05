/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function MyStudent() {

    const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
const [isopen, setisopen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleOpen = (student) => {
    setSelectedStudent(student);
    setisopen(true);
  }

  const handleClose = () => {
    setisopen(false);
    setSelectedStudent(null);
  }

  const loadStudents = async () => {

    try {

      const parent = JSON.parse(localStorage.getItem("Parent"));

      if (!parent) {
        setLoading(false);
        return;
      }


      const res = await fetch(
        `/api/ParentRegistar/my-student?parentId=${parent.id}`
      );


      const data = await res.json();


      if(data.success){

        setStudents(data.students);

      }


    } catch(error){

      console.log(error);

    } finally {

      setLoading(false);

    }

  };





  useEffect(() => {

    loadStudents();


    window.addEventListener("child-remove", loadStudents);


    return()=>{

      window.removeEventListener("child-remove", loadStudents);

    }


  }, []);






  const removeChild = async (studentId) => {

    try {

      const parent = JSON.parse(localStorage.getItem("Parent"));


      if (!parent) {

        alert("Parent login required");
        return;

      }



      const res = await fetch("/api/ParentRegistar/remove-child", {

        method:"DELETE",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          parentId:parent.id,
          studentId:studentId

        })

      });



      const data = await res.json();



      if(data.success){


        // instant UI update
        setStudents((prev)=>
          prev.filter(
            (student)=>student.id !== studentId
          )
        );


        // latest data fetch
        await loadStudents();


        // event trigger
        window.dispatchEvent(
          new Event("child-remove")
        );


        alert("Child removed successfully");


      }
      else{

        alert(data.message);

      }



    } catch(error){

      console.log(error);

      alert("Something went wrong");

    }

  };
  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold">
          Loading...
        </h1>
      </div>
    );

  }




  return (

    <div className="min-h-screen bg-gray-100 p-6">


      <div className="max-w-360 mx-auto">


        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            My Students
          </h1>


          <Link
            href="/Parent/AddChild"
            className="bg-[#D4AF37] px-5 py-3 rounded-xl font-semibold"
          >
            Add Child
          </Link>


        </div>




        {
          students.length === 0 ? (

            <div className="bg-white rounded-2xl p-8 text-center shadow">

              <h2 className="text-xl">
                No Student Found
              </h2>

              <p className="text-gray-500 mt-2">
                Add your child first
              </p>

            </div>


          ) : (


            <div className="grid md:grid-cols-2 gap-6">


           {students.map((student) => (
  <div
    key={student.id}
    className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1"
  >
    {/* Top gradient */}
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-16"></div>

    <div className="px-5 pb-5 -mt-10">
      {/* Photo + Name */}
      <div className="flex items-center gap-4">
        <img
          src={student.photo || "/default-avatar.png"}
          alt={student.fullName}
          onError={(e) => {
            e.currentTarget.src = "/default-avatar.png";
          }}
          className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-md bg-white"
        />

        <div className="pt-6">
          <h2 className="text-xl font-bold text-gray-900 leading-tight">
            {student.fullName}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Roll: {student.rollNumber}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="mt-5 space-y-2 text-sm text-gray-600">
        <p>
          <span className="font-semibold text-gray-800">Class:</span>{" "}
          {student.class1}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Section:</span>{" "}
          {student.section}
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        <button
         onClick={() => handleOpen(student)}
          className="flex-1 text-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 rounded-xl font-medium transition-all"
        >
          View Profile
        </button>

        <button
          onClick={() => removeChild(student.id)}
          className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
))}
{isopen && selectedStudent && (
  <div className="fixed inset-0 top-10 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-200">

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-lg font-bold transition-all z-10"
      >
        ✕
      </button>

      {/* Gradient Header + Photo */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-36 relative">
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <img
            src={selectedStudent.photo || "/default-avatar.png"}
            alt={selectedStudent.fullName}
            onError={(e) => {
              e.currentTarget.src = "/default-avatar.png";
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

        {/* Info Rows */}
        <div className="mt-8 space-y-3 text-left">
          {[
            { label: "Roll Number", value: selectedStudent.rollNumber },
            { label: "Class", value: selectedStudent.class1 },
            { label: "Section", value: selectedStudent.section },
            { label: "Phone", value: selectedStudent.phone || "N/A" },
            { label: "Email", value: selectedStudent.email || "N/A" },
            { label: "Father", value: selectedStudent.fatherName || "N/A" },
            { label: "Mother", value: selectedStudent.motherName || "N/A" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-xl px-4 py-3 transition-colors"
            >
              <span className="text-gray-500 text-sm font-medium">{item.label}</span>
              <span className="font-semibold text-gray-800 text-sm text-right max-w-[60%] break-all">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
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


          )

        }


      </div>


    </div>

  );

}