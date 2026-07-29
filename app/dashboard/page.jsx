/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  LayoutDashboard,
  GraduationCap,
  UserCheck,
  Search,


  ChevronRight,
  LogOut,
  Cross,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



// Next.js Link imported for Quick Actions

// ---------------------------------------------------------------------------
// 1. INTEGRATED ADMIN DASHBOARD COMPONENT
// ---------------------------------------------------------------------------
function IntegratedAdminDashboard() {
  // Stats & Dashboard State
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalParents: 0,
    studentGrowth: 0,
    ParentGrowth: 0,
    teacherStatus: "Low",
    activities: [],
  });

  // Management State (AdminManage)
  const [tab, setTab] = useState("subjects");
  const [subjects, setSubjects] = useState([]);
  const [exams, setExams] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [results, setResults] = useState([]);

  // Form States
  const [subjectName, setSubjectName] = useState("");
  const [subjectClass, setSubjectClass] = useState("");

  const [examName, setExamName] = useState("");
  const [examYear, setExamYear] = useState("");
  const [examClass, setExamClass] = useState("");
  const [examSection, setExamSection] = useState("");

  const [assignTeacherId, setAssignTeacherId] = useState("");
  const [assignSubjectId, setAssignSubjectId] = useState("");
  const [assignClass, setAssignClass] = useState("");
  const [assignSection, setAssignSection] = useState("");

  const [resultStudentId, setResultStudentId] = useState("");
  const [resultExamId, setResultExamId] = useState("");
  const [resultSubjectId, setResultSubjectId] = useState("");
  const [resultMarks, setResultMarks] = useState("");
const [selectedResultStudent, setSelectedResultStudent] = useState("");
const [selectedResultExam, setSelectedResultExam] = useState("");

  // Fetch Data on Mount
  useEffect(() => {
    loadDashboardStats();
    loadAllManagementData();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const res = await fetch("/api/Deshbord/Allpepolecount");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const loadAllManagementData = async () => {
  try {
    const [s, e, a] = await Promise.all([
      fetch("/api/admin1/subjects").then((res) => res.json()),
      fetch("/api/admin1/exams").then((res) => res.json()),
      fetch("/api/admin1/assignments").then((res) => res.json()),
   
    ]);
    setSubjects(s.subjects || []);
    setExams(e.exams || []);
    setAssignments(a.assignments || []);
    setTeachers(a.teachers || [])

  } catch (error) {
    console.error("Error loading management data:", error);
  }
};
  // Management Handlers
  const addSubject = async () => {
    if (!subjectName || !subjectClass) return alert("সব field পূরণ করো");
    await fetch("/api/admin1/subjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subjectName, class1: subjectClass }),
    });
    setSubjectName("");
    setSubjectClass("");
    loadAllManagementData();
  };

  const deleteSubject = async (id) => {
  console.log("Delete ID:", id);

  const res = await fetch(`/api/admin1/subjects/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  console.log(data);

  if (res.ok) {
    loadAllManagementData();
  }
};

  const addExam = async () => {
    if (!examName || !examYear || !examClass || !examSection)
      return alert("সব field পূরণ করো");
    await fetch("/api/admin1/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        examName,
        examYear: Number(examYear),
        class1: examClass,
        section: examSection,
      }),
    });
    setExamName("");
    setExamYear("");
    setExamClass("");
    setExamSection("");
    loadAllManagementData();
  };

 const deleteExam = async (id) => {
  console.log("Delete ID:", id);

  const res = await fetch(`/api/admin1/exams/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  console.log(data);

  if (res.ok) {
    loadAllManagementData();
  }
};

  const addAssignment = async () => {
    if (!assignTeacherId || !assignSubjectId || !assignClass || !assignSection)
      return alert("সব field পূরণ করো");
    await fetch("/api/admin1/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        teacherId: Number(assignTeacherId),
        subjectId: Number(assignSubjectId),
        class1: assignClass,
        section: assignSection,
      }),
    });
    setAssignTeacherId("");
    setAssignSubjectId("");
    setAssignClass("");
    setAssignSection("");
    loadAllManagementData();
  };

 const deleteAssignment = async (id) => {
  if (!confirm("Remove করবে?")) return;
  
  console.log("Deleting assignment id:", id); 

  const res = await fetch(`/api/admin1/assignments/${id}`, { 
    method: "DELETE" 
  });
  
  const data = await res.json();
  console.log("Delete response:", data);
  
  loadAllManagementData();
};

 const loadResults = async (studentRoll, examId) => {
  if (!studentRoll || !examId) return;

  try {
    const res = await fetch("/api/admin1/result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: String(studentRoll),
        examId: String(examId),
      }),
    });

    const data = await res.json();
    console.log("Loaded results:", data); // debug
    setResults(data.results || []);
  } catch (error) {
    console.error("Result load error:", error);
  }
};
const addResult = async () => {
  if (!resultStudentId || !resultExamId || !resultSubjectId || !resultMarks) {
    return alert("সব field পূরণ করো");
  }

  try {
    const res = await fetch("/api/admin1/result", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentRoll: resultStudentId,
        examId: resultExamId,
        results: [
          {
            subjectId: Number(resultSubjectId),
            marksObtained: Number(resultMarks),
          },
        ],
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    alert(data.message || "Result Added!");

    // ✅ form এর subject আর marks শুধু clear করো
    setResultSubjectId("");
    setResultMarks("");

    // ✅ সরাসরি result load করো — page reload না করে
    await loadResults(resultStudentId, resultExamId);

  } catch (error) {
    alert(error.message);
  }
};

  const deleteResult = async (id) => {
  if (!confirm("Delete করবে?")) return;

  await fetch(`/api/admin1/result?id=${id}`, { method: "DELETE" }); // ✅ query param দিয়ে
  loadResults(selectedResultStudent, selectedResultExam);
};
  // Quick Action Routes & Config
  
const [isopen,setisopen]=useState(false)
const handelchangee=()=>{
  setisopen(!isopen)
}
  const quickActions = [
    {
      key: "student",
      label: "Add student",
      sub: "Enroll a new student",
      icon: "👨‍🎓",
      color: "from-blue-600 to-indigo-600",
    },
    {
      key: "teacher",
      label: "Add teacher",
      sub: "Onboard teaching staff",
      icon: "👨‍🏫",
      color: "from-emerald-600 to-teal-600",
    },
    {
      key: "parent",
      label: "Add guardian",
      sub: "Register a parent",
      icon: "👨‍👩‍👧",
      color: "from-amber-600 to-orange-600",
    },
    {
      key: "notice",
      button:handelchangee,
      label: "Post notice",
      sub: "Publish an announcement",
      icon: "📢",
      color: "from-rose-600 to-pink-600",
    },
  ];
  const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
     const [imagePreview, setImagePreview] = useState(null);
const [deta, setdata] = useState({
  title: "",
  slug: "",
  category: "",
  date: "",
  urgent: false,
  shortDescription: "",
  description: "",
});
const handelCnagee = (e) => {
  const { name, value, type, checked } = e.target;

  setdata((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};
const handleImageChange = (e) => {
    const file = e.target.files?.[0];

  if (file) {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }
  };

 const handelSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    const formData = new FormData();

    formData.append("title", deta.title);
    formData.append("slug", deta.slug);
    formData.append("category", deta.category);
    formData.append("date", deta.date);
    formData.append("urgent", deta.urgent);

    formData.append(
      "shortDescription",
      deta.shortDescription
    );

    formData.append(
      "description",
      deta.description
    );

    if (imageFile) {
      formData.append("file", imageFile);
    }

    const res = await fetch("/api/Notice", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.error || "Notice Add Failed");
      return;
    }

    alert("Notice Added Successfully");

    setdata({
      title: "",
      slug: "",
      category: "",
      date: "",
      urgent: false,
      shortDescription: "",
      description: "",
    });

    setImageFile(null);
    setImagePreview(null);
    setisopen(false);
  } catch (err) {
    console.log(err);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="space-y-10 p-6">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-bold text-gray-900">Good Morning, Admin</h2>
        <p className="text-gray-500 mt-2">Academic Year 2026 • Term II</p>
      </div>

      {/* Premium Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Students",
            value: stats.totalStudents,
            change: stats.studentGrowth,
            icon: "👨‍🎓",
            color: "from-blue-600 to-indigo-600",
          },
          {
            label: "Teaching Staff",
            value: stats.totalTeachers,
            change: stats.teacherStatus,
            icon: "👨‍🏫",
            color: "from-emerald-600 to-teal-600",
          },
          {
            label: "Guardians",
            value: stats.totalParents,
            change: stats.ParentGrowth,
            icon: "👨‍👩‍👧",
            color: "from-amber-600 to-orange-600",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl shadow-xl shadow-gray-200/80 border border-gray-100 p-8 hover:-translate-y-1 transition-all duration-300"
          >
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-4xl mb-6`}
            >
              {stat.icon}
            </div>
            <p className="text-gray-500 text-sm font-medium tracking-widest">
              {stat.label}
            </p>
            <p className="text-5xl font-semibold text-gray-900 mt-3 tabular-nums">
              {stat.value}
            </p>
            <p className="text-emerald-600 text-sm mt-2 font-medium">
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity Card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/80 border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Recent activity
            </h3>
            <p className="text-sm text-gray-400 mt-0.5">
              Live login activity across the school
            </p>
          </div>
          <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-green-50 text-green-700 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Live
          </span>
        </div>

        <div className="max-h-[420px] overflow-y-auto px-4 py-2 divide-y divide-gray-50">
          {stats.activities?.map((item, index) => (
            <div
              key={`${item.role}-${item.id}-${index}`}
              className="flex items-center gap-4 py-4 px-4 -mx-4 rounded-2xl hover:bg-gray-50 transition-colors group"
            >
              {/* Avatar */}
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold flex-shrink-0 shadow-md shadow-blue-200">
                {item.name?.charAt(0).toUpperCase()}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors truncate">
                    {item.name}
                    <span className="text-gray-400 font-normal ml-2 text-sm">
                      {item.role === "Student" && `Roll ${item.info}`}
                      {item.role === "Parent" && `Phone ${item.info}`}
                      {item.role === "Teacher" && `ID ${item.info}`}
                    </span>
                  </p>

                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
                      item.role === "Student"
                        ? "bg-blue-100 text-blue-700"
                        : item.role === "Parent"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.role} Logged In
                  </span>
                </div>

                <p className="text-sm text-gray-400 mt-1 flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 01-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {new Date(item.loginAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            </div>
          ))}

          {!stats.activities?.length && (
            <div className="py-16 text-center">
              <p className="text-gray-400 text-sm">No activity yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <button
              key={action.key}
              onClick={action.button}
              className="group bg-white rounded-3xl shadow-xl shadow-gray-200/80 border border-gray-100 p-6 flex flex-col hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center text-3xl mb-5 group-hover:scale-105 transition-transform`}
              >
                {action.icon}
              </div>

              <p className="font-semibold text-gray-900">{action.label}</p>
              <p className="text-sm text-gray-400 mt-1">{action.sub}</p>
            </button>
          ))}
        </div>
{isopen && (
  <div className="fixed inset-0 z-50 flex top-20  items-center justify-center p-4">
    {/* Backdrop */}
    <div
      className="absolute  inset-0 bg-slate-900/60 backdrop-blur-sm"
      onClick={() => setisopen(false)}
    />

    {/* Modal */}
    <form onSubmit={handelSubmit}  className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-100">
      
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Create Notice
          </h2>
          <p className="text-blue-100 text-sm mt-0.5">
            Fill in the details below
          </p>
        </div>

        <button
          onClick={() => setisopen(false)}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors"
        >
          <Cross />
        </button>
      </div>

      {/* Form Body */}
      <div className="p-6 space-y-5">

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Notice Title
          </label>
          <input
             type="text"
  name="title"
  value={deta.title}
  onChange={handelCnagee}
            placeholder="Enter Notice Title"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Slug
          </label>
          <input
            type="text"
            name="slug"
              value={deta.slug}
            onChange={handelCnagee}
            placeholder="ssc-examination-2026-routine-published"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-mono"
          />
        </div>

        {/* Category + Date (side by side) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Category
            </label>
            <select
              name="category"
                value={deta.category}
            onChange={handelCnagee}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">Select Category</option>
              <option>Exam</option>
              <option>Notice</option>
              <option>Holiday</option>
              <option>Admission</option>
              <option>Sports</option>
              <option>Event</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Date
            </label>
            <input
              type="date"
              name="date"
               value={deta.date}
            onChange={handelCnagee}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Urgent */}
        <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition select-none">
          <input
             type="checkbox"
  name="urgent"
  checked={deta.urgent}
  onChange={handelCnagee}
            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <div>
            <span className="font-semibold text-slate-800 text-sm">
              Urgent Notice
            </span>
            <p className="text-xs text-slate-500 mt-0.5">
              Mark this notice as high priority
            </p>
          </div>
        </label>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Short Description
          </label>
          <textarea
            rows={3}
            name="shortDescription"
            value={deta.shortDescription}
            onChange={handelCnagee}
            placeholder="Short Description..."
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          />
        </div>

        {/* Full Description */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Full Description
          </label>
          <textarea
            rows={8}
            name="description"
              value={deta.description}
            onChange={handelCnagee}
            placeholder="Full Notice..."
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-y"
          />
        </div>

        {/* PDF Attachment */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            PDF Attachment
          </label>
          <div className="relative">
            <input
             type="file"
  accept=".pdf"
  onChange={handleImageChange}
              className="w-full border border-dashed border-slate-300 rounded-xl px-4 py-6 text-sm bg-slate-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="sticky bottom-0 flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
        <button
          type="button"
          onClick={() => setisopen(false)}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-200 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition"
        >
          Publish Notice
        </button>
      </div>
    </form>
  </div>
)}
     
      </div>

      {/* ADMIN MANAGEMENT SECTION (Subjects, Exams, Assignments) */}
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/80 border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Academic Management
        </h2>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          {["subjects", "exams", "assignments","result"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl font-semibold capitalize transition-all ${
                tab === t
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Subjects Tab */}
        {tab === "subjects" && (
          <div>
            <div className="flex gap-3 mb-4 flex-wrap">
              <input
                placeholder="Subject Name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                placeholder="Class (e.g. 10)"
                value={subjectClass}
                onChange={(e) => setSubjectClass(e.target.value)}
                className="border px-3 py-2 rounded-lg text-sm w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addSubject}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                + Add Subject
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-100 text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="p-3 border-b">ID</th>
                    <th className="p-3 border-b">Subject</th>
                    <th className="p-3 border-b text-center">Class</th>
                    <th className="p-3 border-b text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {subjects.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-500">{s.id}</td>
                      <td className="p-3 font-semibold text-gray-800">
                        {s.subjectName}
                      </td>
                      <td className="p-3 text-center">{s.class1}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => deleteSubject(s.id)}
                          className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded-lg text-xs transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Exams Tab */}
        {tab === "exams" && (
          <div>
            <div className="flex gap-3 mb-4 flex-wrap">
              <input
                placeholder="Exam Name (e.g. Final)"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                placeholder="Year (e.g. 2026)"
                value={examYear}
                onChange={(e) => setExamYear(e.target.value)}
                className="border px-3 py-2 rounded-lg text-sm w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                placeholder="Class"
                value={examClass}
                onChange={(e) => setExamClass(e.target.value)}
                className="border px-3 py-2 rounded-lg text-sm w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                placeholder="Section"
                value={examSection}
                onChange={(e) => setExamSection(e.target.value)}
                className="border px-3 py-2 rounded-lg text-sm w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addExam}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                + Add Exam
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-100 text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="p-3 border-b">Exam</th>
                    <th className="p-3 border-b text-center">Year</th>
                    <th className="p-3 border-b text-center">Class</th>
                    <th className="p-3 border-b text-center">Section</th>
                    <th className="p-3 border-b text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {exams.map((e) => (
                    <tr key={e.id} className="hover:bg-gray-50">
                      <td className="p-3 font-semibold text-gray-800">
                        {e.examName}
                      </td>
                      <td className="p-3 text-center">{e.examYear}</td>
                      <td className="p-3 text-center">{e.class1}</td>
                      <td className="p-3 text-center">{e.section}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => deleteExam(e.id)}
                          className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded-lg text-xs transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Assignments Tab */}
        {tab === "assignments" && (
          <div>
            <div className="flex gap-3 mb-4 flex-wrap">
              <select
                value={assignTeacherId}
                onChange={(e) => setAssignTeacherId(e.target.value)}
                className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Teacher</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.fullName}
                  </option>
                ))}
              </select>
              <select
                value={assignSubjectId}
                onChange={(e) => setAssignSubjectId(e.target.value)}
                className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Subject</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.subjectName}
                  </option>
                ))}
              </select>
              <input
                placeholder="Class"
                value={assignClass}
                onChange={(e) => setAssignClass(e.target.value)}
                className="border px-3 py-2 rounded-lg text-sm w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                placeholder="Section"
                value={assignSection}
                onChange={(e) => setAssignSection(e.target.value)}
                className="border px-3 py-2 rounded-lg text-sm w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addAssignment}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                + Assign
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-100 text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="p-3 border-b">Teacher</th>
                    <th className="p-3 border-b">Subject</th>
                    <th className="p-3 border-b text-center">Class</th>
                    <th className="p-3 border-b text-center">Section</th>
                    <th className="p-3 border-b text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {assignments.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="p-3 font-semibold text-gray-800">
                        {a.teacherName}
                      </td>
                      <td className="p-3 text-gray-600">{a.subjectName}</td>
                      <td className="p-3 text-center">{a.class1}</td>
                      <td className="p-3 text-center">{a.section}</td>
                      <td className="p-3 text-center">
                        <button
                        onClick={() => deleteAssignment(a.id)}
                          className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded-lg text-xs transition-colors"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

       {tab === "result" && (
  <div>
    {/* ✅ Search Section */}
    <div className="flex gap-3 mb-4 flex-wrap items-end p-4 bg-blue-50 rounded-xl">
      <div>
        <p className="text-xs text-blue-600 font-medium mb-1">Student Roll</p>
        <input
          placeholder="Roll Number"
          value={resultStudentId}
          onChange={(e) => {
            setResultStudentId(e.target.value);
            setSelectedResultStudent(e.target.value);
          }}
          className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <p className="text-xs text-blue-600 font-medium mb-1">Exam</p>
        <select
          value={resultExamId}
          onChange={(e) => {
            setResultExamId(e.target.value);
            setSelectedResultExam(e.target.value);
          }}
          className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">Select Exam</option>
          {exams.map((e) => (
            <option key={e.id} value={e.id}>
              {e.examName} ({e.examYear})
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={() => loadResults(resultStudentId, resultExamId)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium"
      >
        🔍 Search
      </button>
    </div>

    {/* ✅ Add Result Section */}
    <div className="flex gap-3 mb-4 flex-wrap items-end p-4 bg-gray-50 rounded-xl">
      <div>
        <p className="text-xs text-gray-500 font-medium mb-1">Subject</p>
        <select
          value={resultSubjectId}
          onChange={(e) => setResultSubjectId(e.target.value)}
          className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.subjectName} (Class {s.class1})
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium mb-1">Marks</p>
        <input
          placeholder="0-100"
          type="number"
          min={0}
          max={100}
          value={resultMarks}
          onChange={(e) => setResultMarks(e.target.value)}
          className="border px-3 py-2 rounded-lg text-sm w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={addResult}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        + Add Result
      </button>
    </div>

    {/* Result info */}
    {results.length > 0 && (
      <div className="mb-3 p-3 bg-green-50 rounded-lg text-sm text-green-700 font-medium">
        ✅ Roll: {resultStudentId} — মোট {results.length}টা subject এর result পাওয়া গেছে
      </div>
    )}

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-100 text-left text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="p-3 border-b">Subject</th>
            <th className="p-3 border-b">Teacher</th>
            <th className="p-3 border-b text-center">Marks</th>
            <th className="p-3 border-b text-center">Total</th>
            <th className="p-3 border-b text-center">Grade</th>
            <th className="p-3 border-b text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {results.length > 0 ? (
            results.map((r, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-3 font-semibold text-gray-800">{r.subjectName}</td>
                <td className="p-3 text-gray-600">{r.teacherName || "Admin"}</td>
                <td className="p-3 text-center font-semibold">{r.marksObtained}</td>
                <td className="p-3 text-center">{r.totalMarks}</td>
                <td className="p-3 text-center">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md font-semibold text-xs">
                    {r.marksObtained >= 80 ? "A+"
                      : r.marksObtained >= 70 ? "A"
                      : r.marksObtained >= 60 ? "A-"
                      : r.marksObtained >= 50 ? "B"
                      : r.marksObtained >= 40 ? "C"
                      : "F"}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => deleteResult(r.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-6 text-gray-400">
                Roll লিখে Search করো, তারপর result add করো
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. OTHER VIEW COMPONENTS
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// 3. MAIN WRAPPER PAGE (DEFAULT EXPORT)
// ---------------------------------------------------------------------------
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
  }, [router]);

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
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Goalkhli High School
              </h1>
              <p className="text-xs text-gray-500 -mt-1">PREMIUM ADMIN</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 capitalize tracking-tight">
            {page}
          </h2>
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

          <div className="flex items-center gap-4 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-semibold shadow">
              AD
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                {admin?.fullName || "Admin"}
              </p>
              <p className="text-xs text-gray-500">Super User</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Premium Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-100 min-h-[calc(100vh-80px)] p-8 shadow-sm">
          <div className="mb-10">
            <p className="uppercase text-xs tracking-widest text-gray-400 font-medium mb-4 px-4">
              MAIN MENU
            </p>
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
          {page === "dashboard" && <IntegratedAdminDashboard />}
          {page === "students" && <Students />}
          {page === "teachers" && <Teachers />}
        </main>
      </div>
    </div>
  );
}