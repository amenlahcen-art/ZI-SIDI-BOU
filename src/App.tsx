import React, { useState, useMemo, useEffect } from "react";
import { generateLots } from "./data/lots";
import AdminDashboard from "./components/AdminDashboard";
import { translations } from "./data/translations";
import { Language, Lot, LotStatus } from "./types";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Map from "./components/Map";
import Drawer from "./components/Drawer";
import Stats from "./components/Stats";
import Footer from "./components/Footer";
import NewsSection, { NewsArticle } from "./components/NewsSection";
import EventsSection, { ZoneEvent } from "./components/EventsSection";
import HeroBanner from "./components/HeroBanner";
import Login from "./components/Login";
import { Building, MapPin, Search, ArrowRight, Compass, CheckCircle2, Phone, Mail, Award, Landmark, Zap } from "lucide-react";

export default function App() {
  const [language, setLanguage] = useState<Language>("FR");
  const t = translations[language];
  const isRtl = language === "AR";

  // Navigation tab state: "map" | "companies" | "about" | "contact" | "news" | "events"
  const [activeTab, setActiveTab] = useState<string>("map");

  // Filter and Search states
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTranche, setSelectedTranche] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [surfaceMin, setSurfaceMin] = useState<string>("");
  const [surfaceMax, setSurfaceMax] = useState<string>("");

  // Selected lot for sliding Drawer
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);

  // Core Lots Database Engine (loaded from localStorage if saved)
  const [lots, setLots] = useState<Lot[]>(() => {
    const saved = localStorage.getItem("sidi_bou_othmane_lots");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return generateLots();
  });

  // News state
  const [news, setNews] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem("sidi_bou_othmane_news");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: 1,
        titleFR: "Extension de la Tranche II de la Zone Industrielle",
        titleAR: "توسيع الشطر الثاني للمنطقة الصناعية",
        titleEN: "Extension of Phase II of the Industrial Zone",
        date: "2026-07-10",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600",
        summaryFR: "Les travaux d'aménagement de la Tranche II avancent à grands pas, ouvrant la voie à de nouvelles opportunités d'implantation.",
        summaryAR: "تتقدم أشغال تهيئة الشطر الثاني بخطى سريعة، مما يفتح آفاقاً جديدة لتوطين المشاريع الاستثمارية.",
        summaryEN: "Development works on Phase II are progressing rapidly, opening the way for new investment and establishment opportunities.",
        contentFR: "Les travaux d'aménagement de la Tranche II de la Zone Industrielle de Sidi Bou Othmane ont atteint un taux de réalisation de 85%. Cette phase d'extension ajoutera de nombreux lots industriels équipés de connectivité haut débit, de puissance électrique renforcée et de systèmes d'assainissement modernes pour répondre aux exigences croissantes des industriels locaux et internationaux.",
        contentAR: "بلغت نسبة إنجاز أشغال تهيئة الشطر الثاني بالمنطقة الصناعية سيدي بوعثمان 85%. ستوفر هذه التوسعة بقعاً أرضية مجهزة بالإنترنت عالي الصبيب وقدرة كهربائية معززة وشبكة صرف صحي متطورة للاستجابة لمتطلبات المستثمرين المتزايدة.",
        contentEN: "The development works of Phase II in the Sidi Bou Othmane Industrial Zone have reached an 85% completion rate. This extension phase will add numerous industrial lots equipped with high-speed connectivity, reinforced electric power, and modern sewage systems to meet the growing demands of local and international industrial players.",
        categoryFR: "Infrastructure",
        categoryAR: "البنية التحتية",
        categoryEN: "Infrastructure",
        published: true
      },
      {
        id: 2,
        titleFR: "Inauguration d'une nouvelle unité agro-alimentaire",
        titleAR: "تدشين وحدة صناعية غذائية جديدة",
        titleEN: "Inauguration of a New Agro-Industrial Unit",
        date: "2026-06-28",
        image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=600",
        summaryFR: "Une unité moderne de conditionnement de produits agricoles locaux a été inaugurée aujourd'hui par la commission provinciale.",
        summaryAR: "تم اليوم تدشين وحدة حديثة لتلفيف وتعليب المنتجات الفلاحية المحلية من طرف اللجنة الإقليمية.",
        summaryEN: "A modern packaging and processing unit for local agricultural products was inaugurated today by the provincial commission.",
        contentFR: "La nouvelle unité industrielle agro-alimentaire s'étale sur une superficie de 4 500 m² et permettra la création de plus de 150 emplois directs dans la province de Rehamna. Cet investissement s'inscrit dans la stratégie de valorisation des produits agricoles locaux de la région.",
        contentAR: "تمتد هذه الوحدة الصناعية الغذائية الجديدة على مساحة 4500 متر مربع وستمكن من خلق أزيد من 150 منصب شغل مباشر بإقليم الرحامنة. ويندرج هذا الاستثمار في إطار استراتيجية تثمين المنتجات الفلاحية المحلية بالمنطقة.",
        contentEN: "The new agro-food industrial unit covers an area of 4,500 m² and will create more than 150 direct jobs in the Rehamna province. This investment is part of the strategy to enhance the value of local agricultural products in the region.",
        categoryFR: "Investissement",
        categoryAR: "الاستثمار",
        categoryEN: "Investment",
        published: true
      }
    ];
  });

  const handleUpdateNews = (newNews: NewsArticle[]) => {
    setNews(newNews);
    localStorage.setItem("sidi_bou_othmane_news", JSON.stringify(newNews));
  };

  // Events state
  const [events, setEvents] = useState<ZoneEvent[]>(() => {
    const saved = localStorage.getItem("sidi_bou_othmane_events");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: 1,
        titleFR: "Forum d'Investissement Rehamna 2026",
        titleAR: "منتدى الرحامنة للاستثمار 2026",
        titleEN: "Rehamna Investment Forum 2026",
        date: "2026-09-15",
        time: "09:00",
        locationFR: "Palais des Congrès, Ben Guerir",
        locationAR: "قصر المؤتمرات، ابن جرير",
        locationEN: "Conference Center, Ben Guerir",
        descriptionFR: "Rencontre internationale des industriels et investisseurs pour découvrir les potentialités économiques de la province.",
        descriptionAR: "لقاء دولي للمصنعين والمستثمرين لاكتشاف المؤهلات الاقتصادية والفرص الاستثمارية الواعدة بالإقليم.",
        descriptionEN: "International gathering of industrialists and investors to discover the economic potential and promising business opportunities of the province.",
        image: "https://images.unsplash.com/photo-1540515436402-5c669141e531?auto=format&fit=crop&q=80&w=600"
      },
      {
        id: 2,
        titleFR: "Journée Portes Ouvertes Sidi Bou Othmane",
        titleAR: "الأبواب المفتوحة للمنطقة الصناعية سيدي بوعثمان",
        titleEN: "Sidi Bou Othmane Open Doors Day",
        date: "2026-10-05",
        time: "10:00",
        locationFR: "Zone Industrielle, Bureau d'Accueil",
        locationAR: "المنطقة الصناعية، مكتب الاستقبال",
        locationEN: "Industrial Zone, Reception Office",
        descriptionFR: "Visites guidées de la zone, présentation des opportunités foncières et rencontres directes avec les responsables de l'investissement.",
        descriptionAR: "زيارات ميدانية موجهة للمنطقة الصناعية، وتقديم فرص العقار الصناعي المتاحة، ولقاءات مباشرة مع مسؤولي الاستثمار.",
        descriptionEN: "Guided tours of the zone, presentation of available industrial land opportunities, and direct B2B meetings with investment officers.",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600"
      }
    ];
  });

  const handleUpdateEvents = (newEvents: ZoneEvent[]) => {
    setEvents(newEvents);
    localStorage.setItem("sidi_bou_othmane_events", JSON.stringify(newEvents));
  };

  // General site settings state
  const [settings, setSettings] = useState<any>(() => {
    const saved = localStorage.getItem("sidi_bou_othmane_settings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      title: "Sidi Bou Othmane",
      subtitle: "Zone Industrielle de Sidi Bou Othmane",
      logoText: "SBO",
      email: "contact@zoneindustriellesbo.ma",
      phone: "+212 5 24 45 77 11",
      address: "Route Nationale 9, Sidi Bou Othmane, Province de Rehamna, Maroc",
      facebook: "https://facebook.com/sidi.bou.othmane",
      instagram: "https://instagram.com/sidi.bou.othmane",
      linkedin: "https://linkedin.com/company/sidi-bou-othmane",
      whatsapp: "https://wa.me/212600000000",
      mapsLocation: "https://goo.gl/maps/sidibouothmane",
      qrCodeUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=200",
      heroTitleFR: "Plateforme Digitale de la Zone Industrielle Sidi Bou Othmane",
      heroTitleAR: "المنصة الرقمية للمنطقة الصناعية سيدي بوعثمان",
      heroTitleEN: "Digital Platform of the Industrial Zone",
      heroSubtitleFR: "Découvrez notre plan cadastral interactif complet, explorez les opportunités de lots fonciers disponibles et accédez directement aux fiches d'activités des entreprises installées.",
      heroSubtitleAR: "اكتشف المخطط العقاري التفاعلي الكامل، وتصفح الفرص العقارية المتاحة، والولوج المباشر لبيانات المقاولات المستقرة بالمنطقة.",
      heroSubtitleEN: "Discover our comprehensive interactive land registry plan, explore available industrial land opportunities, and directly access company profiles of established players.",
      bannerImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200",
      footerCopyright: "© 2026 Province de Rehamna. Tous droits réservés."
    };
  });

  const handleUpdateSettings = (newSettings: any) => {
    setSettings(newSettings);
    localStorage.setItem("sidi_bou_othmane_settings", JSON.stringify(newSettings));
  };

  // Inquiries state
  const [inquiries, setInquiries] = useState<any[]>(() => {
    const saved = localStorage.getItem("sidi_bou_othmane_messages");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        id: "inq_1",
        companyName: "Atlas Textiles",
        investorName: "Amine Sefrioui",
        email: "a.sefrioui@atlastextiles.ma",
        phone: "+212 661 12 82 82",
        activity: "Textile & Garments",
        lotRequested: "82",
        description: "Demande de visite technique et étude de raccordement électrique haute puissance pour notre future unité d'éco-textiles.",
        date: "2026-07-15",
        status: "new"
      },
      {
        id: "inq_2",
        companyName: "Bio Maroc S.A.",
        investorName: "Yasmine Benjelloun",
        email: "y.benjelloun@biomaroc.ma",
        phone: "+212 522 88 11 00",
        activity: "Conditionnement d'huiles essentielles",
        lotRequested: "115",
        description: "Demande de prix et modalités d'achat pour le lot 115 afin d'y installer un site d'extraction d'huiles de figues de barbarie.",
        date: "2026-07-12",
        status: "processed"
      }
    ];
  });

  const handleUpdateInquiries = (newInqs: any[]) => {
    setInquiries(newInqs);
    localStorage.setItem("sidi_bou_othmane_messages", JSON.stringify(newInqs));
  };

  const handleAddInquiry = (newInq: any) => {
    const updated = [newInq, ...inquiries];
    setInquiries(updated);
    localStorage.setItem("sidi_bou_othmane_messages", JSON.stringify(updated));
  };

  // State to manage Admin Routing
  const [isAdminView, setIsAdminView] = useState(() => {
    return window.location.pathname === "/admin" || window.location.pathname.startsWith("/admin/");
  });

  // Current logged in administrator
  const [currentUser, setCurrentUser] = useState<any>(() => {
    const saved = localStorage.getItem("sidi_bou_othmane_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  // Keep path synchronisation
  useEffect(() => {
    const handlePopState = () => {
      setIsAdminView(window.location.pathname === "/admin" || window.location.pathname.startsWith("/admin/"));
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Handle switching to/from admin route
  const handleOpenAdmin = () => {
    window.history.pushState({}, "", "/admin");
    setIsAdminView(true);
  };

  const handleCloseAdmin = () => {
    window.history.pushState({}, "", "/");
    setIsAdminView(false);
  };

  // Filter lots according to user queries
  const filteredLots = useMemo(() => {
    return lots.filter((lot) => {
      // 1. Text Search query (matches lot number, company name, or activity sector)
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const matchesId = lot.number.includes(query);
        const matchesCompany = lot.companyName?.toLowerCase().includes(query) || false;
        const matchesSector = lot.sector?.toLowerCase().includes(query) || false;

        if (!matchesId && !matchesCompany && !matchesSector) {
          return false;
        }
      }

      // 2. Tranche Filter
      if (selectedTranche !== "all" && lot.tranche !== selectedTranche) {
        return false;
      }

      // 3. Status Filter
      if (selectedStatus !== "all" && lot.status !== selectedStatus) {
        return false;
      }

      // 4. Surface Min Filter
      if (surfaceMin !== "" && lot.surface < parseFloat(surfaceMin)) {
        return false;
      }

      // 5. Surface Max Filter
      if (surfaceMax !== "" && lot.surface > parseFloat(surfaceMax)) {
        return false;
      }

      return true;
    });
  }, [lots, searchQuery, selectedTranche, selectedStatus, surfaceMin, surfaceMax]);

  // Handle click on directory "Voir sur la carte" (Show on map)
  const handleShowOnMap = (lot: Lot) => {
    setSelectedLot(lot);
    setActiveTab("map");
    // Trigger auto-focus inside Map component (handled via search or props)
    setSearchQuery(lot.number);
  };

  // Reset all sidebar filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedTranche("all");
    setSelectedStatus("all");
    setSurfaceMin("");
    setSurfaceMax("");
    setSelectedLot(null);
  };

  // Companies list for the Directory View
  const companiesList = useMemo(() => {
    return lots.filter(
      (l) =>
        (l.status === LotStatus.OCCUPIED ||
          l.status === LotStatus.RESERVED ||
          l.status === LotStatus.UNDER_CONSTRUCTION) &&
        l.companyName
    );
  }, [lots]);

  // Filtered companies list for directory search
  const filteredCompanies = useMemo(() => {
    if (!searchQuery) return companiesList;
    const query = searchQuery.toLowerCase().trim();
    return companiesList.filter(
      (c) =>
        c.companyName?.toLowerCase().includes(query) ||
        c.number.includes(query) ||
        c.sector?.toLowerCase().includes(query)
    );
  }, [companiesList, searchQuery]);

  const handleUpdateLots = (newLots: Lot[]) => {
    setLots(newLots);
    localStorage.setItem("sidi_bou_othmane_lots", JSON.stringify(newLots));
  };

  if (isAdminView) {
    if (!currentUser) {
      return (
        <Login
          language={language}
          onLoginSuccess={(user) => setCurrentUser(user)}
          onBackToPublic={handleCloseAdmin}
        />
      );
    }

    return (
      <AdminDashboard
        lots={lots}
        onUpdateLots={handleUpdateLots}
        onCloseAdmin={handleCloseAdmin}
        language={language}
        setLanguage={setLanguage}
        news={news}
        onUpdateNews={handleUpdateNews}
        events={events}
        onUpdateEvents={handleUpdateEvents}
        inquiries={inquiries}
        onUpdateInquiries={handleUpdateInquiries}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        currentUser={currentUser}
        onLogout={() => {
          localStorage.removeItem("sidi_bou_othmane_current_user");
          setCurrentUser(null);
        }}
      />
    );
  }

  return (
    <div
      className="min-h-screen bg-white flex flex-col font-sans selection:bg-blue-500 selection:text-white"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* 1. Header component */}
      <Header
        language={language}
        setLanguage={setLanguage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          if (tab !== "map") {
            // Keep state clean when leaving map
            setSelectedLot(null);
          }
        }}
        activeTab={activeTab}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* 2. Main content router */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
        {/* TAB 1: INTERACTIVE MAP (DEFAULT) */}
        {activeTab === "map" && (
          <div className="flex flex-col gap-6">
            {/* Premium Hero Banner */}
            <HeroBanner
              language={language}
              settings={settings}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onExploreMap={() => {
                document.getElementById("interactive-map-viewport")?.scrollIntoView({ behavior: "smooth" });
              }}
              onViewCompanies={() => setActiveTab("companies")}
            />

            {/* Statistics Panel right below the Banner */}
            <div className="mt-2 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              <h3 className={`text-xs font-bold text-gray-400 tracking-wider mb-3 ${isRtl ? "text-right" : "text-left"}`}>
                {t.statsTitle}
              </h3>
              <Stats language={language} lots={lots} />
            </div>

            {/* Top banner / breadcrumbs */}
            <div id="interactive-map-viewport" className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm ${
              isRtl ? "md:flex-row-reverse" : ""
            }`}>
              <div className={isRtl ? "text-right" : "text-left"}>
                <h2 className="text-lg font-bold text-gray-800">
                  {t.tabInteractiveMap}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {isRtl
                    ? "اختر بقعة صناعية للاطلاع على تفاصيل النشاط والشركة والاتصال."
                    : "Sélectionnez une parcelle industrielle pour consulter la fiche d'activité et les contacts."}
                </p>
              </div>
              <div className={`flex items-center gap-2 text-xs font-semibold ${isRtl ? "flex-row-reverse" : ""}`}>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg">
                  {filteredLots.length} / {lots.length} {isRtl ? "بقع معروضة" : "lots affichés"}
                </span>
                {searchQuery && (
                  <button
                    onClick={handleResetFilters}
                    className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg cursor-pointer transition-colors"
                  >
                    {isRtl ? "مسح البحث" : "Effacer"}
                  </button>
                )}
              </div>
            </div>

            {/* Layout Wrapper: Large Map (75% / 3 cols), Sidebar (25% / 1 col) */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Central GIS Map Viewport */}
              <div className="lg:col-span-3 flex flex-col gap-6 order-1 lg:order-1">
                <Map
                  language={language}
                  lots={lots}
                  filteredLots={filteredLots}
                  selectedLot={selectedLot}
                  onSelectLot={(lot) => setSelectedLot(lot)}
                  searchQuery={searchQuery}
                />
              </div>

              {/* Sidebar filter controls & Location Card */}
              <div className="lg:col-span-1 order-2 lg:order-2">
                <Sidebar
                  language={language}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedTranche={selectedTranche}
                  setSelectedTranche={setSelectedTranche}
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                  surfaceMin={surfaceMin}
                  setSurfaceMin={setSurfaceMin}
                  surfaceMax={surfaceMax}
                  setSurfaceMax={setSurfaceMax}
                  onResetFilters={handleResetFilters}
                  selectedLot={selectedLot}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COMPANIES DIRECTORY */}
        {activeTab === "companies" && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
            <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 pb-5 ${
              isRtl ? "md:flex-row-reverse" : ""
            }`}>
              <div className={isRtl ? "text-right" : "text-left"}>
                <h2 className="text-xl font-bold text-gray-900">{t.tabCompanies}</h2>
                <p className="text-xs text-gray-500 mt-1">
                  {isRtl
                    ? "دليل الشركات والمصانع النشطة في منطقة سيدي بوعثمان الصناعية."
                    : "Annuaire des entreprises et usines implantées dans la Zone Industrielle."}
                </p>
              </div>

              {/* Directory search input */}
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isRtl ? "البحث عن شركة أو قطاع..." : "Rechercher une entreprise..."}
                  className={`w-full bg-gray-50 border border-gray-200 text-sm rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isRtl ? "text-right pr-9 pl-3" : "text-left pl-9 pr-3"
                  }`}
                />
                <Search className={`absolute top-3 w-4 h-4 text-gray-400 ${isRtl ? "right-3" : "left-3"}`} />
              </div>
            </div>

            {/* Companies Grid */}
            {filteredCompanies.length === 0 ? (
              <div className="text-center py-12 text-gray-400 font-medium">
                {t.noResults}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCompanies.map((c) => (
                  <div
                    key={c.id}
                    className="border border-gray-100 hover:border-blue-200 bg-white p-5 rounded-2xl shadow-xs hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-between gap-4"
                  >
                    <div className={`flex items-start gap-4 ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}>
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 font-bold flex items-center justify-center shrink-0">
                        {c.logoText || "CO"}
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] font-bold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded-md">
                          Lot {c.number}
                        </span>
                        <h3 className="text-base font-bold text-gray-900 mt-1.5 leading-snug">
                          {c.companyName}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">{c.sector}</p>
                      </div>
                    </div>

                    <p className={`text-xs text-gray-500 line-clamp-2 ${isRtl ? "text-right" : "text-left"}`}>
                      {c.description}
                    </p>

                    <div className={`flex items-center justify-between border-t border-gray-50 pt-3 ${isRtl ? "flex-row-reverse" : ""}`}>
                      <span className="text-[10px] font-semibold text-gray-400 font-mono">
                        {c.surface} m² • {c.tranche}
                      </span>
                      <button
                        onClick={() => handleShowOnMap(c)}
                        className={`text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors cursor-pointer ${
                          isRtl ? "flex-row-reverse" : ""
                        }`}
                      >
                        {isRtl ? "عرض على الخريطة" : "Voir sur la carte"}
                        <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ABOUT */}
        {activeTab === "about" && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-8">
            {/* Title */}
            <div className={`border-b border-gray-100 pb-5 ${isRtl ? "text-right" : "text-left"}`}>
              <h2 className="text-2xl font-black text-gray-900">{t.tabAbout}</h2>
              <p className="text-xs text-gray-500 mt-1">
                {isRtl
                  ? "معلومات شاملة ومزايا الاستثمار في القطب الصناعي لجهة الرحامنة."
                  : "Informations générales et avantages stratégiques de la Zone Industrielle."}
              </p>
            </div>

            {/* Strategic bento features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-6 bg-slate-50 border border-slate-100 rounded-2xl ${isRtl ? "text-right" : "text-left"}`}>
                <div className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {isRtl ? "موقع استراتيجي ممتاز" : "Localisation Premium"}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {isRtl
                    ? "تقع المنطقة على بعد 30 كلم فقط شمال مراكش، على الطريق الوطنية رقم 9 وبجوار مخرج الطريق السيار (Casablanca-Marrakech). تتيح هذه التموقعية وصولاً فائق السرعة لكافة أقطاب المملكة."
                    : "Idéalement située à seulement 30 km au nord de Marrakech sur la Route Nationale 9, à proximité immédiate de l'autoroute A3. Une connectivité logistique d'exception vers Casablanca et le Sud."}
                </p>
              </div>

              <div className={`p-6 bg-slate-50 border border-slate-100 rounded-2xl ${isRtl ? "text-right" : "text-left"}`}>
                <div className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {isRtl ? "بنية تحتية متطورة" : "Infrastructure Moderne"}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {isRtl
                    ? "مجهزة بالكامل بشبكات الجهد المتوسط للكهرباء، قنوات مياه الشرب، محطة متكاملة لتصفية المياه وضخها، الألياف البصرية، والإنارة العمومية عالية الجودة مع الحماية الأمنية المستمرة."
                    : "Entièrement équipée : réseau électrique moyenne tension, adduction en eau industrielle, réseau d'assainissement moderne, station de pompage, fibre optique et sécurité périmétrique 24/7."}
                </p>
              </div>

              <div className={`p-6 bg-slate-50 border border-slate-100 rounded-2xl ${isRtl ? "text-right" : "text-left"}`}>
                <div className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {isRtl ? "امتيازات وتسهيلات المستثمرين" : "Avantages d'Investissement"}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {isRtl
                    ? "دعم ومواكبة إدارية مباشرة من طرف إقليم الرحامنة ومؤسسة العمران مراكش. قروض ومساعدات مالية، مع إمكانية الوصول إلى يد عاملة محلية مؤهلة خريجة المعاهد التقنية المجاورة."
                    : "Accompagnement guichet unique de la Province de Rehamna et Al Omrane. Subventions de l'État pour l'acquisition du foncier et bassin d'emploi qualifié grâce aux instituts de formation technique."}
                </p>
              </div>
            </div>

            {/* Editorial visual section */}
            <div className={`flex flex-col lg:flex-row items-center gap-8 bg-blue-50/50 p-6 rounded-3xl border border-blue-100/50 ${
              isRtl ? "lg:flex-row-reverse" : ""
            }`}>
              <div className="w-full lg:w-1/2 aspect-video rounded-2xl overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600"
                  alt="Modern manufacturing"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`w-full lg:w-1/2 flex flex-col gap-4 ${isRtl ? "text-right" : "text-left"}`}>
                <span className="text-xs font-bold text-blue-600 tracking-widest uppercase inline-block">
                  {isRtl ? "مؤهلات الاستثمار" : "PROFIL D'INVESTISSEMENT"}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                  {isRtl
                    ? "الوجهة الصناعية الجديدة الرائدة بجهة مراكش - آسفي"
                    : "La nouvelle destination industrielle majeure de la région Marrakech-Safi"}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {isRtl
                    ? "تمتد منطقة سيدي بوعثمان على مساحة إجمالية شاسعة مهيأة لاستقبال مئات الوحدات الصناعية في مختلف القطاعات الحيوية كالصناعات الغذائية، البناء، الكيمياء واللوجستيك. تضمن لكم المنصة نمواً واعداً لشركاتكم."
                    : "S'étendant sur un foncier stratégique d'envergure, Sidi Bou Othmane accueille des centaines d'entreprises performantes dans des secteurs variés (agroalimentaire, chimie, BTP, textile, logistique). Choisissez la sécurité et la performance."}
                </p>
                <div className={`flex flex-col gap-2 mt-2 ${isRtl ? "items-start" : "items-start"}`}>
                  <div className={`flex items-center gap-2 text-sm text-slate-700 font-semibold ${isRtl ? "flex-row-reverse" : ""}`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>361 {isRtl ? "بقعة صناعية مجهزة" : "parcelles équipées au total"}</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm text-slate-700 font-semibold ${isRtl ? "flex-row-reverse" : ""}`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{isRtl ? "30 كلم فقط عن مراكش" : "30 km seulement de Marrakech"}</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm text-slate-700 font-semibold ${isRtl ? "flex-row-reverse" : ""}`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{isRtl ? "شبكة طرق ممتازة وشبكة تطهير متطورة" : "Réseau d'assainissement avec station d'épuration autonome"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: NEWS */}
        {activeTab === "news" && (
          <NewsSection language={language} news={news} />
        )}

        {/* TAB: EVENTS */}
        {activeTab === "events" && (
          <EventsSection language={language} events={events} />
        )}

        {/* TAB 4: CONTACT */}
        {activeTab === "contact" && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-8">
            {/* Title */}
            <div className={`border-b border-gray-100 pb-5 ${isRtl ? "text-right" : "text-left"}`}>
              <h2 className="text-2xl font-black text-gray-900">{t.tabContact}</h2>
              <p className="text-xs text-gray-500 mt-1">
                {isRtl
                  ? "تواصل معنا للاستفسار عن البقع الشاغرة ومواكبة ملفاتكم الاستثمارية."
                  : "Contactez l'administration de la zone pour tout renseignement ou dépôt de dossier d'investissement."}
              </p>
            </div>

            <div className={`flex flex-col lg:flex-row gap-8 ${isRtl ? "lg:flex-row-reverse" : ""}`}>
              {/* Left side: Coordinates */}
              <div className={`w-full lg:w-1/2 flex flex-col gap-6 ${isRtl ? "text-right" : "text-left"}`}>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {isRtl ? "إدارة منطقة سيدي بوعثمان" : "Administration Centrale"}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {isRtl
                      ? "يسعد مكتب استقبال المستثمرين التابع لإقليم الرحامنة ومؤسسة العمران استقبالكم ومواكبتكم في كافة الخطوات الإدارية."
                      : "La Province de Rehamna et le groupe Al Omrane Marrakech mettent à votre disposition un service de guichet unique pour faciliter l'étude de vos dossiers industriels."}
                  </p>
                </div>

                <div className="flex flex-col gap-4 bg-slate-50 p-6 border border-slate-100 rounded-2xl">
                  <div className={`flex items-start gap-3.5 ${isRtl ? "flex-row-reverse" : ""}`}>
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mt-0.5">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-400 block uppercase">
                        {isRtl ? "الجهة المشرفة" : "Organismes tuteurs"}
                      </span>
                      <span className="text-sm font-bold text-gray-800">
                        {isRtl ? "عمالة إقليم الرحامنة & العمران مراكش" : "Province de Rehamna & Groupe Al Omrane"}
                      </span>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3.5 ${isRtl ? "flex-row-reverse" : ""}`}>
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-400 block uppercase">
                        {isRtl ? "العنوان" : "Adresse physique"}
                      </span>
                      <span className="text-sm text-gray-800 leading-relaxed">
                        {isRtl
                          ? "مقر عمالة إقليم الرحامنة، مكتب الاستثمار، بن جرير، المغرب"
                          : "Siège de la Province de Rehamna, Division de l'Investissement, Ben Guerir, Maroc"}
                      </span>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3.5 ${isRtl ? "flex-row-reverse" : ""}`}>
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-400 block uppercase">
                        {isRtl ? "الهاتف" : "Téléphone d'accueil"}
                      </span>
                      <span className="text-sm text-gray-800 font-mono">+212 524 31 62 00</span>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3.5 ${isRtl ? "flex-row-reverse" : ""}`}>
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mt-0.5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-400 block uppercase">
                        {isRtl ? "البريد الإلكتروني" : "E-mail de contact"}
                      </span>
                      <span className="text-sm text-blue-600 font-medium">contact@rehamna-invest.ma</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side: Contact Form */}
              <div className="w-full lg:w-1/2 bg-slate-50 border border-slate-100 rounded-3xl p-6">
                <h3 className={`text-lg font-bold text-gray-900 mb-4 ${isRtl ? "text-right" : ""}`}>
                  {isRtl ? "نموذج الاتصال والاستثمار" : "Formulaire de contact investisseur"}
                </h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const fullName = formData.get("fullName") as string;
                    const company = formData.get("company") as string;
                    const email = formData.get("email") as string;
                    const phone = formData.get("phone") as string;
                    const lotRequested = formData.get("lotRequested") as string;
                    const message = formData.get("message") as string;

                    const newInquiry = {
                      id: Date.now(),
                      name: fullName,
                      company: company || "Individuel",
                      email: email,
                      phone: phone,
                      lotRequested: lotRequested || "Général",
                      message: message,
                      date: new Date().toISOString().split("T")[0],
                      status: "new"
                    };

                    const existing = localStorage.getItem("sidi_bou_othmane_messages");
                    let list = [];
                    if (existing) {
                      try {
                        list = JSON.parse(existing);
                      } catch (err) {}
                    }
                    if (list.length === 0) {
                      list = [
                        {
                          id: 1,
                          name: "Hassan Alami",
                          company: "Souss Agro SARL",
                          email: "h.alami@soussagro.ma",
                          phone: "+212 661 45 90 12",
                          lotRequested: "Lot 82",
                          message: "Nous sommes vivement intéressés par le Lot 82 pour étendre notre unité de conditionnement d'agrumes. Merci de nous envoyer la fiche de prix détaillée.",
                          date: "2026-07-16",
                          status: "new"
                        },
                        {
                          id: 2,
                          name: "Jean-Pierre Laurent",
                          company: "Atlas Logistique",
                          email: "jp.laurent@atlaslog.com",
                          phone: "+33 6 12 34 56 78",
                          lotRequested: "Lot 154",
                          message: "Demande d'information concernant les raccordements en fibre optique et la puissance électrique disponible pour la Tranche II.",
                          date: "2026-07-15",
                          status: "responded"
                        },
                        {
                          id: 3,
                          name: "Laila Bennani",
                          company: "Bennani Chimie",
                          email: "l.bennani@bennanichimie.ma",
                          phone: "+212 522 98 45 31",
                          lotRequested: "Lot 205",
                          message: "Est-il possible de fusionner deux parcelles adjacentes dans la Tranche III pour un projet d'unité industrielle d'emballages biodégradables ?",
                          date: "2026-07-12",
                          status: "new"
                        }
                      ];
                    }
                    handleAddInquiry(newInquiry);

                    alert(
                      isRtl
                        ? "تم إرسال رسالتكم بنجاح! سيقوم فريق الاستثمار بالرد عليكم قريباً."
                        : "Votre message a été envoyé avec succès ! Notre cellule d'investissement vous répondra sous 48h."
                    );
                    (e.target as HTMLFormElement).reset();
                  }}
                  className="flex flex-col gap-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className={`text-xs font-semibold text-gray-500 ${isRtl ? "text-right" : ""}`}>
                        {isRtl ? "الاسم الكامل" : "Nom complet"} *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        className={`w-full bg-white border border-gray-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isRtl ? "text-right" : ""
                        }`}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className={`text-xs font-semibold text-gray-500 ${isRtl ? "text-right" : ""}`}>
                        {isRtl ? "الشركة" : "Entreprise / Société"}
                      </label>
                      <input
                        type="text"
                        name="company"
                        className={`w-full bg-white border border-gray-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isRtl ? "text-right" : ""
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className={`text-xs font-semibold text-gray-500 ${isRtl ? "text-right" : ""}`}>
                        {isRtl ? "البريد الإلكتروني" : "E-mail"} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className={`w-full bg-white border border-gray-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isRtl ? "text-right" : ""
                        }`}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className={`text-xs font-semibold text-gray-500 ${isRtl ? "text-right" : ""}`}>
                        {isRtl ? "الهاتف" : "Téléphone"} *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        className={`w-full bg-white border border-gray-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isRtl ? "text-right" : ""
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className={`text-xs font-semibold text-gray-500 ${isRtl ? "text-right" : ""}`}>
                      {isRtl ? "البقعة المطلوبة أو الاستفسار" : "Numéro de Lot ou Détail d'Inintérêt"}
                    </label>
                    <input
                      type="text"
                      name="lotRequested"
                      placeholder="Ex: Lot 154"
                      className={`w-full bg-white border border-gray-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isRtl ? "text-right" : ""
                      }`}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className={`text-xs font-semibold text-gray-500 ${isRtl ? "text-right" : ""}`}>
                      {isRtl ? "الرسالة" : "Message"} *
                    </label>
                    <textarea
                      required
                      name="message"
                      rows={4}
                      className={`w-full bg-white border border-gray-200 rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isRtl ? "text-right" : ""
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                  >
                    {isRtl ? "إرسال رسالة الاستفسار" : "Envoyer ma demande d'information"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. Sliding Panel Drawer for Selected Lot */}
      {selectedLot && (
        <Drawer
          language={language}
          lot={selectedLot}
          onClose={() => setSelectedLot(null)}
        />
      )}

      {/* 4. Footer */}
      <Footer language={language} />
    </div>
  );
}
