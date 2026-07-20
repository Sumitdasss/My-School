"use client";

import React, { useState } from "react";
import { Shield, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("admin", JSON.stringify(data.admin));

        window.dispatchEvent(new Event("admin-login"));

        router.push("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#081527] via-[#102542] to-[#0A1628] flex items-center justify-center px-5">

      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">

        {/* Left Side */}
        <div className="hidden md:block relative">

          <img
            src="https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg"
            className="w-full h-full object-cover"
            alt=""
          />

          <div className="absolute inset-0 bg-[#081527]/70"></div>

          <div className="absolute bottom-10 left-10 text-white">
            <h1 className="text-4xl font-bold">
              School Admin Panel
            </h1>

            <p className="mt-3 text-gray-200">
              Secure access for administrators.
            </p>
          </div>

        </div>

        {/* Right Side */}

        <div className="p-10">

          <div className="flex justify-center mb-8">

            <div className="bg-yellow-400 w-20 h-20 rounded-full flex items-center justify-center">
              <Shield size={40} className="text-[#081527]" />
            </div>

          </div>

          <h2 className="text-3xl font-bold text-center text-white">
            Admin Login
          </h2>

          <p className="text-center text-gray-300 mt-2 mb-8">
            Login with your administrator account
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>

              <label className="text-white mb-2 block">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter Username"
                required
                className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white outline-none focus:border-yellow-400"
              />

            </div>

            <div>

              <label className="text-white mb-2 block">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  required
                  className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white outline-none focus:border-yellow-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-4 text-white"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-[#081527] font-bold py-4 rounded-xl transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}