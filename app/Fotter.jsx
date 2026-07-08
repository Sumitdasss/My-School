"use client";

import React from "react";
import Link from "next/link";
import {
  FaSchool,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaYoutube,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";



export default function Footer() {
  return (
    <footer className="bg-[#081527] text-slate-300">
      <div className="max-w-360 mx-auto px-5 md:px-8 pt-20 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* School Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
             <img src="/logo.png" alt="" className="w-16 h-16" />
              <div>
                <h3 className="font-serif text-[20px] font-bold text-white">GOALKHALI IDEAL</h3>
                <p className="text-[#D4AF37] text-sm tracking-widest">HIGH SCHOOL</p>
              </div>
            </div>
            
            <p className="text-slate-400 leading-relaxed">
              Shaping young minds with excellence since 1998. A place where tradition meets modern education.
            </p>
            
            <div className="flex gap-4 mt-8">
              <a href="#" className="hover:text-[#D4AF37] transition-colors"><FaFacebook size={22} /></a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors"><FaYoutube size={22} /></a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors"><FaInstagram  size={22} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Quick Links</h4>
            <div className="space-y-3 text-sm">
              <Link href="/about" className="block hover:text-white transition-colors">About Us</Link>
              <Link href="/academic" className="block hover:text-white transition-colors">Academic</Link>
              <Link href="/admission" className="block hover:text-white transition-colors">Admission</Link>
              <Link href="/notice" className="block hover:text-white transition-colors">Notices</Link>
              <Link href="/events" className="block hover:text-white transition-colors">Events</Link>
              <Link href="/gallery" className="block hover:text-white transition-colors">Gallery</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Contact Us</h4>
            <div className="space-y-5">
              <div className="flex gap-3">
                <FaEnvelope className="text-[#D4AF37] mt-1" size={20} />
                <div>
                  <p>Goalkhali, Barishal</p>
                  <p>Bangladesh</p>
                </div>
              </div>
              <div className="flex gap-3">
                <FaPhoneAlt className="text-[#D4AF37] mt-1" size={20} />
                <div>
                  <p>+880 17XX-XXXXXX</p>
                  <p>+880 19XX-XXXXXX</p>
                </div>
              </div>
              <div className="flex gap-3">
                <FaEnvelope className="text-[#D4AF37] mt-1" size={20} />
                <p>info@goalkhaliideal.edu.bd</p>
              </div>
            </div>
          </div>

          {/* School Hours */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">School Hours</h4>
            <div className="space-y-3 text-sm">
              <div>Saturday - Thursday: <span className="text-white">8:00 AM - 2:00 PM</span></div>
              <div>Friday: <span className="text-white">Closed</span></div>
              <div className="pt-4 border-t border-white/10">
                Office Hours: 8:00 AM - 3:00 PM
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-5 md:px-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Goalkhali Ideal High School. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}