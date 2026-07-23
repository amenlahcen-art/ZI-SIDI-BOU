import React, { useState, useMemo, useEffect } from "react";
import {
  LayoutDashboard,
  Boxes,
  Building,
  Mail,
  Image as ImageIcon,
  Settings as SettingsIcon,
  Search,
  Edit,
  Save,
  X,
  Check,
  Phone,
  Globe,
  MapPin,
  Menu,
  Building2,
  AlertCircle,
  LogOut,
  Plus,
  Trash2,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Newspaper,
  Calendar,
  Eye,
  EyeOff,
  Download,
  FileText,
  Facebook,
  Instagram,
  Linkedin,
  MessageSquare,
  Users,
  UserCheck
} from "lucide-react";
import { Lot, LotStatus, Language } from "../types";
import { translations } from "../data/translations";
import { NewsArticle } from "./NewsSection";
import { ZoneEvent } from "./EventsSection";

interface AdminDashboardProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  lots: Lot[];
  onUpdateLots: (updatedLots: Lot[]) => void;
  onCloseAdmin: () => void;
  news: NewsArticle[];
  onUpdateNews: (updatedNews: NewsArticle[]) => void;
  events: ZoneEvent[];
  onUpdateEvents: (updatedEvents: ZoneEvent[]) => void;
  inquiries: any[];
  onUpdateInquiries: (updatedInquiries: any[]) => void;
  settings: any;
  onUpdateSettings: (updatedSettings: any) => void;
  currentUser: any;
  onLogout: () => void;
}

export default function AdminDashboard({
  language,
  setLanguage,
  lots,
  onUpdateLots,
  onCloseAdmin,
  news,
  onUpdateNews,
  events,
  onUpdateEvents,
  inquiries,
  onUpdateInquiries,
  settings,
  onUpdateSettings,
  currentUser,
  onLogout
}: AdminDashboardProps) {
  const t = translations[language];
  const isRtl = language === "AR";

  // Role capability indicators
const isSuperAdmin = currentUser?.role === "Super Admin";
const isAdmin = currentUser?.role === "Admin";
const isEditor = currentUser?.role === "Editor";
const isViewer = currentUser?.role === "Viewer";

const canEditEverything = isSuperAdmin || isAdmin;
const canEditNewsAndEvents = isSuperAdmin || isAdmin || isEditor;

  // Sidebar navigation tab: "dashboard" | "lots" | "companies" | "news" | "events" | "contacts" | "gallery" | "settings"
  const [adminTab, setAdminTab] = useState<string>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Search and Filter states for Lots / Companies
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [companySearch, setCompanySearch] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterTranche, setFilterTranche] = useState<string>("all");

  // Notifications
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // --- LOTS FORM STATE ---
  const [editingLot, setEditingLot] = useState<Lot | null>(null);
  const [lotStatus, setLotStatus] = useState<LotStatus>(LotStatus.AVAILABLE);
  const [lotSector, setLotSector] = useState<string>("");
  const [lotSurface, setLotSurface] = useState<number>(1000);
  const [lotRoad, setLotRoad] = useState<string>("");
  const [lotSituation, setLotSituation] = useState<"Angle" | "Standard" | "Double Façade">("Standard");
  const [lotLat, setLotLat] = useState<number>(31.905);
  const [lotLng, setLotLng] = useState<number>(-7.955);

  // --- COMPANIES FORM STATE ---
  const [editingCompanyLot, setEditingCompanyLot] = useState<Lot | null>(null);
  const [isAddingNewCompany, setIsAddingNewCompany] = useState<boolean>(false);
  const [companyLotNum, setCompanyLotNum] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [companyActivity, setCompanyActivity] = useState<string>("");
  const [companySector, setCompanySector] = useState<string>("");
  const [companyDesc, setCompanyDesc] = useState<string>("");
  const [companyServices, setCompanyServices] = useState<string>(""); // comma-separated
  const [companyLogoText, setCompanyLogoText] = useState<string>("");
  const [companyPhone, setCompanyPhone] = useState<string>("");
  const [companyEmail, setCompanyEmail] = useState<string>("");
  const [companyWebsite, setCompanyWebsite] = useState<string>("");
  const [companyFacebook, setCompanyFacebook] = useState<string>("");
  const [companyInstagram, setCompanyInstagram] = useState<string>("");
  const [companyLinkedin, setCompanyLinkedin] = useState<string>("");
  const [companyWhatsapp, setCompanyWhatsapp] = useState<string>("");
  const [companyPdf, setCompanyPdf] = useState<string>("");
  const [companyGallery, setCompanyGallery] = useState<string>(""); // comma-separated
  const [companyLat, setCompanyLat] = useState<number>(31.905);
  const [companyLng, setCompanyLng] = useState<number>(-7.955);

  // --- NEWS FORM STATE ---
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [isAddingNews, setIsAddingNews] = useState<boolean>(false);
  const [newsTitleFR, setNewsTitleFR] = useState("");
  const [newsTitleAR, setNewsTitleAR] = useState("");
  const [newsTitleEN, setNewsTitleEN] = useState("");
  const [newsDate, setNewsDate] = useState("");
  const [newsImage, setNewsImage] = useState("");
  const [newsSummaryFR, setNewsSummaryFR] = useState("");
  const [newsSummaryAR, setNewsSummaryAR] = useState("");
  const [newsSummaryEN, setNewsSummaryEN] = useState("");
  const [newsContentFR, setNewsContentFR] = useState("");
  const [newsContentAR, setNewsContentAR] = useState("");
  const [newsContentEN, setNewsContentEN] = useState("");
  const [newsCategoryFR, setNewsCategoryFR] = useState("");
  const [newsCategoryAR, setNewsCategoryAR] = useState("");
  const [newsCategoryEN, setNewsCategoryEN] = useState("");
  const [newsPublished, setNewsPublished] = useState(true);

  // --- EVENTS FORM STATE ---
  const [editingEvent, setEditingEvent] = useState<ZoneEvent | null>(null);
  const [isAddingEvent, setIsAddingEvent] = useState<boolean>(false);
  const [eventTitleFR, setEventTitleFR] = useState("");
  const [eventTitleAR, setEventTitleAR] = useState("");
  const [eventTitleEN, setEventTitleEN] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocFR, setEventLocFR] = useState("");
  const [eventLocAR, setEventLocAR] = useState("");
  const [eventLocEN, setEventLocEN] = useState("");
  const [eventDescFR, setEventDescFR] = useState("");
  const [eventDescAR, setEventDescAR] = useState("");
  const [eventDescEN, setEventDescEN] = useState("");
  const [eventImage, setEventImage] = useState("");

  // --- SETTINGS LOCAL FORM STATE ---
  const [siteTitle, setSiteTitle] = useState(settings.title || "");
  const [siteLogoText, setSiteLogoText] = useState(settings.logoText || "");
  const [contactEmail, setContactEmail] = useState(settings.email || "");
  const [contactPhone, setContactPhone] = useState(settings.phone || "");
  const [contactAddress, setContactAddress] = useState(settings.address || "");
  const [heroTitleFR, setHeroTitleFR] = useState(settings.heroTitleFR || "");
  const [heroTitleAR, setHeroTitleAR] = useState(settings.heroTitleAR || "");
  const [heroTitleEN, setHeroTitleEN] = useState(settings.heroTitleEN || "");
  const [heroSubFR, setHeroSubFR] = useState(settings.heroSubtitleFR || "");
  const [heroSubAR, setHeroSubAR] = useState(settings.heroSubtitleAR || "");
  const [heroSubEN, setHeroSubEN] = useState(settings.heroSubtitleEN || "");
  const [bannerImg, setBannerImg] = useState(settings.bannerImage || "");
  const [copyrightText, setCopyrightText] = useState(settings.footerCopyright || "");

  // --- GALLERY STATE ---
  const [galleryImages, setGalleryImages] = useState<string[]>(() => {
    // Unique list of images extracted from lots
    const urls = new Set<string>();
    lots.forEach((l) => {
      if (l.gallery) l.gallery.forEach((g) => urls.add(g));
    });
    // Add default placeholders if none
    if (urls.size === 0) {
      return [
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1540515436402-5c669141e531?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=400"
      ];
    }
    return Array.from(urls);
  });
  const [newGalleryUrl, setNewGalleryUrl] = useState("");

  // --- USERS MANAGEMENT STATE ---
  const [usersList, setUsersList] = useState<any[]>(() => {
    const saved = localStorage.getItem("sidi_bou_othmane_users");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [
      {
        email: "superadmin@industry.gov.ma",
        password: "superadmin_sbo",
        name: "Mourad El Alami",
        role: "Super Admin",
        title: "Directeur National des Zones Industrielles",
        avatarColor: "bg-indigo-650"
      },
      {
        email: "admin@industry.gov.ma",
        password: "admin_sbo",
        name: "Fatima-Zahra Bennani",
        role: "Admin",
        title: "Directrice d'Aménagement Régional",
        avatarColor: "bg-blue-600"
      },
      {
        email: "editor@industry.gov.ma",
        password: "editor_sbo",
        name: "Youssef Benjelloun",
        role: "Editor",
        title: "Chargé d'Information et Communication",
        avatarColor: "bg-emerald-600"
      },
      {
        email: "viewer@industry.gov.ma",
        password: "viewer_sbo",
        name: "Anas Bouaza",
        role: "Viewer",
        title: "Auditeur & Inspecteur Technique",
        avatarColor: "bg-slate-600"
      }
    ];
  });

  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("Editor");
  const [userTitle, setUserTitle] = useState<string>("");
  const [userAvatarColor, setUserAvatarColor] = useState<string>("bg-indigo-600");

  // Dismiss notification auto
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Compute stats
  const stats = useMemo(() => {
    const total = lots.length;
    let available = 0;
    let occupied = 0;
    let reserved = 0;
    let underConstruction = 0;
    let equipment = 0;
    let totalSurface = 0;

    lots.forEach((l) => {
      totalSurface += l.surface;
      if (l.status === LotStatus.AVAILABLE) available++;
      else if (l.status === LotStatus.OCCUPIED) occupied++;
      else if (l.status === LotStatus.RESERVED) reserved++;
      else if (l.status === LotStatus.UNDER_CONSTRUCTION) underConstruction++;
      else if (l.status === LotStatus.EQUIPMENT) equipment++;
    });

    const activeInquiries = inquiries.filter((i) => i.status === "new").length;

    return {
      total,
      available,
      occupied,
      reserved,
      underConstruction,
      equipment,
      totalSurface,
      activeInquiries
    };
  }, [lots, inquiries]);

  // Filters for Lots
  const filteredLots = useMemo(() => {
    return lots.filter((lot) => {
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const matchesNum = lot.number.toLowerCase().includes(query);
        const matchesCompany = lot.companyName?.toLowerCase().includes(query) || false;
        const matchesSector = lot.sector?.toLowerCase().includes(query) || false;
        if (!matchesNum && !matchesCompany && !matchesSector) return false;
      }
      if (filterStatus !== "all" && lot.status !== filterStatus) return false;
      if (filterTranche !== "all" && lot.tranche !== filterTranche) return false;
      return true;
    });
  }, [lots, searchQuery, filterStatus, filterTranche]);

  // Filter occupied lots (companies list)
  const companyLots = useMemo(() => {
    return lots.filter((l) => l.companyName);
  }, [lots]);

const filteredCompanyLots = useMemo(() => {
  if (!companySearch.trim()) return companyLots;

  const query = companySearch.toLowerCase().trim();

  return companyLots.filter(
    (l) =>
      l.companyName?.toLowerCase().includes(query) ||
      l.number.includes(query) ||
      l.sector?.toLowerCase().includes(query)
  );
}, [companyLots, companySearch]);

  // --- ACTIONS ---

  // Edit Lot
  const handleEditLotClick = (lot: Lot) => {
    setEditingLot(lot);
    setLotStatus(lot.status);
    setLotSector(lot.sector || "");
    setLotSurface(lot.surface);
    setLotRoad(lot.road);
    setLotSituation(lot.situation);
    setLotLat(lot.lat);
    setLotLng(lot.lng);
  };

  const handleSaveLot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLot) return;

    const updated = lots.map((l) => {
      if (l.id === editingLot.id) {
        return {
          ...l,
          status: lotStatus,
          sector: lotSector,
          surface: lotSurface,
          road: lotRoad,
          situation: lotSituation,
          lat: lotLat,
          lng: lotLng
        };
      }
      return l;
    });

    onUpdateLots(updated);
    setEditingLot(null);
    setNotification({ type: "success", text: isRtl ? "تم حفظ التعديلات بنجاح" : "Modifications enregistrées avec succès" });
  };

  // Companies Management CRUD
  const handleEditCompanyClick = (lot: Lot) => {
    setEditingCompanyLot(lot);
    setIsAddingNewCompany(false);
    setCompanyName(lot.companyName || "");
    setCompanyActivity(lot.activity || "");
    setCompanySector(lot.sector || "");
    setCompanyDesc(lot.description || "");
    setCompanyServices(lot.services ? lot.services.join(", ") : "");
    setCompanyLogoText(lot.logoText || "");
    setCompanyPhone(lot.contact?.phone || "");
    setCompanyEmail(lot.contact?.email || "");
    setCompanyWebsite(lot.contact?.website || "");
    setCompanyFacebook((lot as any).social?.facebook || "");
    setCompanyInstagram((lot as any).social?.instagram || "");
    setCompanyLinkedin((lot as any).social?.linkedin || "");
    setCompanyWhatsapp((lot as any).social?.whatsapp || "");
    setCompanyPdf((lot as any).pdfCatalogue || "");
    setCompanyGallery(lot.gallery ? lot.gallery.join(", ") : "");
    setCompanyLat(lot.lat || 31.905);
    setCompanyLng(lot.lng || -7.955);
  };

  const handleNewCompanyClick = () => {
    setEditingCompanyLot(null);
    setIsAddingNewCompany(true);
    setCompanyLotNum("");
    setCompanyName("");
    setCompanyActivity("");
    setCompanySector("");
    setCompanyDesc("");
    setCompanyServices("");
    setCompanyLogoText("");
    setCompanyPhone("");
    setCompanyEmail("");
    setCompanyWebsite("");
    setCompanyFacebook("");
    setCompanyInstagram("");
    setCompanyLinkedin("");
    setCompanyWhatsapp("");
    setCompanyPdf("");
    setCompanyGallery("");
    setCompanyLat(31.905);
    setCompanyLng(-7.955);
  };

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();

    if (isAddingNewCompany) {
      // Find the lot to assign
      const targetLot = lots.find((l) => l.number === companyLotNum.trim());
      if (!targetLot) {
        alert(isRtl ? "البقعة المحددة غير موجودة" : "Le numéro de lot spécifié n'existe pas");
        return;
      }

      const updated = lots.map((l) => {
        if (l.id === targetLot.id) {
          return {
            ...l,
            status: LotStatus.OCCUPIED,
            companyName,
            activity: companyActivity,
            sector: companySector,
            description: companyDesc,
            services: companyServices ? companyServices.split(",").map((s) => s.trim()) : [],
            logoText: companyLogoText || companyName.substring(0, 2).toUpperCase(),
            gallery: companyGallery ? companyGallery.split(",").map((g) => g.trim()) : [],
            pdfCatalogue: companyPdf,
            lat: companyLat,
            lng: companyLng,
            contact: {
              phone: companyPhone,
              email: companyEmail,
              website: companyWebsite
            },
            social: {
              facebook: companyFacebook,
              instagram: companyInstagram,
              linkedin: companyLinkedin,
              whatsapp: companyWhatsapp
            }
          } as Lot;
        }
        return l;
      });

      onUpdateLots(updated);
      setIsAddingNewCompany(false);
    } else if (editingCompanyLot) {
      const updated = lots.map((l) => {
        if (l.id === editingCompanyLot.id) {
          return {
            ...l,
            companyName,
            activity: companyActivity,
            sector: companySector,
            description: companyDesc,
            services: companyServices ? companyServices.split(",").map((s) => s.trim()) : [],
            logoText: companyLogoText,
            gallery: companyGallery ? companyGallery.split(",").map((g) => g.trim()) : [],
            pdfCatalogue: companyPdf,
            lat: companyLat,
            lng: companyLng,
            contact: {
              phone: companyPhone,
              email: companyEmail,
              website: companyWebsite
            },
            social: {
              facebook: companyFacebook,
              instagram: companyInstagram,
              linkedin: companyLinkedin,
              whatsapp: companyWhatsapp
            }
          } as any;
        }
        return l;
      });

      onUpdateLots(updated);
      setEditingCompanyLot(null);
    }

    setNotification({ type: "success", text: isRtl ? "تم حفظ ملف الشركة" : "Fiche d'entreprise enregistrée" });
  };

  const handleDeleteCompany = (lotId: number) => {
    if (!confirm(isRtl ? "هل تريد إزالة الشركة من هذه البقعة؟" : "Voulez-vous détacher la société de cette parcelle ?")) return;

    const updated = lots.map((l) => {
      if (l.id === lotId) {
        return {
          ...l,
          status: LotStatus.AVAILABLE,
          companyName: undefined,
          activity: undefined,
          description: undefined,
          services: undefined,
          logoText: undefined,
          contact: undefined,
          social: undefined,
          pdfCatalogue: undefined,
          gallery: undefined
        };
      }
      return l;
    });

    onUpdateLots(updated);
    setNotification({ type: "success", text: isRtl ? "تمت إزالة الشركة بنجاح" : "Entreprise dissociée avec succès" });
  };

  // --- USERS CRUD ---
  const handleEditUserClick = (u: any) => {
    setEditingUser(u);
    setIsAddingUser(false);
    setUserEmail(u.email);
    setUserPassword(u.password);
    setUserName(u.name);
    setUserRole(u.role);
    setUserTitle(u.title || "");
    setUserAvatarColor(u.avatarColor || "bg-indigo-600");
  };

  const handleNewUserClick = () => {
    setEditingUser(null);
    setIsAddingUser(true);
    setUserEmail("");
    setUserPassword("");
    setUserName("");
    setUserRole("Editor");
    setUserTitle("");
    const colors = ["bg-indigo-650", "bg-blue-600", "bg-emerald-600", "bg-slate-600", "bg-amber-600", "bg-purple-600"];
    setUserAvatarColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail || !userPassword) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    let updatedList = [...usersList];
    if (isAddingUser) {
      // Check for duplication
      if (usersList.some((u) => u.email.toLowerCase().trim() === userEmail.toLowerCase().trim())) {
        alert("Un utilisateur avec cette adresse e-mail existe déjà.");
        return;
      }
      const newUser = {
        email: userEmail.toLowerCase().trim(),
        password: userPassword,
        name: userName,
        role: userRole,
        title: userTitle,
        avatarColor: userAvatarColor
      };
      updatedList.push(newUser);
      setIsAddingUser(false);
    } else if (editingUser) {
      updatedList = usersList.map((u) => {
        if (u.email === editingUser.email) {
          return {
            ...u,
            password: userPassword,
            name: userName,
            role: userRole,
            title: userTitle,
            avatarColor: userAvatarColor
          };
        }
        return u;
      });
      setEditingUser(null);
    }

    setUsersList(updatedList);
    localStorage.setItem("sidi_bou_othmane_users", JSON.stringify(updatedList));
    setNotification({ type: "success", text: isRtl ? "تم حفظ المستخدم" : "Utilisateur enregistré avec succès" });
  };

  const handleDeleteUser = (email: string) => {
    if (email === currentUser.email) {
      alert(isRtl ? "لا يمكنك حذف حسابك الحالي" : "Vous ne pouvez pas supprimer votre propre compte.");
      return;
    }
    if (!confirm(isRtl ? "هل أنت متأكد من حذف هذا المستخدم؟" : "Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return;

    const updatedList = usersList.filter((u) => u.email !== email);
    setUsersList(updatedList);
    localStorage.setItem("sidi_bou_othmane_users", JSON.stringify(updatedList));
    setNotification({ type: "success", text: isRtl ? "تم حذف المستخدم بنجاح" : "Utilisateur supprimé avec succès" });
  };

  // News CRUD
  const handleEditNewsClick = (article: NewsArticle) => {
    setEditingNews(article);
    setIsAddingNews(false);
    setNewsTitleFR(article.titleFR);
    setNewsTitleAR(article.titleAR);
    setNewsTitleEN(article.titleEN);
    setNewsDate(article.date);
    setNewsImage(article.image);
    setNewsSummaryFR(article.summaryFR);
    setNewsSummaryAR(article.summaryAR);
    setNewsSummaryEN(article.summaryEN);
    setNewsContentFR(article.contentFR);
    setNewsContentAR(article.contentAR);
    setNewsContentEN(article.contentEN);
    setNewsCategoryFR(article.categoryFR);
    setNewsCategoryAR(article.categoryAR);
    setNewsCategoryEN(article.categoryEN);
    setNewsPublished(article.published);
  };

  const handleNewNewsClick = () => {
    setEditingNews(null);
    setIsAddingNews(true);
    setNewsTitleFR("");
    setNewsTitleAR("");
    setNewsTitleEN("");
    setNewsDate(new Date().toISOString().split("T")[0]);
    setNewsImage("https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600");
    setNewsSummaryFR("");
    setNewsSummaryAR("");
    setNewsSummaryEN("");
    setNewsContentFR("");
    setNewsContentAR("");
    setNewsContentEN("");
    setNewsCategoryFR("Infrastructure");
    setNewsCategoryAR("البنية التحتية");
    setNewsCategoryEN("Infrastructure");
    setNewsPublished(true);
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();

    if (isAddingNews) {
      const newArt: NewsArticle = {
        id: Date.now(),
        titleFR: newsTitleFR,
        titleAR: newsTitleAR,
        titleEN: newsTitleEN,
        date: newsDate,
        image: newsImage,
        summaryFR: newsSummaryFR,
        summaryAR: newsSummaryAR,
        summaryEN: newsSummaryEN,
        contentFR: newsContentFR,
        contentAR: newsContentAR,
        contentEN: newsContentEN,
        categoryFR: newsCategoryFR,
        categoryAR: newsCategoryAR,
        categoryEN: newsCategoryEN,
        published: newsPublished
      };
      onUpdateNews([newArt, ...news]);
      setIsAddingNews(false);
    } else if (editingNews) {
      const updated = news.map((item) => {
        if (item.id === editingNews.id) {
          return {
            ...item,
            titleFR: newsTitleFR,
            titleAR: newsTitleAR,
            titleEN: newsTitleEN,
            date: newsDate,
            image: newsImage,
            summaryFR: newsSummaryFR,
            summaryAR: newsSummaryAR,
            summaryEN: newsSummaryEN,
            contentFR: newsContentFR,
            contentAR: newsContentAR,
            contentEN: newsContentEN,
            categoryFR: newsCategoryFR,
            categoryAR: newsCategoryAR,
            categoryEN: newsCategoryEN,
            published: newsPublished
          };
        }
        return item;
      });
      onUpdateNews(updated);
      setEditingNews(null);
    }

    setNotification({ type: "success", text: isRtl ? "تم حفظ المقال بنجاح" : "Actualité enregistrée avec succès" });
  };

  const handleDeleteNews = (id: number) => {
    if (!confirm(isRtl ? "هل تريد حذف هذا المقال؟" : "Supprimer cet article ?")) return;
    onUpdateNews(news.filter((item) => item.id !== id));
  };

  // Events CRUD
  const handleEditEventClick = (ev: ZoneEvent) => {
    setEditingEvent(ev);
    setIsAddingEvent(false);
    setEventTitleFR(ev.titleFR);
    setEventTitleAR(ev.titleAR);
    setEventTitleEN(ev.titleEN);
    setEventDate(ev.date);
    setEventTime(ev.time);
    setEventLocFR(ev.locationFR);
    setEventLocAR(ev.locationAR);
    setEventLocEN(ev.locationEN);
    setEventDescFR(ev.descriptionFR);
    setEventDescAR(ev.descriptionAR);
    setEventDescEN(ev.descriptionEN);
    setEventImage(ev.image);
  };

  const handleNewEventClick = () => {
    setEditingEvent(null);
    setIsAddingEvent(true);
    setEventTitleFR("");
    setEventTitleAR("");
    setEventTitleEN("");
    setEventDate(new Date().toISOString().split("T")[0]);
    setEventTime("09:00");
    setEventLocFR("");
    setEventLocAR("");
    setEventLocEN("");
    setEventDescFR("");
    setEventDescAR("");
    setEventDescEN("");
    setEventImage("https://images.unsplash.com/photo-1540515436402-5c669141e531?auto=format&fit=crop&q=80&w=600");
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();

    if (isAddingEvent) {
      const newEv: ZoneEvent = {
        id: Date.now(),
        titleFR: eventTitleFR,
        titleAR: eventTitleAR,
        titleEN: eventTitleEN,
        date: eventDate,
        time: eventTime,
        locationFR: eventLocFR,
        locationAR: eventLocAR,
        locationEN: eventLocEN,
        descriptionFR: eventDescFR,
        descriptionAR: eventDescAR,
        descriptionEN: eventDescEN,
        image: eventImage
      };
      onUpdateEvents([newEv, ...events]);
      setIsAddingEvent(false);
    } else if (editingEvent) {
      const updated = events.map((item) => {
        if (item.id === editingEvent.id) {
          return {
            ...item,
            titleFR: eventTitleFR,
            titleAR: eventTitleAR,
            titleEN: eventTitleEN,
            date: eventDate,
            time: eventTime,
            locationFR: eventLocFR,
            locationAR: eventLocAR,
            locationEN: eventLocEN,
            descriptionFR: eventDescFR,
            descriptionAR: eventDescAR,
            descriptionEN: eventDescEN,
            image: eventImage
          };
        }
        return item;
      });
      onUpdateEvents(updated);
      setEditingEvent(null);
    }

    setNotification({ type: "success", text: isRtl ? "تم حفظ الفعالية بنجاح" : "Événement enregistré avec succès" });
  };

  const handleDeleteEvent = (id: number) => {
    if (!confirm(isRtl ? "هل تريد حذف هذه الفعالية؟" : "Supprimer cet événement ?")) return;
    onUpdateEvents(events.filter((item) => item.id !== id));
  };

  // Contacts / Inquiries Status Update
  const handleInquiryStatusChange = (id: string, newStatus: string) => {
    const updated = inquiries.map((inq) => {
      if (inq.id === id) {
        return { ...inq, status: newStatus };
      }
      return inq;
    });
    onUpdateInquiries(updated);
    setNotification({ type: "success", text: isRtl ? "تم تحديث حالة الطلب" : "Statut mis à jour" });
  };

  const handleDeleteInquiry = (id: string) => {
    if (!confirm(isRtl ? "هل تريد حذف هذا الطلب؟" : "Supprimer cette demande ?")) return;
    onUpdateInquiries(inquiries.filter((inq) => inq.id !== id));
  };

  // Export CSV
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Investor Name,Company,Email,Phone,Lot,Message,Date,Status\n";

    inquiries.forEach((inq) => {
      const row = [
        inq.id,
        `"${(inq.investorName || inq.name || "").replace(/"/g, '""')}"`,
        `"${(inq.companyName || inq.company || "").replace(/"/g, '""')}"`,
        inq.email,
        inq.phone,
        inq.lotRequested || inq.lot,
        `"${(inq.description || inq.message || "").replace(/\n/g, " ").replace(/"/g, '""')}"`,
        inq.date,
        inq.status
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SBO_Inquiries_Export_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Settings Save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...settings,
      title: siteTitle,
      logoText: siteLogoText,
      email: contactEmail,
      phone: contactPhone,
      address: contactAddress,
      heroTitleFR,
      heroTitleAR,
      heroTitleEN,
      heroSubtitleFR: heroSubFR,
      heroSubtitleAR: heroSubAR,
      heroSubtitleEN: heroSubEN,
      bannerImage: bannerImg,
      footerCopyright: copyrightText
    };
    onUpdateSettings(updated);
    setNotification({ type: "success", text: isRtl ? "تم حفظ الإعدادات بنجاح" : "Paramètres sauvegardés" });
  };

  // Add Gallery image
  const handleAddGalleryImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryUrl.trim()) return;
    setGalleryImages([newGalleryUrl.trim(), ...galleryImages]);
    setNewGalleryUrl("");
    setNotification({ type: "success", text: isRtl ? "تمت إضافة الصورة لمعرضك" : "Image ajoutée au portfolio global" });
  };

  const handleDeleteGalleryImage = (url: string) => {
    setGalleryImages(galleryImages.filter((i) => i !== url));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans" dir={isRtl ? "rtl" : "ltr"}>
      {/* 1. Left Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col justify-between shrink-0 border-r border-slate-850">
        <div className="flex flex-col">
          {/* Admin Header */}
          <div className="p-5 bg-slate-950 border-b border-slate-850 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-blue-500 rounded-lg text-white">
                <Boxes className="w-5 h-5 animate-pulse" />
              </span>
              <div className="text-left">
                <span className="font-extrabold text-sm block tracking-wider uppercase">Sidi Bou Othmane</span>
                <span className="text-[10px] text-blue-400 font-semibold uppercase">{isRtl ? "بوابة التحكم" : "Espace Admin"}</span>
              </div>
            </div>
            {/* Mobile menu triggers */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 bg-slate-800 text-white rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Card */}
          <div className="mx-4 my-3 p-3 bg-slate-950/60 border border-slate-850 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${currentUser.avatarColor || "bg-indigo-600"} text-white font-black flex items-center justify-center text-xs shrink-0 border border-white/15`}>
                {currentUser.name ? currentUser.name.split(" ").map((n: string) => n[0]).join("").toUpperCase() : "AD"}
              </div>
              <div className="text-left flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-100 truncate">{currentUser.name}</h4>
                <p className="text-[9px] text-slate-400 truncate">{currentUser.title}</p>
              </div>
            </div>
            {/* Custom Role Badge with color coding */}
            <div className="flex items-center justify-between mt-1">
              <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase border ${
                currentUser.role === "Super Admin" ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" :
                currentUser.role === "Admin" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                currentUser.role === "Editor" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                "bg-slate-500/10 text-slate-400 border-slate-500/20"
              }`}>
                {currentUser.role}
              </span>
              <button
                onClick={onLogout}
                title={isRtl ? "تسجيل الخروج" : "Déconnexion"}
                className="text-slate-500 hover:text-red-400 transition-colors p-1 hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Nav Items */}
          <nav className={`p-4 flex flex-col gap-1.5 ${mobileMenuOpen ? "flex" : "hidden md:flex"}`}>
            {/* Dashboard */}
            <button
              onClick={() => { setAdminTab("dashboard"); setMobileMenuOpen(false); }}
              className={`flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                adminTab === "dashboard" ? "bg-blue-600 text-white shadow-md shadow-blue-500/10" : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>{isRtl ? "لوحة المراقبة" : "Tableau de Bord"}</span>
            </button>

            {/* Lots */}
            <button
              onClick={() => { setAdminTab("lots"); setMobileMenuOpen(false); }}
              className={`flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                adminTab === "lots" ? "bg-blue-600 text-white shadow-md shadow-blue-500/10" : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Boxes className="w-4 h-4 shrink-0" />
              <span>{isRtl ? "إدارة البقع العقارية" : "Plan Cadastral (Lots)"}</span>
            </button>

            {/* Map Editor */}
            <button
              onClick={() => { setAdminTab("mapeditor"); setMobileMenuOpen(false); }}
              className={`flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                adminTab === "mapeditor"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Cartographie des Lots</span>
            </button>
            {/* Companies */}
            <button
              onClick={() => { setAdminTab("companies"); setMobileMenuOpen(false); }}
              className={`flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                adminTab === "companies" ? "bg-blue-600 text-white shadow-md shadow-blue-500/10" : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Building2 className="w-4 h-4 shrink-0" />
              <span>{isRtl ? "إدارة الشركات المستقرة" : "Fiches Entreprises"}</span>
            </button>

            {/* News */}
            {canEditNewsAndEvents && (
  <button
    onClick={() => {
      setAdminTab("news");
      setMobileMenuOpen(false);
    }}
    className={`flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
      adminTab === "news"
        ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
        : "text-slate-400 hover:text-white hover:bg-slate-800"
    }`}
  >
    <Newspaper className="w-4 h-4 shrink-0" />
    <span>{isRtl ? "إدارة الأخبار" : "Gestion de l'actualité"}</span>
  </button>
)}

            {/* Events */}
            <button
              onClick={() => { setAdminTab("events"); setMobileMenuOpen(false); }}
              className={`flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                adminTab === "events" ? "bg-blue-600 text-white shadow-md shadow-blue-500/10" : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{isRtl ? "إدارة الفعاليات والملتقيات" : "Agenda & Forums"}</span>
            </button>

            {/* Contacts / Inbox */}
            {canEditNewsAndEvents && (
  <button
    onClick={() => {
      setAdminTab("contacts");
      setMobileMenuOpen(false);
    }}
    className={`flex items-center justify-between py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
      adminTab === "contacts"
        ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
        : "text-slate-400 hover:text-white hover:bg-slate-800"
    }`}
  >
    <div className="flex items-center gap-3">
      <Mail className="w-4 h-4 shrink-0" />
      <span>{isRtl ? "طلبات الاستثمار الواردة" : "Demandes reçues"}</span>
    </div>

    {stats.activeInquiries > 0 && (
      <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce">
        {stats.activeInquiries}
      </span>
    )}
  </button>
)}

            {/* Gallery */}
            <button
              onClick={() => { setAdminTab("gallery"); setMobileMenuOpen(false); }}
              className={`flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                adminTab === "gallery" ? "bg-blue-600 text-white shadow-md shadow-blue-500/10" : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <ImageIcon className="w-4 h-4 shrink-0" />
              <span>{isRtl ? "معرض الصور والوسائط" : "Galerie Média"}</span>
            </button>

            {/* Settings (Super Admin only) */}
{isSuperAdmin && (
  <button
    onClick={() => {
      setAdminTab("settings");
      setMobileMenuOpen(false);
    }}
    className={`flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
      adminTab === "settings"
        ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
        : "text-slate-400 hover:text-white hover:bg-slate-800"
    }`}
  >
    <SettingsIcon className="w-4 h-4 shrink-0" />
    <span>{isRtl ? "إعدادات المنصة العامة" : "Configuration Générale"}</span>
  </button>
)}

{/* Users & Roles (Super Admin only) */}
{isSuperAdmin && (
  <button
    onClick={() => {
      setAdminTab("users");
      setMobileMenuOpen(false);
    }}
    className={`flex items-center gap-3 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
      adminTab === "users"
        ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
        : "text-slate-400 hover:text-white hover:bg-slate-800"
    }`}
  >
    <Users className="w-4 h-4 shrink-0" />
    <span>{isRtl ? "إدارة المستخدمين والأدوار" : "Habilitations & Rôles"}</span>
  </button>
)}

          </nav>
        </div>

        {/* Quit admin session */}
        <div className="p-4 border-t border-slate-850 flex flex-col gap-2">
          {/* Trilingual Buttons inside Admin */}
          <div className="flex bg-slate-800 p-0.5 rounded-lg">
            {["FR", "EN", "AR"].map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l as any)}
                className={`flex-1 text-[10px] font-bold py-1 rounded transition-all cursor-pointer ${
                  language === l ? "bg-slate-900 text-white shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            onClick={onCloseAdmin}
            className="w-full bg-red-650 hover:bg-red-700 text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-red-900/10"
          >
            <LogOut className="w-4 h-4" />
            <span>{isRtl ? "خروج للموقع العام" : "Quitter l'Admin"}</span>
          </button>
        </div>
      </aside>

      {/* 2. Top Navigation and Content panel */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-150 h-16 shrink-0 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-50 border border-slate-150 px-2.5 py-1 rounded-md">
              {adminTab}
            </span>
          </div>

          {/* Quick Notification banners */}
          {notification && (
            <div className={`text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm ${
              notification.type === "success" ? "bg-emerald-50 border border-emerald-200 text-emerald-800" : "bg-red-50 border border-red-200 text-red-800"
            }`}>
              {notification.text}
            </div>
          )}

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 font-medium">Platform Build v2.1.0</span>
          </div>
        </header>

        {/* Scrollable Workspaces */}
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl mx-auto w-full flex flex-col gap-6 bg-slate-50">
          
          {/* TAB: DASHBOARD OVERVIEW */}
          {adminTab === "dashboard" && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div className={isRtl ? "text-right" : "text-left"}>
                <h2 className="text-2xl font-black text-slate-900">
                  {isRtl ? "لوحة المراقبة والأرقام الرئيسية" : "Tableau de Bord de Performance"}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {isRtl
                    ? "مؤشرات العقار الصناعي، نسب استغلال البقع وتوزيع الأنشطة."
                    : "Analyse en temps réel de l'attribution cadastrale et des demandes d'investissement."}
                </p>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex flex-col gap-1">
                  <span className="text-xs font-extrabold text-slate-400 uppercase">Surface Totale</span>
                  <span className="text-xl font-black text-slate-800 font-mono">{(stats.totalSurface / 10000).toFixed(1)} Ha</span>
                  <span className="text-[10px] text-slate-400 font-medium">{stats.total} parcelles cadastrées</span>
                </div>

                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex flex-col gap-1">
                  <span className="text-xs font-extrabold text-slate-400 uppercase text-red-600">Occupés / Actifs</span>
                  <span className="text-xl font-black text-red-600 font-mono">{stats.occupied} Lots</span>
                  <span className="text-[10px] text-slate-400 font-medium">{((stats.occupied / stats.total) * 100).toFixed(1)}% Taux d'occupation</span>
                </div>

                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex flex-col gap-1">
                  <span className="text-xs font-extrabold text-slate-400 uppercase text-emerald-600">Disponibles</span>
                  <span className="text-xl font-black text-emerald-600 font-mono">{stats.available} Lots</span>
                  <span className="text-[10px] text-slate-400 font-medium">{((stats.available / stats.total) * 100).toFixed(1)}% En attente d'achat</span>
                </div>

                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex flex-col gap-1">
                  <span className="text-xs font-extrabold text-slate-400 uppercase text-yellow-500">Réservés / Chantiers</span>
                  <span className="text-xl font-black text-yellow-500 font-mono">{stats.reserved + stats.underConstruction}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{stats.reserved} Réservés • {stats.underConstruction} Chantiers</span>
                </div>
              </div>

              {/* Graphic Occupancy representation */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Visual Stacked Progress Bars */}
                <div className="lg:col-span-1 bg-white border border-slate-200 p-5 rounded-2xl flex flex-col gap-4 shadow-xs">
                  <h3 className={`text-sm font-extrabold text-slate-900 ${isRtl ? "text-right" : ""}`}>
                    Taux d'occupation détaillé
                  </h3>
                  
                  <div className="flex flex-col gap-3">
                    {/* Available */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <span>Disponible (Vert)</span>
                        <span className="font-mono">{stats.available} ({((stats.available / stats.total) * 100).toFixed(0)}%)</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(stats.available / stats.total) * 100}%` }} />
                      </div>
                    </div>

                    {/* Occupied */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <span>Occupé (Rouge)</span>
                        <span className="font-mono">{stats.occupied} ({((stats.occupied / stats.total) * 100).toFixed(0)}%)</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: `${(stats.occupied / stats.total) * 100}%` }} />
                      </div>
                    </div>

                    {/* Reserved */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <span>Réservé (Jaune)</span>
                        <span className="font-mono">{stats.reserved} ({((stats.reserved / stats.total) * 100).toFixed(0)}%)</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${(stats.reserved / stats.total) * 100}%` }} />
                      </div>
                    </div>

                    {/* Under Construction */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <span>En Construction (Violet)</span>
                        <span className="font-mono">{stats.underConstruction} ({((stats.underConstruction / stats.total) * 100).toFixed(0)}%)</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(stats.underConstruction / stats.total) * 100}%` }} />
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-100" />
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-[11px] text-blue-700 font-semibold leading-relaxed flex gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-blue-500" />
                    <span>Les données affichées sont synchronisées avec le module cartographique public.</span>
                  </div>
                </div>

                {/* Inbox Quick panel */}
                <div className="lg:col-span-2 bg-white border border-slate-200 p-5 rounded-2xl flex flex-col gap-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-extrabold text-slate-900">Demandes récentes reçues</h3>
                    <button onClick={() => setAdminTab("contacts")} className="text-xs text-blue-600 font-bold hover:underline">Voir tout</button>
                  </div>

                  <div className="flex flex-col gap-3">
                    {inquiries.slice(0, 3).map((inq: any) => (
                      <div key={inq.id} className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl flex items-start justify-between gap-3 text-left">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-slate-800">{inq.investorName || inq.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">• {inq.companyName || inq.company || "Individuel"}</span>
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-2 mt-1 italic">"{inq.description || inq.message}"</p>
                          <span className="text-[10px] text-slate-400 font-mono mt-2 block">{inq.date} • Lot {inq.lotRequested || inq.lot}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold shrink-0 uppercase ${
                          inq.status === "new" ? "bg-blue-100 text-blue-800" : "bg-slate-200 text-slate-600"
                        }`}>{inq.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: LOTS MANAGEMENT */}
          {adminTab === "lots" && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-6 flex flex-col gap-6 animate-fade-in">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="text-left">
                  <h2 className="text-xl font-extrabold text-slate-900">Gestion de la réserve foncière (Lots)</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Recherchez, filtrez et éditez la fiche technique de chaque parcelle.</p>
                </div>
                <span className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-150 px-3 py-1.5 rounded-lg">
                  {filteredLots.length} lots affichés
                </span>
              </div>

              {/* Advanced Search & Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Recherche textuelle</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Numéro, entreprise, secteur..."
                    className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Filtrer par statut</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value={LotStatus.AVAILABLE}>Disponible (Vert)</option>
                    <option value={LotStatus.OCCUPIED}>Occupé (Rouge)</option>
                    <option value={LotStatus.RESERVED}>Réservé (Jaune)</option>
                    <option value={LotStatus.UNDER_CONSTRUCTION}>En chantier</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Filtrer par tranche</label>
                  <select
                    value={filterTranche}
                    onChange={(e) => setFilterTranche(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs"
                  >
                    <option value="all">Toutes les tranches</option>
                    <option value="TR I">Tranche I</option>
                    <option value="TR II">Tranche II</option>
                    <option value="TR III">Tranche III</option>
                  </select>
                </div>
              </div>

              {/* Editable Table */}
              <div className="overflow-x-auto border border-gray-150 rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-gray-150 font-bold text-slate-600">
                      <th className="p-3">Lot N°</th>
                      <th className="p-3">Statut</th>
                      <th className="p-3">Tranche</th>
                      <th className="p-3">Secteur d'activité</th>
                      <th className="p-3 font-mono">Surface</th>
                      <th className="p-3">Voie d'accès</th>
                      <th className="p-3">Situation</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredLots.map((lot) => (
                      <tr key={lot.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-3 font-bold text-slate-900">#{lot.number}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                            lot.status === LotStatus.AVAILABLE ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50" :
                            lot.status === LotStatus.OCCUPIED ? "bg-red-50 text-red-700 border border-red-200/50" :
                            "bg-yellow-50 text-yellow-700 border border-yellow-200/50"
                          }`}>{lot.status}</span>
                        </td>
                        <td className="p-3 font-bold text-slate-500">{lot.tranche}</td>
                        <td className="p-3 text-slate-600 font-medium truncate max-w-[120px]">{lot.sector || "Industriel"}</td>
                        <td className="p-3 font-mono font-semibold text-slate-800">{lot.surface} m²</td>
                        <td className="p-3 text-slate-500">{lot.road}</td>
                        <td className="p-3 text-slate-500">{lot.situation}</td>
                        <td className="p-3 text-center">
                         {canEditEverything && (
  <button
    onClick={() => handleEditLotClick(lot)}
    className="..."
  >
    <Edit className="w-4 h-4" />
  </button>
)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: COMPANIES MANAGEMENT */}
          {adminTab === "companies" && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-6 flex flex-col gap-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="text-left">
                  <h2 className="text-xl font-extrabold text-slate-900">Annuaires des Entreprises Installées</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Associez des fiches d'activité, catalogues PDF et réseaux sociaux aux parcelles occupées.</p>
                </div>
                { canEditEverything && (
                <button
                  onClick={handleNewCompanyClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Installer une société
                </button>
                )}
              </div>
              <div className="relative mb-5">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

  <input
    type="text"
    placeholder="Rechercher par numéro de lot ou nom de société..."
    value={companySearch}
    onChange={(e) => setCompanySearch(e.target.value)}
    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
</div>

              {/* Companies Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCompanyLots.map((l) => (
                  <div key={l.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between gap-4 text-left">
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 bg-blue-500 text-white rounded-xl flex items-center justify-center font-bold text-sm">
                            {l.logoText || "CO"}
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-blue-600 uppercase bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">Lot #{l.number}</span>
                            <h3 className="font-extrabold text-sm text-slate-800 mt-1">{l.companyName}</h3>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {canEditEverything && (
  <button
    onClick={() => handleEditCompanyClick(l)}
    className="p-1.5 bg-white border border-slate-200 text-blue-600 rounded-lg"
  >
    <Edit className="w-3.5 h-3.5" />
  </button>
)}
                          {canEditEverything && (
  <button
    onClick={() => handleDeleteCompany(l.id)}
    className="p-1.5 bg-white border border-slate-200 text-red-600 rounded-lg"
  >
    <Trash2 className="w-3.5 h-3.5" />
  </button>
)}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed">"{l.description || "Aucune description fournie."}"</p>
                    </div>

                    <div className="border-t border-slate-200/60 pt-3 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>{l.sector} • {l.surface} m²</span>
                      {l.contact?.email && <span className="text-blue-600">{l.contact.email}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: NEWS MANAGEMENT */}
          {adminTab === "news" && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-6 flex flex-col gap-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="text-left">
                  <h2 className="text-xl font-extrabold text-slate-900">Gestion de l'actualité</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Rédigez, modifiez et publiez des articles d'actualités sur le site public.</p>
                </div>
                <button
                  onClick={handleNewNewsClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Rédiger un article
                </button>
              </div>

              {/* News list */}
              <div className="flex flex-col gap-3">
                {news.map((item) => (
                  <div key={item.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-4 text-left">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt="" className="w-16 h-12 object-cover rounded-lg bg-slate-100" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold bg-blue-50 border border-blue-100 text-blue-600 px-2 py-0.5 rounded uppercase">{item.categoryFR}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-800 mt-1">{item.titleFR}</h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const updated = news.map((n) => n.id === item.id ? { ...n, published: !n.published } : n);
                          onUpdateNews(updated);
                        }}
                        className={`p-1.5 border rounded-lg transition-colors ${
                          item.published ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "bg-gray-100 border-gray-200 text-gray-400"
                        }`}
                        title={item.published ? "Publié" : "Brouillon"}
                      >
                        {item.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button onClick={() => handleEditNewsClick(item)} className="p-1.5 bg-white border border-slate-200 text-blue-600 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteNews(item.id)} className="p-1.5 bg-white border border-slate-200 text-red-600 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: EVENTS MANAGEMENT */}
          {adminTab === "events" && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-6 flex flex-col gap-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="text-left">
                  <h2 className="text-xl font-extrabold text-slate-900">Agenda & Événements</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Planifiez des journées portes ouvertes, forums ou rencontres d'affaires.</p>
                </div>
                <button
                  onClick={handleNewEventClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Planifier un événement
                </button>
              </div>

              {/* Events list */}
              <div className="flex flex-col gap-3">
                {events.map((item) => (
                  <div key={item.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-4 text-left">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt="" className="w-16 h-12 object-cover rounded-lg bg-slate-100" />
                      <div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                          <span>{item.date} à {item.time}</span>
                          <span>•</span>
                          <span className="text-red-500 font-bold">{item.locationFR}</span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-800 mt-1">{item.titleFR}</h4>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => handleEditEventClick(item)} className="p-1.5 bg-white border border-slate-200 text-blue-600 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteEvent(item.id)} className="p-1.5 bg-white border border-slate-200 text-red-600 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CONTACTS / INQUIRIES */}
          {adminTab === "contacts" && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-6 flex flex-col gap-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="text-left">
                  <h2 className="text-xl font-extrabold text-slate-900">Demandes de Réservation et d'Information</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Traitement en direct des dossiers investisseurs soumis depuis la carte.</p>
                </div>
                <button
                  onClick={handleExportCSV}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  Exporter au format CSV
                </button>
              </div>

              {/* Inquiries table */}
              <div className="overflow-x-auto border border-gray-150 rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-gray-150 font-bold text-slate-600">
                      <th className="p-3">Investisseur</th>
                      <th className="p-3">Société</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3 font-mono">Lot visé</th>
                      <th className="p-3">Description du projet</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Statut</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-50/20">
                        <td className="p-3 font-bold text-slate-900">{inq.investorName || inq.name}</td>
                        <td className="p-3 text-slate-600 font-medium">{inq.companyName || inq.company || "Individuel"}</td>
                        <td className="p-3">
                          <div className="text-[10px] text-slate-500 font-mono">{inq.email}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">{inq.phone}</div>
                        </td>
                        <td className="p-3 font-mono font-bold text-blue-600">Lot {inq.lotRequested || inq.lot}</td>
                        <td className="p-3 text-slate-500 max-w-xs truncate" title={inq.description || inq.message}>
                          {inq.description || inq.message}
                        </td>
                        <td className="p-3 font-mono text-slate-400">{inq.date}</td>
                        <td className="p-3">
                          <select
                            value={inq.status}
                            onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value)}
                            className="bg-white border border-gray-200 text-[10px] py-1 px-2 rounded-md font-bold"
                          >
                            <option value="new">Nouveau</option>
                            <option value="processed">Traité</option>
                            <option value="rejected">Refusé</option>
                            <option value="archived">Archivé</option>
                          </select>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1.5 bg-slate-50 hover:bg-slate-100 text-red-600 border border-gray-200 rounded-lg"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: MEDIA GALLERY */}
          {adminTab === "gallery" && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-6 flex flex-col gap-6 animate-fade-in">
              <div className="border-b border-slate-100 pb-5">
                <h2 className="text-xl font-extrabold text-slate-900">Banque d'images globale</h2>
                <p className="text-xs text-slate-500 mt-0.5">Ajoutez et conservez des URLs d'illustrations pour vos fiches d'entreprises, événements ou articles.</p>
              </div>

              {/* Add image */}
              <form onSubmit={handleAddGalleryImage} className="flex gap-2 bg-slate-50 p-4 rounded-xl border border-slate-150">
                <input
                  type="text"
                  required
                  value={newGalleryUrl}
                  onChange={(e) => setNewGalleryUrl(e.target.value)}
                  placeholder="Collez l'URL absolue d'une image (Unsplash, imgur...)"
                  className="flex-1 bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-lg shrink-0 flex items-center gap-1">
                  <Plus className="w-4 h-4" /> Ajouter
                </button>
              </form>

              {/* Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryImages.map((img, idx) => (
                  <div key={idx} className="group aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200 relative">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleDeleteGalleryImage(img)}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SITE CONFIGURATION */}
          {adminTab === "settings" && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-6 flex flex-col gap-6 animate-fade-in">
              <div className="border-b border-slate-100 pb-5 text-left">
                <h2 className="text-xl font-extrabold text-slate-900">Configuration Globale de la Plateforme</h2>
                <p className="text-xs text-slate-500 mt-0.5">Personnalisez les coordonnées, les textes de la bannière Hero et les informations légales.</p>
              </div>

              <form onSubmit={handleSaveSettings} className="flex flex-col gap-6 text-left">
                {/* Identity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600">Nom abrégé du site (Branding)</label>
                    <input
                      type="text"
                      value={siteTitle}
                      onChange={(e) => setSiteTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600">Texte Logo (Header)</label>
                    <input
                      type="text"
                      value={siteLogoText}
                      onChange={(e) => setSiteLogoText(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs"
                    />
                  </div>
                </div>

                <hr className="border-slate-150" />

                {/* Contacts Settings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600">E-mail de reception</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600">Téléphone d'accueil</label>
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600">Adresse physique</label>
                    <input
                      type="text"
                      value={contactAddress}
                      onChange={(e) => setContactAddress(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs"
                    />
                  </div>
                </div>

                <hr className="border-slate-150" />

                {/* multilingual Hero values */}
                <div className="flex flex-col gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/50">
                  <h3 className="text-xs font-bold text-slate-700 uppercase">Contenu d'entête (Hero Banner)</h3>
                  
                  {/* FR */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400">Titre (FR)</label>
                      <input type="text" value={heroTitleFR} onChange={(e) => setHeroTitleFR(e.target.value)} className="w-full bg-white border border-slate-200 rounded py-2 px-3 text-xs" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400">Description (FR)</label>
                      <input type="text" value={heroSubFR} onChange={(e) => setHeroSubFR(e.target.value)} className="w-full bg-white border border-slate-200 rounded py-2 px-3 text-xs" />
                    </div>
                  </div>

                  {/* AR */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400">Titre (AR)</label>
                      <input type="text" value={heroTitleAR} onChange={(e) => setHeroTitleAR(e.target.value)} className="w-full bg-white border border-slate-200 rounded py-2 px-3 text-xs text-right" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400">Description (AR)</label>
                      <input type="text" value={heroSubAR} onChange={(e) => setHeroSubAR(e.target.value)} className="w-full bg-white border border-slate-200 rounded py-2 px-3 text-xs text-right" />
                    </div>
                  </div>

                  {/* EN */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400">Titre (EN)</label>
                      <input type="text" value={heroTitleEN} onChange={(e) => setHeroTitleEN(e.target.value)} className="w-full bg-white border border-slate-200 rounded py-2 px-3 text-xs" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-slate-400">Description (EN)</label>
                      <input type="text" value={heroSubEN} onChange={(e) => setHeroSubEN(e.target.value)} className="w-full bg-white border border-slate-200 rounded py-2 px-3 text-xs" />
                    </div>
                  </div>
                </div>

                {/* Banner image URL & copyright */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600">URL de l'image de fond (Hero)</label>
                    <input
                      type="text"
                      value={bannerImg}
                      onChange={(e) => setBannerImg(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600">Texte de Copyright (Footer)</label>
                    <input
                      type="text"
                      value={copyrightText}
                      onChange={(e) => setCopyrightText(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2 border-t border-slate-150">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center gap-2">
                    <Save className="w-4 h-4" /> Enregistrer les paramètres globaux
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: USERS & ROLE PERMISSIONS (Super Admin only) */}
          {adminTab === "users" && isSuperAdmin && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-6 flex flex-col gap-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5 text-left">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Habilitations & Rôles des Administrateurs</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Gérez les comptes d'accès, privilèges et affectations des fonctionnaires de la plateforme.</p>
                </div>
                <button
                  onClick={handleNewUserClick}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Créer un compte d'accès
                </button>
              </div>

              {/* Grid of Users */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {usersList.map((u) => (
                  <div key={u.email} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between gap-4 text-left relative overflow-hidden group">
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl ${u.avatarColor || "bg-indigo-650"} text-white font-black flex items-center justify-center text-sm border border-white/20 shrink-0 shadow-xs`}>
                            {u.name ? u.name.split(" ").map((n: string) => n[0]).join("").toUpperCase() : "AD"}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-extrabold text-sm text-slate-800 truncate">{u.name}</h3>
                              <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase border shrink-0 ${
                                u.role === "Super Admin" ? "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" :
                                u.role === "Admin" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                                u.role === "Editor" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                "bg-slate-500/10 text-slate-500 border-slate-500/20"
                              }`}>
                                {u.role}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">{u.title || "Fonctionnaire"}</p>
                          </div>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <button onClick={() => handleEditUserClick(u)} className="p-1.5 bg-white border border-slate-200 text-blue-600 hover:bg-slate-100 rounded-lg cursor-pointer">
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDeleteUser(u.email)} className="p-1.5 bg-white border border-slate-200 text-red-600 hover:bg-slate-100 rounded-lg cursor-pointer">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Display explicit access list based on role */}
                      <div className="mt-4 bg-white border border-slate-150 rounded-xl p-3 flex flex-col gap-1.5">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Privilèges d'accès :</span>
                        <div className="flex flex-wrap gap-1">
                          {u.role === "Super Admin" && (
                            <>
                              <span className="bg-indigo-50 text-indigo-600 text-[8px] font-bold px-1.5 py-0.5 rounded">Gestion des Comptes</span>
                              <span className="bg-blue-50 text-blue-600 text-[8px] font-bold px-1.5 py-0.5 rounded">Édition Cadastre</span>
                              <span className="bg-emerald-50 text-emerald-600 text-[8px] font-bold px-1.5 py-0.5 rounded">Édition Entreprises</span>
                              <span className="bg-purple-50 text-purple-600 text-[8px] font-bold px-1.5 py-0.5 rounded">Agenda & News</span>
                              <span className="bg-amber-50 text-amber-600 text-[8px] font-bold px-1.5 py-0.5 rounded">Paramètres Généraux</span>
                            </>
                          )}
                          {u.role === "Admin" && (
                            <>
                              <span className="bg-blue-50 text-blue-600 text-[8px] font-bold px-1.5 py-0.5 rounded">Édition Cadastre</span>
                              <span className="bg-emerald-50 text-emerald-600 text-[8px] font-bold px-1.5 py-0.5 rounded">Édition Entreprises</span>
                              <span className="bg-purple-50 text-purple-600 text-[8px] font-bold px-1.5 py-0.5 rounded">Agenda & News</span>
                              <span className="bg-amber-50 text-amber-600 text-[8px] font-bold px-1.5 py-0.5 rounded">Paramètres Généraux</span>
                            </>
                          )}
                          {u.role === "Editor" && (
                            <>
                              <span className="bg-purple-50 text-purple-600 text-[8px] font-bold px-1.5 py-0.5 rounded">Agenda & News</span>
                              <span className="bg-pink-50 text-pink-600 text-[8px] font-bold px-1.5 py-0.5 rounded">Galerie Média</span>
                            </>
                          )}
                          {u.role === "Viewer" && (
                            <span className="bg-slate-100 text-slate-600 text-[8px] font-bold px-1.5 py-0.5 rounded">Lecture Seule (Auditeur)</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-200/60 pt-3 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>{u.email}</span>
                      <span className="text-slate-300">••••••••</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ======================================= */}
      {/* 3. SLIDE-OUT RIGHT DRAWER (FOR LOTS FORM) */}
      {/* ======================================= */}
      {editingLot && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fade-in bg-slate-900/30 backdrop-blur-xs">
          <div className="fixed inset-0" onClick={() => setEditingLot(null)} />
          <div className="w-full max-w-[440px] bg-white h-full relative z-10 border-l border-slate-200 flex flex-col justify-between shadow-2xl">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-blue-500 text-white font-mono rounded-lg font-bold text-sm">#{editingLot.number}</span>
                <h3 className="font-bold text-base text-slate-900">Modifier la parcelle</h3>
              </div>
              <button onClick={() => setEditingLot(null)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form scroll content */}
            <form onSubmit={handleSaveLot} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 text-left">
              {/* Status */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Statut d'occupation</label>
                <select
                  value={lotStatus}
                  onChange={(e) => setLotStatus(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-xs"
                >
                  <option value={LotStatus.AVAILABLE}>Disponible (Vert)</option>
                  <option value={LotStatus.OCCUPIED}>Occupé (Rouge)</option>
                  <option value={LotStatus.RESERVED}>Réservé (Jaune)</option>
                  <option value={LotStatus.UNDER_CONSTRUCTION}>En chantier</option>
                  <option value={LotStatus.EQUIPMENT}>Équipement public</option>
                </select>
              </div>

              {/* Sector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Secteur d'activité</label>
                <input
                  type="text"
                  value={lotSector}
                  onChange={(e) => setLotSector(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-xs"
                />
              </div>

              {/* Surface */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Surface (m²)</label>
                <input
                  type="number"
                  required
                  value={lotSurface}
                  onChange={(e) => setLotSurface(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-xs font-mono"
                />
              </div>

              {/* Voie */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Voie d'accès</label>
                <input
                  type="text"
                  value={lotRoad}
                  onChange={(e) => setLotRoad(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-xs"
                />
              </div>

              {/* Situation */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Situation</label>
                <select
                  value={lotSituation}
                  onChange={(e) => setLotSituation(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-xs"
                >
                  <option value="Standard">Standard</option>
                  <option value="Angle">Angle</option>
                  <option value="Double Façade">Double Façade</option>
                </select>
              </div>

              {/* Coords */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Latitude GPS</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={lotLat}
                    onChange={(e) => setLotLat(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Longitude GPS</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={lotLng}
                    onChange={(e) => setLotLng(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setEditingLot(null)} className="w-1/2 bg-slate-100 text-slate-700 py-2.5 rounded-xl text-xs font-bold">Annuler</button>
                <button type="submit" className="w-1/2 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold">Sauvegarder</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* 4. SLIDE-OUT RIGHT DRAWER (FOR COMPANIES FORM) */}
      {/* ======================================= */}
      {(editingCompanyLot || isAddingNewCompany) && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fade-in bg-slate-900/30 backdrop-blur-xs">
          <div className="fixed inset-0" onClick={() => { setEditingCompanyLot(null); setIsAddingNewCompany(false); }} />
          <div className="w-full max-w-[440px] bg-white h-full relative z-10 border-l border-slate-200 flex flex-col justify-between shadow-2xl">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">
                {isAddingNewCompany ? "Installer une nouvelle entreprise" : `Fiche de : ${editingCompanyLot?.companyName}`}
              </h3>
              <button onClick={() => { setEditingCompanyLot(null); setIsAddingNewCompany(false); }} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveCompany} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 text-left">
              {isAddingNewCompany && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Numéro de Lot à attribuer *</label>
                  <input
                    type="text"
                    required
                    value={companyLotNum}
                    onChange={(e) => setCompanyLotNum(e.target.value)}
                    placeholder="Ex: 154"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-xs"
                  />
                </div>
              )}

              {/* Company Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Raison sociale / Nom *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Nom de l'entreprise"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-xs"
                />
              </div>

              {/* Sector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Secteur Industriel *</label>
                <input
                  type="text"
                  required
                  value={companySector}
                  onChange={(e) => setCompanySector(e.target.value)}
                  placeholder="Ex: Agro-alimentaire"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-xs"
                />
              </div>

              {/* Activity details */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Activité Spécifique</label>
                <input
                  type="text"
                  value={companyActivity}
                  onChange={(e) => setCompanyActivity(e.target.value)}
                  placeholder="Ex: Conditionnement de fruits secs"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-xs"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Présentation / Description</label>
                <textarea
                  rows={2}
                  value={companyDesc}
                  onChange={(e) => setCompanyDesc(e.target.value)}
                  placeholder="Paragraphe de présentation de l'entreprise"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs leading-normal"
                />
              </div>

              {/* Services */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Produits ou Services (Séparés par virgules)</label>
                <input
                  type="text"
                  value={companyServices}
                  onChange={(e) => setCompanyServices(e.target.value)}
                  placeholder="Ex: Tissage, Bobinage, Exportation"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-xs"
                />
              </div>

              {/* Contacts */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Téléphone</label>
                  <input type="text" value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">E-mail</label>
                  <input type="email" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs" />
                </div>
              </div>

              {/* GPS Coordinates */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Latitude GPS *</label>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={companyLat}
                    onChange={(e) => setCompanyLat(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Longitude GPS *</label>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={companyLng}
                    onChange={(e) => setCompanyLng(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Website / Catalog */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Site web URL</label>
                <input type="text" value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs font-mono" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">URL Catalogue PDF</label>
                <input type="text" value={companyPdf} onChange={(e) => setCompanyPdf(e.target.value)} placeholder="https://votre-site/catalogue.pdf" className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs font-mono" />
              </div>

              {/* Social Channels */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-col gap-2">
                <span className="text-[9px] font-black text-slate-500 uppercase">Réseaux Sociaux</span>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="Facebook URL" value={companyFacebook} onChange={(e) => setCompanyFacebook(e.target.value)} className="w-full bg-white border border-slate-200 rounded p-1.5 text-[10px] font-mono" />
                  <input type="text" placeholder="Instagram URL" value={companyInstagram} onChange={(e) => setCompanyInstagram(e.target.value)} className="w-full bg-white border border-slate-200 rounded p-1.5 text-[10px] font-mono" />
                  <input type="text" placeholder="LinkedIn URL" value={companyLinkedin} onChange={(e) => setCompanyLinkedin(e.target.value)} className="w-full bg-white border border-slate-200 rounded p-1.5 text-[10px] font-mono" />
                  <input type="text" placeholder="WhatsApp Number" value={companyWhatsapp} onChange={(e) => setCompanyWhatsapp(e.target.value)} className="w-full bg-white border border-slate-200 rounded p-1.5 text-[10px] font-mono" />
                </div>
              </div>

              {/* Logo text & Gallery list */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Initiales du Logo (2 lettres)</label>
                <input type="text" maxLength={3} value={companyLogoText} onChange={(e) => setCompanyLogoText(e.target.value)} placeholder="Ex: SA" className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs font-mono uppercase" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Images de la galerie (Séparées par virgules)</label>
                <textarea rows={2} value={companyGallery} onChange={(e) => setCompanyGallery(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs leading-normal font-mono" />
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2 pt-4 border-t border-slate-100 sticky bottom-0 bg-white pb-2">
                <button type="button" onClick={() => { setEditingCompanyLot(null); setIsAddingNewCompany(false); }} className="w-1/2 bg-slate-100 text-slate-700 py-2.5 rounded-xl text-xs font-bold">Annuler</button>
                <button type="submit" className="w-1/2 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* 5. SLIDE-OUT RIGHT DRAWER (FOR NEWS FORM) */}
      {/* ======================================= */}
      {(editingNews || isAddingNews) && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs">
          <div className="fixed inset-0" onClick={() => { setEditingNews(null); setIsAddingNews(false); }} />
          <div className="w-full max-w-[460px] bg-white h-full relative z-10 border-l border-slate-200 flex flex-col justify-between shadow-2xl">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">
                {isAddingNews ? "Nouvelle actualité" : "Modifier l'actualité"}
              </h3>
              <button onClick={() => { setEditingNews(null); setIsAddingNews(false); }} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable form content */}
            <form onSubmit={handleSaveNews} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 text-left">
              {/* Category */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-400">Catégorie (FR)</label>
                  <input type="text" required value={newsCategoryFR} onChange={(e) => setNewsCategoryFR(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-1.5 px-2.5 text-xs" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400">Catégorie (AR)</label>
                  <input type="text" required value={newsCategoryAR} onChange={(e) => setNewsCategoryAR(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-1.5 px-2.5 text-xs text-right" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400">Catégorie (EN)</label>
                  <input type="text" required value={newsCategoryEN} onChange={(e) => setNewsCategoryEN(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-1.5 px-2.5 text-xs" />
                </div>
              </div>

              {/* Title FR / AR / EN */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Titre (FR) *</label>
                <input type="text" required value={newsTitleFR} onChange={(e) => setNewsTitleFR(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Titre (AR) *</label>
                <input type="text" required value={newsTitleAR} onChange={(e) => setNewsTitleAR(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs text-right" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Titre (EN) *</label>
                <input type="text" required value={newsTitleEN} onChange={(e) => setNewsTitleEN(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs" />
              </div>

              {/* Summary FR / AR / EN */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Résumé (FR) *</label>
                <textarea rows={2} required value={newsSummaryFR} onChange={(e) => setNewsSummaryFR(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs leading-normal" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Résumé (AR) *</label>
                <textarea rows={2} required value={newsSummaryAR} onChange={(e) => setNewsSummaryAR(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs text-right leading-normal" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Résumé (EN) *</label>
                <textarea rows={2} required value={newsSummaryEN} onChange={(e) => setNewsSummaryEN(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs leading-normal" />
              </div>

              {/* Content FR / AR / EN */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Contenu (FR) *</label>
                <textarea rows={3} required value={newsContentFR} onChange={(e) => setNewsContentFR(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs leading-normal" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Contenu (AR) *</label>
                <textarea rows={3} required value={newsContentAR} onChange={(e) => setNewsContentAR(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs text-right leading-normal" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Contenu (EN) *</label>
                <textarea rows={3} required value={newsContentEN} onChange={(e) => setNewsContentEN(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs leading-normal" />
              </div>

              {/* Date & Image */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-400">Date de publication</label>
                  <input type="date" required value={newsDate} onChange={(e) => setNewsDate(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs font-mono" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400">Statut</label>
                  <select value={newsPublished ? "true" : "false"} onChange={(e) => setNewsPublished(e.target.value === "true")} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs">
                    <option value="true">Publié (En ligne)</option>
                    <option value="false">Brouillon (Masqué)</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Image de couverture URL</label>
                <input type="text" required value={newsImage} onChange={(e) => setNewsImage(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2.5 px-3 text-xs font-mono" />
              </div>

              {/* Save footer */}
              <div className="mt-4 flex gap-2 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => { setEditingNews(null); setIsAddingNews(false); }} className="w-1/2 bg-slate-100 text-slate-700 py-2.5 rounded-xl text-xs font-bold">Annuler</button>
                <button type="submit" className="w-1/2 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold">Sauvegarder</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* 6. SLIDE-OUT RIGHT DRAWER (FOR EVENTS FORM) */}
      {/* ======================================= */}
      {(editingEvent || isAddingEvent) && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs">
          <div className="fixed inset-0" onClick={() => { setEditingEvent(null); setIsAddingEvent(false); }} />
          <div className="w-full max-w-[460px] bg-white h-full relative z-10 border-l border-slate-200 flex flex-col justify-between shadow-2xl">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">
                {isAddingEvent ? "Nouvel événement" : "Modifier l'événement"}
              </h3>
              <button onClick={() => { setEditingEvent(null); setIsAddingEvent(false); }} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form */}
            <form onSubmit={handleSaveEvent} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 text-left">
              {/* Titles */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Titre (FR) *</label>
                <input type="text" required value={eventTitleFR} onChange={(e) => setEventTitleFR(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Titre (AR) *</label>
                <input type="text" required value={eventTitleAR} onChange={(e) => setEventTitleAR(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs text-right" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Titre (EN) *</label>
                <input type="text" required value={eventTitleEN} onChange={(e) => setEventTitleEN(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs" />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-400">Date de l'événement</label>
                  <input type="date" required value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs font-mono" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400">Heure de début</label>
                  <input type="text" required placeholder="Ex: 09:00" value={eventTime} onChange={(e) => setEventTime(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs font-mono" />
                </div>
              </div>

              {/* Locations */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Lieu (FR) *</label>
                <input type="text" required value={eventLocFR} onChange={(e) => setEventLocFR(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Lieu (AR) *</label>
                <input type="text" required value={eventLocAR} onChange={(e) => setEventLocAR(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs text-right" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Lieu (EN) *</label>
                <input type="text" required value={eventLocEN} onChange={(e) => setEventLocEN(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs" />
              </div>

              {/* Descriptions */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Description (FR)</label>
                <textarea rows={2} value={eventDescFR} onChange={(e) => setEventDescFR(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs leading-normal" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Description (AR)</label>
                <textarea rows={2} value={eventDescAR} onChange={(e) => setEventDescAR(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs text-right leading-normal" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Description (EN)</label>
                <textarea rows={2} value={eventDescEN} onChange={(e) => setEventDescEN(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs leading-normal" />
              </div>

              {/* Image */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Image URL</label>
                <input type="text" required value={eventImage} onChange={(e) => setEventImage(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-xs font-mono" />
              </div>

              {/* Actions footer */}
              <div className="mt-4 flex gap-2 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => { setEditingEvent(null); setIsAddingEvent(false); }} className="w-1/2 bg-slate-100 text-slate-700 py-2.5 rounded-xl text-xs font-bold">Annuler</button>
                <button type="submit" className="w-1/2 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold">Sauvegarder</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================= */}
      {/* 7. SLIDE-OUT RIGHT DRAWER (FOR USER ACCOUNT FORM) */}
      {/* ======================================= */}
      {(editingUser || isAddingUser) && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fade-in bg-slate-900/30 backdrop-blur-xs">
          <div className="fixed inset-0" onClick={() => { setEditingUser(null); setIsAddingUser(false); }} />
          <div className="w-full max-w-[440px] bg-white h-full relative z-10 border-l border-slate-200 flex flex-col justify-between shadow-2xl">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">
                {isAddingUser ? "Créer un compte d'accès" : `Modifier le compte : ${editingUser?.name}`}
              </h3>
              <button onClick={() => { setEditingUser(null); setIsAddingUser(false); }} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveUser} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 text-left">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Nom complet *</label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Ex: Mourad El Alami"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-xs font-bold text-slate-900"
                />
              </div>

              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Titre Professionnel / Grade</label>
                <input
                  type="text"
                  value={userTitle}
                  onChange={(e) => setUserTitle(e.target.value)}
                  placeholder="Ex: Directeur d'Aménagement"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-xs text-slate-900"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Adresse e-mail (Login) *</label>
                <input
                  type="email"
                  required
                  disabled={!!editingUser}
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="nom@industry.gov.ma"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-xs font-mono disabled:opacity-50 text-slate-900"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Mot de passe secret *</label>
                <input
                  type="text"
                  required
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  placeholder="Entrez le mot de passe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-xs font-mono text-slate-900"
                />
              </div>

              {/* Role Select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Rôle & Niveau d'Habilitation *</label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-xs font-bold text-slate-900"
                >
                  <option value="Super Admin">Super Admin (Accès intégral)</option>
                  <option value="Admin">Admin (Gestion Cadastre & Entreprises)</option>
                  <option value="Editor">Editor (Agenda & News)</option>
                  <option value="Viewer">Viewer (Lecture Seule / Auditeur)</option>
                </select>
              </div>

              {/* Info alert box */}
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-[10px] text-indigo-700 leading-relaxed">
                <p className="font-bold">Remarque importante :</p>
                <p className="mt-1">Les rôles contrôlent dynamiquement les droits de modification de la base cartographique, de l'agenda régional et des paramètres généraux de la plateforme.</p>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2 pt-4 border-t border-slate-100 sticky bottom-0 bg-white pb-2">
                <button type="button" onClick={() => { setEditingUser(null); setIsAddingUser(false); }} className="w-1/2 bg-slate-100 text-slate-700 py-2.5 rounded-xl text-xs font-bold">Annuler</button>
                <button type="submit" className="w-1/2 bg-indigo-600 text-white py-2.5 rounded-xl text-xs font-bold">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
