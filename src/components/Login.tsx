import React, { useState, useEffect } from "react";
import { KeyRound, Mail, ShieldAlert, ShieldCheck, Eye, EyeOff, Loader2, ArrowLeft, Info, HelpCircle } from "lucide-react";
import { Language } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface LoginProps {
  language: Language;
  onLoginSuccess: (user: any) => void;
  onBackToPublic: () => void;
}

const DEFAULT_USERS = [
  {
    email: "superadmin@industry.gov.ma",
    password: "superadmin_sbo",
    name: "Mourad El Alami",
    role: "Super Admin",
    title: "Directeur National des Zones Industrielles",
    avatarColor: "bg-indigo-650",
    descFR: "Accès total : gestion du cadastre, fiches entreprises, publications, et comptes d'utilisateurs.",
    descAR: "صلاحية كاملة: إدارة المخطط العقاري، فضاء المقاولات، الأخبار، وإدارة المستخدمين."
  },
  {
    email: "admin@industry.gov.ma",
    password: "admin_sbo",
    name: "Fatima-Zahra Bennani",
    role: "Admin",
    title: "Directrice d'Aménagement Régional",
    avatarColor: "bg-blue-600",
    descFR: "Accès d'administration : gestion complète du cadastre, des entreprises et actualités.",
    descAR: "صلاحية إدارة: تسيير كامل للمخطط العقاري، الشركات المستقرة، والأخبار."
  },
  {
    email: "editor@industry.gov.ma",
    password: "editor_sbo",
    name: "Youssef Benjelloun",
    role: "Editor",
    title: "Chargé d'Information et Communication",
    avatarColor: "bg-emerald-600",
    descFR: "Accès d'édition : gestion des actualités, de l'agenda et de la galerie uniquement.",
    descAR: "صلاحية تحرير: إدارة الأخبار والفعاليات ومعرض الصور فقط."
  },
  {
    email: "viewer@industry.gov.ma",
    password: "viewer_sbo",
    name: "Anas Bouaza",
    role: "Viewer",
    title: "Auditeur & Inspecteur Technique",
    avatarColor: "bg-slate-600",
    descFR: "Accès en lecture seule : consultation des statistiques, demandes investisseurs et données.",
    descAR: "صلاحية قراءة فقط: الاطلاع على الإحصائيات، طلبات الاستثمار، والبيانات."
  }
];

export default function Login({ language, onLoginSuccess, onBackToPublic }: LoginProps) {
  const isRtl = language === "AR";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotResult, setForgotResult] = useState<string | null>(null);
  const [showForgotForm, setShowForgotForm] = useState(false);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  // Initialize users database in localStorage if not already present
  useEffect(() => {
    const saved = localStorage.getItem("sidi_bou_othmane_users");
    if (!saved) {
      localStorage.setItem("sidi_bou_othmane_users", JSON.stringify(DEFAULT_USERS));
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const usersStr = localStorage.getItem("sidi_bou_othmane_users") || JSON.stringify(DEFAULT_USERS);
      let users = DEFAULT_USERS;
      try {
        users = JSON.parse(usersStr);
      } catch (err) {}

      const foundUser = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
      );

      if (foundUser) {
        // Save current user session
        localStorage.setItem("sidi_bou_othmane_current_user", JSON.stringify(foundUser));
        onLoginSuccess(foundUser);
      } else {
        setError(
          isRtl
            ? "البريد الإلكتروني أو رمز المرور خاطئ"
            : "Adresse email ou mot de passe incorrect."
        );
      }
      setLoading(false);
    }, 850);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotResult(null);

    const usersStr = localStorage.getItem("sidi_bou_othmane_users") || JSON.stringify(DEFAULT_USERS);
    let users = DEFAULT_USERS;
    try {
      users = JSON.parse(usersStr);
    } catch (err) {}

    const matchedUser = users.find((u) => u.email.toLowerCase() === forgotEmail.toLowerCase().trim());

    if (matchedUser) {
      setForgotResult(
        isRtl
          ? `مرحباً ${matchedUser.name}، رمز المرور الخاص بك هو: ${matchedUser.password}`
          : `Bonjour ${matchedUser.name}, votre mot de passe pour ce compte de démonstration est : "${matchedUser.password}"`
      );
    } else {
      setForgotResult(
        isRtl
          ? "لم يتم العثور على أي حساب بهذا البريد الإلكتروني"
          : "Aucun compte n'est enregistré avec cette adresse e-mail."
      );
    }
  };

  const useDemoAccount = (acc: any) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setShowDemoAccounts(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans select-none selection:bg-blue-500 selection:text-white" dir={isRtl ? "rtl" : "ltr"}>
      {/* Dynamic ambient grid layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

      {/* Futuristic floating blur filters */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main card box with backdrop blur */}
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 flex flex-col gap-6">
        
        {/* Moroccan Ministry and Platform Branding */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/10 border border-indigo-400/20">
            <KeyRound className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase block">
              {isRtl ? "المملكة المغربية • وزارة الصناعة" : "Royaume du Maroc • Ministère de l'Industrie"}
            </span>
            <h1 className="text-xl font-extrabold text-white tracking-tight mt-1">
              {isRtl ? "لوحة التحكم الصناعية" : "Portail de Gestion Industrielle"}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {isRtl ? "سيدي بوعثمان - نظام الحوكمة الشامل" : "Sidi Bou Othmane - SaaS Platform Control Room"}
            </p>
          </div>
        </div>

        {/* Form elements container */}
        <div className="mt-2">
          {!showForgotForm ? (
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              
              {/* Email Input */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {isRtl ? "البريد الإلكتروني للإدارة" : "E-mail administratif"}
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ex: admin@industry.gov.ma"
                    className="w-full bg-slate-950/60 text-slate-100 text-xs border border-slate-800 rounded-xl py-3 pr-4 pl-10 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-1.5 text-left">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {isRtl ? "رمز المرور السري" : "Mot de passe"}
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotForm(true)}
                    className="text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                  >
                    {isRtl ? "نسيت الرمز؟" : "Mot de passe oublié ?"}
                  </button>
                </div>
                <div className="relative flex items-center">
                  <KeyRound className="absolute left-3 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950/60 text-slate-100 text-xs border border-slate-800 rounded-xl py-3 pr-10 pl-10 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 p-1 text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error messages if authentication fails */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 bg-red-950/40 border border-red-800/40 text-red-400 p-3 rounded-xl text-xs"
                  >
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/10 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>{isRtl ? "جاري التحقق من الهوية..." : "Authentification en cours..."}</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isRtl ? "تسجيل الدخول الآمن" : "Connexion sécurisée"}</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Forgot Password Form */
            <form onSubmit={handleForgotPassword} className="flex flex-col gap-4 animate-fade-in text-left">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-bold text-white">
                  {isRtl ? "استعادة رمز المرور" : "Récupération de clé"}
                </h3>
                <p className="text-xs text-slate-400">
                  {isRtl 
                    ? "أدخل البريد الإلكتروني للحساب لعرض رمز المرور الخاص به فورا." 
                    : "Saisissez l'e-mail du compte pour obtenir immédiatement son code d'accès de démo."}
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Adresse e-mail</label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="ex: superadmin@industry.gov.ma"
                    className="w-full bg-slate-950/60 text-slate-100 text-xs border border-slate-800 rounded-xl py-3 pr-4 pl-10 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              {forgotResult && (
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs text-indigo-300 leading-normal font-medium flex items-start gap-2">
                  <Info className="w-4 h-4 shrink-0 text-indigo-400 mt-0.5" />
                  <span>{forgotResult}</span>
                </div>
              )}

              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotForm(false);
                    setForgotResult(null);
                    setForgotEmail("");
                  }}
                  className="w-1/2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{isRtl ? "رجوع" : "Retour"}</span>
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/10 cursor-pointer"
                >
                  {isRtl ? "إظهار الرمز" : "Obtenir le code"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Demo Roles Expansion Tray */}
        <div className="border-t border-slate-800 pt-4 flex flex-col gap-2">
          <button
            onClick={() => setShowDemoAccounts(!showDemoAccounts)}
            className="w-full flex items-center justify-between text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors py-1 cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" />
              {isRtl ? "حسابات العرض السريعة (تسهيل المراجعة)" : "Comptes de test rapide (Accès Rôles)"}
            </span>
            <span className="text-[9px] uppercase bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
              {showDemoAccounts ? (isRtl ? "إخفاء" : "Masquer") : (isRtl ? "عرض" : "Afficher")}
            </span>
          </button>

          <AnimatePresence>
            {showDemoAccounts && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden flex flex-col gap-1.5 pt-2"
              >
                {DEFAULT_USERS.map((acc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => useDemoAccount(acc)}
                    className="flex items-center justify-between p-2.5 bg-slate-950/40 hover:bg-slate-950 border border-slate-850 hover:border-slate-800 rounded-xl transition-all cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full ${acc.avatarColor}`} />
                      <div>
                        <span className="text-[10px] font-bold text-slate-200 block">{acc.name}</span>
                        <span className="text-[8px] text-slate-500 font-medium block">{acc.title}</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-extrabold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md uppercase">
                      {acc.role}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Return Button */}
        <button
          onClick={onBackToPublic}
          className="text-center text-[10px] font-semibold text-slate-500 hover:text-slate-300 transition-colors uppercase cursor-pointer flex items-center justify-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isRtl ? "العودة للموقع العام" : "Retourner au portail public"}</span>
        </button>
      </div>
    </div>
  );
}
