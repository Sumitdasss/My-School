"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

export default function UpcomingEvents() {
  const events = [
    {
      id: 1,
      title: "Annual Cultural Program & Prize Giving Ceremony",
      date: "15 July 2026",
      time: "10:00 AM - 03:00 PM",
      venue: "School Auditorium",
      category: "Cultural",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    },
    {
      id: 2,
      title: "Science Fair & Project Exhibition 2026",
      date: "22 July 2026",
      time: "09:00 AM - 04:00 PM",
      venue: "School Ground",
      category: "Academic",
      image: "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg",
    },
    {
      id: 3,
      title: "Independence Day Celebration",
      date: "26 March 2027",
      time: "08:00 AM",
      venue: "School Premises",
      category: "National",
      image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
    },
    {
      id: 4,
      title: "Inter School Debate Competition",
      date: "05 August 2026",
      time: "11:00 AM",
      venue: "Main Hall",
      category: "Competition",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
    },
    {
      id: 5,
      title: "Inter School Debate Competition",
      date: "05 August 2026",
      time: "11:00 AM",
      venue: "Main Hall",
      category: "Competition",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
    },
    {
      id: 6,
      title: "Inter School Debate Competition",
      date: "05 August 2026",
      time: "11:00 AM",
      venue: "Main Hall",
      category: "Competition",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-[#0A1628] to-[#0F1C2E] py-20 md:py-28">
      <div className="max-w-360 mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-[#D4AF37]/30 mb-6">
            <Calendar className="text-[#D4AF37]" size={24} />
            <span className="text-[#D4AF37] font-semibold tracking-widest">UPCOMING EVENTS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Upcoming Events
          </h2>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          navigation={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          pagination={{ clickable: true }}
       
        >
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#D4AF37]/50 rounded-3xl overflow-hidden h-full transition-all hover:-translate-y-2">
                <div className="relative h-56">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-4 py-1 rounded-full">
                    {event.category}
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex items-center gap-2 text-[#D4AF37] text-sm mb-3">
                    <Calendar size={16} />
                    <span>{event.date}</span>
                  </div>

                  <h3 className="text-white text-xl font-semibold leading-tight mb-5 line-clamp-2">
                    {event.title}
                  </h3>

                  <div className="space-y-2 text-slate-400 text-sm mb-7">
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  <Link
                    href={`/events/${event.id}`}
                    className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white font-medium"
                  >
                    View Details 
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-12">
          <Link
            href="/events"
            className="inline-flex items-center gap-3 px-10 py-4 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A1628] rounded-2xl font-semibold transition-all"
          >
            View All Events
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}