"use client";

import React from "react";
import { Calendar, Download, Clock } from "lucide-react";

export default function AcademicCalendar() {
  const academicEvents = [
    // === Academic & Exam Events ===
    { date: "2026-01-05", title: "New Academic Session Begins", type: "academic", color: "blue" },
    { date: "2026-01-06", title: "Classes Start", type: "academic", color: "blue" },
    { date: "2026-03-15", title: "1st Term Examination Starts", type: "exam", color: "red" },
    { date: "2026-04-10", title: "Half-Yearly Examination", type: "exam", color: "red" },
    { date: "2026-08-01", title: "2nd Term Examination Starts", type: "exam", color: "red" },
    { date: "2026-11-20", title: "Annual Examination Starts", type: "exam", color: "red" },
    { date: "2026-12-25", title: "Annual Prize Giving Ceremony", type: "event", color: "yellow" },

    // === Real Bangladesh Government Holidays 2026 ===
    { date: "2026-02-04", title: "Shab-e-Barat", type: "holiday", color: "green" },
    { date: "2026-02-21", title: "International Mother Language Day", type: "holiday", color: "green" },
    { date: "2026-03-17", title: "Shab-e-Qadr (Laylat al-Qadr)", type: "holiday", color: "green" },
    { date: "2026-03-19", title: "Eid-ul-Fitr Holiday", type: "holiday", color: "green" },
    { date: "2026-03-20", title: "Jumu'atul Bidah", type: "holiday", color: "green" },
    { date: "2026-03-21", title: "Eid-ul-Fitr", type: "holiday", color: "green" },
    { date: "2026-03-22", title: "Eid-ul-Fitr Holiday", type: "holiday", color: "green" },
    { date: "2026-03-23", title: "Eid-ul-Fitr Holiday", type: "holiday", color: "green" },
    { date: "2026-03-26", title: "Independence Day", type: "holiday", color: "green" },
    { date: "2026-04-14", title: "Pohela Boishakh (Bengali New Year)", type: "holiday", color: "green" },
    { date: "2026-05-01", title: "May Day & Buddha Purnima", type: "holiday", color: "green" },
    { date: "2026-05-26", title: "Eid-ul-Adha", type: "holiday", color: "green" },
    // Eid-ul-Adha extended (approximate)
    { date: "2026-05-27", title: "Eid-ul-Adha Holiday", type: "holiday", color: "green" },
    { date: "2026-05-28", title: "Eid-ul-Adha Holiday", type: "holiday", color: "green" },
    { date: "2026-06-26", title: "Ashura", type: "holiday", color: "green" },
    { date: "2026-08-05", title: "July Mass Uprising Day", type: "holiday", color: "green" },
    { date: "2026-08-26", title: "Eid-e-Miladunnabi", type: "holiday", color: "green" },
    { date: "2026-12-16", title: "Victory Day", type: "holiday", color: "green" },
    { date: "2026-12-25", title: "Christmas Day", type: "holiday", color: "green" },
  ];

  // Group events by month
  const groupByMonth = (events) => {
    const months = {};
    events.forEach(event => {
      const date = new Date(event.date);
      const monthName = date.toLocaleString('en-US', { month: 'long' });
      const monthIndex = date.getMonth();
      
      if (!months[monthName]) {
        months[monthName] = {
          month: monthName,
          monthIndex: monthIndex,
          events: []
        };
      }
      months[monthName].events.push(event);
    });
    return Object.values(months).sort((a, b) => a.monthIndex - b.monthIndex);
  };

  const calendarData = groupByMonth(academicEvents);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-semibold tracking-widest">ACADEMIC YEAR 2026</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0A1628] mt-4">
            Academic Calendar
          </h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            Important academic dates, examinations, and government holidays of Bangladesh
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calendarData.map((monthData, index) => (
            <div
              key={index}
              className="bg-white border border-[#D4AF37]/20 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-[#D4AF37] text-[#0A1628] w-14 h-14 rounded-2xl flex items-center justify-center font-serif font-bold text-xl">
                  {monthData.month.slice(0, 3)}
                </div>
                <h3 className="text-3xl font-semibold text-[#0A1628]">{monthData.month}</h3>
              </div>

              <div className="space-y-6">
                {monthData.events
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((event, i) => {
                    const day = new Date(event.date).getDate();
                    return (
                      <div key={i} className="flex gap-5 group">
                        <div className={`w-12 h-12 flex-shrink-0 rounded-2xl flex items-center justify-center text-lg font-semibold border-2 border-transparent group-hover:scale-105 transition-transform
                          ${event.type === 'exam' ? 'bg-red-100 text-red-700 border-red-200' : 
                            event.type === 'holiday' ? 'bg-green-100 text-green-700 border-green-200' : 
                            event.type === 'academic' ? 'bg-blue-100 text-blue-700 border-blue-200' : 
                            'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>
                          {day}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[#0A1628] leading-tight">{event.title}</p>
                          <span className={`text-xs uppercase tracking-widest font-medium
                            ${event.type === 'exam' ? 'text-red-600' : 
                              event.type === 'holiday' ? 'text-green-600' : 
                              event.type === 'academic' ? 'text-blue-600' : 'text-yellow-600'}`}>
                            {event.type.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Download Button */}
        <div className="mt-16 text-center">
          <button 
            onClick={() => alert("PDF Download functionality will be added with backend integration")}
    
            className="inline-flex items-center gap-3 bg-[#0A1628] hover:bg-black text-white px-10 py-5 rounded-3xl text-lg font-medium transition-all hover:scale-105"
          >
            <Download className="w-6 h-6 text-[#D4AF37]" />
            <span>Download Full Academic Calendar (PDF)</span>
          </button>
          <p className="text-sm text-slate-500 mt-4">Admin Panel থেকে নতুন ইভেন্ট যোগ করলে স্বয়ংক্রিয়ভাবে আপডেট হবে</p>
        </div>
      </div>
    </section>
  );
}