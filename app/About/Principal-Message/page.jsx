"use client";

import React from "react";


export default function PrincipalsMessage() {
  return (
    <section className="bg-[#F8F5F0] py-20 md:py-28">
      <div className="max-w-360 mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Principal Image */}
          <div className="relative flex justify-center ">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-6 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-[2.5rem] -rotate-3" />
              
              <img
                src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg"
                alt="Principal Md. Abdul Karim"
               
                className="relative rounded-3xl shadow-2xl object-cover"
              />

              {/* Signature Badge */}
              <div className="absolute -bottom-6 -right-6 animate-float bg-white rounded-2xl shadow-xl p-6 border border-[#D4AF37]/30">
                <p className="font-serif text-xl text-[#0A1628]">Md. Abdul Karim</p>
                <p className="text-[#D4AF37] text-sm font-medium">Principal</p>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="space-y-8">
            <div>
              <span className="uppercase text-[#D4AF37] font-semibold tracking-widest">Principals Message</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0A1628] leading-tight mt-4">
                Dear Students, Parents & Well-wishers
              </h2>
            </div>

            <div className="prose prose-lg text-slate-700 leading-relaxed">
              <p>
                It gives me immense pleasure to welcome you to Goalkhali Ideal High School. 
                Since our establishment in 1998, we have remained committed to providing 
                quality education that nurtures not only academic excellence but also strong 
                moral values and character.
              </p>
              <p>
                Our dedicated team of teachers works tirelessly to create a supportive 
                learning environment where every student can discover their potential. 
                We believe in holistic development — balancing academics with sports, arts, 
                and leadership opportunities.
              </p>
              <p>
                Together, let us continue to build a bright future for our students and 
                contribute meaningfully to our society.
              </p>
            </div>

            <div className="pt-8 border-t border-slate-200">
              <p className="text-2xl font-serif italic text-[#0A1628]">
                Education is the passport to the future, for tomorrow belongs to those who prepare for it today.
              </p>
              <p className="mt-4 text-[#D4AF37] font-medium">- Malcolm X</p>
            </div>

            <div className="pt-6">
              <p className="font-semibold text-[#0A1628]">Md. Abdul Karim</p>
              <p className="text-slate-500">Principal, Goalkhali Ideal High School</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}