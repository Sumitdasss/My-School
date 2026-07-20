/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { GraduationCap, Users, UserCheck, Bell, LogOut, Plus } from 'lucide-react';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);

 useEffect(() => {
  const adminData = localStorage.getItem("admin");

  if (!adminData || adminData === "undefined") {
    router.push("/panel");
    return;
  }

  setAdmin(JSON.parse(adminData));
}, []);

  const logout = () => {
    localStorage.removeItem("admin");
    router.push("/Adminpanel");
  };

  if (!admin) return null;

  return (
   <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[#0A1628] text-white border-b border-slate-700">
        <div className="max-w-360 mt-20 mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <GraduationCap size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">School Admin</h1>
              <p className="text-slate-400 text-sm">Welcome back, {admin?.fullName || 'Admin'}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition-all px-6 py-3 rounded-xl font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-360 mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Total Students</p>
                <p className="text-4xl font-bold text-slate-800 mt-2">1,248</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                <GraduationCap className="text-blue-600" size={32} />
              </div>
            </div>
            <div className="mt-4 text-emerald-600 text-sm font-medium flex items-center gap-1">
              ↑ 12% from last month
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Parents</p>
                <p className="text-4xl font-bold text-slate-800 mt-2">892</p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                <Users className="text-green-600" size={32} />
              </div>
            </div>
            <div className="mt-4 text-emerald-600 text-sm font-medium flex items-center gap-1">
              ↑ 8% from last month
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Teachers</p>
                <p className="text-4xl font-bold text-slate-800 mt-2">87</p>
              </div>
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
                <UserCheck className="text-purple-600" size={32} />
              </div>
            </div>
            <div className="mt-4 text-emerald-600 text-sm font-medium flex items-center gap-1">
              No change
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">Notices</p>
                <p className="text-4xl font-bold text-slate-800 mt-2">14</p>
              </div>
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center">
                <Bell className="text-amber-600" size={32} />
              </div>
            </div>
            <div className="mt-4 text-red-600 text-sm font-medium flex items-center gap-1">
              3 urgent
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Quick Actions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button className="group bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-8 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Plus size={36} />
              </div>
              <div>
                <p className="font-semibold text-lg">Add Student</p>
                <p className="text-blue-200 text-sm">Enroll new student</p>
              </div>
            </button>

            <button className="group bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-8 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Plus size={36} />
              </div>
              <div>
                <p className="font-semibold text-lg">Add Teacher</p>
                <p className="text-green-200 text-sm">Add new staff</p>
              </div>
            </button>

            <button className="group bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-8 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Plus size={36} />
              </div>
              <div>
                <p className="font-semibold text-lg">Add Parent</p>
                <p className="text-purple-200 text-sm">Register guardian</p>
              </div>
            </button>

            <button className="group bg-gradient-to-br from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white p-8 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Bell size={36} />
              </div>
              <div>
                <p className="font-semibold text-lg">Publish Notice</p>
                <p className="text-orange-200 text-sm">Send announcement</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}