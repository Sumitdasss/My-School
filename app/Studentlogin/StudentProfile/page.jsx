/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [userParent, setUserParent] = useState(null);
  const [userTeacher, setUserTeacher] = useState(null);

  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const loadUser = async () => {

      try {

        // =========================
        // STUDENT JWT TOKEN CHECK
        // =========================

        const studentToken =
          localStorage.getItem("Studenttoken");
        const parentToken =
          localStorage.getItem("Parenttoken");
        const teacherToken =
          localStorage.getItem("Teachertoken");


        if (studentToken) {

          const res = await fetch(
            "https://my-school-backend-iota.vercel.app/api/studentlogin/profile",
            {
              method: "GET",

              headers: {
                Authorization:
                  `Bearer ${studentToken}`,
              },
            }
          );


          const data = await res.json();


          if (res.ok && data.success) {

            setUserData(data.data);
            setRole("student");

            return;
          }


          // Token invalid / expired
          if (
            res.status === 401 ||
            res.status === 403
          ) {

            localStorage.removeItem(
              "Studenttoken"
            );

          }

        }
        if (parentToken) {

          const res = await fetch(
            "https://my-school-backend-iota.vercel.app/api/ParentRegistar/parentprofile",
            {
              method: "GET",

              headers: {
                Authorization:
                  `Bearer ${parentToken}`,
              },
            }
          );


          const data = await res.json();


          if (res.ok && data.success) {

            setUserParent(data.data);
            setRole("parent");

            return;
          }


          // Token invalid / expired
          if (
            res.status === 401 ||
            res.status === 403
          ) {

            localStorage.removeItem(
              "Studenttoken"
            );

          }

        }
        if (teacherToken) {

          const res = await fetch(
            "https://my-school-backend-iota.vercel.app/api/TeacherRegistar/teacherprofile",
            {
              method: "GET",

              headers: {
                Authorization:
                  `Bearer ${teacherToken}`,
              },
            }
          );


          const data = await res.json();


          if (res.ok && data.success) {

            setUserTeacher(data.data);
            setRole("teacher");

            return;
          }


          // Token invalid / expired
          if (
            res.status === 401 ||
            res.status === 403
          ) {

            localStorage.removeItem(
              "Studenttoken"
            );

          }

        }


        // =========================
        // PARENT OLD SYSTEM
        // =========================



        // =========================
        // TEACHER OLD SYSTEM
        // =========================

      


        // কেউ Login করা নেই
        setUserData(null);
        setUserParent(null);
        setUserTeacher(null);
        setRole("");


      } catch (error) {

        console.error(
          "Profile Load Error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    loadUser();


  }, []);


  // কোন data show হবে
  const alldeta =
    userData ||
    userParent ||
    userTeacher;


  // =========================
  // Loading
  // =========================

  if (loading) {

    return (
      <div className="flex justify-center items-center h-screen">

        <h1>
          Loading...
        </h1>

      </div>
    );

  }


  // =========================
  // Not Logged In
  // =========================

  if (!alldeta) {

    return (
      <div className="flex flex-col justify-center items-center h-screen gap-5">

        <h1 className="text-2xl font-bold">
          You are not logged in
        </h1>


        <button
          onClick={() =>
            router.push("/Studentlogin")
          }
          className="px-6 py-3 rounded-xl bg-[#D4AF37] font-semibold"
        >

          Login Now

        </button>

      </div>
    );

  }


  return (

    <div className="min-h-screen bg-slate-100 py-28">

      <div className="max-w-360 mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">


        {/* ================= Header ================= */}

        <div className="bg-gradient-to-r from-[#081527] to-[#0f2b50] min-h-48 flex items-center px-10">

          <img
            src={
              alldeta?.photo ||
              "/default-user.png"
            }
            alt={
              alldeta?.fullName ||
              "User"
            }
            className="w-40 h-40 rounded-full border-4 border-white object-cover"
          />


          <div className="ml-8 text-white">

            <h1 className="text-4xl font-bold">

              {alldeta?.fullName}

            </h1>


            <p className="text-lg text-white/80">

              ID : {alldeta?.id}

            </p>


            <span className="inline-block mt-3 px-4 py-1 rounded-full bg-green-500">

              {role === "student"
                ? "Student"
                : role === "parent"
                ? "Parent"
                : "Teacher"}

            </span>

          </div>

        </div>



        {/* ================= Body ================= */}

        <div className="grid lg:grid-cols-2 gap-10 p-10">


          {/* Personal Information */}

          <div>

            <h2 className="text-2xl font-bold mb-6">

              Personal Information

            </h2>


            {/* STUDENT */}

            {role === "student" && (
              <>

                <Info
                  label="Father Name"
                  value={alldeta?.fatherName}
                />


                <Info
                  label="Mother Name"
                  value={alldeta?.motherName}
                />


                <Info
                  label="Date of Birth"
                  value={alldeta?.dateOfBirth}
                />


                <Info
                  label="Phone"
                  value={alldeta?.phone}
                />


                <Info
                  label="Email"
                  value={alldeta?.email}
                />

              </>
            )}


            {/* PARENT */}

            {role === "parent" && (
              <>

                <Info
                  label="Child Name"
                  value={alldeta?.childName}
                />

                <Info
                  label="Child Email"
                  value={alldeta?.childEmail}
                />

                <Info
                  label="Child Class"
                  value={alldeta?.childClass}
                />

                <Info
                  label="Child Roll"
                  value={alldeta?.childRoll}
                />

                <Info
                  label="Phone"
                  value={alldeta?.phone}
                />

                <Info
                  label="Email"
                  value={alldeta?.email}
                />

              </>
            )}


            {/* TEACHER */}

            {role === "teacher" && (
              <>

                <Info
                  label="Phone"
                  value={alldeta?.phone}
                />

                <Info
                  label="Email"
                  value={alldeta?.email}
                />

              </>
            )}

          </div>



          {/* Academic Information */}

          {role === "student" && (

            <div>

              <h2 className="text-2xl font-bold mb-6">

                Academic Information

              </h2>


              <Info
                label="Class"
                value={alldeta?.class1}
              />


              <Info
                label="Section"
                value={alldeta?.section}
              />


              <Info
                label="Roll"
                value={alldeta?.rollNumber}
              />


              <Info
                label="Registration"
                value={alldeta?.registrationNumber}
              />


              <Info
                label="Group"
                value={alldeta?.group}
              />

            </div>

          )}

        </div>



        {/* ================= Buttons ================= */}

        <div className="border-t p-10 flex flex-wrap gap-5">


          {role === "student" && (

            <div className="flex flex-col sm:flex-row gap-4 w-full">


              <a
                href={`/Studentlogin/edit/${alldeta?.id}`}
                className="flex-1 px-6 py-3 rounded-xl bg-[#D4AF37] font-semibold text-center hover:bg-[#c49d28] transition"
              >

                Edit Profile

              </a>


              <a
                href="/Studentlogin/studentresult"
                className="flex-1 px-6 py-3 rounded-xl bg-[#D4AF37] font-semibold text-center hover:bg-[#c49d28] transition"
              >

                View Result

              </a>


              <a
                href="/admit-card"
                className="flex-1 px-6 py-3 rounded-xl bg-[#D4AF37] font-semibold text-center hover:bg-[#c49d28] transition"
              >

                Download Admit Card

              </a>


              <a
                href={`/Studentlogin/forgot-password?email=${encodeURIComponent(
                  alldeta?.email || ""
                )}`}
                className="flex-1 px-6 py-3 rounded-xl bg-[#D4AF37] font-semibold text-center hover:bg-[#c49d28] transition"
              >

                Change Password

              </a>

            </div>

          )}


          {role === "parent" && (

            <div className="flex flex-col sm:flex-row gap-4 w-full">

              <a
                href={`/Preant/edit/${alldeta?.id}`}
                className="flex-1 px-6 py-3 rounded-xl bg-[#D4AF37] font-semibold text-center"
              >

                Edit Profile

              </a>

                <a
                href={`/Studentlogin/forgot-password?email=${encodeURIComponent(
                  alldeta?.email || ""
                )}`}
                className="flex-1 px-6 py-3 rounded-xl bg-[#D4AF37] font-semibold text-center hover:bg-[#c49d28] transition"
              >

                Change Password

              </a>

            </div>

            

          )}


          {role === "teacher" && (

            <div className="flex flex-col sm:flex-row gap-4 w-full">

              <a
                href={`/Teacher/edit/${alldeta?.id}`}
                className="flex-1 px-6 py-3 rounded-xl bg-[#D4AF37] font-semibold text-center"
              >

                Edit Profile

              </a>
  <a
                href={`/Studentlogin/forgot-password?email=${encodeURIComponent(
                  alldeta?.email || ""
                )}`}
                className="flex-1 px-6 py-3 rounded-xl bg-[#D4AF37] font-semibold text-center hover:bg-[#c49d28] transition"
              >

                Change Password

              </a>
            </div>

          )}

        </div>

      </div>

    </div>

  );

};


export default Profile;



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