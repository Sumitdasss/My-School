/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { User, Mail, Phone, Calendar, ArrowRight, Upload } from "lucide-react";

export default function ApplyOnline() {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    class: "",
    phone: "",
    email: "",
    address: "",
  });
  
  // ছবির ফাইল এবং প্রিভিউ স্টোরেজ করার জন্য স্টেট
  const [studentImage, setStudentImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ছবি হ্যান্ডেল করার ফাংশন
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStudentImage(file);
      // ছবির প্রিভিউ দেখানোর জন্য URL তৈরি করা
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // ছবির ফাইল এবং বাকি ডাটা কনসোলে দেখার জন্য (টেস্টিং উদ্দেশ্যে)
    console.log("Form Data:", formData);
    console.log("Uploaded Image File:", studentImage);
    
    alert("Application submitted successfully! (Demo)");
    // এখানে পরে FormData অবজেক্ট ব্যবহার করে API call করতে হবে, কারণ ফাইলে নরমাল JSON পাঠানো যায় না।
  };

  return (
    <section className="bg-gradient-to-br from-[#0A1628] to-[#1A365D] py-20 md:py-28 text-white">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-semibold tracking-widest">ADMISSION 2027</span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mt-4">Apply Online</h1>
          <p className="text-slate-300 mt-4">Join the legacy of excellence</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-16 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* --- Image Upload Section --- */}
            <div className="flex flex-col items-center justify-center pb-6 border-b border-white/10">
              <label className="block text-sm text-slate-400 mb-4 text-center">Student's Passport Size Photo</label>
              <div className="flex flex-col items-center gap-4">
                {imagePreview ? (
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-[#D4AF37]">
                    <img 
                      src={imagePreview} 
                      alt="Student Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-2xl bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center text-slate-400">
                    <Upload size={32} className="opacity-50" />
                    <span className="text-xs mt-2">No Photo</span>
                  </div>
                )}
                
                <label className="cursor-pointer bg-white/5 hover:bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-sm transition-colors flex items-center gap-2">
                  <Upload size={16} />
                  {imagePreview ? "Change Photo" : "Choose Photo"}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    required // যদি ছবি বাধ্যতামূলক করতে চাও
                    className="hidden" 
                  />
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-4 text-slate-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="Enter full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Father's Name</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-5 focus:outline-none focus:border-[#D4AF37]"
                  placeholder="Father's name"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Mother's Name</label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-5 focus:outline-none focus:border-[#D4AF37]"
                  placeholder="Mother's name"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 text-slate-400" />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Applying For Class</label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-5 focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="">Select Class</option>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-4 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#D4AF37]"
                    placeholder="017XX-XXXXXX"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#D4AF37]"
                  placeholder="student@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">Present Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-3xl p-5 focus:outline-none focus:border-[#D4AF37]"
                placeholder="Village, Post, Thana, District"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-[#D4AF37] hover:bg-[#E8C65A] text-[#0A1628] font-semibold py-5 rounded-3xl flex items-center justify-center gap-3 transition-all text-lg"
            >
              Submit Application
              <ArrowRight size={24} />
            </button>

            <p className="text-center text-xs text-slate-400 mt-6">
              Application fee will be collected during verification
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}