"use client";

import React from "react";

export default function SchoolLocation() {
  return (
    <section className="bg-[#0e526d] py-20 md:py-28">
      <div className="max-w-360 mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Info */}
          <div className="space-y-8">
            <div>
              <span className="text-[#D4AF37] font-semibold tracking-widest">VISIT US</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mt-4">
                Our School Location
              </h2>
            </div>

            <div className="space-y-6 text-slate-300">
              <div>
                <p className="text-[#D4AF37] font-medium">Address</p>
                <p className="text-lg">Goalkhali Ideal High School<br />
                Goalkhali, Keranigonj, Dhaka, Bangladesh</p>
              </div>

              <div>
                <p className="text-[#D4AF37] font-medium">Contact</p>
                <p className="text-lg">Phone: +880 17XX-XXXXXX<br />
                Email: info@goalkhaliideal.edu.bd</p>
              </div>

              <div>
                <p className="text-[#D4AF37] font-medium">School Hours</p>
                <p className="text-lg">Saturday - Thursday: 8:00 AM - 2:00 PM<br />
                Friday: Closed</p>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="https://www.google.com/maps/place/Goalkhali"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] hover:bg-[#E8C65A] text-[#0A1628] font-semibold rounded-2xl transition-all"
              >
                Get Directions on Google Maps
              </a>
            </div>
          </div>

          {/* Right Side - Google Map */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-[450px] md:h-[520px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d913.4086190960702!2d90.33057219202763!3d23.689026252209366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755be6706396469%3A0xa536ee997e6610a!2sGoalkhali%20Adarsha%20High%20School!5e0!3m2!1sen!2sbd!4v1783242324499!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}