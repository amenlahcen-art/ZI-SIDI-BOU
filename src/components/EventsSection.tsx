import React, { useState } from "react";
import { Search, Calendar, MapPin, Clock, ArrowRight, X } from "lucide-react";
import { Language } from "../types";

export interface ZoneEvent {
  id: number;
  titleFR: string;
  titleAR: string;
  titleEN: string;
  date: string; // e.g. "2026-09-15"
  time: string; // e.g. "09:00"
  locationFR: string;
  locationAR: string;
  locationEN: string;
  descriptionFR: string;
  descriptionAR: string;
  descriptionEN: string;
  image: string;
}

interface EventsSectionProps {
  language: Language;
  events: ZoneEvent[];
}

export default function EventsSection({ language, events }: EventsSectionProps) {
  const isRtl = language === "AR";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<ZoneEvent | null>(null);

  // Filter events
  const filteredEvents = events.filter((ev) => {
    const term = searchTerm.toLowerCase();
    if (language === "AR") {
      return (
        ev.titleAR.toLowerCase().includes(term) ||
        ev.descriptionAR.toLowerCase().includes(term) ||
        ev.locationAR.toLowerCase().includes(term)
      );
    } else if (language === "EN") {
      return (
        ev.titleEN.toLowerCase().includes(term) ||
        ev.descriptionEN.toLowerCase().includes(term) ||
        ev.locationEN.toLowerCase().includes(term)
      );
    } else {
      return (
        ev.titleFR.toLowerCase().includes(term) ||
        ev.descriptionFR.toLowerCase().includes(term) ||
        ev.locationFR.toLowerCase().includes(term)
      );
    }
  });

  const getTitle = (ev: ZoneEvent) => {
    if (language === "AR") return ev.titleAR;
    if (language === "EN") return ev.titleEN;
    return ev.titleFR;
  };

  const getDescription = (ev: ZoneEvent) => {
    if (language === "AR") return ev.descriptionAR;
    if (language === "EN") return ev.descriptionEN;
    return ev.descriptionFR;
  };

  const getLocation = (ev: ZoneEvent) => {
    if (language === "AR") return ev.locationAR;
    if (language === "EN") return ev.locationEN;
    return ev.locationFR;
  };

  // Extract month and day for the elegant calendar card style
  const getParsedDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      const day = d.getDate();
      const monthNamesFR = ["JAN", "FÉV", "MAR", "AVR", "MAI", "JUN", "JUL", "AOÛ", "SEP", "OCT", "NOV", "DÉC"];
      const monthNamesEN = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const monthNamesAR = ["يناير", "فبراير", "مارس", "أبريل", "ماي", "يونيو", "يوليوز", "غشت", "شتمبر", "أكتوبر", "نونبر", "دجنبر"];
      const month =
        language === "AR"
          ? monthNamesAR[d.getMonth()]
          : language === "EN"
          ? monthNamesEN[d.getMonth()]
          : monthNamesFR[d.getMonth()];
      const year = d.getFullYear();
      return { day, month, year };
    } catch (e) {
      return { day: "—", month: "EVENT", year: "" };
    }
  };

  return (
    <div className="flex flex-col gap-6" dir={isRtl ? "rtl" : "ltr"}>
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-150 pb-5">
        <div className={isRtl ? "text-right" : "text-left"}>
          <h2 className="text-2xl font-black text-gray-900">
            {language === "AR" ? "الفعاليات والأبواب المفتوحة" : language === "EN" ? "Events & Summits" : "Agenda & Événements"}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {language === "AR"
              ? "مواعيد اللقاءات الثنائية، المنتديات الاستثمارية والأيام الدراسية لمواكبة المقاولات."
              : language === "EN"
              ? "Summits, business forums, B2B meetings, and open days at Sidi Bou Othmane."
              : "Retrouvez les forums d'investissement, B2B meetings, journées d'études et portes ouvertes de la zone."}
          </p>
        </div>

        {/* Mini Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              language === "AR" ? "البحث في الفعاليات..." : language === "EN" ? "Search events..." : "Rechercher un événement..."
            }
            className={`w-full bg-slate-50 border border-gray-200 text-sm rounded-xl py-2.5 px-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
              isRtl ? "text-right pr-10" : "text-left pl-10"
            }`}
          />
          <Search className={`absolute top-3 w-4.5 h-4.5 text-gray-400 ${isRtl ? "right-3" : "left-3"}`} />
        </div>
      </div>

      {/* Grid of Events with Calendar cards */}
      {filteredEvents.length === 0 ? (
        <div className="py-12 text-center bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
          <p className="text-sm text-gray-500 font-semibold">
            {language === "AR" ? "لا توجد فعاليات مجدولة حالياً." : language === "EN" ? "No events scheduled at the moment." : "Aucun événement planifié pour le moment."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((ev) => {
            const { day, month, year } = getParsedDate(ev.date);
            return (
              <div
                key={ev.id}
                className="group bg-white border border-gray-100 hover:border-blue-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:scale-[1.01] transition-all duration-200 flex flex-col sm:flex-row h-full cursor-pointer"
                onClick={() => setSelectedEvent(ev)}
              >
                {/* Visual Calendar Badge + cover image */}
                <div className="w-full sm:w-44 shrink-0 bg-slate-50 relative aspect-video sm:aspect-auto">
                  <img
                    src={ev.image || "https://images.unsplash.com/photo-1540515436402-5c669141e531?auto=format&fit=crop&q=80&w=400"}
                    alt={getTitle(ev)}
                    className="w-full h-full object-cover"
                  />
                  {/* Calendar Badge overlay */}
                  <div className={`absolute top-3 ${isRtl ? "right-3" : "left-3"} bg-white border border-gray-200 p-2 rounded-xl shadow-lg flex flex-col items-center min-w-[50px]`}>
                    <span className="text-[10px] font-black text-blue-600 leading-none uppercase tracking-wide">
                      {month}
                    </span>
                    <span className="text-lg font-black text-slate-800 leading-none mt-1">
                      {day}
                    </span>
                    <span className="text-[9px] text-slate-400 font-bold mt-1">
                      {year}
                    </span>
                  </div>
                </div>

                {/* Event text description */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className={`text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug ${isRtl ? "text-right" : "text-left"}`}>
                      {getTitle(ev)}
                    </h3>
                    <p className={`text-xs text-gray-500 line-clamp-3 leading-relaxed mt-1 ${isRtl ? "text-right" : "text-left"}`}>
                      {getDescription(ev)}
                    </p>
                  </div>

                  <div className="border-t border-gray-50 pt-3 flex flex-col gap-1.5">
                    {/* Time */}
                    <div className={`flex items-center gap-1.5 text-xs text-gray-500 ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}>
                      <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span className="font-mono">{ev.time}</span>
                    </div>
                    {/* Location */}
                    <div className={`flex items-center gap-1.5 text-xs text-gray-500 ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}>
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="truncate">{getLocation(ev)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Event Details Overlay Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div
            className="fixed inset-0"
            onClick={() => setSelectedEvent(null)}
          />
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl relative z-10 border border-slate-100 flex flex-col">
            {/* Header image with calendar badge */}
            <div className="aspect-[16/9] w-full bg-slate-100 relative">
              <img
                src={selectedEvent.image}
                alt={getTitle(selectedEvent)}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedEvent(null)}
                className={`absolute top-4 ${isRtl ? "left-4" : "right-4"} p-2 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition-all cursor-pointer`}
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Content info */}
            <div className="p-6 flex flex-col gap-4">
              <div className={`flex items-center justify-between border-b border-gray-100 pb-3 ${isRtl ? "flex-row-reverse" : ""}`}>
                <div className={`flex items-center gap-1 text-xs text-blue-600 font-bold ${isRtl ? "flex-row-reverse" : ""}`}>
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>{selectedEvent.date}</span>
                </div>
                <div className={`flex items-center gap-1 text-xs text-gray-500 ${isRtl ? "flex-row-reverse" : ""}`}>
                  <Clock className="w-4 h-4 shrink-0" />
                  <span className="font-mono">{selectedEvent.time}</span>
                </div>
              </div>

              <div className={isRtl ? "text-right" : "text-left"}>
                <h3 className="text-lg md:text-xl font-extrabold text-slate-900 leading-snug">
                  {getTitle(selectedEvent)}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-3">
                  {getDescription(selectedEvent)}
                </p>

                <div className="mt-5 bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2">
                  <div className={`flex items-center gap-2 text-xs text-gray-700 font-bold ${isRtl ? "flex-row-reverse" : ""}`}>
                    <MapPin className="w-4.5 h-4.5 text-red-500 shrink-0" />
                    <span>{getLocation(selectedEvent)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 border-t border-gray-150 bg-slate-50 flex justify-end gap-2">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                {language === "AR" ? "إلغاء" : language === "EN" ? "Cancel" : "Annuler"}
              </button>
              <button
                onClick={() => {
                  alert(
                    language === "AR"
                      ? "تم تسجيل اهتمامكم بالفعالية! سنرسل لكم دعوة الحضور عبر بريدكم الإلكتروني قريباً."
                      : language === "EN"
                      ? "Your interest in this event has been registered! We will send you an invitation via email shortly."
                      : "Votre intérêt pour cet événement a été enregistré ! Nous vous enverrons une invitation par email sous peu."
                  );
                  setSelectedEvent(null);
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-blue-500/10"
              >
                {language === "AR" ? "تسجيل حضور" : language === "EN" ? "Register Attendance" : "S'inscrire"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
