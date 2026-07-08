"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {id:1,
      name: "Rahima Begum",
      role: "Parent of Class 8 Student",
      message: "Goalkhali Ideal High School has transformed my daughter's life. The teachers are incredibly dedicated, and the learning environment is both nurturing and challenging. We are truly grateful.",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    },
    {id:2,
      name: "Sohail Ahmed",
      role: "Alumni 2023",
      message: "This school didn't just teach me books — it taught me how to think, lead, and dream big. The foundation I received here helped me get into BUET. Thank you Ideal High School!",
      image: "https://images.pexels.com/photos/2379003/pexels-photo-2379003.jpeg",
    },
    {id:3,
      name: "Mrs. Farhana Islam",
      role: "Teacher (Mathematics)",
      message: "Working here for 12 years has been a privilege. The students are eager to learn, and the management truly values quality education. This is more than just a school — it's a family.",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
    },
    {id:4,
      name: "Kazi Nasiruddin",
      role: "Parent",
      message: "The discipline, academic standard, and extracurricular activities are outstanding. My son has grown tremendously in confidence and knowledge since joining this school.",
      image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
    },
    {id:5,
      name: "Kazi Nasiruddin",
      role: "Parent",
      message: "The discipline, academic standard, and extracurricular activities are outstanding. My son has grown tremendously in confidence and knowledge since joining this school.",
      image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
    },
    {id:6,
      name: "Kazi Nasiruddin",
      role: "Parent",
      message: "The discipline, academic standard, and extracurricular activities are outstanding. My son has grown tremendously in confidence and knowledge since joining this school.",
      image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
    },
  ];

  return (
    <section className="bg-[#F8F5F0] py-20 md:py-28">
      <div className="max-w-360 mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-semibold tracking-widest">HEAR FROM OUR COMMUNITY</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0A1628] mt-4">
            What People Say
          </h2>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          breakpoints={{
            600: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="testimonials-swiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm h-full flex flex-col">
                <Quote className="text-[#D4AF37] w-12 h-12 mb-8 opacity-70" />

                <p className="text-slate-700 leading-relaxed text-[17px] mb-10 flex-1">
                  {testimonial.message}
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/20">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0A1628]">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}