"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Lock, Mail, Eye, EyeOff } from "lucide-react";

export default function StudentAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rollNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isLogin ? "Login Successful!" : "Registration Successful!");
  };

  return (
    <div className="  bg-gradient-to-br from-[#0A1628] to-[#1A365D] flex items-center justify-center p-5">
      <div className="max-w-5xl w-full pt-25 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Image + Info */}
        <div className="hidden md:flex flex-col justify-center">
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" 
              alt="School Campus" 
              className="rounded-3xl shadow-2xl object-cover w-full h-[620px]" 
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628]/70 to-transparent rounded-3xl" />
          </div>
          
         
        </div>

        {/* Right Side - Auth Form */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 md:p-14 shadow-2xl">
          <div className="text-center mb-10">
            <div className="mx-auto w-16 h-16 bg-[#D4AF37] rounded-2xl flex items-center justify-center mb-6">
              <User className="text-[#0A1628]" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white">Student Portal</h2>
            <p className="text-slate-300 mt-2">
              {isLogin ? "Sign in to your account" : "Create your student account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm text-slate-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-5 focus:outline-none focus:border-[#D4AF37] text-white"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-slate-300 mb-2">Email or Roll Number</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-5 focus:outline-none focus:border-[#D4AF37] text-white"
                placeholder="student@email.com or Roll No"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-5 focus:outline-none focus:border-[#D4AF37] text-white"
                  placeholder="Enter password"
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

            <button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#E8C65A] text-[#0A1628] font-semibold py-5 rounded-2xl transition-all mt-4"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-8">
            <a
                href="/Studentregistar"
              className="text-[#D4AF37] hover:text-white transition-colors"
            >
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}