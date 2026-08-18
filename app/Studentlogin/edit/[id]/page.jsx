/* eslint-disable react-hooks/immutability */
/* eslint-disable react/no-unescaped-entities */
"use client";


import Link from "next/link";
import { User, Mail, Phone, Calendar, Lock, Eye, EyeOff, ArrowLeft, Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
export default function StudentRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
const { id } = useParams();








  const [formData, setFormData] = useState({
    fullName: "",
 
   

    phone: "",
    email: "",
   
    rollNumber:"",
   
    section:"",
class:""
  
  
  });

useEffect(() => {
  if (id) {
    loadStudent();
  }
}, [id]);

const loadStudent = async () => {
  try {
    const res = await fetch(`https://my-school-backend-iota.vercel.app/api/studentlogin/getstudentlogindeta?id=${id}`);

    if (!res.ok) {
      alert("Student not found");
      return;
    }

     const result = await res.json();
    const Studentid=result.data;

    setFormData({
      fullName: Studentid.fullName || "",
      phone: Studentid.phone || "",
      email: Studentid.email || "",
     
      rollNumber: Studentid.rollNumber || "",
      section: Studentid.section || "",
      class: Studentid.class1 || "",
    });
console.log(Studentid.fullName )
    setImagePreview(Studentid.photo);
  } catch (err) {
    console.error(err);
  }
};
console.log("ID:", id);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

  if (file) {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  setLoading(true);

  try {
    const data = new FormData();

    // Text Fields
    data.append("fullName", formData.fullName);
   
    data.append("phone", formData.phone);
    data.append("email", formData.email);
   
    data.append("rollNumber", formData.rollNumber);
    data.append("class", formData.class);
    data.append("section", formData.section);
   

    // Image
    if (imageFile) {
      data.append("photo", imageFile);
    }

   const res = await fetch(
  `https://my-school-backend-iota.vercel.app/api/studentlogin/putstudentprofile/${id}`,
  {
    method: "PUT",
    body: data,
  }
);



console.log("STATUS:", res.status);
console.log("URL:", res.url);
console.log("CONTENT TYPE:", res.headers.get("content-type"));

const text = await res.text();

console.log("RAW RESPONSE:", text);

let result;

try {
  result = JSON.parse(text);
} catch {
  console.error("Backend JSON দেয়নি:", text);
  alert("Backend থেকে invalid response এসেছে");
  return;
}

if (!res.ok) {
  alert(result.message || result.error || "Update Failed");
  return;
}

alert("Update Successful!");
window.location.href = "/Studentlogin/StudentProfile";
  } catch (err) {
    console.error(err);
    alert("Something went wrong!");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-gradient-to-br from-[#0A1628] to-[#1A365D] flex items-center justify-center p-5">
      <div className="max-w-4xl pt-30 w-full">
        <Link href="/Studentlogin" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-8">
          <ArrowLeft size={20} />
          Back to Login
        </Link>

        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 md:p-14 shadow-2xl">
          <div className="text-center mb-10">
            <div className="mx-auto w-20 h-20 bg-[#D4AF37] rounded-3xl flex items-center justify-center mb-6 overflow-hidden">
              {imagePreview ? (
                <img 
                
                  src={imagePreview} 
                  alt="Profile Preview" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <User className="text-[#0A1628]" size={40} />
              )}
            </div>
            <h2 className="text-4xl font-serif font-bold text-white">Update Student Account</h2>
            <p className="text-slate-300 mt-3">Join Goalkhali Ideal High School</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center">
              <label className="block text-sm text-slate-300 mb-3">Profile Picture</label>
              <div className="relative">
                <input
                 type="file"
  accept="image/*"
  onChange={handleImageChange}
                  className="hidden"
                  id="profileImage"
                />
                <label
                  htmlFor="profileImage"
                  className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-white/30 hover:border-[#D4AF37] rounded-2xl p-6 transition-all w-48 h-48 bg-white/5"
                >
                  <Upload className="text-[#D4AF37] mb-2" size={32} />
                  <span className="text-slate-300 text-sm text-center">
                    Click to upload<br />
                    <span className="text-xs text-slate-500">JPG, PNG (Max 5MB)</span>
                  </span>
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm text-slate-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-5 focus:outline-none focus:border-[#D4AF37] text-white placeholder:text-slate-400"
                  placeholder="Enter your full name"
                />
              </div>

            
             
              <div>
                <label className="block text-sm text-slate-300 mb-2">Roll Number</label>
                <input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-5 focus:outline-none focus:border-[#D4AF37] text-white placeholder:text-slate-400"
                  placeholder="Roll Number"
                />
              </div>
              
            </div>

            {/* Rest of your form fields remain the same */}
            <div className="grid md:grid-cols-2 gap-8">
             

              <div>
                <label className="block text-sm text-slate-300 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-5 top-4 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-14 pr-5 focus:outline-none focus:border-[#D4AF37] text-white"
                    placeholder="017XX-XXXXXX"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-2">Class</label>
                <div className="relative">
                  <Phone className="absolute left-5 top-4 text-slate-400" />
                  <input
                    type="text"
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-14 pr-5 focus:outline-none focus:border-[#D4AF37] text-white"
                    placeholder="Class"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-2">Section</label>
                <div className="relative">
                  <Phone className="absolute left-5 top-4 text-slate-400" />
                  <input
                    type="text"
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-14 pr-5 focus:outline-none focus:border-[#D4AF37] text-white"
                    placeholder="Section"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-4 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-14 pr-5 focus:outline-none focus:border-[#D4AF37] text-white"
                  placeholder="student@email.com"
                />
              </div>
            </div>

           

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-[#D4AF37] hover:bg-[#E8C65A] text-[#0A1628] font-semibold py-5 rounded-3xl flex items-center justify-center gap-3 transition-all text-lg disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Update Student Account"}
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-slate-400">
              Already have an account?{" "}
              <Link href="/student/login" className="text-[#D4AF37] hover:text-white font-medium">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}