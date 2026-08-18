/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {
    if (!email) {
      alert("Enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("https://my-school-backend-iota.vercel.app/api/chagepassword/sent-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        alert("OTP Sent Successfully");
        router.push(
          `/Studentlogin/verify-otp?email=${encodeURIComponent(email)}`
        );
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4 sm:px-6">
  <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md border border-gray-100">
    
    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-800 tracking-tight">
      Forgot Password
    </h1>
    
    <p className="text-center text-gray-500 text-sm mb-6">
      Enter your email and we'll send you an OTP
    </p>

    <input
      type="email"
      placeholder="Enter Your Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full border border-gray-300 rounded-xl p-3.5 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-200 text-gray-800 placeholder:text-gray-400"
    />

    <button
      onClick={sendOTP}
      disabled={loading}
      className="w-full mt-6 bg-[#D4AF37] hover:bg-[#C5A028] active:scale-[0.98] text-white rounded-xl py-3.5 font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? "Sending..." : "Send OTP"}
    </button>
  </div>
</div>
  );
}