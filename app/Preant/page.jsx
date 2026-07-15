/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Lock, Eye, EyeOff, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ParentLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const res = await fetch("/api/ParentRegistar/Preantlogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
    }),
  });
  
   const data = await res.json();
   console.log(data);
  
  if (res.ok) {
    localStorage.setItem(
      "Parent",
      JSON.stringify(data.Parent)
    );
  localStorage.setItem("Parent", JSON.stringify(data.Parent));
  
  
  window.dispatchEvent(new Event("Parent-login"));
    router.push("/");
  } else {
    alert(data.message);
  }
  
  
  
  
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] to-[#1A365D] flex items-center justify-center p-5">
      <div className="max-w-360 w-full grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Image */}
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

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 md:p-14 shadow-2xl">
          <div className="text-center mb-10">
            <div className="mx-auto w-20 h-20 bg-[#D4AF37] rounded-3xl flex items-center justify-center mb-6">
              <Users className="text-[#0A1628]" size={40} />
            </div>
            <h2 className="text-4xl font-serif font-bold text-white">Parent Login</h2>
            <p className="text-slate-300 mt-3">Access your child's progress</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm text-slate-300 mb-3">Email or Phone Number</label>
              <div className="relative">
                <User className="absolute left-5 top-4 text-slate-400" />
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-14 pr-5 focus:outline-none focus:border-[#D4AF37] text-white placeholder:text-slate-400"
                  placeholder="parent@email.com or 017XX-XXXXXX"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-3">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-14 pr-5 focus:outline-none focus:border-[#D4AF37] text-white"
                  placeholder="Enter your password"
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

            <div className="flex justify-between text-sm">
              <Link href="#" className="text-[#D4AF37] hover:text-white transition-colors">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] hover:bg-[#E8C65A] text-[#0A1628] font-semibold py-5 rounded-3xl flex items-center justify-center gap-3 transition-all text-lg disabled:opacity-70"
            >
              {loading ? "Signing In..." : "Login to Parent Portal"}
            </button>
          </form>

          <div className="text-center mt-8 text-slate-400">
            Don't have an account?{" "}
            <Link href="/Preant/PreantRegistar" className="text-[#D4AF37] hover:text-white font-medium">
              Register as Parent
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}