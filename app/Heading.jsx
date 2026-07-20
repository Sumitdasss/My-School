/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import {
  Menu,
  X,
  ChevronDown,
  School,
  User,
  LayoutDashboard,
  BookOpen,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrolled2, setScrolled2] = useState(false);
  const handel=()=>{
    setScrolled2(!scrolled2)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // সম্পূর্ণ ওয়েবসাইটের মেনু স্ট্রাকচার
  const menuItems = [
    { name: "Home", href: "/" },
    {
      name: "About",
      dropdown: [
        { name: "School History", href: "/About/School-History" },
        { name: "Mission & Vision", href: "/About/Mission-Vision" },
        { name: "Principal's Message", href: "/About/Principal-Message" },
        { name: "Managing Committee", href: "/About/Managing-Committee" },
        { name: "Faculty Members", href: "/About/Faculty-Members" },
        { name: "Infrastructure & Facilities", href: "/About/Infrastructure-Facilities" },
      ],
    },
    {
      name: "Academic",
      dropdown: [
        { name: "Class List & Subjects", href: "/Academic/Class-List-Subjects" },
        { name: "Curriculum & Syllabus", href: "/Academic/Curriculum-Syllabus" },
        { name: "Academic Calendar", href: "/Academic/Academic-Calendar" },
        { name: "Class & Exam Routine", href: "/Academic/Class-Exam-Routine" },
        { name: "Books Download", href: "/Academic/Books-Download" },
      ],
    },
    {
      name: "Admission",
      dropdown: [
        { name: "Admission Notice", href: "/Admition/Admission-Notice" },
        { name: "Apply Online", href: "/Admition/Apply-Online" },
        { name: "Download Admit Card", href: "/Admition/Download-Admit-Card" },
        { name: "Admission Result", href: "/Admition/Admission-Result" },
      ],
    },
    { name: "Notice", href: "/Notice" },
    { name: "Result", href: "/Result" },
    { name: "Events", href: "/Events" },
    { name: "Gallery", href: "/Gallery" },
    { name: "Contact", href: "/Contact" },
  ];

  // পোর্টালগুলোর জন্য কুইক অ্যাক্সেস ড্রপডাউন
  const portals = [
    { name: "Student Portal", href: "/Studentlogin", icon: User },
    { name: "Parent Portal", href: "/Preant", icon: BookOpen },
    { name: "Teacher Portal", href: "/Teacher/Teacherlogin", icon: FileText },
    { name: "Admin Dashboard", href: "", icon: LayoutDashboard },
  ];

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };
  const router =useRouter()
const [user, setUser] = useState(null);


useEffect(() => {

  const loadUser = () => {

    const student1 = localStorage.getItem("student");
    const parent = localStorage.getItem("Parent");
    const teacher = localStorage.getItem("Teacher");


    try {

      if (student1 && student1 !== "undefined") {

        setUser(JSON.parse(student1));

      } 
      else if (parent && parent !== "undefined") {

        setUser(JSON.parse(parent));

      } 
      else if (teacher && teacher !== "undefined") {

        setUser(JSON.parse(teacher));

      } 
      else {

        setUser(null);

      }

    } catch(error) {

      console.log("JSON Parse Error:", error);

      localStorage.removeItem("student");
      localStorage.removeItem("Parent");
      localStorage.removeItem("Teacher");

      setUser(null);
    }

  };


  loadUser();

  window.addEventListener("student-login", loadUser);
  window.addEventListener("Parent-login", loadUser);
  window.addEventListener("Teacher-login", loadUser);


  return () => {
    window.removeEventListener("student-login", loadUser);
    window.removeEventListener("Parent-login", loadUser);
    window.removeEventListener("Teacher-login", loadUser);
  };

}, []);


 

console.log(user);

const handleLogout = () => {
  localStorage.removeItem("student");
  localStorage.removeItem("Parent");
  localStorage.removeItem("Teacher");

  window.dispatchEvent(new Event("student-login"));

  router.push("/Studentlogin");
};


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
    scrolled ? "bg-[#3F5B16]" : "bg-[#044F58]"
  } border-b border-[#D9B65C]/15`}
    >
      {/* layered gold hairline — bronze to champagne, feels engraved rather than flat */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#8F6A1F] via-[#F2DFA0] to-[#8F6A1F]" />

      <div className="max-w-360 mx-auto ">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex border-none items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#D9B65C]/20 blur-md scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img src="/logo.png" alt="" className="w-15 h-15 relative" />
            </div>
            <div>
              <span className="font-serif font-bold text-lg md:text-xl block text-[#F6F1E4] leading-none tracking-wide">
                GOALKHALI IDEAL
              </span>
              <span className="text-[11px] text-[#D9B65C] font-semibold tracking-[0.25em] uppercase block mt-1.5">
                High School
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-x-1 flex-1 justify-center">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group/menu">
                {item.dropdown ? (
                  <button className="relative flex items-center space-x-1 px-4 py-2 text-sm font-medium text-[#B9C4D6] rounded-md hover:text-[#F6F1E4] transition-colors">
                    <span>{item.name}</span>
                    <ChevronDown
                      size={14}
                      className="text-[#D9B65C] group-hover/menu:rotate-180 transition-transform duration-200"
                    />
                    <span className="absolute left-4 right-4 -bottom-0.5 h-[2px] bg-gradient-to-r from-[#8F6A1F] to-[#F2DFA0] scale-x-0 group-hover/menu:scale-x-100 origin-left transition-transform duration-200" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="relative block px-4 py-2 text-sm font-medium text-[#B9C4D6] rounded-md hover:text-[#F6F1E4] transition-colors"
                  >
                    {item.name}
                    <span className="absolute left-4 right-4 -bottom-0.5 h-[2px] bg-gradient-to-r from-[#8F6A1F] to-[#F2DFA0] scale-x-0 group-hover/menu:scale-x-100 origin-left transition-transform duration-200" />
                  </Link>
                )}

                {/* Dropdown */}
                {item.dropdown && (
                  <div className="absolute left-0 mt-2 w-60 rounded-xl bg-[#FCFAF3] shadow-[0_20px_45px_rgba(4,10,20,0.35)] ring-1 ring-[#081527]/10 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 z-50 translate-y-2 group-hover/menu:translate-y-0 py-2 overflow-hidden">
                    <div className="h-[3px] w-full bg-gradient-to-r from-[#8F6A1F] via-[#F2DFA0] to-[#8F6A1F] absolute top-0 left-0" />
                    {item.dropdown.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className="flex items-center gap-2 px-4 py-2.5 mt-1 text-sm text-[#26344A] hover:bg-[#081527]/[0.04] hover:text-[#081527] hover:pl-5 transition-all duration-150"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#D9B65C] shrink-0" />
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side - Portals + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Desktop Portals */}


            {user ?(
         
  <div className="hidden xl:block relative group/profile">
    <button className="flex items-center gap-3 px-3 py-2 rounded-full bg-gradient-to-r from-[#8F6A1F] via-[#D9B65C] to-[#F2DFA0] shadow-md">

      <img
         src={user?.photo || "/default-user.png"}
         alt={user?.fullName || "User"}
        className="w-10 h-10 rounded-full object-cover border-2 border-white"
      />

      <span className="font-semibold text-[#081527]">
        {user.fullName}
      </span>

      <ChevronDown
        size={16}
        className="group-hover/profile:rotate-180 transition-transform"
      />
    </button>
{localStorage.getItem("student")&&(<>



</>)

}
    <div className="absolute right-0 mt-2 w-60 rounded-xl bg-white shadow-xl opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible transition-all">

    {localStorage.getItem("student") && (
  <>
    <Link href="/Studentlogin/StudentProfile" className="block px-4 py-3 hover:bg-gray-100">
      My Profile
    </Link>

    <Link href="/student/result" className="block px-4 py-3 hover:bg-gray-100">
      My Result
    </Link>

    <Link href="/student/admit-card" className="block px-4 py-3 hover:bg-gray-100">
      Admit Card
    </Link>
  </>
)}

{localStorage.getItem("Parent") && (
  <>
    <Link href="/Parentlogin/ParentProfile" className="block px-4 py-3 hover:bg-gray-100">
      My Profile
    </Link>

    <Link href="/ChildrenPage" className="block px-4 py-3 hover:bg-gray-100">
      Child Profile
    </Link>

    <Link href="/Parent/ChildResult" className="block px-4 py-3 hover:bg-gray-100">
      Child Result
    </Link>

    <Link href="/Parent/Attendance" className="block px-4 py-3 hover:bg-gray-100">
      Attendance
    </Link>
  </>
)}

{localStorage.getItem("Teacher") && (
  <>
    <Link href="/Teacher/TeacherProfile" className="block px-4 py-3 hover:bg-gray-100">
      My Profile
    </Link>

    <Link href="/Teacher/Students" className="block px-4 py-3 hover:bg-gray-100">
      Students
    </Link>

    <Link href="/Teacher/Attendance" className="block px-4 py-3 hover:bg-gray-100">
      Attendance
    </Link>

    <Link href="/Teacher/Result" className="block px-4 py-3 hover:bg-gray-100">
      Manage Result
    </Link>
  </>
)}





      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
      >
        Logout
      </button>

    </div>
  </div>
            ):(       <div className="hidden xl:block relative group/portal">
              <button className="flex items-center space-x-2 px-5 py-2.5 text-sm font-semibold text-[#081527] bg-gradient-to-r from-[#8F6A1F] via-[#D9B65C] to-[#F2DFA0] rounded-full shadow-[0_4px_18px_rgba(217,182,92,0.35)] hover:shadow-[0_6px_26px_rgba(217,182,92,0.55)] hover:brightness-105 transition-all">
                <span>Portals</span>
                <ChevronDown
                  size={16}
                  className="group-hover/portal:rotate-180 transition-transform duration-200"
                />
              </button>

              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#FCFAF3] shadow-[0_20px_45px_rgba(4,10,20,0.35)] ring-1 ring-[#081527]/10 opacity-0 invisible group-hover/portal:opacity-100 group-hover/portal:visible transition-all duration-200 z-50 translate-y-2 group-hover/portal:translate-y-0 py-2 overflow-hidden">
                <div className="h-[3px] w-full bg-gradient-to-r from-[#8F6A1F] via-[#F2DFA0] to-[#8F6A1F] absolute top-0 left-0" />
                {portals.map((portal, pIdx) => {
                  const Icon = portal.icon;
                  return (
                    <Link
                      key={pIdx}
                      href={portal.href}
                      className="flex items-center gap-3 px-4 py-2.5 mt-1 text-sm text-[#26344A] hover:bg-[#081527]/[0.04] hover:text-[#081527] transition-all duration-150"
                    >
                      <div className="p-1.5 rounded-md bg-[#081527]/5">
                        <Icon size={15} className="text-[#8F6A1F]" />
                      </div>
                      <span className="font-medium">{portal.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>)}
          
            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 rounded-lg text-[#D9B65C] hover:bg-white/5 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#081527]/70 backdrop-blur-sm xl:hidden z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 bottom-0 right-0 w-85 max-w-sm bg-[#FCFAF3] shadow-2xl z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out xl:hidden flex flex-col`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-5 py-5 bg-[#1F5673] relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#8F6A1F] via-[#F2DFA0] to-[#8F6A1F]" />
          <div className="flex items-center gap-x-3">
            <div className="">
            <img src="/logo.png" alt="" className="w-15 h-15 relative" />
            </div>
            <span className="font-serif font-medium text-[#F6F1E4] tracking-wide text-[15px]">
                GOALKHALI IDEAL High School
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md text-[#D9B65C] hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile Scrollable Links */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-0.5">
          {menuItems.map((item, index) => (
            <div key={index} className="border-b border-[#081527]/[0.06] pb-1 last:border-none">
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="flex items-center justify-between w-full px-3 py-3.5 text-[15px] font-medium text-[#26344A] rounded-lg hover:bg-[#081527]/[0.03] transition-colors"
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      size={18}
                      className={`transform transition-transform duration-200 ${
                        activeDropdown === index
                          ? "rotate-180 text-[#8F6A1F]"
                          : "text-[#9AA6B8]"
                      }`}
                    />
                  </button>

                  <div
                    className={`pl-4 space-y-0.5 transition-all overflow-hidden ${
                      activeDropdown === index ? "max-h-64 mt-1 mb-2" : "max-h-0"
                    }`}
                  >
                    {item.dropdown.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2.5 text-sm text-[#5B6B82] rounded-md hover:bg-[#081527]/[0.04] hover:text-[#081527] transition-colors"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#D9B65C]" />
                        <span>{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3.5 text-[15px] font-medium text-[#26344A] rounded-lg hover:bg-[#081527]/[0.03] hover:text-[#081527] transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}

          {/* Portals Section for Mobile */}





          {user ?(<>

         <div className="md:hidden mt-10  relative ">
    <button onClick={handel} className="flex w-full items-center gap-3 px-3 py-2 rounded-full bg-gradient-to-r from-[#8F6A1F] via-[#D9B65C] to-[#F2DFA0] shadow-md">

      <img
         src={user?.photo || "/default-user.png"}
         alt={user?.fullName || "User"}
        className="w-10 h-10 rounded-full object-cover border-2 border-white"
      />

      <span className="font-semibold text-[#081527]">
        {user.fullName}
      </span>

      <ChevronDown
        size={16}
        className="group-hover/profile:rotate-180 transition-transform"
      />
    </button>

    <div className={`absolute ${scrolled2?"max-h-80":"max-h-0"} duration-300  overflow-hidden left-0 mt-2 w-60 rounded-xl bg-white shadow-xl  transition-all`}>

      <Link
      onClick={()=>setIsOpen(false)}
        href="/Studentlogin/StudentProfile"
        className="block px-4 py-3 hover:bg-gray-100"
      >
        My Profile
      </Link>

      <Link
        onClick={()=>setIsOpen(false)}
        href="/student/result"
        className="block px-4 py-3 hover:bg-gray-100"
      >
        My Result
      </Link>

      <Link
        onClick={()=>setIsOpen(false)}
        href="/student/admit-card"
        className="block px-4 py-3 hover:bg-gray-100"
      >
        Admit Card
      </Link>

      <button
onClick={() => {
  handleLogout();
  setIsOpen(false);
}}
        
        className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
      >
        Logout
      </button>

    </div>
  </div>
          
          </>):(<>
          
          
           <div className="pt-5 mt-4 border-t-2 border-[#081527]/[0.06]">
            <p className="px-3 text-[11px] font-bold text-[#9AA6B8] uppercase tracking-widest mb-2.5">
              User Portals
            </p>
            <div className="grid grid-cols-1 gap-2">
              {portals.map((portal, pIdx) => {
                const Icon = portal.icon;
                return (
                  <Link
                    key={pIdx}
                    href={portal.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 bg-[#081527]/[0.04] rounded-xl hover:bg-[#D9B65C]/10 transition-colors"
                  >
                    <div className="p-1.5 rounded-md bg-[#081527]/5">
                      <Icon size={16} className="text-[#8F6A1F]" />
                    </div>
                    <span className="text-sm font-semibold text-[#26344A]">
                      {portal.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
          
          </>)}
         
        </div>
      </div>
    </nav>
  );
}
