import React, { useState, useMemo } from "react";
import { Search, Calendar, Tag, ArrowRight, X } from "lucide-react";
import { Language } from "../types";

export interface NewsArticle {
  id: number;
  titleFR: string;
  titleAR: string;
  titleEN: string;
  date: string;
  image: string;
  summaryFR: string;
  summaryAR: string;
  summaryEN: string;
  contentFR: string;
  contentAR: string;
  contentEN: string;
  categoryFR: string;
  categoryAR: string;
  categoryEN: string;
  published: boolean;
}

interface NewsSectionProps {
  language: Language;
  news: NewsArticle[];
}

export default function NewsSection({ language, news }: NewsSectionProps) {
  const isRtl = language === "AR";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Filter published news by query
  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      if (!item.published) return false;
      const term = searchTerm.toLowerCase();
      if (language === "AR") {
        return (
          item.titleAR.toLowerCase().includes(term) ||
          item.summaryAR.toLowerCase().includes(term) ||
          item.categoryAR.toLowerCase().includes(term)
        );
      } else if (language === "EN") {
        return (
          item.titleEN.toLowerCase().includes(term) ||
          item.summaryEN.toLowerCase().includes(term) ||
          item.categoryEN.toLowerCase().includes(term)
        );
      } else {
        return (
          item.titleFR.toLowerCase().includes(term) ||
          item.summaryFR.toLowerCase().includes(term) ||
          item.categoryFR.toLowerCase().includes(term)
        );
      }
    });
  }, [news, searchTerm, language]);

  const getTitle = (item: NewsArticle) => {
    if (language === "AR") return item.titleAR;
    if (language === "EN") return item.titleEN;
    return item.titleFR;
  };

  const getSummary = (item: NewsArticle) => {
    if (language === "AR") return item.summaryAR;
    if (language === "EN") return item.summaryEN;
    return item.summaryFR;
  };

  const getContent = (item: NewsArticle) => {
    if (language === "AR") return item.contentAR;
    if (language === "EN") return item.contentEN;
    return item.contentFR;
  };

  const getCategory = (item: NewsArticle) => {
    if (language === "AR") return item.categoryAR;
    if (language === "EN") return item.categoryEN;
    return item.categoryFR;
  };

  return (
    <div className="flex flex-col gap-6" dir={isRtl ? "rtl" : "ltr"}>
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-150 pb-5">
        <div className={isRtl ? "text-right" : "text-left"}>
          <h2 className="text-2xl font-black text-gray-900">
            {language === "AR" ? "أخبار المنطقة الصناعية" : language === "EN" ? "Industrial Zone News" : "Actualités de la Zone"}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {language === "AR"
              ? "متابعة مستمرة لآخر المستجدات والأشغال والمشاريع الاستثمارية الجديدة."
              : language === "EN"
              ? "Stay updated with the latest developments, infrastructural works, and projects."
              : "Suivez l'actualité des aménagements, des inaugurations et de la vie de la zone."}
          </p>
        </div>

        {/* Mini Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              language === "AR" ? "البحث في الأخبار..." : language === "EN" ? "Search news articles..." : "Rechercher un article..."
            }
            className={`w-full bg-slate-50 border border-gray-200 text-sm rounded-xl py-2.5 px-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
              isRtl ? "text-right pr-10" : "text-left pl-10"
            }`}
          />
          <Search className={`absolute top-3 w-4.5 h-4.5 text-gray-400 ${isRtl ? "right-3" : "left-3"}`} />
        </div>
      </div>

      {/* Grid List */}
      {filteredNews.length === 0 ? (
        <div className="py-12 text-center bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
          <p className="text-sm text-gray-500 font-semibold">
            {language === "AR" ? "لا توجد أخبار تطابق بحثكم." : language === "EN" ? "No news matches your search." : "Aucune actualité ne correspond à votre recherche."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-gray-100 hover:border-blue-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:scale-[1.01] transition-all duration-200 flex flex-col h-full cursor-pointer"
              onClick={() => setSelectedArticle(item)}
            >
              {/* Cover Image */}
              <div className="aspect-video w-full bg-slate-100 relative overflow-hidden">
                <img
                  src={item.image || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400"}
                  alt={getTitle(item)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className={`absolute top-3 ${isRtl ? "left-3" : "right-3"} bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm uppercase`}>
                  {getCategory(item)}
                </span>
              </div>

              {/* Text Body */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className={`flex items-center gap-1.5 text-[10px] font-bold text-gray-400 font-mono ${isRtl ? "flex-row-reverse" : ""}`}>
                    <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className={`text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug ${isRtl ? "text-right" : "text-left"}`}>
                    {getTitle(item)}
                  </h3>
                  <p className={`text-xs text-gray-500 line-clamp-3 leading-relaxed mt-1 ${isRtl ? "text-right" : "text-left"}`}>
                    {getSummary(item)}
                  </p>
                </div>

                {/* Footer read more indicator */}
                <div className={`flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:underline border-t border-gray-50 pt-3 ${isRtl ? "flex-row-reverse" : ""}`}>
                  <span>{language === "AR" ? "اقرأ المزيد" : language === "EN" ? "Read More" : "Lire la suite"}</span>
                  <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${isRtl ? "rotate-180" : ""}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Article Detail Overlay Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div
            className="fixed inset-0"
            onClick={() => setSelectedArticle(null)}
          />
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative z-10 border border-slate-100 flex flex-col">
            {/* Modal Header Cover */}
            <div className="aspect-[21/9] w-full bg-slate-100 relative">
              <img
                src={selectedArticle.image}
                alt={getTitle(selectedArticle)}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedArticle(null)}
                className={`absolute top-4 ${isRtl ? "left-4" : "right-4"} p-2 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition-all cursor-pointer`}
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Modal Text content */}
            <div className="p-6 md:p-8 flex flex-col gap-5">
              <div className={`flex items-center justify-between border-b border-gray-100 pb-3 ${isRtl ? "flex-row-reverse" : ""}`}>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg border border-blue-100">
                  {getCategory(selectedArticle)}
                </span>
                <span className="text-xs font-bold text-gray-400 font-mono">
                  {selectedArticle.date}
                </span>
              </div>

              <div className={isRtl ? "text-right" : "text-left"}>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-snug">
                  {getTitle(selectedArticle)}
                </h3>
                <p className="text-sm font-semibold text-blue-600 mt-2.5 leading-relaxed bg-blue-50/20 p-3 rounded-xl border border-blue-50/50">
                  {getSummary(selectedArticle)}
                </p>
                <div className="text-sm text-slate-600 leading-relaxed mt-5 whitespace-pre-line border-t border-gray-100 pt-5">
                  {getContent(selectedArticle)}
                </div>
              </div>
            </div>

            {/* Modal Close Action */}
            <div className="p-4 border-t border-gray-150 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                {language === "AR" ? "إغلاق" : language === "EN" ? "Close" : "Fermer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
