/* eslint-disable react-hooks/set-state-in-effect */
"use client"



import React, { useEffect, useState } from 'react'

const Profile = () => {

   const [student, setStudent] = useState(null);
const [parent, setParent] = useState(null);

useEffect(() => {
  const user = localStorage.getItem("student");
  const prent = localStorage.getItem("Parent"); // key একই রাখতে হবে

  if (prent) {
    setParent(JSON.parse(prent));
  }

  if (user) {
    setStudent(JSON.parse(user));
  }
}, []);
const userData = student || parent;
  if (!userData) return <h1>Loading...</h1>;
  return (
   <div className="min-h-screen bg-slate-100 py-28">
  <div className="max-w-360 mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

    {/* Header */}
    <div className="bg-gradient-to-r from-[#081527] to-[#0f2b50] h-48 flex items-center px-10">

      <img
        src={userData.photo }
        alt={userData.fullName }
        className="w-40 h-40 rounded-full border-4 border-white object-cover"
      />

      <div className="ml-8 text-white">
        <h1 className="text-4xl font-bold">
          {userData.fullName}
        </h1>

        <p className="text-lg text-white/80">
          Student ID : {userData.id}
        </p>

        <span className="inline-block mt-3 px-4 py-1 rounded-full bg-green-500">
          Active Student
        </span>
      </div>

    </div>

    {/* Body */}

    <div className="grid lg:grid-cols-2 gap-10 p-10">

      {/* Personal */}

      <div>

        <h2 className="text-2xl font-bold mb-6">
          Personal Information
        </h2>

        <Info label="Father Name" value={userData.fatherName} />
        <Info label="Mother Name" value={userData.motherName} />
        <Info label="Date of Birth" value={userData.dateOfBirth} />
        <Info label="Phone" value={userData.phone} />
        <Info label="Email" value={userData.email} />

      </div>

      {/* Academic */}

      <div>

        <h2 className="text-2xl font-bold mb-6">
          Academic Information
        </h2>

        <Info label="Class" value={userData.class} />
        <Info label="Section" value={userData.section} />
        <Info label="Roll" value={userData.roll} />
        <Info label="Registration" value={userData.registrationNumber} />
        <Info label="Group" value={userData.group} />

      </div>

    </div>

    <div className="border-t p-10 flex flex-wrap gap-5">

      <button className="px-6 py-3 rounded-xl bg-[#D4AF37] font-semibold">
        Download Admit Card
      </button>

      <button className="px-6 py-3 rounded-xl bg-blue-600 text-white">
        View Result
      </button>

      <button className="px-6 py-3 rounded-xl bg-red-500 text-white">
        Change Password
      </button>

    </div>

  </div>
</div>





  )
}

export default Profile

function Info({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b border-gray-200 py-3">
      <span className="font-medium text-gray-600">
        {label}
      </span>

      <span className="font-semibold text-gray-900">
        {value || "-"}
      </span>
    </div>
  );
}
