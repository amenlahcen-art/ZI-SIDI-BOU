import React, { useState, useRef, useEffect, useMemo } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, Maximize, HelpCircle, Eye, EyeOff, Sliders, Info, ShieldAlert } from "lucide-react";
import { Lot, LotStatus, Language } from "../types";
import { translations } from "../data/translations";
import masterPlanImg from "../assets/images/plan-optimise.svg";
import { motion, AnimatePresence } from "motion/react";

interface MapProps {
  language: Language;
  lots: Lot[];
  filteredLots: Lot[];
  selectedLot: Lot | null;
  onSelectLot: (lot: Lot) => void;
  searchQuery: string;
}

interface TooltipState {
  lot: Lot;
  x: number;
  y: number;
  visible: boolean;
}

export default function Map({
  language,
  lots,
  filteredLots,
  selectedLot,
  onSelectLot,
  searchQuery,
}: MapProps) {
  const t = translations[language];
  const isRtl = language === "AR";

  // GIS styling and visibility preferences
  const [fillOpacity, setFillOpacity] = useState<number>(0.65);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [activeHighlightTranche, setActiveHighlightTranche] = useState<string>("all");

  // Hover Tooltip HUD state
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  // Reference to the TransformWrapper instance for programmatically zooming/centering
  const transformRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Automatically zoom & center when a lot is selected (via click, sidebar, or search)
  useEffect(() => {
    if (!selectedLot || !transformRef.current) return;

    // Calculate center of the selected lot in the 0-100 coordinate space
    const lotCenterX = selectedLot.x + selectedLot.width / 2;
    const lotCenterY = selectedLot.y + selectedLot.height / 2;

    const scale = 3.8; // Deep zoom scale to make detail clear

    // Get current wrapper dimensions dynamically
    const wrapper = transformRef.current.instance.wrapperComponent;
    const containerWidth = wrapper?.clientWidth || 800;
    const containerHeight = wrapper?.clientHeight || 600;

    // Translate relative coordinates (0-100) to pixel coordinate scale
    const pixelX = (lotCenterX / 100) * containerWidth;
    const pixelY = (lotCenterY / 100) * containerHeight;

    // Calculate translation offsets to center on the lot
    const x = containerWidth / 2 - pixelX * scale;
    const y = containerHeight / 2 - pixelY * scale;

    transformRef.current.setTransform(x, y, scale, 600, "easeOut");
  }, [selectedLot]);

  // Synchronize top-level header search results to focus the map on the match
  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === "" || !transformRef.current) return;

    const query = searchQuery.trim().toLowerCase();
    const matchedLot = lots.find(
      (lot) =>
        lot.number === query ||
        lot.companyName?.toLowerCase().includes(query) ||
        lot.sector?.toLowerCase().includes(query)
    );

    if (matchedLot) {
      // Calculate center coordinates
      const lotCenterX = matchedLot.x + matchedLot.width / 2;
      const lotCenterY = matchedLot.y + matchedLot.height / 2;

      const scale = 3.5;
      const wrapper = transformRef.current.instance.wrapperComponent;
      const containerWidth = wrapper?.clientWidth || 800;
      const containerHeight = wrapper?.clientHeight || 600;

      const pixelX = (lotCenterX / 100) * containerWidth;
      const pixelY = (lotCenterY / 100) * containerHeight;

      const x = containerWidth / 2 - pixelX * scale;
      const y = containerHeight / 2 - pixelY * scale;

      transformRef.current.setTransform(x, y, scale, 500, "easeOut");
    }
  }, [searchQuery, lots]);

  // Handle manual zoom/reset buttons
  const handleZoomIn = () => {
    if (transformRef.current) {
      transformRef.current.zoomIn(0.3);
    }
  };

  const handleZoomOut = () => {
    if (transformRef.current) {
      transformRef.current.zoomOut(0.3);
    }
  };

  const handleResetZoom = () => {
    if (transformRef.current) {
      transformRef.current.resetTransform(500, "easeOut");
    }
  };

  // Hover Tooltip tracking relative to map container
  const handleLotMouseEnter = (e: React.MouseEvent, lot: Lot) => {
    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();

    setTooltip({
      lot,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 15,
      visible: true,
    });
  };

  const handleLotMouseMove = (e: React.MouseEvent) => {
    if (!tooltip || !mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();

    setTooltip({
      ...tooltip,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 15,
    });
  };

  const handleLotMouseLeave = () => {
    setTooltip(null);
  };

  // Color mapping matching modern GIS standards (Yellow for Reserved, Red for Occupied, Emerald for Available)
  const getStatusStyle = (status: LotStatus) => {
    switch (status) {
      case LotStatus.AVAILABLE:
        return { fill: "#10b981", stroke: "#047857", text: "Disponible", badge: "bg-emerald-500" };
      case LotStatus.RESERVED:
        return { fill: "#eab308", stroke: "#ca8a04", text: "Réservé", badge: "bg-yellow-500" };
      case LotStatus.OCCUPIED:
        return { fill: "#ef4444", stroke: "#b91c1c", text: "Occupé", badge: "bg-red-500" };
      case LotStatus.UNDER_CONSTRUCTION:
        return { fill: "#a855f7", stroke: "#7e22ce", text: "En construction", badge: "bg-purple-500" };
      case LotStatus.EQUIPMENT:
        return { fill: "#3b82f6", stroke: "#1d4ed8", text: "Équipement", badge: "bg-blue-500" };
      default:
        return { fill: "#9ca3af", stroke: "#4b5563", text: "Inconnu", badge: "bg-gray-500" };
    }
  };

  return (
    <div
      ref={mapContainerRef}
      className="relative w-full bg-white border border-gray-100 rounded-3xl shadow-sm h-[650px] overflow-hidden select-none flex flex-col group"
      id="gis-map-viewport"
    >
      {/* 1. Zoom Pan Pinch Map Container */}
      <div className="flex-1 w-full h-full relative bg-white overflow-hidden cursor-grab active:cursor-grabbing">
        <TransformWrapper
          ref={transformRef}
          initialScale={1}
          minScale={0.8}
          maxScale={8}
          centerOnInit={true}
          limitToBounds={true}
          doubleClick={{ mode: "zoomIn", step: 0.5 }}
          wheel={{ step: 0.05 }}
        >
          <TransformComponent
            wrapperStyle={{ width: "100%", height: "100%", overflow: "hidden" }}
            contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {/* The SVG acts as the georeferenced interactive container */}
            <div className="w-full h-full aspect-[5/3] relative flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full object-cover transition-opacity duration-300"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Premium Orange Glow Filter for the selected lot */}
                  <filter id="orange-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="0.25" result="blur" />
                    <feComponentTransfer in="blur" result="glow">
                      <feFuncA type="linear" slope="0.85" />
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* A. High Resolution Master Plan Background CAD Image */}
                <image
                  href={masterPlanImg}
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  preserveAspectRatio="none"
                  style={{ imageRendering: "crisp-edges", msInterpolationMode: "nearest-neighbor" } as any}
                />

                {/* B. Vector Layer: clickable polygons representing parcelles */}
                {lots.map((lot) => {
                  const isFiltered = filteredLots.some((fl) => fl.id === lot.id);
                  const isSelected = selectedLot?.id === lot.id;
                  const { fill, stroke } = getStatusStyle(lot.status);

                  // Highlights for specific tranche selection on the map
                  const isTrancheHighlighted =
                    activeHighlightTranche === "all" || lot.tranche === activeHighlightTranche;

                  // Compute visual attributes dynamically: all lots remain fully visible and map is not blurred/darkened
                  const finalFillOpacity = isSelected
                    ? 0.75
                    : isFiltered && isTrancheHighlighted
                    ? fillOpacity
                    : 0.15; // slightly visible for non-filtered lots to maintain context

                  const finalStroke = isSelected
                    ? "#f97316" // Orange accent for selected lot
                    : isFiltered && isTrancheHighlighted
                    ? stroke
                    : "#e2e8f0";

                  const finalStrokeWidth = isSelected
                    ? 0.45 // Thicker stroke for clear orange outline
                    : isFiltered && isTrancheHighlighted
                    ? 0.18
                    : 0.08;

                  return (
                    <g
                      key={lot.id}
                      id={`lot-group-${lot.id}`}
                      className="transition-all duration-150"
                    >
                      {/* Active click & hover interactive polygon boundary */}
                      <rect
                        id={`lot-rect-${lot.id}`}
                        x={lot.x}
                        y={lot.y}
                        width={lot.width}
                        height={lot.height}
                        rx={0.18}
                        ry={0.18}
                        fill={fill}
                        fillOpacity={finalFillOpacity}
                        stroke={finalStroke}
                        strokeWidth={finalStrokeWidth}
                        filter={isSelected ? "url(#orange-glow)" : undefined}
                        className="transition-all duration-150 cursor-pointer hover:fill-opacity-80"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectLot(lot);
                        }}
                        onMouseEnter={(e) => handleLotMouseEnter(e, lot)}
                        onMouseMove={handleLotMouseMove}
                        onMouseLeave={handleLotMouseLeave}
                      />

                      {/* Display beautiful vector Lot Numbers directly inside parcelles */}
                      {showLabels && (
                        <>
                          <text
                            x={lot.x + lot.width / 2}
                            y={lot.y + lot.height / 2 + 0.6}
                            textAnchor="middle"
                            fill={isFiltered && isTrancheHighlighted ? "#1e293b" : "#94a3b8"}
                            fontSize={0.85}
                            fontWeight="bold"
                            fontFamily="monospace"
                            className="pointer-events-none select-none transition-opacity duration-200"
                            opacity={isFiltered && isTrancheHighlighted ? 0.95 : 0.25}
                          >
                            {lot.number}
                          </text>

                          {/* Company logo on occupied lot */}
                          {lot.status === "occupied" && lot.logoText && (
                            <g className="pointer-events-none select-none transition-opacity duration-200" opacity={isFiltered && isTrancheHighlighted ? 1 : 0.35}>
                              {/* Circle Background */}
                              <circle
                                cx={lot.x + lot.width / 2}
                                cy={lot.y + lot.height / 2 - 0.7}
                                r={0.6}
                                fill="#2563eb"
                                stroke="#ffffff"
                                strokeWidth={0.07}
                              />
                              {/* Logo text letter(s) */}
                              <text
                                x={lot.x + lot.width / 2}
                                y={lot.y + lot.height / 2 - 0.7 + 0.16}
                                textAnchor="middle"
                                fill="#ffffff"
                                fontSize={0.4}
                                fontWeight="black"
                                fontFamily="sans-serif"
                              >
                                {lot.logoText.slice(0, 2).toUpperCase()}
                              </text>
                            </g>
                          )}
                        </>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>

      {/* 2. Floating Dashboard Controls Overlay (ArcGIS Styled) */}
      <div className={`absolute top-4 z-20 max-w-[280px] w-full bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-150 flex flex-col gap-3 transition-all duration-200 ${
        isRtl ? "right-4" : "left-4"
      }`}>
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
          <Sliders className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
            {isRtl ? "لوحة تصفح المخطط" : "Contrôle de l'affichage"}
          </span>
        </div>

        {/* Dynamic Opacity Slider */}
        <div className="flex flex-col gap-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <div className="flex items-center justify-between text-[10px] font-bold text-gray-500">
            <span className="flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-blue-500" />
              {isRtl ? "شفافية البقع" : "Opacité des parcelles"}
            </span>
            <span>{Math.round(fillOpacity * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={fillOpacity}
            onChange={(e) => setFillOpacity(parseFloat(e.target.value))}
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
          />
        </div>

        {/* Tranche filter pill on Map */}
        <div className="flex flex-col gap-1 pt-1.5 border-t border-gray-100">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
            {isRtl ? "تسليط الضوء على الشطر" : "Filtre rapide de Tranche"}
          </span>
          <div className="flex gap-1">
            {["all", "TR I", "TR II", "TR III"].map((tr) => (
              <button
                key={tr}
                onClick={() => setActiveHighlightTranche(tr)}
                className={`flex-1 py-1 px-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                  activeHighlightTranche === tr
                    ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                    : "bg-white hover:bg-gray-50 border-gray-200 text-gray-600"
                }`}
              >
                {tr === "all" ? (isRtl ? "الكل" : "Tous") : tr}
              </button>
            ))}
          </div>
        </div>

        {/* Labels Show/Hide Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            {isRtl ? "عرض أرقام البقع" : "Numéros des lots"}
          </span>
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`p-1.5 rounded-lg border transition-colors flex items-center justify-center cursor-pointer ${
              showLabels
                ? "bg-blue-50 border-blue-200 text-blue-600"
                : "bg-white border-gray-200 text-gray-400"
            }`}
            title={showLabels ? (isRtl ? "إخفاء الأرقام" : "Masquer les numéros") : (isRtl ? "عرض الأرقام" : "Afficher les numéros")}
          >
            {showLabels ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3. Floating User Prompt Overlay Badge (Top Right) - Bright and Minimal Material 3 Style */}
      <div className={`absolute top-4 z-15 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl text-slate-700 border border-gray-150 text-[11px] font-semibold flex items-center gap-2 shadow-md max-md:hidden ${
        isRtl ? "left-4" : "right-4"
      }`}>
        <HelpCircle className="w-4 h-4 text-blue-500 shrink-0" />
        <span className="tracking-wide">
          {isRtl
             ? "استخدم عجلة الفأرة للتكبير • اسحب للتحريك • انقر على أي بقعة للحصول على معلومات كاملة"
             : "Utilisez la molette pour zoomer • Glissez pour déplacer • Cliquez sur un lot pour voir les détails"}
        </span>
      </div>

      {/* 4. Floating Zoom Navigation Controls (Bottom Right) */}
      <div className={`absolute bottom-6 flex flex-col gap-2 z-20 ${isRtl ? "left-6" : "right-6"}`}>
        <button
          onClick={handleZoomIn}
          title={t.zoomIn}
          className="p-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-xl shadow-lg transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomOut}
          title={t.zoomOut}
          className="p-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-xl shadow-lg transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={handleResetZoom}
          title={t.zoomReset}
          className="p-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-xl shadow-lg transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
        >
          <Maximize className="w-5 h-5" />
        </button>
      </div>

      {/* 5. Custom Floating Hover Tooltip HUD (Dynamic Cursor Tracking) */}
      <AnimatePresence>
        {tooltip && tooltip.visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            style={{
              position: "absolute",
              left: `${tooltip.x}px`,
              top: `${tooltip.y}px`,
            }}
            className={`absolute z-30 bg-white/95 backdrop-blur-md border border-gray-150 rounded-xl p-3 shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-75 max-w-xs ${
              isRtl ? "text-right" : "text-left"
            }`}
          >
            <div className="flex flex-col gap-1 min-w-[140px]">
              <span className="text-[10px] font-bold text-gray-400">
                {t.lotNumber} {tooltip.lot.number}
              </span>
              <span className="text-sm font-bold text-gray-800 leading-tight">
                {tooltip.lot.companyName || (isRtl ? "لا توجد شركة مثبتة" : "Aucune entreprise installée")}
              </span>
              <div className={`flex items-center gap-1.5 mt-1.5 ${isRtl ? "flex-row-reverse" : ""}`}>
                <span className={`w-2 h-2 rounded-full ${getStatusStyle(tooltip.lot.status).badge}`} />
                <span className="text-xs font-semibold text-gray-500">
                  {isRtl
                    ? tooltip.lot.status === LotStatus.AVAILABLE
                      ? t.legendAvailable
                      : tooltip.lot.status === LotStatus.OCCUPIED
                      ? t.legendOccupied
                      : tooltip.lot.status === LotStatus.RESERVED
                      ? t.legendReserved
                      : tooltip.lot.status === LotStatus.UNDER_CONSTRUCTION
                      ? t.legendUnderConstruction
                      : t.legendEquipment
                    : getStatusStyle(tooltip.lot.status).text}
                </span>
                <span className="text-xs text-gray-400 font-mono">• {tooltip.lot.surface} m²</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
