"use client";

import { useState } from 'react';
import { FiCalendar, FiMapPin, FiUsers, FiArrowRight, FiAward } from 'react-icons/fi';
import Link from 'next/link';

const events = [
  {
    id: 1,
    title: "CraftMotors Inter-School Car Quiz & Racing Competition",
    date: "18 July 2026",
    time: "09:00 AM - 05:00 PM",
    location: "CraftMotors Arena, Dhaka",
    image: "https://images.pexels.com/photos/29321044/pexels-photo-29321044.jpeg",
    type: "School Competition",
    attendees: "1800+",
    price: "Free ",
    guest: "Famous Racing Driver - Rahim Khan",
    featured: true
  },
  {
    id: 2,
    title: "Goalkhali Ideal High School 28th Anniversary Celebration",
    date: "25 July 2026",
    time: "04:00 PM - 10:00 PM",
    location: "Government Laboratory High School Ground",
    image: "/23.png",
    type: "School Anniversary",
    attendees: "3000+",
    price: "Free",
    guest: "Education Minister + Celebrity Guest",
    featured: true
  },
  {
    id: 3,
    title: "Cycle Racing Championship 2026",
    date: "01 August 2026",
    time: "08:00 PM - 02:00 AM",
    location: "Bangabandhu Stadium Ground",
    image: "https://images.pexels.com/photos/12122336/pexels-photo-12122336.jpeg",
    type: "Sports Competition",
    attendees: "2500+",
    price: "Free",
    guest: "Professional Drifters",
    featured: false
  },
  {
    id: 4,
    title: "Yearly Compition & Prize Giving Ceremony",
    date: "08 August 2026",
    time: "10:00 AM - 07:00 PM",
    location: "CraftMotors Workshop, Gulshan",
    image: "/24.png",
    type: "Yearly Competition",
    attendees: "1200+",
    price: "Free",
    guest: "Famous Bike Influencers",
    featured: false
  }
];

const PremiumEventSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredEvents = activeFilter === "All" 
    ? events 
    : events.filter(e => e.type.toLowerCase().includes(activeFilter.toLowerCase()) || (activeFilter === "Competition" && e.type.includes("Competition")));

  return (
    <section className="py-20 bg-[#292827] relative overflow-hidden">
      <div className="absolute  inset-0 bg-[radial-gradient(circle_at_center,#1e3a5f_0%,transparent_70%)]" />
      
      <div className="max-w-360 mx-auto px-6 relative mt-20 z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-500 px-4 py-1.5 rounded-full text-sm font-medium mb-3">
              🔥 BIG EVENTS & COMPETITIONS
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
              Exciting <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Events</span>
            </h2>
            <p className="text-xl text-slate-400 mt-4 max-w-lg">
              খেলা প্রতিযোগিতা • স্কুল অ্যানিভার্সারি • গেস্ট অ্যাপিয়ারেন্স
            </p>
          </div>

          <Link href="/Events" className="group flex items-center gap-2 text-orange-500 hover:text-orange-400 transition mt-6 md:mt-0 text-lg font-medium">
            সব ইভেন্ট দেখুন <FiArrowRight className="group-hover:translate-x-1 transition" />
          </Link>
        </div>

        {/* Filters */}
       <div className="flex gap-2 mb-10 overflow-x-auto pb-4">
          {["All", "Yearly Competition", "Sports Competition", "School Competition","School Anniversary"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition whitespace-nowrap
                ${activeFilter === filter 
                  ? "bg-orange-500 text-black" 
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group bg-zinc-900/80 border border-white/10 rounded-3xl overflow-hidden hover:border-orange-500/40 transition-all duration-500 hover:-translate-y-3"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {event.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1">
                    <FiAward /> FEATURED
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/70 to-transparent" />
              </div>

              <div className="p-7">
                <div className="uppercase text-orange-400 text-xs tracking-widest mb-1">{event.type}</div>
                
                <h3 className="text-2xl font-bold text-white leading-tight mb-4 group-hover:text-orange-300 transition-colors line-clamp-2">
                  {event.title}
                </h3>

                <div className="space-y-3 text-slate-400 mb-6">
                  <div className="flex items-center gap-3">
                    <FiCalendar className="text-orange-400 flex-shrink-0" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiMapPin className="text-orange-400 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiUsers className="text-orange-400 flex-shrink-0" />
                    <span>{event.attendees} জন আসবে</span>
                  </div>
                  {event.guest && (
                    <div className="flex items-center gap-3 text-amber-400">
                      <span className="font-medium">Special Guest:</span>
                      <span className="text-white">{event.guest}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div>
                    <span className="text-xs text-slate-500 block">ENTRY</span>
                    <span className="font-semibold text-white text-lg">{event.price}</span>
                  </div>

                  <button className="px-7 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-bold rounded-2xl flex items-center gap-2 transition active:scale-95">
                    Register Now
                    <FiArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
       
      </div>
    </section>
  );
};

export default PremiumEventSection;