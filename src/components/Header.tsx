import React from "react";
import { Search, Globe, MapPin } from "lucide-react";
import { Language } from "../types";
import { translations } from "../data/translations";

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNavigateTab: (tab: string) => void;
  activeTab: string;
  onOpenAdmin: () => void;
}

export default function Header({
  language,
  setLanguage,
  searchQuery,
  setSearchQuery,
  onNavigateTab,
  activeTab,
  onOpenAdmin,
}: HeaderProps) {
  const t = translations[language];
  const isRtl = language === "AR";

  const tabs = [
    { id: "map", label: t.tabInteractiveMap },
    { id: "companies", label: t.tabCompanies },
    { id: "news", label: t.tabNews },
    { id: "events", label: t.tabEvents },
    { id: "about", label: t.tabAbout },
    { id: "contact", label: t.tabContact },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-sm px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Left side: Logo & Title */}
      <div className={`flex items-center gap-4 ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shadow-inner flex items-center justify-center">
          {/* Detailed Industrial GIS Icon */}
          <svg
            className="w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 10v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10l3.08-3.08A2 2 0 0 1 6.5 6.34L12 12l5.5-5.66a2 2 0 0 1 1.42-.58L22 10z" />
            <path d="M17 2h5v5" />
            <path d="M21 3l-8.5 8.5" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
        <div className={isRtl ? "text-right" : "text-left"}>
          <h1 className="text-xl font-bold tracking-tight text-gray-900 leading-tight">
            {t.appTitle} <span className="text-blue-600 font-black">{t.appSubtitle}</span>
          </h1>
          <p className="text-xs text-gray-400 font-medium tracking-wide">
            {t.appPlatform}
          </p>
        </div>
      </div>

      {/* Center: Navigation Tabs */}
      <nav className={`flex items-center gap-1 md:gap-2 flex-wrap justify-center ${isRtl ? "flex-row-reverse" : ""}`}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigateTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-blue-500 text-white shadow-md shadow-blue-500/10"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
        <button
          onClick={onOpenAdmin}
          className="px-4 py-2 rounded-lg text-sm font-extrabold text-blue-600 hover:text-white border border-blue-500/35 hover:bg-blue-500 transition-all duration-200 cursor-pointer flex items-center gap-1.5 ml-1 md:ml-2"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>{isRtl ? "الإدارة" : "Admin"}</span>
        </button>
      </nav>

      {/* Right side: Language Selectors & Mini Search */}
      <div className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
        {/* Header Search Bar */}
        <div className="relative hidden lg:block w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className={`w-full bg-gray-50 border border-gray-200 text-sm rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
              isRtl ? "text-right pr-9 pl-3" : "text-left pl-9 pr-3"
            }`}
          />
          <Search
            className={`absolute top-2.5 w-4 h-4 text-gray-400 ${
              isRtl ? "right-3" : "left-3"
            }`}
          />
        </div>

        {/* Trilingual Buttons */}
        <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200">
          <button
            onClick={() => setLanguage("FR")}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
              language === "FR"
                ? "bg-white text-blue-600 shadow-sm animate-fade-in"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            FR
          </button>
          <button
            onClick={() => setLanguage("EN")}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
              language === "EN"
                ? "bg-white text-blue-600 shadow-sm animate-fade-in"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("AR")}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
              language === "AR"
                ? "bg-white text-blue-600 shadow-sm animate-fade-in"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            العربية
          </button>
        </div>
      </div>
    </header>
  );
}
