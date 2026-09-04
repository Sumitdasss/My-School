/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddChild() {
  const router = useRouter();



  const [formData, setFormData] = useState({
    studentName: "",
    rollNumber: "",
    class1: "",
    section: "",
  });

  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);

  const [loading, setLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(true);

  // =====================================
  // GET PARENT
  // =====================================

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !formData.studentName.trim() ||
    !formData.rollNumber ||
    !formData.class1 ||
    !formData.section
  ) {
    alert("Please fill all fields");
    return;
  }

  try {
    setLoading(true);

    const token = localStorage.getItem("Parenttoken");

    if (!token) {
      alert("Parent login required");
      router.push("/ParentLogin");
      return;
    }

    const payload = {
      studentName: formData.studentName.trim(),
      rollNumber: Number(formData.rollNumber),
      class1: formData.class1,
      section: formData.section,
    };

    console.log("Add Child Payload:", payload);

    const res = await fetch(
      "https://my-school-backend-iota.vercel.app/api/ParentRegistar/addchild",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    console.log("Add Child Response:", data);

    if (!res.ok) {
      throw new Error(
        data.message ||
          data.error ||
          "Something went wrong"
      );
    }

    alert(data.message || "Child Added Successfully");

    setFormData({
      studentName: "",
      rollNumber: "",
      class1: "",
      section: "",
    });

    router.push("/Preant/MyStudent");

  } catch (error) {
    console.error("Add Child Error:", error);

    alert(error.message || "Server Error");

  } finally {
    setLoading(false);
  }
};

  // =====================================
  // GET CLASS & SECTION

      
  useEffect(() => {
    const getFilters = async () => {
      try {
        const token = localStorage.getItem("Parenttoken");

        if (!token) {
          console.error("Parent token not found");
          return;
        }

        const res = await fetch(
          "https://my-school-backend-iota.vercel.app/api/Teacher/allStudent-filter",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        console.log("Filters Response:", data);

        if (!res.ok) {
          throw new Error(
            data.message || "Failed to get filters"
          );
        }

        setClasses(data.classes || []);
        setSections(data.sections || []);
      } catch (error) {
        console.error("Get filters error:", error);
      } finally {
        setFilterLoading(false);
      }
    };

    getFilters();
  }, []);

  // =====================================
  // INPUT CHANGE
  // =====================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================
  // SUBMIT
  // =====================================


  // =====================================
  // UI
  // =====================================

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Add Child
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Student Name */}

          <input
            type="text"
            name="studentName"
            placeholder="Student Name"
            value={formData.studentName}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#D4AF37]"
            required
          />

          {/* Roll Number */}

          <input
            type="number"
            name="rollNumber"
            placeholder="Roll Number"
            value={formData.rollNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#D4AF37]"
            required
            min="1"
          />

          {/* Class */}

          <select
            name="class1"
            value={formData.class1}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#D4AF37]"
            required
            disabled={filterLoading}
          >

            <option value="">
              {filterLoading
                ? "Loading Classes..."
                : "Select Class"}
            </option>

            {classes.map((item, index) => (
              <option
                key={item.class1 ?? index}
                value={item.class1}
              >
                Class {item.class1}
              </option>
            ))}

          </select>

          {/* Section */}

          <select
            name="section"
            value={formData.section}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#D4AF37]"
            required
            disabled={filterLoading}
          >

            <option value="">
              {filterLoading
                ? "Loading Sections..."
                : "Select Section"}
            </option>

            {sections.map((item, index) => (
              <option
                key={item.section ?? index}
                value={item.section}
              >
                Section {item.section}
              </option>
            ))}

          </select>

          {/* Submit */}

       <button
  type="submit"
  disabled={loading}
  className="w-full bg-[#D4AF37] hover:bg-[#c49f2f] py-3 rounded-xl font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? "Adding Child..." : "Add Child"}
</button>

        </form>

      </div>

    </div>
  );
}