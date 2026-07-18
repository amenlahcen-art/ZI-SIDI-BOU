import React from "react";
import { LayoutGrid, CheckCircle, Ban, Hourglass, Hammer, Wrench, Leaf } from "lucide-react";
import { Lot, LotStatus, Language } from "../types";
import { translations } from "../data/translations";

interface StatsProps {
  language: Language;
  lots: Lot[];
}

export default function Stats({ language, lots }: StatsProps) {
  const t = translations[language];
  const isRtl = language === "AR";

  // Calculate live statistics
  const total = lots.length;
  const available = lots.filter((l) => l.status === LotStatus.AVAILABLE).length;
  const occupied = lots.filter((l) => l.status === LotStatus.OCCUPIED).length;
  const reserved = lots.filter((l) => l.status === LotStatus.RESERVED).length;
  const underConstruction = lots.filter((l) => l.status === LotStatus.UNDER_CONSTRUCTION).length;
  const equipment = lots.filter((l) => l.status === LotStatus.EQUIPMENT).length;

  const statCards = [
    {
      label: t.statsLots,
      value: total,
      icon: LayoutGrid,
      colorClass: "bg-slate-900 text-white",
      valueColor: "text-white",
      labelColor: "text-slate-400"
    },
    {
      label: t.statsAvailable,
      value: available,
      icon: CheckCircle,
      colorClass: "bg-emerald-50 border border-emerald-100",
      valueColor: "text-emerald-600",
      labelColor: "text-emerald-500 font-semibold"
    },
    {
      label: t.statsOccupied,
      value: occupied,
      icon: Ban,
      colorClass: "bg-red-50 border border-red-100",
      valueColor: "text-red-600",
      labelColor: "text-red-500 font-semibold"
    },
    {
      label: t.statsReserved,
      value: reserved,
      icon: Hourglass,
      colorClass: "bg-amber-50 border border-amber-100",
      valueColor: "text-amber-600",
      labelColor: "text-amber-500 font-semibold"
    },
    {
      label: t.statsUnderConstruction,
      value: underConstruction,
      icon: Hammer,
      colorClass: "bg-purple-50 border border-purple-100",
      valueColor: "text-purple-600",
      labelColor: "text-purple-500 font-semibold"
    },
    {
      label: t.statsEquipment,
      value: equipment,
      icon: Wrench,
      colorClass: "bg-blue-50 border border-blue-100",
      valueColor: "text-blue-600",
      labelColor: "text-blue-500 font-semibold"
    },
    {
      label: t.statsGreenSpaces,
      value: "—",
      icon: Leaf,
      colorClass: "bg-gray-50 border border-gray-150",
      valueColor: "text-gray-500",
      labelColor: "text-gray-400 font-semibold"
    }
  ];

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 w-full ${isRtl ? "direction-rtl" : ""}`}>
      {statCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`p-4 rounded-xl shadow-xs flex flex-col justify-between items-center text-center transition-all duration-200 hover:scale-[1.02] ${card.colorClass}`}
          >
            <div className="p-1.5 rounded-lg bg-white/20 mb-2">
              <Icon className={`w-4 h-4 ${card.valueColor}`} />
            </div>
            <span className={`text-[10px] md:text-xs tracking-wider uppercase mb-1 ${card.labelColor}`}>
              {card.label}
            </span>
            <span className={`text-xl md:text-2xl font-black ${card.valueColor}`}>
              {card.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
