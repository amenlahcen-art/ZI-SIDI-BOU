import React from "react";
import { Globe2 } from "lucide-react";
import { Language } from "../types";
import { translations } from "../data/translations";

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const t = translations[language];
  const isRtl = language === "AR";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white text-gray-500 py-6 px-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Left side: branding & region */}
      <div className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
        <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
          <Globe2 className="w-4 h-4" />
        </div>
        <div className={isRtl ? "text-right" : "text-left"}>
          <span className="font-bold text-gray-800 text-sm block">
            {t.footerProvince}
          </span>
          <span className="text-xs text-gray-400 font-medium">
            {t.footerZoneName}
          </span>
        </div>
      </div>

      {/* Middle side: Copyright */}
      <div className="text-xs text-gray-400 text-center font-medium">
        &copy; {currentYear} {t.footerZoneName}. {t.footerCopyright}
      </div>

      {/* Right side: Platform indicator */}
      <div className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : "flex-row"}`}>
        <span className="text-xs font-semibold tracking-wider text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {t.footerPlatform}
        </span>
      </div>
    </footer>
  );
}
