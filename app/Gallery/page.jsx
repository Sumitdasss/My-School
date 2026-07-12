"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiPlay, FiAward } from 'react-icons/fi';

const schoolGallery = [
  {
    id: 1,
    type: "photo",
    image: "https://images.pexels.com/photos/14411386/pexels-photo-14411386.jpeg",
    title: "CraftMotors Inter-School Car Quiz & Racing Competition",
    category: "Competition",
    school: "Ideal High School",
    highlight: "Grand Finale"
  },
  {
    id: 2,
    type: "photo",
    image: "https://images.pexels.com/photos/33665579/pexels-photo-33665579.jpeg",
    title: "Ideal High School 50th Anniversary Auto Fest",
    category: "Anniversary",
    school: "Ideal High School",
    highlight: "Special Guest"
  },
  {
    id: 3,
  
    image: "https://images.pexels.com/photos/21939844/pexels-photo-21939844.jpeg",
    title: "Inter School Automotive Knowledge Quiz",
    category: "Quiz Competition",
    school: "Multiple Schools",
    highlight: "Live"
  },
  {
    id: 4,
    type: "photo",
    image: "https://images.pexels.com/photos/29846699/pexels-photo-29846699.jpeg",
    title: "School Bike Modification & Safety Workshop",
    category: "Workshop",
    school: "Ideal High School",
    highlight: "Hands-on"
  },
  {
    id: 5,
    type: "photo",
    image: "https://images.pexels.com/photos/35118835/pexels-photo-35118835.jpeg",
    title: "Winners Award Ceremony 2026",
    category: "Award",
    school: "Ideal High School",
    highlight: "Trophy Distribution"
  },
  {
    id: 6,
   
    image: "https://images.pexels.com/photos/31779221/pexels-photo-31779221.jpeg",
    title: "School Drag Racing Championship",
    category: "Racing",
    school: "Dhaka Schools",
    highlight: "Exciting"
  }
];

const PremiumSchoolGallery = () => {
  const [filter1, setFilter] = useState("All");

  const filtered = filter1 === "All" 
    ? schoolGallery 
    : schoolGallery.filter(item => item.category === filter1);

  return (
    <section className="py-20 bg-[#0a1625]">
      <div className="max-w-360 mt-20 mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-500 px-5 py-2 rounded-full text-sm mb-4">
            SCHOOL EVENTS GALLERY
          </div>
          <h2 className="text-5xl font-bold text-white">
            School <span className="text-orange-400">Memories & Achievements</span>
          </h2>
          <p className="text-slate-400 mt-4 text-lg">Ideal High School & Other Schools</p>
        </div>

        {/* Filters */}
       <div className="flex gap-2 mb-10 overflow-x-auto pb-4">
          {["All", "Competition", "Anniversary", "Quiz Competition", "Workshop", "Racing", "Award"].map((filter) => (
            <button
              key={filter}
              onClick={() => setFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition whitespace-nowrap
                ${filter1 === filter 
                  ? "bg-orange-500 text-black" 
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div key={item.id} className="group relative rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-orange-500/50 transition-all hover:-translate-y-2">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {item.type === "video" && (
                  <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full flex items-center gap-1 text-xs">
                    <FiPlay /> Video
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent h-2/3" />
              </div>

              <div className="p-6">
                <div className="text-orange-400 text-xs font-medium">{item.school} • {item.category}</div>
                <h3 className="text-white font-semibold text-xl mt-2 line-clamp-2 group-hover:text-orange-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-amber-400 text-sm mt-3">{item.highlight}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/Gallary" className="inline-flex items-center gap-3 text-orange-500 hover:text-orange-400 font-medium text-lg">
            View Complete School Gallery <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PremiumSchoolGallery;