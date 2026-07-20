/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  Calendar,
  BadgeCheck,
  LogOut,
  Pencil,
} from "lucide-react";

export default function TeacherProfile() {
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("Teacher");
    if (user) {
      setTeacher(JSON.parse(user));
    }
  }, []);

  if (!teacher) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Cover */}
      <div className="h-64 bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-500 relative">

        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2">

          <Image
            src={teacher.photo || "/default-user.png"}
            alt={teacher.fullName}
            width={170}
            height={170}
            className="rounded-full border-[6px] border-white object-cover shadow-xl"
          />

        </div>

      </div>

      <div className="max-w-6xl mx-auto px-5 mt-28">

        {/* Top Card */}

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="flex flex-col lg:flex-row justify-between lg:items-center">

            <div>

              <h1 className="text-4xl font-bold text-slate-800">
                {teacher.fullName}
              </h1>

              <p className="text-blue-600 font-semibold mt-2">
                Teacher
              </p>

              <div className="inline-flex mt-4 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                Teacher ID : #{teacher.id}
              </div>

            </div>

            <div className="flex gap-3 mt-6 lg:mt-0">

              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl">
                <Pencil size={18} />
                Edit Profile
              </button>

              <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl">
                <LogOut size={18} />
                Logout
              </button>

            </div>

          </div>
        </div>

        {/* Info */}

        <div className="grid lg:grid-cols-2 gap-8 mt-8">

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-8">
              Personal Information
            </h2>

            <div className="space-y-6">

              <div className="flex items-center gap-4">

                <Mail className="text-blue-600" />

                <div>
                  <p className="text-gray-500">
                    Email
                  </p>

                  <h3 className="font-semibold">
                    {teacher.email}
                  </h3>
                </div>

              </div>

              <div className="flex items-center gap-4">

                <Phone className="text-green-600" />

                <div>
                  <p className="text-gray-500">
                    Phone
                  </p>

                  <h3 className="font-semibold">
                    {teacher.phone}
                  </h3>
                </div>

              </div>

              <div className="flex items-center gap-4">

                <Calendar className="text-orange-500" />

                <div>
                  <p className="text-gray-500">
                    Date of Birth
                  </p>

                  <h3 className="font-semibold">
                    {new Date(
                      teacher.dateOfBirth
                    ).toLocaleDateString()}
                  </h3>
                </div>

              </div>

            </div>

          </div>

          {/* Status Card */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-8">
              Account Status
            </h2>

            <div className="space-y-6">

              <div className="flex justify-between">

                <span>Role</span>

                <span className="font-semibold text-blue-600">
                  Teacher
                </span>

              </div>

              <div className="flex justify-between">

                <span>Account Status</span>

                <span className="text-green-600 font-bold flex items-center gap-2">
                  <BadgeCheck size={18} />
                  Active
                </span>

              </div>

              <div className="flex justify-between">

                <span>Teacher ID</span>

                <span className="font-semibold">
                  #{teacher.id}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}