import React, { useState } from "react";
import {
  X,
  Phone,
  Mail,
  Globe,
  MapPin,
  Download,
  Building,
  Facebook,
  Instagram,
  Linkedin,
  MessageSquare,
  Send,
  CheckCircle,
  FileText,
  Navigation
} from "lucide-react";
import { Lot, LotStatus, Language } from "../types";
import { translations } from "../data/translations";

interface DrawerProps {
  language: Language;
  lot: Lot | null;
  onClose: () => void;
  onSubmitRequest?: (request: {
    id: string;
    companyName: string;
    investorName: string;
    email: string;
    phone: string;
    activity: string;
    lotRequested: string;
    description: string;
    date: string;
    status: string;
  }) => void;
}

export default function Drawer({ language, lot, onClose, onSubmitRequest }: DrawerProps) {
  const t = translations[language];
  const isRtl = language === "AR";

  // Form states for Available Lot Reservation
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [investorName, setInvestorName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [activity, setActivity] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isReservedSuccess, setIsReservedSuccess] = useState(false);

  // Form states for Direct Company Contact
  const [showCompanyContact, setShowCompanyContact] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isContactSuccess, setIsContactSuccess] = useState(false);

  if (!lot) return null;

  const isAvailable = lot.status === LotStatus.AVAILABLE || !lot.companyName;

  const getStatusBadge = (status: LotStatus) => {
    const commonClass = "px-3 py-1.5 rounded-full text-xs font-bold shadow-sm inline-flex items-center gap-1.5";
    switch (status) {
      case LotStatus.AVAILABLE:
        return (
          <span className={`${commonClass} bg-emerald-500/10 text-emerald-700 border border-emerald-500/25`}>
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            {t.legendAvailable}
          </span>
        );
      case LotStatus.OCCUPIED:
        return (
          <span className={`${commonClass} bg-red-500/10 text-red-700 border border-red-500/25`}>
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
            {t.legendOccupied}
          </span>
        );
      case LotStatus.RESERVED:
        return (
          <span className={`${commonClass} bg-yellow-500/10 text-yellow-700 border border-yellow-500/25`}>
            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
            {t.legendReserved}
          </span>
        );
      case LotStatus.UNDER_CONSTRUCTION:
        return (
          <span className={`${commonClass} bg-purple-500/10 text-purple-700 border border-purple-500/25`}>
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
            {t.legendUnderConstruction}
          </span>
        );
      case LotStatus.EQUIPMENT:
        return (
          <span className={`${commonClass} bg-blue-500/10 text-blue-700 border border-blue-500/25`}>
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            {t.legendEquipment}
          </span>
        );
      default:
        return null;
    }
  };

  const getSituationLabel = (situation: string) => {
    if (situation === "Angle") return t.lotSituationAngle;
    if (situation === "Standard") return t.lotSituationStandard;
    return t.lotSituationDouble;
  };

  // Submit available lot request
  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!investorName || !email || !phone) {
      alert(isRtl ? "يرجى ملء الحقول الإجبارية" : "Veuillez remplir les champs obligatoires");
      return;
    }

    const newRequest = {
      id: "req_" + Date.now(),
      companyName: companyName || "N/A",
      investorName,
      email,
      phone,
      activity: activity || "N/A",
      lotRequested: lot.number,
      description: projectDescription || "N/A",
      date: new Date().toISOString().split("T")[0],
      status: "new"
    };

    if (onSubmitRequest) {
      onSubmitRequest(newRequest);
    } else {
      // Local fallback
      const saved = localStorage.getItem("sidi_bou_othmane_messages") || "[]";
      try {
        const list = JSON.parse(saved);
        list.unshift(newRequest);
        localStorage.setItem("sidi_bou_othmane_messages", JSON.stringify(list));
      } catch (err) {
        console.error("Local storage error:", err);
      }
    }

    setIsReservedSuccess(true);
    setTimeout(() => {
      setIsReservedSuccess(false);
      setShowReservationForm(false);
      // Clean fields
      setInvestorName("");
      setCompanyName("");
      setEmail("");
      setPhone("");
      setActivity("");
      setProjectDescription("");
    }, 3000);
  };

  // Submit company contact
  const handleCompanyContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      alert(isRtl ? "يرجى ملء جميع الحقول" : "Veuillez remplir tous les champs");
      return;
    }

    // Save as local inquiry or lead
    const newInquiry = {
      id: "inq_" + Date.now(),
      companyName: lot.companyName || "N/A",
      investorName: contactName,
      email: contactEmail,
      phone: lot.contact?.phone || "N/A",
      activity: "Direct Company Contact",
      lotRequested: lot.number,
      description: `Message to ${lot.companyName}: ${contactMessage}`,
      date: new Date().toISOString().split("T")[0],
      status: "new"
    };

    if (onSubmitRequest) {
      onSubmitRequest(newInquiry);
    } else {
      const saved = localStorage.getItem("sidi_bou_othmane_messages") || "[]";
      try {
        const list = JSON.parse(saved);
        list.unshift(newInquiry);
        localStorage.setItem("sidi_bou_othmane_messages", JSON.stringify(list));
      } catch (err) {
        console.error("Local storage error:", err);
      }
    }

    setIsContactSuccess(true);
    setTimeout(() => {
      setIsContactSuccess(false);
      setShowCompanyContact(false);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    }, 3000);
  };

  // Socials fallback helper
  const getSocialUrl = (platform: string) => {
    const defaultUrls: Record<string, string> = {
      facebook: "facebook.com",
      instagram: "instagram.com",
      linkedin: "linkedin.com"
    };
    // Fetch from mock social objects or generate a clean anchor
    const handler = (lot as any).social?.[platform];
    if (handler) {
      return handler.startsWith("http") ? handler : `https://${handler}`;
    }
    return `https://${platform}.com`;
  };

  const getWhatsappUrl = () => {
    const rawPhone = lot.contact?.phone || "";
    const cleanPhone = rawPhone.replace(/\s+/g, "").replace("+", "");
    return `https://wa.me/${cleanPhone || "212600000000"}`;
  };

  const getCatalogueUrl = () => {
    return (lot as any).pdfCatalogue || "#";
  };

  return (
    <>
      {/* Backdrop overlay (completely transparent and non-blurring to keep map 100% visible) */}
      <div
        className="fixed inset-0 bg-transparent z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Right Drawer Panel with premium bright white theme */}
      <div
        className={`fixed top-0 bottom-0 z-50 w-full max-w-[440px] bg-white shadow-2xl border-l border-gray-150 flex flex-col h-full transform transition-transform duration-300 ease-out ${
          isRtl ? "left-0 border-r" : "right-0"
        }`}
      >
        {/* Drawer Header */}
        <div className={`p-5 border-b border-gray-100 flex items-center justify-between bg-white ${isRtl ? "flex-row-reverse" : ""}`}>
          <div className={`flex items-center gap-2.5 ${isRtl ? "flex-row-reverse" : ""}`}>
            <span className="p-2 bg-blue-500 text-white rounded-lg text-sm font-black font-mono">
              #{lot.number}
            </span>
            <h2 className="text-lg font-bold text-gray-900">
              {t.lotDetailsTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
            aria-label={t.drawerClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-6 custom-scrollbar bg-white">
          {/* Company branding or Available Header */}
          <div className={`flex items-start gap-4 ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}>
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 shadow-sm flex items-center justify-center text-blue-600 shrink-0 font-bold text-xl font-sans overflow-hidden">
              {isAvailable ? (
                <span className="text-blue-500 font-mono">#{lot.number}</span>
              ) : (
                lot.logoText || <Building className="w-8 h-8 text-blue-500" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 leading-tight">
                {isAvailable
                  ? (isRtl ? "Aucune entreprise installée" : "Aucune entreprise installée")
                  : lot.companyName}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {isAvailable
                  ? (isRtl ? `البقعة الصناعية رقم ${lot.number}` : `Lot de terre N° ${lot.number}`)
                  : (lot.activity || t.legendRoadGreen)}
              </p>
              <div className="mt-2.5">{getStatusBadge(lot.status)}</div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Lot Attributes Grid - Official Cadastral Information Only */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
            <div className={isRtl ? "text-right" : "text-left"}>
              <span className="text-xs font-semibold text-gray-400 block tracking-wide">
                {t.lotTranche}
              </span>
              <span className="text-sm font-bold text-gray-800">{lot.tranche}</span>
            </div>
            <div className={isRtl ? "text-right" : "text-left"}>
              <span className="text-xs font-semibold text-gray-400 block tracking-wide">
                {t.lotSurface}
              </span>
              <span className="text-sm font-bold text-gray-800 font-mono">{lot.surface} m²</span>
            </div>
            <div className={isRtl ? "text-right" : "text-left"}>
              <span className="text-xs font-semibold text-gray-400 block tracking-wide">
                {t.lotRoad}
              </span>
              <span className="text-sm font-bold text-gray-800">{lot.road}</span>
            </div>
            <div className={isRtl ? "text-right" : "text-left"}>
              <span className="text-xs font-semibold text-gray-400 block tracking-wide">
                {t.lotSituation}
              </span>
              <span className="text-sm font-bold text-gray-800">{getSituationLabel(lot.situation)}</span>
            </div>
            <div className={isRtl ? "text-right" : "text-left"}>
              <span className="text-xs font-semibold text-gray-400 block tracking-wide">
                {isRtl ? "القطاع النشاطي" : "Secteur d'activité"}
              </span>
              <span className="text-sm font-bold text-gray-800 truncate block">
                {lot.sector || (isRtl ? "صناعي" : "Industriel")}
              </span>
            </div>
            <div className={isRtl ? "text-right" : "text-left"}>
              <span className="text-xs font-semibold text-gray-400 block tracking-wide">
                {t.lotPrice}
              </span>
              <span className="text-sm font-black text-blue-600">{t.lotPriceOnDemand}</span>
            </div>
          </div>

          {/* IF OCCUPIED: Display full rich company profiles */}
          {!isAvailable && (
            <>
              {/* Description Section */}
              {lot.description && (
                <div className={`flex flex-col gap-1.5 ${isRtl ? "text-right" : "text-left"}`}>
                  <h4 className="text-xs font-bold text-gray-400 tracking-wider">
                    {t.lotDescription.toUpperCase()}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed bg-white p-3.5 rounded-xl border border-gray-150 shadow-xs">
                    {lot.description}
                  </p>
                </div>
              )}

              {/* Products & Services */}
              {lot.services && lot.services.length > 0 && (
                <div className={`flex flex-col gap-2 ${isRtl ? "text-right" : "text-left"}`}>
                  <h4 className="text-xs font-bold text-gray-400 tracking-wider">
                    {isRtl ? "المنتجات والخدمات" : "Produits & Services"}
                  </h4>
                  <div className={`flex flex-wrap gap-1.5 ${isRtl ? "flex-row-reverse" : ""}`}>
                    {lot.services.map((service, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 bg-blue-50 border border-blue-100 rounded-lg text-xs font-semibold text-blue-700 shadow-xs"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Company Gallery */}
              {lot.gallery && lot.gallery.length > 0 && (
                <div className={`flex flex-col gap-2.5 ${isRtl ? "text-right" : "text-left"}`}>
                  <h4 className="text-xs font-bold text-gray-400 tracking-wider">
                    {t.lotGallery.toUpperCase()}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {lot.gallery.map((imgUrl, index) => (
                      <div key={index} className="aspect-video bg-gray-100 rounded-xl overflow-hidden border border-gray-150 shadow-inner hover:scale-105 transition-transform duration-200">
                        <img
                          src={imgUrl}
                          alt={`Facility ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PDF Catalogue & Social Channels */}
              <div className="flex flex-col gap-4 border-t border-gray-100 pt-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-gray-400 tracking-wider">
                    {isRtl ? "المستندات والتواصل الاجتماعي" : "Ressources & Réseaux Sociaux"}
                  </h4>
                </div>

                <div className="flex flex-col gap-2">
                  {/* Download Catalogue PDF */}
                  <a
                    href={getCatalogueUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (getCatalogueUrl() === "#") {
                        e.preventDefault();
                        alert(isRtl ? "الكتالوج غير متوفر حالياً لهذه الشركة." : "Le catalogue PDF n'est pas configuré pour cette entreprise.");
                      }
                    }}
                    className="flex items-center justify-between p-3 bg-red-50 hover:bg-red-100 border border-red-100 text-red-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {isRtl ? "تحميل كتالوج المنتجات (PDF)" : "Télécharger le Catalogue (PDF)"}
                    </span>
                    <Download className="w-3.5 h-3.5" />
                  </a>

                  {/* Social Buttons Row */}
                  <div className="grid grid-cols-4 gap-2 mt-1">
                    {/* Facebook */}
                    <a
                      href={getSocialUrl("facebook")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center text-blue-600 transition-colors"
                      title="Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                    {/* Instagram */}
                    <a
                      href={getSocialUrl("instagram")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center text-pink-600 transition-colors"
                      title="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    {/* LinkedIn */}
                    <a
                      href={getSocialUrl("linkedin")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center text-sky-700 transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    {/* WhatsApp */}
                    <a
                      href={getWhatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl flex items-center justify-center text-emerald-600 transition-colors"
                      title="WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Company Message Form */}
              <div className="border-t border-gray-100 pt-5">
                {!showCompanyContact ? (
                  <button
                    onClick={() => setShowCompanyContact(true)}
                    className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200/50 py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    {isRtl ? "ارسل رسالة مباشرة للشركة" : "Contacter l'entreprise directement"}
                  </button>
                ) : (
                  <form onSubmit={handleCompanyContactSubmit} className="bg-slate-50 p-4 border border-slate-200/50 rounded-2xl flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">
                        {isRtl ? "رسالة جديدة" : "Message Direct"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowCompanyContact(false)}
                        className="text-xs text-slate-400 hover:text-slate-600"
                      >
                        {isRtl ? "إلغاء" : "Annuler"}
                      </button>
                    </div>

                    {isContactSuccess ? (
                      <div className="p-3 bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                        <CheckCircle className="w-4.5 h-4.5" />
                        <span>{isRtl ? "تم إرسال الرسالة بنجاح!" : "Message envoyé avec succès !"}</span>
                      </div>
                    ) : (
                      <>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder={isRtl ? "الاسم الكامل" : "Nom complet"}
                          className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder={isRtl ? "البريد الإلكتروني" : "Adresse email"}
                          className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                          required
                          rows={3}
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          placeholder={isRtl ? "نص الرسالة..." : "Votre message..."}
                          className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs focus:ring-2 focus:ring-blue-500 leading-normal"
                        />
                        <button
                          type="submit"
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <Send className="w-3.5 h-3.5" />
                          {isRtl ? "إرسال" : "Envoyer"}
                        </button>
                      </>
                    )}
                  </form>
                )}
              </div>
            </>
          )}

          {/* IF AVAILABLE: Reservation Investment Request Form */}
          {isAvailable && (
            <div className="border-t border-gray-100 pt-5 flex flex-col gap-4">
              {!showReservationForm ? (
                <div className="flex flex-col gap-2.5">
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-xs text-emerald-800 leading-relaxed font-medium">
                    {isRtl
                      ? "هذه البقعة الأرضية شاغرة حالياً ومتاحة للاقتناء لفائدة المستثمرين الصناعيين."
                      : "Cette parcelle cadastrale est actuellement disponible à l'acquisition pour les investisseurs industriels."}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={() => setShowReservationForm(true)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/10 cursor-pointer transition-all uppercase"
                    >
                      <Building className="w-4 h-4" />
                      {t.buyThisLot}
                    </button>
                    <button
                      onClick={() => setShowReservationForm(true)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/10 cursor-pointer transition-all uppercase"
                    >
                      <FileText className="w-4 h-4" />
                      {t.requestLotBtn}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleReservationSubmit} className="bg-slate-50 p-4 border border-slate-200/50 rounded-2xl flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b border-slate-200/50 pb-2 mb-1">
                    <span className="text-xs font-extrabold text-slate-800">
                      {isRtl ? "طلب حجز واستثمار" : "Formulaire d'Investissement"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowReservationForm(false)}
                      className="text-xs font-bold text-slate-400 hover:text-slate-600"
                    >
                      {isRtl ? "إلغاء" : "Annuler"}
                    </button>
                  </div>

                  {isReservedSuccess ? (
                    <div className="p-3.5 bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 shrink-0" />
                      <span>{isRtl ? "تم إرسال طلبكم بنجاح! سيقوم فريق الاستثمار بالاتصال بكم." : "Votre demande a été soumise avec succès ! Un conseiller vous contactera."}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      {/* Name */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">{isRtl ? "الاسم الكامل للمستثمر" : "Nom complet de l'investisseur"} *</label>
                        <input
                          type="text"
                          required
                          value={investorName}
                          onChange={(e) => setInvestorName(e.target.value)}
                          placeholder="Ex: Mohamed Alami"
                          className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs"
                        />
                      </div>

                      {/* Company Name */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">{isRtl ? "اسم الشركة / المؤسسة" : "Nom de l'entreprise"}</label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Ex: Alami Industries"
                          className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs"
                        />
                      </div>

                      {/* Contact grid */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">{isRtl ? "البريد الإلكتروني" : "Email"} *</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="m.alami@entreprise.ma"
                            className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">{isRtl ? "الهاتف" : "Téléphone"} *</label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+212 600..."
                            className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-mono"
                          />
                        </div>
                      </div>

                      {/* Activity */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">{isRtl ? "النشاط الصناعي المزمع إنشاؤه" : "Activité industrielle envisagée"}</label>
                        <input
                          type="text"
                          value={activity}
                          onChange={(e) => setActivity(e.target.value)}
                          placeholder="Ex: Agro-industrie, Métallurgie..."
                          className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs"
                        />
                      </div>

                      {/* Project description */}
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">{isRtl ? "وصف موجز للمشروع الاستثماري" : "Description succincte du projet"}</label>
                        <textarea
                          rows={3}
                          value={projectDescription}
                          onChange={(e) => setProjectDescription(e.target.value)}
                          placeholder={isRtl ? "عدد مناصب الشغل المرتقبة، حجم الاستثمار..." : "Montant d'investissement estimé, emplois à créer..."}
                          className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs leading-normal"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-xs mt-1 transition-all"
                      >
                        {isRtl ? "إرسال طلب الاستثمار" : "Soumettre ma demande d'achat"}
                      </button>
                    </div>
                  )}
                </form>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-5 border-t border-gray-100 bg-white flex flex-col gap-2">
          {/* Google Maps directions */}
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${lot.lat},${lot.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-white hover:bg-gray-150 border border-gray-200 text-gray-700 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all duration-150 cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-red-500" />
            {t.btnGoogleMaps}
          </a>

          {/* Download Brochure */}
          <button
            onClick={() => {
              alert(
                isRtl
                  ? `جاري تحميل بطاقة البقعة ${lot.number} بصيغة PDF...`
                  : `Téléchargement de la fiche technique du Lot ${lot.number} au format PDF...`
              );
            }}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all duration-150 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            {t.btnDownloadProfile}
          </button>
        </div>
      </div>
    </>
  );
}
