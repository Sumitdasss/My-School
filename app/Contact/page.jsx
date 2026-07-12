/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiCheck, FiFacebook, FiInstagram, FiYoutube, FiArrowUpRight } from 'react-icons/fi';

const PremiumContact = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: ""
  });
  const [focused, setFocused] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => {
        setStatus("idle");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      }, 2000);
    }, 1400);
  };

  return (
    <section className="relative overflow-hidden bg-[#080d14] py-20 md:py-24">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#1e3a5f_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-360 mt-20 px-5 md:px-6">
        <div className="mb-12 md:mb-16 text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-amber-500/10 px-6 py-2 text-xs font-semibold uppercase tracking-widest text-orange-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-400" /> CONNECT WITH US
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white">
            Get In <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg md:text-xl text-slate-400 px-4">
            স্কুল ইভেন্ট, কম্পিটিশন, সার্ভিস বুকিং অথবা যেকোনো প্রয়োজনে যোগাযোগ করুন
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Side - Info */}
          <div className="space-y-6 lg:col-span-5">
            {/* Contact Info Card */}
            <div className="rounded-3xl border border-white/10 bg-zinc-900/90 p-8 md:p-10 backdrop-blur-xl">
              <h3 className="mb-8 text-2xl md:text-3xl font-semibold text-white">Contact Information</h3>

              <div className="space-y-7 md:space-y-8">
                <InfoRow icon={<FiPhone />} label="Phone / WhatsApp">
                  <a href="tel:+88017XXXXXXXX" className="text-lg md:text-xl font-medium text-white hover:text-orange-400 transition">+880 17XX-XXXXXX</a>
                </InfoRow>

                <InfoRow icon={<FiMail />} label="Email">
                  <a href="mailto:info@craftmotors.com" className="text-lg md:text-xl font-medium text-white hover:text-orange-400 transition">info@craftmotors.com</a>
                </InfoRow>

                <InfoRow icon={<FiMapPin />} label="Location">
                  <p className="text-lg md:text-xl text-white">Ideal High School Campus,<br />Dhaka, Bangladesh</p>
                </InfoRow>

                <InfoRow icon={<FiClock />} label="Business Hours">
                  <p className="text-lg md:text-xl text-white">Sat - Thu: 8:00 AM - 6:00 PM</p>
                </InfoRow>
              </div>
            </div>

            {/* Google Map */}
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900">
              <div className="relative h-64 md:h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3221.0107972909714!2d90.33203757883409!3d23.689093558296673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755be6706396469%3A0xa536ee997e6610a!2sGoalkhali%20Adarsha%20High%20School!5e0!3m2!1sen!2sbd!4v1783863697699!5m2!1sen!2sbd"
                  className="h-full w-full grayscale-[30%] transition-all duration-500 hover:grayscale-0"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              </div>
              <a
                href="https://www.google.com/maps?q=Ideal+High+School+Dhaka+Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border-t border-white/10 bg-zinc-900 px-6 py-4 text-sm font-medium text-slate-300 hover:text-orange-400 transition"
              >
                Open in Google Maps
                <FiArrowUpRight />
              </a>
            </div>

            {/* Social Links */}
            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8 text-center">
              <p className="mb-5 text-slate-400">Follow us</p>
              <div className="flex justify-center gap-4">
                {[FiFacebook, FiInstagram, FiYoutube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl text-slate-300 transition hover:border-orange-500 hover:text-orange-400 hover:-translate-y-1"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-zinc-900/90 p-8 md:p-12 backdrop-blur-xl">
              <h3 className="mb-8 text-3xl font-semibold text-white">Send us a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FloatingField
                    name="name"
                    label="Your Full Name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    focused={focused}
                    setFocused={setFocused}
                    required
                  />
                  <FloatingField
                    name="email"
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    focused={focused}
                    setFocused={setFocused}
                    required
                  />
                  <FloatingField
                    name="phone"
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    focused={focused}
                    setFocused={setFocused}
                    className="md:col-span-2"
                  />
                  <FloatingField
                    name="subject"
                    label="Subject (School Event / Service etc.)"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    focused={focused}
                    setFocused={setFocused}
                    className="md:col-span-2"
                    required
                  />
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    placeholder=" "
                    required
                    className="peer w-full resize-y rounded-3xl border border-white/10 bg-white/5 px-6 py-6 text-white placeholder-transparent focus:border-orange-500 focus:outline-none"
                  />
                  <label
                    className={`pointer-events-none absolute left-6 top-5 text-slate-400 transition-all peer-placeholder-shown:text-base peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-orange-400 ${formData.message ? '-translate-y-3 text-xs text-orange-400' : ''}`}
                  >
                    Write your message here...
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 py-5 text-lg md:text-xl font-bold text-black transition hover:brightness-110 active:scale-[0.97] disabled:opacity-75"
                >
                  {status === "sending" && <><span className="animate-spin">⟳</span> Sending...</>}
                  {status === "sent" && <>Message Sent <FiCheck className="text-xl" /></>}
                  {status === "idle" && <>Send Message <FiSend /></>}
                </button>

                {status === "sent" && (
                  <p className="text-center text-emerald-400 text-sm">Thank you! We'll reply soon.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable Floating Input Component
const FloatingField = ({ name, label, type, value, onChange, focused, setFocused, required, className = "" }) => (
  <div className={`relative ${className}`}>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(name)}
      onBlur={() => setFocused(null)}
      required={required}
      className="peer w-full rounded-2xl border border-white/10 bg-white/5 px-6 pb-3 pt-7 text-white placeholder-transparent focus:border-orange-500 focus:outline-none transition"
      placeholder=" "
    />
    <label
      htmlFor={name}
      className={`pointer-events-none absolute left-6 top-5 text-slate-400 transition-all peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-orange-400 ${focused === name || value ? '-translate-y-3 text-xs text-orange-400' : 'text-base'}`}
    >
      {label}
    </label>
  </div>
);

const InfoRow = ({ icon, label, children }) => (
  <div className="flex items-start gap-5">
    <div className="mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-orange-500/10 text-2xl text-orange-500">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm text-slate-400">{label}</p>
      {children}
    </div>
  </div>
);

export default PremiumContact;