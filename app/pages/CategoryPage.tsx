import { useEffect, useMemo, useState } from "react";
import { useParams, Link, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, Share2, Link as LinkIcon, Star, StarOff } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import MainContent from "@/components/MainContent";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getTranslation } from "@/lib/translations";
import type { Language } from "@/types";

type CategoryMeta = {
  title: string;
  description: string;
};

function normalizeCategory(raw: string) {
  return decodeURIComponent(raw || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function titleCase(input: string) {
  return input
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold text-foreground/90 dark:text-white/90">
      {children}
    </span>
  );
}

const CategoryPage = () => {
  const params = useParams<{ category: string }>();
  const { language } = useLanguage();
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  const categoryRaw = params.category;

  // If route param missing, go home
  if (!categoryRaw) return <Navigate to="/" replace />;

  const category = useMemo(() => normalizeCategory(categoryRaw), [categoryRaw]);

  const metaByLang: Record<Language, Record<string, CategoryMeta>> = useMemo(
    () => ({
      en: {
        cricket: {
          title: "Cricket",
          description: "Latest cricket news, match analysis, highlights, and updates.",
        },
        football: {
          title: "Football",
          description: "Breaking football stories, fixtures, results, and commentary.",
        },
        tennis: {
          title: "Tennis",
          description: "Grand Slams, ATP/WTA updates, and match breakdowns.",
        },
        hockey: {
          title: "Hockey",
          description: "International hockey news, tournaments, and key moments.",
        },
        others: {
          title: "Sports",
          description: "Curated updates across multiple sports.",
        },
      },
      bn: {
        cricket: {
          title: "ক্রিকেট",
          description: "সর্বশেষ ক্রিকেট নিউজ, ম্যাচ বিশ্লেষণ, হাইলাইটস এবং আপডেট।",
        },
        football: {
          title: "ফুটবল",
          description: "ফুটবলের ব্রেকিং নিউজ, ফিক্সচার, ফলাফল এবং বিশ্লেষণ।",
        },
        tennis: {
          title: "টেনিস",
          description: "গ্র্যান্ড স্ল্যাম, ATP/WTA আপডেট এবং ম্যাচ বিশ্লেষণ।",
        },
        hockey: {
          title: "হকি",
          description: "আন্তর্জাতিক হকি নিউজ, টুর্নামেন্ট এবং গুরুত্বপূর্ণ মুহূর্ত।",
        },
        others: {
          title: "খেলা",
          description: "বিভিন্ন খেলার নির্বাচিত আপডেট।",
        },
      },
    }),
    []
  );

  const display = useMemo(() => {
    const map = metaByLang[language];
    return (
      map[category] ||
      map.others || {
        title: language === "bn" ? titleCase(category) : titleCase(category),
        description:
          language === "bn"
            ? "এই ক্যাটাগরির সর্বশেষ পোস্টগুলো দেখুন।"
            : "Browse the latest posts in this category.",
      }
    );
  }, [category, language, metaByLang]);

  // Follow category in localStorage
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("followed:categories");
      const list = raw ? (JSON.parse(raw) as string[]) : [];
      setFollowed(list.includes(category));
    } catch {
      setFollowed(false);
    }
  }, [category]);

  const toggleFollow = () => {
    try {
      const raw = localStorage.getItem("followed:categories");
      const list = raw ? (JSON.parse(raw) as string[]) : [];
      const next = list.includes(category)
        ? list.filter((x) => x !== category)
        : [...list, category];
      localStorage.setItem("followed:categories", JSON.stringify(next));
      setFollowed(next.includes(category));
    } catch {
      // ignore
    }
  };

  // Share/copy link
  const [copied, setCopied] = useState(false);
  const pageUrl = useMemo(() => window.location.origin + location.pathname, [location.pathname]);

  const handleShare = async () => {
    try {
      // @ts-ignore
      if (navigator.share) {
        // @ts-ignore
        await navigator.share({ title: display.title, url: pageUrl });
        return;
      }
    } catch {
      // user cancelled share — ignore
    }

    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.prompt("Copy this link:", pageUrl);
    }
  };

  // UX: scroll top + document title
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title =
      language === "bn"
        ? `${display.title} | SportsBlogBD`
        : `${display.title} | SportsBlogBD`;
  }, [category, language, display.title]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${category}-${language}`}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? false : { opacity: 1 }}
        exit={reduceMotion ? false : { opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="min-h-screen bg-background dark:bg-gray-900"
      >
        <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <Link to="/">
              <Button variant="ghost" className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800">
                <ArrowLeft className="mr-2" size={18} />
                {getTranslation(language, "backToHome")}
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={toggleFollow}>
                {followed ? <StarOff className="mr-2" size={16} /> : <Star className="mr-2" size={16} />}
                {language === "bn" ? (followed ? "আনফলো" : "ফলো") : followed ? "Unfollow" : "Follow"}
              </Button>

              <Button variant="outline" onClick={handleShare}>
                {copied ? <LinkIcon className="mr-2" size={16} /> : <Share2 className="mr-2" size={16} />}
                {copied ? (language === "bn" ? "কপি হয়েছে" : "Copied") : language === "bn" ? "শেয়ার" : "Share"}
              </Button>
            </div>
          </div>

          {/* Header card */}
          <Card className="p-5 sm:p-7 mb-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="min-w-0">
                <div className="text-xs text-muted-foreground mb-2">
                  <Link className="hover:underline" to="/">
                    {language === "bn" ? "হোম" : "Home"}
                  </Link>
                  <span className="mx-2">/</span>
                  <span className="text-foreground/80 dark:text-white/80">{display.title}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground dark:text-white">
                  {display.title}
                </h1>

                <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-3xl">
                  {display.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Pill>{language === "bn" ? "সর্বশেষ" : "Latest"}</Pill>
                  <Pill>{language === "bn" ? "ট্রেন্ডিং" : "Trending"}</Pill>
                  {followed ? <Pill>{language === "bn" ? "ফলো করা" : "Following"}</Pill> : null}
                </div>
              </div>

              <div className="md:pt-1">
                <div className="text-xs text-muted-foreground">
                  {language === "bn" ? "ক্যাটাগরি স্লাগ" : "Category slug"}
                </div>
                <div className="mt-1 font-mono text-sm text-foreground/80 dark:text-white/80">
                  /category/{category}
                </div>
              </div>
            </div>
          </Card>

          {/* Content + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 xl:col-span-9">
              {/* Pass normalized category */}
              <MainContent category={category} />
            </div>

            <div className="lg:col-span-4 xl:col-span-3">
              <div className="space-y-6 lg:sticky lg:top-24">
                <Sidebar />

                {/* Extra module: Category tips / CTA */}
                <Card className="p-5">
                  <div className="font-bold text-foreground dark:text-white">
                    {language === "bn" ? "দ্রুত টিপস" : "Quick tips"}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {language === "bn"
                      ? "এই ক্যাটাগরির পোস্টগুলো বুকমার্ক করে রাখুন এবং নিয়মিত আপডেট পেতে ফলো করুন।"
                      : "Follow this category for updates and bookmark articles you like."}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" onClick={toggleFollow} className="w-full">
                      {followed ? (language === "bn" ? "আনফলো" : "Unfollow") : language === "bn" ? "ফলো" : "Follow"}
                    </Button>
                    <Button onClick={handleShare} className="w-full">
                      {language === "bn" ? "শেয়ার" : "Share"}
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CategoryPage;
