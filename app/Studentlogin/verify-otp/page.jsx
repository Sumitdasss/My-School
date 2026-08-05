"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
export default function VerifyOTP() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOTP = async () => {
    if (!otp) {
      alert("Please Enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/student/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("OTP Verified Successfully");

        router.push(
          `/Studentlogin/change-password?email=${encodeURIComponent(email)}`
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4 sm:px-6">
  <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md border border-gray-100">

    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-800 tracking-tight">
      Verify OTP
    </h1>

    <p className="text-center text-gray-500 text-sm mb-6">
      OTP has been sent to
      <br />
      <span className="font-semibold text-gray-700">{email}</span>
    </p>

    <input
      type="text"
      placeholder="Enter 6 Digit OTP"
      maxLength={6}
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      className="w-full border border-gray-300 rounded-xl p-3.5 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-200 text-gray-800 placeholder:text-gray-400 text-center tracking-widest text-lg"
    />

    <button
      onClick={verifyOTP}
      disabled={loading}
      className="w-full mt-6 bg-[#D4AF37] hover:bg-[#C5A028] active:scale-[0.98] text-white rounded-xl py-3.5 font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? "Verifying..." : "Verify OTP"}
    </button>
  </div>
</div>
  );
}