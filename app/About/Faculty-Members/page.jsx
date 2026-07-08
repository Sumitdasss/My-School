"use client";

import React from "react";
import Image from "next/image";

export default function FacultyMembers() {
  const faculty = [
    {
      name: "Mrs. Nasrin Akhter",
      designation: "Head Teacher",
      subject: "Mathematics",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
      experience: "18 Years",
    },
    {
      name: "Mr. Kamrul Hassan",
      designation: "Senior Teacher",
      subject: "English",
      image: "https://images.pexels.com/photos/2379003/pexels-photo-2379003.jpeg",
      experience: "15 Years",
    },
    {
      name: "Mrs. Farhana Begum",
      designation: "Teacher",
      subject: "Science",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      experience: "12 Years",
    },
    {
      name: "Mr. Abdul Malek",
      designation: "Teacher",
      subject: "Bangla",
      image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      experience: "14 Years",
    },
    {
      name: "Mrs. Salma Parveen",
      designation: "Teacher",
      subject: "Social Science",
      image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg",
      experience: "10 Years",
    },
    {
      name: "Mr. Rafiqul Islam",
      designation: "Teacher",
      subject: "Physical Education",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      experience: "8 Years",
    },
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-360 mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-semibold tracking-widest">OUR TEAM</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0A1628] mt-4">
            Dedicated Faculty Members
          </h2>
          <p className="text-slate-600 mt-4 max-w-md mx-auto">
            Experienced and passionate educators shaping the future of our students
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faculty.map((teacher, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-[#D4AF37]/20"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={teacher.image}
                  alt={teacher.name}
               
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-32" />
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-semibold text-[#0A1628]">{teacher.name}</h3>
                <p className="text-[#D4AF37] font-medium">{teacher.designation}</p>
                
                <div className="mt-6 space-y-2 text-sm text-slate-600">
                  <div><span className="font-medium">Subject:</span> {teacher.subject}</div>
                  <div><span className="font-medium">Experience:</span> {teacher.experience}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}