/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Lock,
  Mail,
  Phone,
  Calendar,
  Eye,
  EyeOff,
  Upload,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function StudentAuth() {
  /* ================= LOGIN / REGISTER ================= */

  const [isLogin, setIsLogin] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);

  const [imageFile, setImageFile] = useState(null);

  /* ================= LOGIN DATA ================= */

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /* ================= REGISTER DATA ================= */

  const [registerData, setRegisterData] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    rollNumber: "",
    section: "",
    class111: "",
  });

  const router = useRouter();

  /* ================= LOGIN CHANGE ================= */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= REGISTER CHANGE ================= */

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= LOGIN ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://my-school-backend-iota.vercel.app/api/auth/student-login", {
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
      localStorage.setItem("token", data.token);

      localStorage.setItem("student", JSON.stringify(data.student));

      localStorage.setItem("studentId", data.student.id);

      window.dispatchEvent(new Event("student-login"));

      toast.success("Login Successful!");

      router.push("/");
    } else {
      toast.error(data.message || data.error || "Login Failed");
    }
  };

  /* ================= IMAGE ================= */

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);

      setImagePreview(URL.createObjectURL(file));
    }
  };

  /* ================= REGISTER ================= */

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passwords do not match!");

      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      /* TEXT FIELDS */

      data.append("fullName", registerData.fullName);
      data.append("fatherName", registerData.fatherName);
      data.append("motherName", registerData.motherName);
      data.append("dateOfBirth", registerData.dateOfBirth);
      data.append("phone", registerData.phone);
      data.append("email", registerData.email);
      data.append("password", registerData.password);
      data.append("rollNumber", registerData.rollNumber);
      data.append("class11", registerData.class111);
      data.append("section", registerData.section);

      /* IMAGE */

      if (imageFile) {
        data.append("photo", imageFile);
      }

      const res = await fetch("https://my-school-backend-iota.vercel.app/api/student/register", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      console.log(result);

      if (!res.ok) {
        toast.error(result.error || "Registration Failed");

        return;
      }

      toast.success("Registration Successful!");

      /*
          এখানে আর নতুন page-এ যাব না।
          Register → Login flip হবে।
        */

      setIsLogin(true);

      /* REGISTER FORM CLEAR */

      setRegisterData({
        fullName: "",
        fatherName: "",
        motherName: "",
        dateOfBirth: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        rollNumber: "",
        section: "",
        class111: "",
      });

      setImageFile(null);

      setImagePreview(null);
    } catch (err) {
      console.error(err);

      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-[#0A1628]
      to-[#1A365D]
      flex
      items-center
      justify-center
      p-5
    "
    >
      <div
        className="
        max-w-5xl
        w-full
        pt-25
        grid
        md:grid-cols-2
        gap-12
        items-center
      "
      >
        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div
          className="
          hidden
          md:flex
          flex-col
          justify-center
        "
        >
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
              alt="School Campus"
              className="
                rounded-3xl
                shadow-2xl
                object-cover
                w-full
                h-[620px]
              "
            />

            <div
              className="
              absolute
              inset-0
              bg-gradient-to-br
              from-[#0A1628]/70
              to-transparent
              rounded-3xl
            "
            />
          </div>
        </div>

        {/* =================================================
            RIGHT SIDE - FLIP AREA
        ================================================= */}

        <div
          className="
            relative
            w-full
          "
          style={{
            perspective: "1500px",
          }}
        >
          {/* ================= FLIP CARD ================= */}

          <div
            className={`
              relative
              w-full
              min-h-[760px]
              transition-transform
              duration-700
              ease-in-out
              [transform-style:preserve-3d]

              ${isLogin ? "" : "[transform:rotateY(180deg)]"}
            `}
          >
            {/* =================================================
                LOGIN SIDE
            ================================================= */}

            <div
              className="
                absolute
                inset-0
                w-full
                min-h-[760px]

                bg-white/10
                backdrop-blur-2xl

                border
                border-white/20

                rounded-3xl

                p-10
                md:p-14

                shadow-2xl

                [backface-visibility:hidden]

                flex
                flex-col
                justify-center
              "
            >
              {/* HEADER */}

              <div
                className="
                text-center
                mb-10
              "
              >
                <div
                  className="
                  mx-auto
                  w-16
                  h-16
                  bg-[#D4AF37]
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  mb-6
                "
                >
                  <User className="text-[#0A1628]" size={32} />
                </div>

                <h2
                  className="
                  text-3xl
                  font-bold
                  text-white
                "
                >
                  Student Portal
                </h2>

                <p
                  className="
                  text-slate-300
                  mt-2
                "
                >
                  Sign in to your account
                </p>
              </div>

              {/* LOGIN FORM */}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* EMAIL */}

                <div>
                  <label
                    className="
                    block
                    text-sm
                    text-slate-300
                    mb-2
                  "
                  >
                    Email or Roll Number
                  </label>

                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      bg-white/10
                      border
                      border-white/20
                      rounded-2xl
                      py-4
                      px-5
                      focus:outline-none
                      focus:border-[#D4AF37]
                      text-white
                    "
                    placeholder="student@email.com or Roll No"
                  />
                </div>

                {/* PASSWORD */}

                <div>
                  <label
                    className="
                    block
                    text-sm
                    text-slate-300
                    mb-2
                  "
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="
                        w-full
                        bg-white/10
                        border
                        border-white/20
                        rounded-2xl
                        py-4
                        px-5
                        focus:outline-none
                        focus:border-[#D4AF37]
                        text-white
                      "
                      placeholder="Enter password"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="
                        absolute
                        right-5
                        top-4
                        text-slate-400
                        hover:text-white
                      "
                    >
                      {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                    </button>
                  </div>
                </div>

                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  className="
                    w-full
                    bg-[#D4AF37]
                    hover:bg-[#E8C65A]
                    text-[#0A1628]
                    font-semibold
                    py-5
                    rounded-2xl
                    transition-all
                    mt-4
                  "
                >
                  Sign In
                </button>
              </form>

              {/* REGISTER SWITCH */}

              <div
                className="
                text-center
                mt-8
              "
              >
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="
                    text-[#D4AF37]
                    hover:text-white
                    transition-colors
                  "
                >
                  Don't have an account? Register
                </button>
              </div>
            </div>

            {/* =================================================
                REGISTER SIDE
            ================================================= */}

            <div
              className="
                absolute
                inset-0
                w-full
                min-h-[760px]

                bg-white/10
                backdrop-blur-2xl

                border
                border-white/20

                rounded-3xl

                p-8
                md:p-10

                shadow-2xl

                [backface-visibility:hidden]

                [transform:rotateY(180deg)]

                overflow-y-auto
              "
            >
              {/* REGISTER HEADER */}

              <div
                className="
                text-center
                mb-8
              "
              >
                {/* IMAGE */}

                <div
                  className="
                  mx-auto
                  w-20
                  h-20
                  bg-[#D4AF37]
                  rounded-3xl
                  flex
                  items-center
                  justify-center
                  mb-5
                  overflow-hidden
                  shadow-xl
                "
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />
                  ) : (
                    <User className="text-[#0A1628]" size={42} />
                  )}
                </div>

                <h2
                  className="
                  text-3xl
                  font-serif
                  font-bold
                  text-white
                "
                >
                  Create Student Account
                </h2>

                <p
                  className="
                  text-slate-300
                  mt-2
                "
                >
                  Join Goalkhali Ideal High School
                </p>
              </div>

              {/* REGISTER FORM */}

              <form onSubmit={handleRegisterSubmit} className="space-y-6">
                {/* PROFILE IMAGE */}

                <div
                  className="
                  flex
                  flex-col
                  items-center
                "
                >
                  <label
                    className="
                    block
                    text-sm
                    text-slate-300
                    mb-3
                  "
                  >
                    Profile Picture
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="profileImage"
                  />

                  <label
                    htmlFor="profileImage"
                    className="
                      cursor-pointer
                      flex
                      flex-col
                      items-center
                      justify-center

                      border-2
                      border-dashed
                      border-white/30

                      hover:border-[#D4AF37]

                      rounded-2xl

                      p-5

                      transition-all

                      w-44
                      h-32

                      bg-white/5
                      hover:bg-white/10
                    "
                  >
                    <Upload
                      className="
                        text-[#D4AF37]
                        mb-2
                      "
                      size={32}
                    />

                    <span
                      className="
                      text-slate-300
                      text-sm
                      text-center
                    "
                    >
                      Click to upload
                      <br />
                      <span
                        className="
                        text-xs
                        text-slate-500
                      "
                      >
                        JPG, PNG
                      </span>
                    </span>
                  </label>
                </div>

                {/* PERSONAL INFORMATION */}

                <div className="space-y-5">
                  <h3
                    className="
                    text-lg
                    font-semibold
                    text-white
                    border-b
                    border-white/10
                    pb-2
                  "
                  >
                    Personal Information
                  </h3>

                  {/* FULL NAME */}

                  <div>
                    <label
                      className="
                      block
                      text-sm
                      text-slate-300
                      mb-2
                    "
                    >
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      value={registerData.fullName}
                      onChange={handleRegisterChange}
                      required
                      className="
                        w-full
                        bg-white/10
                        border
                        border-white/20
                        rounded-2xl
                        py-4
                        px-5
                        focus:outline-none
                        focus:border-[#D4AF37]
                        text-white
                      "
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* FATHER'S NAME */}

                  <div>
                    <label
                      className="
                      block
                      text-sm
                      text-slate-300
                      mb-2
                    "
                    >
                      Father's Name
                    </label>

                    <input
                      type="text"
                      name="fatherName"
                      value={registerData.fatherName}
                      onChange={handleRegisterChange}
                      required
                      className="
                        w-full
                        bg-white/10
                        border
                        border-white/20
                        rounded-2xl
                        py-4
                        px-5
                        focus:outline-none
                        focus:border-[#D4AF37]
                        text-white
                      "
                      placeholder="Father's name"
                    />
                  </div>

                  {/* MOTHER'S NAME */}

                  <div>
                    <label
                      className="
                      block
                      text-sm
                      text-slate-300
                      mb-2
                    "
                    >
                      Mother's Name
                    </label>

                    <input
                      type="text"
                      name="motherName"
                      value={registerData.motherName}
                      onChange={handleRegisterChange}
                      required
                      className="
                        w-full
                        bg-white/10
                        border
                        border-white/20
                        rounded-2xl
                        py-4
                        px-5
                        focus:outline-none
                        focus:border-[#D4AF37]
                        text-white
                      "
                      placeholder="Mother's name"
                    />
                  </div>

                  {/* ROLL NUMBER */}

                  <div>
                    <label
                      className="
                      block
                      text-sm
                      text-slate-300
                      mb-2
                    "
                    >
                      Roll Number
                    </label>

                    <input
                      type="text"
                      name="rollNumber"
                      value={registerData.rollNumber}
                      onChange={handleRegisterChange}
                      required
                      className="
                        w-full
                        bg-white/10
                        border
                        border-white/20
                        rounded-2xl
                        py-4
                        px-5
                        focus:outline-none
                        focus:border-[#D4AF37]
                        text-white
                      "
                      placeholder="Roll Number"
                    />
                  </div>

                  {/* DOB */}

                  <div>
                    <label
                      className="
                      block
                      text-sm
                      text-slate-300
                      mb-2
                    "
                    >
                      Date of Birth
                    </label>

                    <div className="relative">
                      <Calendar
                        className="
                          absolute
                          left-5
                          top-4
                          text-slate-400
                        "
                      />

                      <input
                        type="date"
                        name="dateOfBirth"
                        value={registerData.dateOfBirth}
                        onChange={handleRegisterChange}
                        required
                        className="
                          w-full
                          bg-white/10
                          border
                          border-white/20
                          rounded-2xl
                          py-4
                          pl-14
                          pr-5
                          focus:outline-none
                          focus:border-[#D4AF37]
                          text-white
                        "
                      />
                    </div>
                  </div>
                </div>

                {/* CONTACT */}

                <div className="space-y-5">
                  <h3
                    className="
                    text-lg
                    font-semibold
                    text-white
                    border-b
                    border-white/10
                    pb-2
                  "
                  >
                    Contact Information
                  </h3>

                  {/* PHONE */}

                  <div>
                    <label
                      className="
                      block
                      text-sm
                      text-slate-300
                      mb-2
                    "
                    >
                      Phone Number
                    </label>

                    <div className="relative">
                      <Phone
                        className="
                          absolute
                          left-5
                          top-4
                          text-slate-400
                        "
                      />

                      <input
                        type="tel"
                        name="phone"
                        value={registerData.phone}
                        onChange={handleRegisterChange}
                        required
                        className="
                          w-full
                          bg-white/10
                          border
                          border-white/20
                          rounded-2xl
                          py-4
                          pl-14
                          pr-5
                          focus:outline-none
                          focus:border-[#D4AF37]
                          text-white
                        "
                        placeholder="017XX-XXXXXX"
                      />
                    </div>
                  </div>

                  {/* CLASS */}

                  <div>
                    <label
                      className="
                      block
                      text-sm
                      text-slate-300
                      mb-2
                    "
                    >
                      Class
                    </label>

                    <div className="relative">
                      <Phone
                        className="
                          absolute
                          left-5
                          top-4
                          text-slate-400
                        "
                      />

                      <input
                        type="text"
                        name="class111"
                        value={registerData.class111}
                        onChange={handleRegisterChange}
                        required
                        className="
                          w-full
                          bg-white/10
                          border
                          border-white/20
                          rounded-2xl
                          py-4
                          pl-14
                          pr-5
                          focus:outline-none
                          focus:border-[#D4AF37]
                          text-white
                        "
                        placeholder="Class"
                      />
                    </div>
                  </div>

                  {/* SECTION */}

                  <div>
                    <label
                      className="
                      block
                      text-sm
                      text-slate-300
                      mb-2
                    "
                    >
                      Section
                    </label>

                    <div className="relative">
                      <Phone
                        className="
                          absolute
                          left-5
                          top-4
                          text-slate-400
                        "
                      />

                      <input
                        type="text"
                        name="section"
                        value={registerData.section}
                        onChange={handleRegisterChange}
                        required
                        className="
                          w-full
                          bg-white/10
                          border
                          border-white/20
                          rounded-2xl
                          py-4
                          pl-14
                          pr-5
                          focus:outline-none
                          focus:border-[#D4AF37]
                          text-white
                        "
                        placeholder="Section"
                      />
                    </div>
                  </div>

                  {/* EMAIL */}

                  <div>
                    <label
                      className="
                      block
                      text-sm
                      text-slate-300
                      mb-2
                    "
                    >
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail
                        className="
                          absolute
                          left-5
                          top-4
                          text-slate-400
                        "
                      />

                      <input
                        type="email"
                        name="email"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        required
                        className="
                          w-full
                          bg-white/10
                          border
                          border-white/20
                          rounded-2xl
                          py-4
                          pl-14
                          pr-5
                          focus:outline-none
                          focus:border-[#D4AF37]
                          text-white
                        "
                        placeholder="student@email.com"
                      />
                    </div>
                  </div>
                </div>

                {/* SECURITY */}

                <div className="space-y-5">
                  <h3
                    className="
                    text-lg
                    font-semibold
                    text-white
                    border-b
                    border-white/10
                    pb-2
                  "
                  >
                    Account Security
                  </h3>

                  {/* PASSWORD */}

                  <div>
                    <label
                      className="
                      block
                      text-sm
                      text-slate-300
                      mb-2
                    "
                    >
                      Password
                    </label>

                    <div className="relative">
                      <Lock
                        className="
                          absolute
                          left-5
                          top-4
                          text-slate-400
                        "
                      />

                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        required
                        className="
                          w-full
                          bg-white/10
                          border
                          border-white/20
                          rounded-2xl
                          py-4
                          pl-14
                          pr-14
                          focus:outline-none
                          focus:border-[#D4AF37]
                          text-white
                        "
                        placeholder="Create password"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="
                          absolute
                          right-5
                          top-4
                          text-slate-400
                          hover:text-white
                        "
                      >
                        {showPassword ? (
                          <EyeOff size={22} />
                        ) : (
                          <Eye size={22} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* CONFIRM PASSWORD */}

                  <div>
                    <label
                      className="
                      block
                      text-sm
                      text-slate-300
                      mb-2
                    "
                    >
                      Confirm Password
                    </label>

                    <div className="relative">
                      <Lock
                        className="
                          absolute
                          left-5
                          top-4
                          text-slate-400
                        "
                      />

                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                        required
                        className="
                          w-full
                          bg-white/10
                          border
                          border-white/20
                          rounded-2xl
                          py-4
                          pl-14
                          pr-14
                          focus:outline-none
                          focus:border-[#D4AF37]
                          text-white
                        "
                        placeholder="Confirm password"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="
                          absolute
                          right-5
                          top-4
                          text-slate-400
                          hover:text-white
                        "
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={22} />
                        ) : (
                          <Eye size={22} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* REGISTER BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full
                    bg-[#D4AF37]
                    hover:bg-[#E8C65A]
                    text-[#0A1628]
                    font-semibold
                    py-5
                    rounded-3xl
                    flex
                    items-center
                    justify-center
                    gap-3
                    transition-all
                    text-lg
                    disabled:opacity-70
                    shadow-lg
                  "
                >
                  {loading ? "Creating Account..." : "Create Student Account"}
                </button>
              </form>

              {/* LOGIN SWITCH */}

              <div
                className="
                text-center
                mt-6
                pb-3
              "
              >
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="
                    text-[#D4AF37]
                    hover:text-white
                    font-medium
                  "
                >
                  Already have an account? Login here
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
