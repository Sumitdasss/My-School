/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Mail, Phone, Calendar, Lock, Eye, EyeOff, ArrowLeft, Upload } from "lucide-react";

export default function StudentRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
   
    dateOfBirth: "",
    phone: "",
    email: "",
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
     
      data.append("dateOfBirth", formData.dateOfBirth);
      data.append("phone", formData.phone);
      data.append("email", formData.email);
      data.append("password", formData.password);

      // Image
      if (imageFile) {
        data.append("photo", imageFile);
      }

      const res = await fetch("/api/Teacher/Teacherrigister", {
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
      window.location.href = "/Teacher/Teacherlogin";
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0A1628] to-[#1A365D] min-h-screen flex items-center justify-center p-5">
      <div className="max-w-4xl w-full pt-8">
        {/* Back Button */}
        <Link
          href="/Studentlogin"
          className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Login
        </Link>

        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 md:p-14 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="mx-auto w-24 h-24 bg-[#D4AF37] rounded-3xl flex items-center justify-center mb-6 overflow-hidden shadow-xl">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="text-[#0A1628]" size={48} />
              )}
            </div>
            <h2 className="text-4xl font-serif font-bold text-white">Create Student Account</h2>
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
                  className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-white/30 hover:border-[#D4AF37] rounded-2xl p-8 transition-all w-56 h-56 bg-white/5 hover:bg-white/10"
                >
                  <Upload className="text-[#D4AF37] mb-3" size={40} />
                  <span className="text-slate-300 text-sm text-center">
                    Click to upload<br />
                    <span className="text-xs text-slate-500">JPG, PNG (Max 5MB)</span>
                  </span>
                </label>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
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
                  <label className="block text-sm text-slate-300 mb-2">Date of Birth</label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-4 text-slate-400" />
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-14 pr-5 focus:outline-none focus:border-[#D4AF37] text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                Contact Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
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
              </div>
            </div>

            {/* Security */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                Account Security
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
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
                      className="absolute right-5 top-4 text-slate-400 hover:text-white transition-colors"
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
                      className="absolute right-5 top-4 text-slate-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-10 bg-[#D4AF37] hover:bg-[#E8C65A] text-[#0A1628] font-semibold py-5 rounded-3xl flex items-center justify-center gap-3 transition-all text-lg disabled:opacity-70 shadow-lg"
            >
              {loading ? "Creating Account..." : "Create Student Account"}
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-slate-400">
              Already have an account?{" "}
              <Link href="/Teacher/Teacherlogin" className="text-[#D4AF37] hover:text-white font-medium">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}