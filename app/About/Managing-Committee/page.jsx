"use client";

import React from "react";
import Image from "next/image";

export default function ManagingCommittee() {
  const committeeMembers = [
    {
      name: "Mr. Md. Harunur Rashid",
      position: "Chairman",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      description: "Educationist & Social Worker",
    },
    {
      name: "Mrs. Salma Akhter",
      position: "Vice Chairman",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
      description: "Former Teacher",
    },
    {
      name: "Mr. Abdul Karim",
      position: "Secretary",
      image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg",
      description: "Principal",
    },
    {
      name: "Mr. Rafiqul Islam",
      position: "Treasurer",
      image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      description: "Businessman",
    },
    {
      name: "Mrs. Parveen Sultana",
      position: "Member",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      description: "Social Worker",
    },
    {
      name: "Mr. Shahidul Alam",
      position: "Member",
      image: "https://images.pexels.com/photos/2379003/pexels-photo-2379003.jpeg",
      description: "Local Representative",
    },
  ];

  return (
    <section className="bg-[#F8F5F0] py-20 md:py-28">
      <div className="max-w-360 mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-semibold tracking-widest">GOVERNING BODY</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0A1628] mt-4">
            Managing Committee
          </h2>
          <p className="text-slate-600 mt-4 max-w-md mx-auto">
            Dedicated leaders guiding our school towards excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {committeeMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-80">
                <img
                  src={member.image}
                  alt={member.name}
            
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-32" />
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-semibold text-[#0A1628] mb-1">
                  {member.name}
                </h3>
                <p className="text-[#D4AF37] font-medium mb-4">{member.position}</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}