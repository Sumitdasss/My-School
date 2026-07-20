/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Mail, Phone, Lock, Eye, EyeOff, Camera, Users } from "lucide-react";

export default function ParentRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
  

  

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    childName: "",
    childClass: "",
    childEmail: "",
    childRoll: "",
    password: "",
    confirmPassword: "",
  });

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
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("childName", formData.childName);
    data.append("childClass", formData.childClass);
    data.append("childRoll", formData.childRoll);
    data.append("password", formData.password);
    data.append("childEmail", formData.childEmail);

    // Image
    if (imageFile) {
      data.append("photo", imageFile);
    }

    const res = await fetch("/api/ParentRegistar", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
     console.log(result);
    if (!res.ok) {
      alert(result.error || "Registration Failed");
      return;
    }

    alert("Registration Successful!");
    window.location.href = "/Preant";
  } catch (err) {
    console.error(err);
    alert("Something went wrong!");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] to-[#1A365D] flex items-center justify-center p-5">
      <div className="max-w-360 mt-20 w-full">
        <Link href="/Preant" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-8">
          ← Back to Login
        </Link>

        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 md:p-14 shadow-2xl">
          <div className="text-center mb-10">
            <div className="mx-auto w-20 h-20 bg-[#D4AF37] rounded-3xl flex items-center justify-center mb-6 relative">
              {imagePreview ? (
                <img src={imagePreview} alt="Profile" className="w-full h-full object-cover rounded-3xl" />
              ) : (
                <Users className="text-[#0A1628]" size={40} />
              )}
              <label className="absolute -bottom-1 -right-1 bg-[#166ae9] p-2 rounded-full cursor-pointer hover:bg-[#E8C65A] transition-colors">
                <Camera size={18} className="text-[#0A1628]" />
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
            <h2 className="text-4xl font-serif font-bold text-white">Parent Registration</h2>
            <p className="text-slate-300 mt-3">Create your parent account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm text-slate-300 mb-2">Parent Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-5 focus:outline-none focus:border-[#D4AF37] text-white"
                placeholder="Enter your full name"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
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
                    placeholder="parent@email.com"
                  />
                </div>
                <label className="block text-sm text-slate-300 mb-2">childEmail Address</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-4 text-slate-400" />
                  <input
                    type="email"
                    name="childEmail"
                    value={formData.childEmail}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-14 pr-5 focus:outline-none focus:border-[#D4AF37] text-white"
                    placeholder="Student Email"
                  />
                </div>
              </div>

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
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm text-slate-300 mb-2">Child's Name</label>
                <input
                  type="text"
                  name="childName"
                  value={formData.childName}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-5 focus:outline-none focus:border-[#D4AF37] text-white"
                  placeholder="Child's full name"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Child's Class & Roll</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    name="childClass"
                    value={formData.childClass}
                    onChange={handleChange}
                    placeholder="Class 8"
                    className="w-1/2 bg-white/10 border border-white/20 rounded-2xl py-4 px-5 focus:outline-none focus:border-[#D4AF37] text-white"
                  />
                  <input
                    type="text"
                    name="childRoll"
                    value={formData.childRoll}
                    onChange={handleChange}
                    placeholder="Roll 45"
                    className="w-1/2 bg-white/10 border border-white/20 rounded-2xl py-4 px-5 focus:outline-none focus:border-[#D4AF37] text-white"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm text-slate-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-14 pr-5 focus:outline-none focus:border-[#D4AF37] text-white"
                    placeholder="Create password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-4 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-4 text-slate-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-14 pr-5 focus:outline-none focus:border-[#D4AF37] text-white"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-5 top-4 text-slate-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-[#D4AF37] hover:bg-[#E8C65A] text-[#0A1628] font-semibold py-5 rounded-3xl flex items-center justify-center gap-3 transition-all text-lg disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Create Parent Account"}
            </button>
          </form>

          <div className="text-center mt-8 text-slate-400">
            Already have an account?{" "}
            <Link href="/parent/login" className="text-[#D4AF37] hover:text-white font-medium">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}