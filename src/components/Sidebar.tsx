import React from "react";
import { Search, RotateCcw, Filter, Layers, MapPin, ExternalLink } from "lucide-react";
import { Language, Lot, LotStatus } from "../types";
import { translations } from "../data/translations";

interface SidebarProps {
  language: Language;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTranche: string;
  setSelectedTranche: (tranche: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  surfaceMin: string;
  setSurfaceMin: (min: string) => void;
  surfaceMax: string;
  setSurfaceMax: (max: string) => void;
  onResetFilters: () => void;
  selectedLot?: Lot | null;
}

export default function Sidebar({
  language,
  searchQuery,
  setSearchQuery,
  selectedTranche,
  setSelectedTranche,
  selectedStatus,
  setSelectedStatus,
  surfaceMin,
  setSurfaceMin,
  surfaceMax,
  setSurfaceMax,
  onResetFilters,
  selectedLot,
}: SidebarProps) {
  const t = translations[language];
  const isRtl = language === "AR";

  const tranches = [
    { value: "all", label: t.filterTrancheAll },
    { value: "TR I", label: "Tranche I" },
    { value: "TR II", label: "Tranche II" },
    { value: "TR III", label: "Tranche III" },
  ];

  const statuses = [
    { value: "all", label: t.filterStatusAll },
    { value: LotStatus.AVAILABLE, label: t.legendAvailable },
    { value: LotStatus.OCCUPIED, label: t.legendOccupied },
    { value: LotStatus.RESERVED, label: t.legendReserved },
    { value: LotStatus.UNDER_CONSTRUCTION, label: t.legendUnderConstruction },
    { value: LotStatus.EQUIPMENT, label: t.legendEquipment },
  ];

  const legendItems = [
    { color: "bg-emerald-500", text: t.legendAvailable },
    { color: "bg-yellow-400 border border-yellow-500/30", text: t.legendReserved },
    { color: "bg-red-500", text: t.legendOccupied },
    { color: "bg-purple-500", text: t.legendUnderConstruction },
    { color: "bg-blue-500", text: t.legendEquipment },
    { color: "bg-white border border-gray-250", text: t.legendRoadGreen },
  ];

  // Geolocation properties for Sidi Bou Othmane center or specific selected lot coordinates
  const lat = selectedLot?.lat ?? 31.918;
  const lng = selectedLot?.lng ?? -7.945;
  const zoom = selectedLot ? 16 : 13;
  const iframeSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&t=m&output=embed`;

  return (
    <div className={`w-full lg:w-80 flex flex-col gap-5 ${isRtl ? "lg:order-2" : "lg:order-1"}`}>
      {/* 1. Live Search Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className={`text-xs font-bold text-gray-400 tracking-wider mb-3 flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
          <Search className="w-3.5 h-3.5 text-blue-500" />
          {t.searchLabel.toUpperCase()}
        </h3>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className={`w-full bg-gray-50 border border-gray-200 text-sm rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
              isRtl ? "text-right pr-10 pl-4" : "text-left pl-10 pr-4"
            }`}
          />
          <Search
            className={`absolute top-3.5 w-4 h-4 text-gray-400 ${
              isRtl ? "right-4.5" : "left-4.5"
            }`}
          />
        </div>
      </div>

      {/* 2. Map Legend Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className={`text-xs font-bold text-gray-400 tracking-wider mb-4 flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
          <Layers className="w-3.5 h-3.5 text-blue-500" />
          {t.legendTitle}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          {legendItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`}
            >
              <span className={`w-4 h-4 rounded-md shrink-0 shadow-sm ${item.color}`} />
              <span className="text-sm font-medium text-gray-600">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Advanced Filters Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className={`flex items-center justify-between mb-4 ${isRtl ? "flex-row-reverse" : ""}`}>
          <h3 className={`text-xs font-bold text-gray-400 tracking-wider flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
            <Filter className="w-3.5 h-3.5 text-blue-500" />
            {t.filterTitle}
          </h3>
          <button
            onClick={onResetFilters}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            {t.filterReset}
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {/* Tranche Filter */}
          <div className="flex flex-col gap-1.5">
            <label className={`text-xs font-semibold text-gray-500 ${isRtl ? "text-right" : ""}`}>
              {t.filterTranche}
            </label>
            <select
              value={selectedTranche}
              onChange={(e) => setSelectedTranche(e.target.value)}
              className={`w-full bg-gray-50 border border-gray-200 text-sm rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                isRtl ? "text-right" : ""
              }`}
            >
              {tranches.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex flex-col gap-1.5">
            <label className={`text-xs font-semibold text-gray-500 ${isRtl ? "text-right" : ""}`}>
              {t.filterStatus}
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={`w-full bg-gray-50 border border-gray-200 text-sm rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                isRtl ? "text-right" : ""
              }`}
            >
              {statuses.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Surface Range */}
          <div className="flex flex-col gap-1.5">
            <label className={`text-xs font-semibold text-gray-500 ${isRtl ? "text-right" : ""}`}>
              {t.lotSurface} (m²)
            </label>
            <div className={`grid grid-cols-2 gap-2 ${isRtl ? "direction-rtl" : ""}`}>
              <div className="flex flex-col gap-1">
                <input
                  type="number"
                  value={surfaceMin}
                  onChange={(e) => setSurfaceMin(e.target.value)}
                  placeholder={t.filterReset === "RÉINITIALISER" ? "Min" : "الأدنى"}
                  className={`w-full bg-gray-50 border border-gray-200 text-sm rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isRtl ? "text-right" : ""
                  }`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <input
                  type="number"
                  value={surfaceMax}
                  onChange={(e) => setSurfaceMax(e.target.value)}
                  placeholder={t.filterReset === "RÉINITIALISER" ? "Max" : "الأقصى"}
                  className={`w-full bg-gray-50 border border-gray-200 text-sm rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isRtl ? "text-right" : ""
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Geographic Location Card (Embedded Mini Google Map) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3">
        <h3 className={`text-xs font-bold text-gray-400 tracking-wider flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
          <MapPin className="w-3.5 h-3.5 text-red-500" />
          {isRtl ? "التحديد الجغرافي" : "LOCALISATION GÉOGRAPHIQUE"}
        </h3>
        
        <div className={`flex flex-col gap-1 ${isRtl ? "text-right" : "text-left"}`}>
          <span className="text-xs font-bold text-gray-800">
            {selectedLot ? `${isRtl ? "موقع البقعة رقم" : "Position du Lot # "}${selectedLot.number}` : (isRtl ? "منطقة سيدي بوعثمان الصناعية" : "Zone Industrielle Sidi Bou Othmane")}
          </span>
          <span className="text-[10px] text-gray-500 font-medium">
            {isRtl ? "إقليم الرحامنة، جهة مراكش آسفي، المغرب" : "Province de Rehamna, Marrakech-Safi, Maroc"}
          </span>
        </div>

        {/* Embedded Iframe Map Container (Guaranteed No Auth Errors) */}
        <div className="w-full h-36 rounded-xl overflow-hidden border border-gray-150 shadow-inner relative bg-slate-100">
          <iframe
            title="Google Maps Location"
            src={iframeSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Action Button: Open in external Google Maps directions */}
        <a
          href={selectedLot ? `https://www.google.com/maps/dir/?api=1&destination=${selectedLot.lat},${selectedLot.lng}` : "https://maps.google.com/?q=Zone+Industrielle+Sidi+Bou+Othmane,+Morocco"}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-gray-200 text-[11px] font-bold text-gray-700 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
          {isRtl ? "افتح في خرائط Google" : "Ouvrir dans Google Maps"}
        </a>
      </div>
    </div>
  );
}
