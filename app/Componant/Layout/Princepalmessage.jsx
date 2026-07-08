"use client";

import React from "react";


export default function PrincipalsMessage() {
  return (
    <section className="bg-[#F8F5F0] py-20 md:py-28">
      <div className="max-w-360 mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Principal Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-[2.5rem] -rotate-3" />
              <img
                src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg"
                alt="Principal's Message"
           
                
                className="relative rounded-3xl shadow-2xl object-cover w-full max-w-md lg:max-w-none"
              />
              {/* Decorative Gold Frame */}
              <div className="absolute -bottom-4 -right-4  animate-float bg-white p-4 rounded-2xl shadow-lg border border-[#D4AF37]/30">
                <p className="text-[#0A1628] font-serif text-sm font-medium">Md. Abdul Karim</p>
                <p className="text-[#D4AF37] text-xs">Principal</p>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="space-y-8">
            <div>
              <span className="uppercase tracking-[3px] text-[#D4AF37] text-sm font-semibold">Principals Message</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0A1628] leading-tight mt-4">
                Dear Students, Parents and Well-wishers
              </h2>
            </div>

            <div className="prose prose-lg text-slate-700 leading-relaxed">
              <p>
                It is with great pleasure and a deep sense of responsibility that I welcome you to
                Goalkhali Ideal High School. Our institution stands as a beacon of academic excellence
                and moral values for the last 25 years.
              </p>
              <p>
                We believe that education is not just about academic achievement, but about building
                character, fostering creativity, and developing leadership qualities in every student.
                Our dedicated team of teachers works tirelessly to create a nurturing environment where
                every child can flourish.
              </p>
              <p>
                Together, let us continue this journey of learning, growth, and excellence. I invite
                you all to be a part of our vibrant school community.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <p className="font-serif text-2xl text-[#0A1628] italic">
                Education is the most powerful weapon which you can use to change the world.
              </p>
              <p className="mt-3 text-[#D4AF37] font-medium">- Nelson Mandela</p>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div>
                <p className="font-semibold text-[#0A1628]">Md. Abdul Karim</p>
                <p className="text-sm text-slate-500">Principal, Goalkhali Ideal High School</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}