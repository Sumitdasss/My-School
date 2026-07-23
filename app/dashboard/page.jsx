/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";


import {
  LayoutDashboard,
  GraduationCap,
  UserCheck,
  Search,
  Bell,
  User,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
function Dashboard() {


  const [stats, setStats] = useState({
  totalStudents: 0,
 totalTeachers: 0,
 totalParents: 0,
 studentGrowth:0,
 ParentGrowth:0,
 teacherStatus:"Low"
 
});

useEffect(() => {
  async function loadStats() {
    const res = await fetch("/api/Deshbord/Allpepolecount");
    const data = await res.json();

    setStats(data);
  }

  loadStats();
}, []);




  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-4xl font-bold text-gray-900">Good Morning, Admin</h2>
        <p className="text-gray-500 mt-2">Academic Year 2026 • Term II</p>
      </div>

      {/* Premium Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Students", value:stats. totalStudents, change: stats.studentGrowth, icon: "👨‍🎓", color: "from-blue-600 to-indigo-600" },
          { label: "Teaching Staff", value: stats.totalTeachers, change:stats.teacherStatus, icon: "👨‍🏫", color: "from-emerald-600 to-teal-600" },
          { label: "Guardians", value: stats.totalParents, change:stats.ParentGrowth, icon: "👨‍👩‍👧", color: "from-amber-600 to-orange-600" },
        
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-3xl shadow-xl shadow-gray-200/80 border border-gray-100 p-8 hover:-translate-y-1 transition-all duration-300">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-4xl mb-6`}>
              {stat.icon}
            </div>
            <p className="text-gray-500 text-sm font-medium tracking-widest">{stat.label}</p>
            <p className="text-5xl font-semibold text-gray-900 mt-3 tabular-nums">{stat.value}</p>
            <p className="text-emerald-600 text-sm mt-2 font-medium">{stat.change}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Students() {
  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/70 p-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900">All Students</h2>
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-3">
          + Add New Student
        </button>
      </div>
      <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl h-96 flex items-center justify-center">
        <p className="text-gray-400 text-lg">Student Management Table Here</p>
      </div>
    </div>
  );
}

function Teachers() {
  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/70 p-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900">Teaching Faculty</h2>
        <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center gap-3">
          + Add Teacher
        </button>
      </div>
      <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl h-96 flex items-center justify-center">
        <p className="text-gray-400 text-lg">Teachers Directory Here</p>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const [page, setPage] = useState("dashboard");
   const router = useRouter();
  const [admin, setAdmin] = useState(null);

 useEffect(() => {
  const adminData = localStorage.getItem("admin");

  if (!adminData || adminData === "undefined") {
    router.push("/Adminpanel");
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
    <div className="mt-20 bg-[#F8F6F1]">

      {/* Premium Header */}
      <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 shadow-sm">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
           <img src="/logo.png" alt="" className="w-15 h-15" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Goalkhli High School</h1>
              <p className="text-xs text-gray-500 -mt-1">PREMIUM ADMIN</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-800 capitalize tracking-tight">{page}</h2>
        </div>

        <div className="flex items-center gap-8">
          <div className="relative group">
            <div className="flex items-center bg-gray-100 border border-gray-200 rounded-2xl px-5 py-3 focus-within:border-amber-400 transition">
              <Search className="text-gray-400 mr-3" size={22} />
              <input
                type="text"
                placeholder="Search anything..."
                className="bg-transparent outline-none w-80 text-sm placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="relative cursor-pointer">
            <Bell size={26} className="text-gray-600 hover:text-amber-500 transition" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-medium">3</div>
          </div>

          <div className="flex items-center gap-4 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-semibold shadow">
              AD
            </div>
            <div>
              <p className="font-semibold text-gray-800">{admin?.fullName || 'Admin'}</p>
              <p className="text-xs text-gray-500">Super User</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">

        {/* Premium Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-100 min-h-[calc(100vh-80px)] p-8 shadow-sm">
          <div className="mb-10">
            <p className="uppercase text-xs tracking-widest text-gray-400 font-medium mb-4 px-4">MAIN MENU</p>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setPage("dashboard")}
              className={`w-full flex items-center justify-between px-6 py-5 rounded-3xl text-lg font-medium transition-all ${
                page === "dashboard"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-4">
                <LayoutDashboard size={26} />
                Dashboard
              </div>
              {page === "dashboard" && <ChevronRight size={22} />}
            </button>

            <button
              onClick={() => setPage("students")}
              className={`w-full flex items-center justify-between px-6 py-5 rounded-3xl text-lg font-medium transition-all ${
                page === "students"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-4">
                <GraduationCap size={26} />
                Students
              </div>
              {page === "students" && <ChevronRight size={22} />}
            </button>

            <button
              onClick={() => setPage("teachers")}
              className={`w-full flex items-center justify-between px-6 py-5 rounded-3xl text-lg font-medium transition-all ${
                page === "teachers"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-4">
                <UserCheck size={26} />
                Teachers
              </div>
              {page === "teachers" && <ChevronRight size={22} />}
            </button>
          </nav>

         <button
         onClick={logout}
  className="w-full mt-15 flex items-center gap-3 px-4 py-3 rounded-lg
             bg-red-500 text-white font-medium
             hover:bg-red-600 active:scale-95
             transition-all duration-300 shadow-md hover:shadow-lg"
>
  <LogOut size={20} />
  <span>Log Out</span>
</button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-12">
          {page === "dashboard" && <Dashboard />}
          {page === "students" && <Students />}
          {page === "teachers" && <Teachers />}
        </main>
      </div>
    </div>
  );
}