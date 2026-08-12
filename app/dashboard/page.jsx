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
import toast from "react-hot-toast";


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
      const res = await fetch("http://localhost:5000/api/dashboard");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const loadAllManagementData = async () => {
  try {
    const [s, e, a] = await Promise.all([
      fetch("http://localhost:5000/api/subject/subshow").then((res) => res.json()),
      fetch("http://localhost:5000/api/Exam/Getexam").then((res) => res.json()),
      fetch("http://localhost:5000/api/Teacherassing/Assing-Teacher-show").then((res) => res.json()),
   
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
    if (!subjectName || !subjectClass) return toast.error("সব field পূরণ করো");
    await fetch("http://localhost:5000/api/subject/subadd", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subjectName, class1: subjectClass }),
    });
    setSubjectName("");
    setSubjectClass("");
    loadAllManagementData();
  };

  const deleteSubject = async (id) => {
  console.log(`Delete ID: ${id}`);

  const res = await fetch(`http://localhost:5000/api/subject/subdelet/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  console.log( `DELET ID : ${data}`);

  if (res.ok) {
    loadAllManagementData();
  }
};

  const addExam = async () => {
    if (!examName || !examYear || !examClass || !examSection)
      return toast.error("সব field পূরণ করো");
    await fetch("http://localhost:5000/api/Exam/Addexam", {
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

  const res = await fetch(`http://localhost:5000/api/Exam/Deletexam/${id}`, {
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
      return toast.error("সব field পূরণ করো");
    await fetch("http://localhost:5000/api/Teacherassing/Assing-Teacher-add", {
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

  const res = await fetch(`http://localhost:5000/api/Teacherassing/Assing-Teacher-delet/${id}`, { 
    method: "DELETE" 
  });
  
  const data = await res.json();
  console.log("Delete response:", data);
  
  loadAllManagementData();
};

 const loadResults = async (studentRoll, examId) => {
  if (!studentRoll || !examId) return;

  try {
    const res = await fetch("http://localhost:5000/api/Result/resultshow", {
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
    return toast.error("সব field পূরণ করো");
  }

  try {
    const res = await fetch("http://localhost:5000/api/Result/resultadd", {
      method: "POST",
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

  await fetch(`http://localhost:5000/api/Result/resultdelet/${id}`, { method: "DELETE" }); // ✅ query param দিয়ে
  loadResults(selectedResultStudent, selectedResultExam);
};
  // Quick Action Routes & Config
  
const [isopen,setisopen]=useState(false)
const handelchangee=()=>{
  setisopen(!isopen)
}
const [isopen11,setisopen11]=useState(false)
const handelchangee11=()=>{
  setisopen11(!isopen11)
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
    {
      key: "rutine",
      button:handelchangee11,
      label: "Post rutinee",
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

    toast.success("Notice Added Successfully");

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
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};

const[deta22,setdeta22]=useState({

className:"",
section:"",
shift:"",
day:"",
period:"",
time:"",
subject:"",
teacher:""

})
 const [loading22, setLoading22] = useState(false);

const handelCnagee22 = (e) => {
  const { name, value, type, checked } = e.target;

  setdeta22((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};

const handelSubmit22=async(e)=>{
  e.preventDefault();

  setLoading22(true);

  try {
    const formData = new FormData();

    formData.append("className", deta22.className);
    formData.append("section", deta22.section);
    formData.append("shift", deta22.shift);
    formData.append("period", deta22.period);
    formData.append("time", deta22.time);
    formData.append("subject", deta22.subject);
    formData.append("teacher", deta22.teacher);
    formData.append("day", deta22.day);

    

    
    const res = await fetch("/api/Rutine", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      toast.error(result.error || "Notice Add Failed");
      return;
    }

    toast.success("Notice Added Successfully");

  
    
  } catch (err) {
  console.error(err);
  toast.error("Something went wrong");
} finally {
    setLoading22(false);
  }
}





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

{isopen11 && (
  <>
    {/* Backdrop */}
    <div className="fixed inset-0 bg-black/50 z-40"></div>

    {/* Modal */}
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-2xl flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Add Class Routine</h2>
          <button
            onClick={() => setisopen11(false)}
            className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Form Body */}
        <form className="p-6" onSubmit={handelSubmit22}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Class */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Class</label>
              <select
                name="className"
                value={deta22.className}
                onChange={handelCnagee22}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
              >
                <option value="">Select Class</option>
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
              </select>
            </div>

            {/* Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Section</label>
              <select
                name="section"
                 value={deta22.section}
                onChange={handelCnagee22}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            {/* Shift */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Shift</label>
              <select
                name="shift"
                 value={deta22.shift}
                onChange={handelCnagee22}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
              >
                <option value="">Select Shift</option>
                <option value="Morning">Morning</option>
                <option value="Day">Day</option>
              </select>
            </div>

            {/* Day */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Day</label>
              <select
                name="day"
                 value={deta22.day}
                onChange={handelCnagee22}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
              >
                <option value="">Select Day</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
              </select>
            </div>

            {/* Period */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Period</label>
              <input
                type="number"
                name="period"
                 value={deta22.period}
                onChange={handelCnagee22}
                placeholder="e.g. 1"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Time</label>
              <input
                type="text"
                name="time"
                  value={deta22.time}
                onChange={handelCnagee22}
                placeholder="08:00 - 08:45"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                  value={deta22.subject}
                onChange={handelCnagee22}
                placeholder="Mathematics"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
              />
            </div>

            {/* Teacher */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Teacher</label>
              <input
                type="text"
                name="teacher"
                 value={deta22.teacher}
                onChange={handelCnagee22}
                placeholder="Mr. Rahman"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setisopen11(false)}
              className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-medium shadow-md hover:shadow-lg transition"
            >
              Save Routine
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
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

const [students, setStudents] = useState([]);
  const [roll, setRoll] = useState("");
  const [class1, setClass1] = useState("");
  const [section, setSection] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const [classes, setClasses] = useState([]);
const [sections, setSections] = useState([]);
  const getStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (roll.trim()) params.append("roll", roll.trim());
      if (class1) params.append("class", class1);
      if (section) params.append("section", section);







      
      const res = await fetch(`http://localhost:5000/api/Student/allStudent?${params.toString()}`);

      if (!res.ok) throw new Error("Failed to fetch students");

      const data = await res.json();

      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load students.");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getStudents();
    }, 300);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roll, class1, section]);



const getFilters = async () => {
  const res = await fetch("http://localhost:5000/api/Student/allStudent-filter");
  const data = await res.json();

  setClasses(data.classes);
  setSections(data.sections);
};

useEffect(() => {
  getFilters();
}, []);




 
  const [isopen, setisopen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
const handelopen = (student) => {
  setSelectedStudent(student);
  setisopen(true);
};


const handleClose = () => {
  setisopen(false);
  setSelectedStudent(null);
};
const deleteStudent = async (id) => {
  const confirmDelete = window.confirm("আপনি কি Student-কে Delete করতে চান?");

  if (!confirmDelete) return;

  try {
    const res = await fetch(`http://localhost:5000/api/Student/Studentdelet/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Delete Failed");
    }

    toast.success(data.message || "Student Deleted Successfully");


    getStudents();

  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6">
  <div className="max-w-7xl mx-auto">

    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          All Students
        </h1>
        <p className="text-gray-500 mt-1">
          Manage and view all students
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-semibold shadow-sm">
          Total Students : {students.length}
        </div>

        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2">
          + Add New Student
        </button>
      </div>
    </div>

    {/* Filters */}
    <div className="bg-white relative rounded-2xl shadow-sm border border-gray-100 p-5 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search Roll..."
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          className="border border-gray-200 rounded-xl p-3.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
        />

        <select
          value={class1}
          onChange={(e) => setClass1(e.target.value)}
          className="border border-gray-200 rounded-xl p-3.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white"
        >
          <option value="">All Class</option>
          {classes.map((item) => (
            <option key={item.class1} value={item.class1}>
              Class {item.class1}
            </option>
          ))}
        </select>

        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="border border-gray-200 rounded-xl p-3.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white"
        >
          <option value="">All Section</option>
          {sections.map((item) => (
            <option key={item.section} value={item.section}>
              Section {item.section}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setRoll("");
            setClass1("");
            setSection("");
          }}
          className="bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all"
        >
          Reset Filter
        </button>
      </div>
    </div>

    {/* Loading */}
    {loading && (
      <div className="flex justify-center py-24">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )}

    {/* Error */}
    {!loading && error && (
      <div className="text-center text-red-500 font-semibold py-16">
        {error}
      </div>
    )}

    {/* Empty State */}
    {!loading && !error && students.length === 0 && (
      <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">No Student Found</h2>
        <p className="text-gray-500 mt-2">
          Try changing Roll, Class or Section.
        </p>
      </div>
    )}

    {/* Student Cards */}
    {!loading && !error && students.length > 0 && (
     <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-lg">
  <table className="w-full">
    <tbody>
      {students.map((student) => (
        <tr
          key={student.id}
          className="border-b hover:bg-gray-50 transition"
        >
          {/* Profile */}
          <td className="px-6 py-4">
            <div className="flex items-center gap-4">
              <img
                src={student.photo || "/default-avatar.png"}
                alt={student.fullName}
                onError={(e) => {
                  e.currentTarget.src = "/default-avatar.png";
                }}
                className="w-14 h-14 rounded-full object-cover border"
              />

              <div>
                <h2 className="font-semibold text-gray-900">
                  {student.fullName}
                </h2>

                <p className="text-sm text-gray-500">
                  Roll : {student.rollNumber}
                </p>
              </div>
            </div>
          </td>

          {/* Class */}
          <td className="px-6 py-4 text-gray-700">
            {student.class1}
          </td>

          {/* Section */}
          <td className="px-6 py-4 text-gray-700">
            {student.section}
          </td>

          {/* Phone */}
          <td className="px-6 py-4 text-gray-700">
            {student.phone || "N/A"}
          </td>

          {/* Action */}
          <td className="px-6 py-4">
            <div className="flex justify-end gap-3">
              <button
              onClick={() => handelopen(student)}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
              >
                View
              </button>

              <button
                onClick={() => deleteStudent(student.id)}
                className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
              >
                Remove
              </button>


            
            </div>
          </td>
        </tr>






      ))}
    </tbody>
  </table>
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
    )}
  </div>
</div>
  );
}

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTeachers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/Teacher/Allteacher");
      const data = await res.json();
      setTeachers(data.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load teachers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []); // empty dependency array → runs only once

  const handleOpen = (teacher) => {
   
    console.log("View teacher:", teacher);
  };

 const deleteTeacher = async (id) => {
  const confirmDelete = window.confirm("আপনি কি Teacher-কে Delete করতে চান?");

  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/Teacher/Allteacher/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Delete Failed");
    }

    toast.success(data.message || "Teacher Deleted Successfully");


    getTeachers();

  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
};
 const [isopen, setisopen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
const handleopen = (student) => {
  setSelectedStudent(student);
  setisopen(true);
};


const handleClose = () => {
  setisopen(false);
  setSelectedStudent(null);
};
  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/70 p-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900">Teaching Faculty</h2>
        <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center gap-3">
          + Add Teacher
        </button>
      </div>

      {loading && (
        <div className="h-96 flex items-center justify-center text-gray-400 text-lg">
          Loading teachers...
        </div>
      )}

      {error && (
        <div className="h-96 flex items-center justify-center text-red-500 text-lg">
          {error}
        </div>
      )}

      {!loading && !error && teachers.length === 0 && (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl h-96 flex items-center justify-center">
          <p className="text-gray-400 text-lg">No teachers found</p>
        </div>
      )}

      {!loading && !error && teachers.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-sm text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Teacher</th>
                <th className="px-6 py-4">Subject / Designation</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* Profile */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={teacher.photo || "/default-avatar.png"}
                        alt={teacher.fullName || teacher.name}
                        onError={(e) => {
                          e.currentTarget.src = "/default-avatar.png";
                        }}
                        className="w-14 h-14 rounded-full object-cover border"
                      />
                      <div>
                        <h2 className="font-semibold text-gray-900">
                          {teacher.fullName || teacher.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                          ID : {teacher.employeeId || teacher.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Subject / Designation */}
                  <td className="px-6 py-4 text-gray-700">
                    {teacher.subject || teacher.designation || "N/A"}
                  </td>

                  {/* Phone */}
                  <td className="px-6 py-4 text-gray-700">
                    {teacher.phone || "N/A"}
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleopen(teacher)}
                        className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => deleteTeacher(teacher.id)}
                        className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}





            </tbody>
          </table>
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
      )}
    </div>
  );
}
function Parent() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTeachers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/ParentRegistar/Allparent");
      const data = await res.json();
      setTeachers(data.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load parents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []); // empty dependency array → runs only once

  
 const deleteParent = async (id) => {
  const confirmDelete = window.confirm("আপনি কি Parent-কে Delete করতে চান?");

  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/ParentRegistar/Allparent/${id}`, {
  method: "DELETE",
});

const data = await res.json();

console.log("Status:", res.status);
console.log("Response:", data);

if (!res.ok) {
  throw new Error(data.error || data.message || "Delete Failed");
}
    toast.success(data.message || "Parent Deleted Successfully");


    getTeachers();

  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
};
 const [isopen, setisopen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
const handleopen = (student) => {
  setSelectedStudent(student);
  setisopen(true);
};


const handleClose = () => {
  setisopen(false);
  setSelectedStudent(null);
};
  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/70 p-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900">Teaching Faculty</h2>
        <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center gap-3">
          + Add Teacher
        </button>
      </div>

      {loading && (
        <div className="h-96 flex items-center justify-center text-gray-400 text-lg">
          Loading teachers...
        </div>
      )}

      {error && (
        <div className="h-96 flex items-center justify-center text-red-500 text-lg">
          {error}
        </div>
      )}

      {!loading && !error && teachers.length === 0 && (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl h-96 flex items-center justify-center">
          <p className="text-gray-400 text-lg">No teachers found</p>
        </div>
      )}

      {!loading && !error && teachers.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-sm text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Teacher</th>
                <th className="px-6 py-4">Subject / Designation</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* Profile */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={teacher.photo || "/default-avatar.png"}
                        alt={teacher.fullName || teacher.name}
                        onError={(e) => {
                          e.currentTarget.src = "/default-avatar.png";
                        }}
                        className="w-14 h-14 rounded-full object-cover border"
                      />
                      <div>
                        <h2 className="font-semibold text-gray-900">
                          {teacher.fullName || teacher.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                          ID : {teacher.employeeId || teacher.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Subject / Designation */}
                  <td className="px-6 py-4 text-gray-700">
                    {teacher.subject || teacher.designation || "N/A"}
                  </td>

                  {/* Phone */}
                  <td className="px-6 py-4 text-gray-700">
                    {teacher.phone || "N/A"}
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleopen(teacher)}
                        className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => deleteParent(teacher.id)}
                        className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}





            </tbody>
          </table>
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
      )}
    </div>
  );
}






 function FeesPage() {
  const [fees, setFees] = useState([]);

  const [formData, setFormData] = useState({
    class1: "",
    feeType: "",
    amount: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const loadFees = async () => {
    try {
      const res = await fetch("/api/Fees");
      const data = await res.json();

      if (data.success) {
        setFees(data.fees);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFees();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createFee = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/Fees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Fee Created Successfully");

        setFormData({
          class1: "",
          feeType: "",
          amount: "",
          description: "",
        });

        loadFees();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-xl shadow p-8">

          <h1 className="text-3xl font-bold mb-8">
            Fee Management
          </h1>

          <form
            onSubmit={createFee}
            className="grid md:grid-cols-2 gap-5"
          >

            <select
              name="class1"
              value={formData.class1}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            >
              <option value="">Select Class</option>

              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>

            </select>

            <input
              type="text"
              name="feeType"
              placeholder="Fee Type"
              value={formData.feeType}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <button
              disabled={loading}
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Create Fee"}
            </button>

          </form>

        </div>

        <div className="bg-white rounded-xl shadow mt-10 overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-4">ID</th>

                <th>Class</th>

                <th>Fee Type</th>

                <th>Amount</th>

                <th>Description</th>

              </tr>

            </thead>

            <tbody>

              {fees.map((fee) => (

                <tr
                  key={fee.id}
                  className="border-b text-center"
                >

                  <td className="p-4">
                    {fee.id}
                  </td>

                  <td>
                    {fee.class1}
                  </td>

                  <td>
                    {fee.feeType}
                  </td>

                  <td>
                    ৳ {fee.amount}
                  </td>

                  <td>
                    {fee.description}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}






 function AdmitCardPage() {

  const [roll, setRoll] = useState("");
const [admitCards, setAdmitCards] = useState([]);
  const [student, setStudent] = useState(null);


  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    examName: "SSC Examination",
    examYear: 2026,
    center: "",
    examDate: "",
    examTime: "",
    room: "",
    seatNo: "",
  });


  // Search Student
  const searchStudent = async () => {

  if(!roll){
    toast.error("Enter Roll Number");
    return;
  }

  try{

    const res = await fetch(
      `/api/student/Admidcard?roll=${roll}`
    );

    const data = await res.json();

if (data.success) {
  setStudent(data.student);
  setAdmitCards(data.admitCards || []);

  setFormData((prev) => ({
  ...prev,
  center: "Goalkhali Ideal High School",
}));
}
    else{

      toast.error(data.message);

      setStudent(null);
      setAdmitCards([]);

    }


  }
  catch(error){

    console.log(error);

  }

};
  const handleChange=(e)=>{

    setFormData({

      ...formData,
      [e.target.name]:e.target.value

    });

  };




  // Generate Admit Card

  const generateAdmit = async()=>{


    if(!student){

      toast.error("Search Student First");
      return;

    }


    try{


      const res = await fetch("/api/student/Admidcard",{

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          studentId:student.id,

          ...formData

        })

      });


      const data = await res.json();

if (data.success) {
  toast.success("Admit Card Added Successfully");

  loadAdmitCards();
}
      else{

        toast.error(data.message);

      }


    }
    catch(error){

      console.log(error);

    }


  };

const loadAdmitCards = async () => {
  try {
    const res = await fetch("/api/student/Admidcard");
    const data = await res.json();

    if (data.success) {
      setAdmitCards(data.admitCards);
    }
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  loadAdmitCards();
}, []);

const deleteAdmitCard = async (id) => {
  const res = await fetch(`/api/student/Admidcard?id=${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (data.success) {
    toast.success("Admit Card Deleted Successfully");
    loadAdmitCards();
  } else {
    toast.error(data.message);
  }
};


return (

<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-10 px-4">
      <div className="max-w-300 mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800">Generate Admit Card</h1>
          <p className="text-slate-500 mt-2">Search student → Fill exam details → Generate</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Search */}
          <div className="bg-slate-50 px-6 py-5 border-b">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="number"
                placeholder="Enter Roll Number"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                className="flex-1 border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={searchStudent}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl transition disabled:opacity-60"
              >
                {loading ? "Searching..." : "Search Student"}
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {/* Student Info */}
            {student && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h2 className="text-lg font-semibold text-slate-800 mb-5">Student Information</h2>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div>
                    {student.photo ? (
                      <img
                        src={student.photo}
                        alt="Student"
                        className="w-28 h-28 object-cover rounded-xl border-4 border-white shadow"
                      />
                    ) : (
                      <div className="w-28 h-28 bg-slate-200 rounded-xl flex items-center justify-center text-slate-500">
                        Photo
                      </div>
                    )}
                  </div>
                  <div className="space-y-1.5 text-slate-700">
                    <p><span className="font-medium">Name:</span> {student.fullName}</p>
                    <p><span className="font-medium">Father:</span> {student.fatherName}</p>
                    <p><span className="font-medium">Mother:</span> {student.motherName}</p>
                    <p><span className="font-medium">Roll:</span> {student.rollNumber}</p>
                    <p><span className="font-medium">Class:</span> {student.class1}</p>
                    <p><span className="font-medium">Section:</span> {student.section}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Exam Form */}
            <div>
              <h2 className="text-lg font-semibold text-slate-800 mb-5">Exam Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="examName"
                  value={formData.examName}
                  onChange={handleChange}
                  placeholder="Exam Name"
                  className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="examYear"
                  value={formData.examYear}
                  onChange={handleChange}
                  placeholder="Exam Year"
                  className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="center"
                  value={formData.center}
                  onChange={handleChange}
                  placeholder="Exam Center"
                  className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  name="examDate"
                  value={formData.examDate}
                  onChange={handleChange}
                  className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="examTime"
                  value={formData.examTime}
                  onChange={handleChange}
                  placeholder="Exam Time (e.g. 10:00 AM)"
                  className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  placeholder="Room Number"
                  className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="seatNo"
                  value={formData.seatNo}
                  onChange={handleChange}
                  placeholder="Seat Number"
                  className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={generateAdmit}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-xl text-lg transition"
              >
                Generate Admit Card
              </button>
            </div>

            {/* Generated Cards Table */}
            {admitCards.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Generated Admit Cards</h2>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="px-4 py-3 text-left">Photo</th>
                        <th className="px-4 py-3 text-left">Name</th>
                        <th className="px-4 py-3 text-left">Roll</th>
                        <th className="px-4 py-3 text-left">Exam Name</th>
                        <th className="px-4 py-3 text-left">Date</th>
                        <th className="px-4 py-3 text-left">Room</th>
                        <th className="px-4 py-3 text-left">Seat</th>
                       <th className="px-4 py-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admitCards.map((item) => (
                        <tr key={item.id} className="border-t hover:bg-slate-50">
                          <td className="px-4 py-3">
                            {item.photo ? (
                              <img
                                src={item.photo}
                                alt=""
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
                            )}
                          </td>
                          <td className="px-4 py-3 font-medium">{item.fullName}</td>
                          <td className="px-4 py-3">{item.rollNumber}</td>
                          <td className="px-4 py-3">{item.examName}</td>
                          <td className="px-4 py-3">{item.examDate}</td>
                          <td className="px-4 py-3">{item.room}</td>
                          <td className="px-4 py-3">{item.seatNo}</td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => deleteAdmitCard(item.id)}
                              className="text-red-500 hover:text-red-700"
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
          </div>
        </div>
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
            <button
              onClick={() => setPage("parent")}
              className={`w-full flex items-center justify-between px-6 py-5 rounded-3xl text-lg font-medium transition-all ${
                page === "parent"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-4">
                <UserCheck size={26} />
                Parents
              </div>
              {page === "parent" && <ChevronRight size={22} />}
            </button>
            <button
              onClick={() => setPage("FeesPage")}
              className={`w-full flex items-center justify-between px-6 py-5 rounded-3xl text-lg font-medium transition-all ${
                page === "FeesPage"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-4">
                <UserCheck size={26} />
                Fees
              </div>
              {page === "FeesPage" && <ChevronRight size={22} />}
            </button>
            <button
              onClick={() => setPage("AdmitCardPage")}
              className={`w-full flex items-center justify-between px-6 py-5 rounded-3xl text-lg font-medium transition-all ${
                page === "AdmitCardPage"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-4">
                <UserCheck size={26} />
                Admit Cards
              </div>
              {page === "AdmitCardPage" && <ChevronRight size={22} />}
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
          {page === "parent" && <Parent />}
          {page === "FeesPage" && <FeesPage />}
          {page === "AdmitCardPage" && <AdmitCardPage />}
        </main>
      </div>
    </div>
  );
}