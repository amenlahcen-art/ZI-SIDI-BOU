import React, { useState } from "react";
import { Search, Map, Building2, ArrowRight, ShieldCheck, TrendingUp, Landmark } from "lucide-react";
import { Language } from "../types";
import { motion } from "motion/react";

interface HeroBannerProps {
  language: Language;
  settings: any;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onExploreMap: () => void;
  onViewCompanies: () => void;
}

export default function HeroBanner({
  language,
  settings,
  searchQuery,
  setSearchQuery,
  onExploreMap,
  onViewCompanies,
}: HeroBannerProps) {
  const isRtl = language === "AR";
  const [localSearch, setLocalSearch] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    onExploreMap();
  };

  // Safe multilingual retrieval
  const title =
    language === "AR"
      ? settings.heroTitleAR
      : language === "EN"
      ? settings.heroTitleEN
      : settings.heroTitleFR;

  const subtitle =
    language === "AR"
      ? settings.heroSubtitleAR
      : language === "EN"
      ? settings.heroSubtitleEN
      : settings.heroSubtitleFR;

  // Visual text translations
  const labelSearchPlaceholder =
    language === "AR"
      ? "ابحث عن بقعة، شركة، نشاط صناعي..."
      : language === "EN"
      ? "Search lot, company, industry..."
      : "Rechercher un lot, entreprise, activité...";

  const btnSearch = language === "AR" ? "بحث" : language === "EN" ? "Search" : "Rechercher";
  const btnExplore = language === "AR" ? "استكشاف الخريطة" : language === "EN" ? "Explore Map" : "Explorer la Carte";
  const btnDirectory = language === "AR" ? "دليل الشركات" : language === "EN" ? "Company Directory" : "Annuaire des Entreprises";

  const statLotsLabel = language === "AR" ? "بقعة صناعية مجهزة" : language === "EN" ? "Equipped Industrial Lots" : "Lots industriels équipés";
  const statTranchesLabel = language === "AR" ? "أشواط تهيئة متكاملة" : language === "EN" ? "Infrastructure Phases" : "Tranches d'aménagement";
  const statProximityLabel = language === "AR" ? "قرب ممتاز (مراكش)" : language === "EN" ? "Proximity to Marrakech" : "Proximité de Marrakech";

  return (
    <div className="relative rounded-3xl overflow-hidden mb-8 border border-slate-200/60 shadow-xl bg-slate-900 text-white min-h-[500px] flex items-center">
      {/* Background image overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out brightness-[0.32]"
        style={{ backgroundImage: `url(${settings.bannerImage || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200"})` }}
      />

      {/* Decorative ambient gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-900/40 pointer-events-none" />
      <div className="absolute -left-24 -top-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content layout */}
      <div className="relative z-10 w-full px-6 py-12 md:px-12 md:py-16 flex flex-col gap-8 text-left">
        <div className={`max-w-3xl flex flex-col gap-4 ${isRtl ? "ml-auto text-right" : "mr-auto text-left"}`}>
          {/* Tag badge with animation */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            <span className="uppercase tracking-widest text-[10px]">
              {language === "AR" ? "المملكة المغربية • وزارة الصناعة" : language === "EN" ? "Kingdom of Morocco • Ministry of Industry" : "Royaume du Maroc • Ministère de l'Industrie"}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black tracking-tight leading-tight md:leading-none text-white font-sans text-balance"
          >
            {title}
          </motion.h1>

          {/* Subtitle description */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-sm md:text-base text-slate-300 leading-relaxed font-normal"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Dynamic premium search bar block */}
        <motion.form 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSearchSubmit}
          className={`w-full max-w-2xl bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-white/20 flex flex-col md:flex-row gap-2 ${
            isRtl ? "ml-auto" : "mr-auto"
          }`}
        >
          <div className="flex-1 relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder={labelSearchPlaceholder}
              className={`w-full bg-transparent border-0 text-slate-800 text-sm focus:outline-none focus:ring-0 placeholder:text-slate-400 py-3 pr-4 pl-12 ${
                isRtl ? "text-right" : "text-left"
              }`}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20 active:scale-[0.98]"
          >
            <span>{btnSearch}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.form>

        {/* Lower row buttons and stats counter */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className={`flex flex-wrap items-center gap-4 mt-2 ${isRtl ? "justify-start flex-row-reverse" : "justify-start"}`}
        >
          {/* Action Explore Map */}
          <button
            onClick={onExploreMap}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/10 text-xs font-bold py-3 px-5 rounded-xl flex items-center gap-2 transition-all cursor-pointer active:scale-[0.98]"
          >
            <Map className="w-4.5 h-4.5 text-blue-300" />
            <span>{btnExplore}</span>
          </button>

          {/* Action Company directory */}
          <button
            onClick={onViewCompanies}
            className="bg-transparent hover:bg-white/5 text-slate-300 hover:text-white text-xs font-bold py-3 px-5 rounded-xl flex items-center gap-2 transition-all cursor-pointer"
          >
            <Building2 className="w-4.5 h-4.5 text-emerald-300" />
            <span>{btnDirectory}</span>
          </button>
        </motion.div>

        {/* Quick statistics row on bottom */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10 mt-4 max-w-4xl w-full ${isRtl ? "text-right" : "text-left"}`}>
          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
            <div className="p-2.5 bg-blue-500/20 rounded-xl">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-white block tracking-tight">361</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">{statLotsLabel}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
            <div className="p-2.5 bg-emerald-500/20 rounded-xl">
              <Landmark className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-white block tracking-tight">III</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">{statTranchesLabel}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
            <div className="p-2.5 bg-orange-500/20 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-white block tracking-tight">30 KM</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">{statProximityLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
