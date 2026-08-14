/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
"use client"



import React, { useEffect, useState } from 'react'

const Profile = () => {

 const [userData, setUserData] = useState(null);
const [userParent, setUserParent] = useState(null);
const [userTeacher, setUserTeacher] = useState(null);
const [role, setRole] = useState("");
const [loading, setLoading] = useState(true); // NEW

useEffect(() => {
  const student = JSON.parse(localStorage.getItem("student"));
  const parent = JSON.parse(localStorage.getItem("Parent"));
  const teacher = JSON.parse(localStorage.getItem("Teacher"));

  if (student) {
    setRole("student");
    loadProfile(student.id);
  } else if (parent) {
    setRole("parent");
    loadProfile22(parent.id);
  } else if (teacher) {
    setRole("teacher");
    loadTeacherProfile(teacher.id);
  } else {
    setLoading(false); // no one logged in — stop waiting
  }
}, []);

const loadProfile = async (id) => {
  try {
    const res = await fetch(`/api/student?id=${id}`);
    const data = await res.json();
     setUserData(data.data)
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const loadProfile22 = async (id) => {
  try {
    const res = await fetch(`/api/ParentRegistar/${id}`);
    const data = await res.json();
    setUserParent(data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const loadTeacherProfile = async (id) => {
  try {
    const res = await fetch(`/api/Teacher/${id}`); // adjust endpoint
    const data = await res.json();
    setUserTeacher(data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const alldeta = userData || userParent || userTeacher;

if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1>Loading...</h1>
    </div>
  );
}

// If not logged in, render nothing (or a guest navbar) instead of the same loader
if (!alldeta) {
  return null; // or return <GuestNavbar />
}
  return (
   <div className="min-h-screen bg-slate-100 py-28">
  <div className="max-w-360 mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

    {/* Header */}
    <div className="bg-gradient-to-r from-[#081527] to-[#0f2b50] h-48 flex items-center px-10">

      <img
  src={alldeta?.photo || "/default-user.png"}
  alt={alldeta?.fullName || "Student"}
  className="w-40 h-40 rounded-full border-4 border-white object-cover"
/>

      <div className="ml-8 text-white">
        <h1 className="text-4xl font-bold">
          {alldeta.fullName}
        </h1>

        <p className="text-lg text-white/80">
          Student ID : {alldeta.id}
        </p>

       <span className="inline-block mt-3 px-4 py-1 rounded-full bg-green-500">
 {role==="student" ? "Student" : role==="parent" ? "Parent" : "Teacher"}
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
{role==="student"&&(<>

<Info label="Father Name" value={alldeta.fatherName} />
        <Info label="Mother Name" value={alldeta.motherName} />
        <Info label="Date of Birth" value={alldeta.dateOfBirth} />
        <Info label="Phone" value={alldeta.phone} />
        <Info label="Email" value={alldeta.email} />

</>)}

{role==="parent"&&(<>

<Info label="Child Name" value={alldeta.childName} />
        <Info label="child Email Address" value={alldeta.childEmail} />
        <Info label="Child Class" value={alldeta.childClass} />
        <Info label="Child Roll" value={alldeta.childRoll} />
        <Info label="Phone" value={alldeta.phone} />
        <Info label="Email" value={alldeta.email} />
       

</>)}
{role==="teacher"&&(<>

<Info label="Child Name" value={alldeta.childName} />
        <Info label="child Email Address" value={alldeta.childEmail} />
        <Info label="Child Class" value={alldeta.childClass} />
        <Info label="Child Roll" value={alldeta.childRoll} />
        <Info label="Phone" value={alldeta.phone} />
        <Info label="Email" value={alldeta.email} />
       

</>)}
        

      </div>

      {/* Academic */}

      <div>

        <h2 className="text-2xl font-bold mb-6">
          Academic Information
        </h2>

        <Info label="Class" value={alldeta.class1} />
        <Info label="Section" value={alldeta.section} />
        <Info label="Roll" value={alldeta.rollNumber} />
        <Info label="Registration" value={alldeta.registrationNumber} />
        <Info label="Group" value={alldeta.group} />

      </div>

    </div>

    <div className="border-t p-10 flex flex-wrap gap-5">

      
{role === "student" && (

  <div className="flex flex-col sm:flex-row gap-4 w-full">
  <a
    href={`/Studentlogin/edit/${alldeta.id}`}
    className="flex-1 px-6 py-3 rounded-xl bg-[#D4AF37] font-semibold text-center hover:bg-[#c49d28] transition"
  >
    Edit Profile
  </a>

  <a
    href={`/Studentlogin/edit/${alldeta.id}`}
    className="flex-1 px-6 py-3 rounded-xl bg-[#D4AF37] font-semibold text-center hover:bg-[#c49d28] transition"
  >
    View Result
  </a>

  <a
    href={`/Studentlogin/edit/${alldeta.id}`}
    className="flex-1 px-6 py-3 rounded-xl bg-[#D4AF37] font-semibold text-center hover:bg-[#c49d28] transition"
  >
    Download Admit Card
  </a>
<a
    href={`/Studentlogin/forgot-password?email=${encodeURIComponent(alldeta.email)}`}
    className="px-6 py-3 rounded-xl bg-[#D4AF37] font-semibold inline-flex items-center justify-center hover:bg-[#c49d28] transition"
  >
 Change Password
  </a>

</div>
)}

{role === "parent" && (
  <div className="flex flex-col sm:flex-row gap-4 w-full">
  <a
    href={`/Preant/edit/${alldeta.id}`}
    className="px-6 py-3 rounded-xl bg-[#D4AF37] font-semibold inline-flex items-center justify-center hover:bg-[#c49d28] transition"
  >
    Edit Profile
  </a>


  <a
    href={`/Studentlogin/forgot-password?email=${encodeURIComponent(alldeta.email)}`}
    className="px-6 py-3 rounded-xl bg-[#D4AF37] font-semibold inline-flex items-center justify-center hover:bg-[#c49d28] transition"
  >
 Change Password
  </a>
  </div>
)}

{role === "teacher" && (

  <div className="flex flex-col sm:flex-row gap-4 w-full">
  <a
    href={`/Teacher/edit/${alldeta.id}`}
    className="px-6 py-3 rounded-xl bg-[#D4AF37] font-semibold inline-flex items-center justify-center hover:bg-[#c49d28] transition"
  >
    Edit Profile
  </a>

  <a
    href={`/Studentlogin/forgot-password?email=${encodeURIComponent(alldeta.email)}`}
    className="px-6 py-3 rounded-xl bg-[#D4AF37] font-semibold inline-flex items-center justify-center hover:bg-[#c49d28] transition"
  >
 Change Password
  </a>
  </div>
)}
     
     
     
     

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
