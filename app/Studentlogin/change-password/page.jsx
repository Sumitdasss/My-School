"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

function ChangePasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!email) {
      alert("Email পাওয়া যায়নি");
      return;
    }

    if (!password || !confirmPassword) {
      alert("সবগুলো ঘর পূরণ করুন");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password মিলছে না");
      return;
    }

    if (password.length < 6) {
      alert("Password কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/chagepassword/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Password Changed Successfully");

        router.push("/");
      } else {
        alert(data.message || "Password change failed");
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
          Change Password
        </h1>

        <p className="text-center text-gray-500 text-sm mb-6">
          Enter your new password below
        </p>

        {/* NEW PASSWORD */}
        <div className="relative mb-4">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3.5 pr-12 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-200 text-gray-800 placeholder:text-gray-400"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 hover:text-[#D4AF37]"
          >
            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
          </button>

        </div>

        {/* CONFIRM PASSWORD */}
        <div className="relative">

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3.5 pr-12 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-200 text-gray-800 placeholder:text-gray-400"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-3 top-3 text-gray-500 hover:text-[#D4AF37]"
          >
            {showConfirmPassword ? (
              <EyeOff size={22} />
            ) : (
              <Eye size={22} />
            )}
          </button>

        </div>

        {/* UPDATE BUTTON */}
        <button
          onClick={handleChangePassword}
          disabled={loading}
          className="w-full mt-6 bg-[#D4AF37] hover:bg-[#C5A028] active:scale-[0.98] text-white rounded-xl py-3.5 font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

      </div>
    </div>
  );
}


// =====================================
// MAIN PAGE
// =====================================

export default function ChangePassword() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <h1 className="text-xl font-semibold">
            Loading...
          </h1>
        </div>
      }
    >
      <ChangePasswordContent />
    </Suspense>
  );
}