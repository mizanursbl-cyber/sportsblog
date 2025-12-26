import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Clock, Search, X, TrendingUp } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import HeroSection from "@/components/HeroSection";
import MainContent from "@/components/MainContent";
import Sidebar from "@/components/Sidebar";
import VotingWidget from "@/components/VotingWidget";

import ScrollProgressBar from "@/components/home/ScrollProgressBar";
import BackToTop from "@/components/home/BackToTop";
import BreakingTicker from "@/components/home/BreakingTicker";
import QuickFilters, { HomeCategory } from "@/components/home/QuickFilters";
import Section from "@/components/home/Section";
import LazyMount from "@/components/home/LazyMount";
import NewsletterCard from "@/components/home/NewsletterCard";
import InlineAdCard from "@/components/home/InlineAdCard";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Supabase (used for live search)
import { supabase } from "@/lib/supabaseClient";

const LiveMatchCarousel = React.lazy(() => import("@/components/LiveMatchCarousel"));
const UpcomingMatchCarousel = React.lazy(() => import("@/components/UpcomingMatchCarousel"));

type SearchArticle = {
  id: string;
  title: string;
  description?: string | null;
  image?: string | null;
  category?: string | null;
  author?: string | null;
  date?: string | null;
};

function formatLocalDateTime(language: "en" | "bn") {
  const locale = language === "bn" ? "bn-BD" : "en-US";
  const now = new Date();

  const date = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(now);

  const time = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);

  return { date, time };
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold text-foreground/90 dark:text-white/90">
      {children}
    </span>
  );
}

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}

const HomePage = () => {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();

  const [category, setCategory] = useState<HomeCategory>("all");

  // --- Live date/time under Breaking ---
  const [clock, setClock] = useState(() => formatLocalDateTime(language));
  useEffect(() => {
    setClock(formatLocalDateTime(language));
    const t = setInterval(() => setClock(formatLocalDateTime(language)), 30_000);
    return () => clearInterval(t);
  }, [language]);

  // --- Search state ---
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query.trim(), 300);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchArticle[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const pageTitle = useMemo(() => {
    return language === "bn" ? "স্পোর্টসব্লগ বিডি — সর্বশেষ খেলা" : "SportsBlogBD — Latest Sports";
  }, [language]);

  const subTitle = useMemo(() => {
    return language === "bn"
      ? "লাইভ স্কোর, ফিক্সচার, ট্রেন্ডিং নিউজ এবং বিশ্লেষণ"
      : "Live scores, fixtures, trending news & analysis";
  }, [language]);

  const trendingTags = useMemo(() => {
    return language === "bn"
      ? ["বাংলাদেশ", "IPL", "BPL", "ফুটবল", "চ্যাম্পিয়ন্স লিগ", "টেনিস", "হাইলাইটস"]
      : ["Bangladesh", "IPL", "BPL", "Football", "Champions League", "Tennis", "Highlights"];
  }, [language]);

  // Fetch search results from Supabase
  useEffect(() => {
    const run = async () => {
      if (!debouncedQuery) {
        setResults([]);
        setSearchError(null);
        setSearchLoading(false);
        return;
      }

      setSearchLoading(true);
      setSearchError(null);

      try {
        // NOTE: Requires @supabase/supabase-js installed and articles table exists
        const q = debouncedQuery.replace(/%/g, "\\%").replace(/_/g, "\\_");

        const { data, error } = await supabase
          .from("articles")
          .select("id,title,description,image,category,author,date")
          .or(`title.ilike.%${q}%,description.ilike.%${q}%`)
          .order("date", { ascending: false })
          .limit(8);

        if (error) {
          setSearchError(error.message);
          setResults([]);
        } else {
          setResults((data || []) as SearchArticle[]);
        }
      } catch (e: any) {
        setSearchError(e?.message || "Search failed");
        setResults([]);
      } finally {
        setSearchLoading(false);
        setSearchOpen(true);
      }
    };

    run();
  }, [debouncedQuery]);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setSearchError(null);
    setSearchOpen(false);
    inputRef.current?.focus();
  };

  const onSubmitSearch = () => {
    const q = query.trim();
    if (!q) return;
    // If you already have a SearchPage route, use it:
    // navigate(`/search?q=${encodeURIComponent(q)}`);
    // If not, keep it on home and just open dropdown:
    setSearchOpen(true);
  };

  const showSearchResultsPanel = (query.trim().length > 0);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={language}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? false : { opacity: 1 }}
        exit={reduceMotion ? false : { opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Accessibility */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:z-[999] focus:top-3 focus:left-3 focus:bg-background focus:text-foreground focus:px-4 focus:py-2 focus:rounded-md border"
        >
          {language === "bn" ? "মূল কনটেন্টে যান" : "Skip to content"}
        </a>

        <ScrollProgressBar />
        <HeroSection />

        <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {/* Title + Search */}
          <div className="mb-6 sm:mb-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="min-w-0">
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-foreground dark:text-white"
                  initial={reduceMotion ? false : { y: 10, opacity: 0 }}
                  whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35 }}
                >
                  {pageTitle}
                </motion.h1>
                <p className="mt-2 text-base sm:text-lg text-muted-foreground">{subTitle}</p>

                {/* Breaking ticker */}
                <div className="mt-4">
                  <BreakingTicker />
                </div>

                {/* Date/Time under breaking */}
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={14} />
                    {clock.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={14} />
                    {clock.time}
                  </span>

                  <span className="mx-1 text-muted-foreground/60">•</span>

                  <span className="inline-flex items-center gap-1">
                    <TrendingUp size={14} />
                    {language === "bn" ? "লাইভ আপডেট" : "Live updates"}
                  </span>
                </div>
              </div>

              {/* Search box */}
              <div className="w-full lg:w-[480px]">
                <Card className="p-3 sm:p-4">
                  <div className="flex items-center gap-2">
                    <Search className="text-muted-foreground" size={18} />
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setSearchOpen(true);
                      }}
                      onFocus={() => setSearchOpen(true)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") onSubmitSearch();
                        if (e.key === "Escape") setSearchOpen(false);
                      }}
                      placeholder={language === "bn" ? "খুঁজুন: দল, ম্যাচ, খেলোয়াড়..." : "Search teams, matches, players..."}
                      className="h-10 w-full bg-transparent outline-none text-sm text-foreground dark:text-white"
                      aria-label="Search"
                    />

                    {query ? (
                      <Button variant="ghost" size="icon" onClick={clearSearch} aria-label="Clear search">
                        <X size={18} />
                      </Button>
                    ) : null}

                    <Button onClick={onSubmitSearch} className="hidden sm:inline-flex">
                      {language === "bn" ? "খুঁজুন" : "Search"}
                    </Button>
                  </div>

                  {/* Suggestions / results dropdown */}
                  <AnimatePresence>
                    {searchOpen ? (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="mt-3 border-t pt-3"
                      >
                        {/* Trending tags quick actions */}
                        {!showSearchResultsPanel ? (
                          <>
                            <div className="text-xs font-semibold text-muted-foreground mb-2">
                              {language === "bn" ? "ট্রেন্ডিং" : "Trending"}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {trendingTags.map((tag) => (
                                <button
                                  key={tag}
                                  onClick={() => {
                                    setQuery(tag);
                                    inputRef.current?.focus();
                                  }}
                                  className="rounded-full border px-3 py-1 text-xs hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                  #{tag}
                                </button>
                              ))}
                            </div>
                          </>
                        ) : null}

                        {/* Results */}
                        {showSearchResultsPanel ? (
                          <div className="mt-1">
                            {searchLoading ? (
                              <div className="text-sm text-muted-foreground py-3">
                                {language === "bn" ? "খোঁজা হচ্ছে..." : "Searching..."}
                              </div>
                            ) : searchError ? (
                              <div className="text-sm text-red-600 dark:text-red-300 py-3">
                                {language === "bn" ? "সার্চ ব্যর্থ হয়েছে: " : "Search failed: "}
                                {searchError}
                              </div>
                            ) : results.length === 0 ? (
                              <div className="text-sm text-muted-foreground py-3">
                                {language === "bn" ? "কিছু পাওয়া যায়নি।" : "No results found."}
                              </div>
                            ) : (
                              <div className="space-y-2">
                                {results.map((a) => (
                                  <Link
                                    key={a.id}
                                    to={`/article/${a.id}`}
                                    onClick={() => setSearchOpen(false)}
                                    className="block rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                                  >
                                    <div className="flex items-start gap-3">
                                      {a.image ? (
                                        <img
                                          src={a.image}
                                          alt={a.title}
                                          className="h-12 w-16 rounded object-cover border"
                                          loading="lazy"
                                        />
                                      ) : (
                                        <div className="h-12 w-16 rounded border bg-gray-100 dark:bg-gray-900" />
                                      )}

                                      <div className="min-w-0">
                                        <div className="text-sm font-semibold text-foreground dark:text-white line-clamp-2">
                                          {a.title}
                                        </div>
                                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                          {a.category ? <Pill>{a.category}</Pill> : null}
                                          {a.date ? (
                                            <span className="inline-flex items-center gap-1">
                                              <Calendar size={12} />
                                              {new Date(a.date).toLocaleDateString(language === "bn" ? "bn-BD" : "en-US")}
                                            </span>
                                          ) : null}
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : null}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </Card>

                {/* tiny helper */}
                <div className="mt-2 text-xs text-muted-foreground">
                  {language === "bn"
                    ? "Enter চাপুন সার্চ করতে • Esc চাপুন বন্ধ করতে"
                    : "Press Enter to search • Esc to close"}
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <QuickFilters value={category} onChange={setCategory} />
          </div>

          {/* Match Center */}
          <Section
            title={language === "bn" ? "ম্যাচ সেন্টার" : "Match Center"}
            subtitle={language === "bn" ? "লাইভ এবং আসন্ন ম্যাচ এক জায়গায়" : "Live and upcoming matches in one place"}
            actionLabel={language === "bn" ? "সব দেখুন" : "View all"}
            onAction={() => {
              // optional: if you have route
              // navigate("/matches");
              window.location.hash = "#main";
            }}
          >
            <div className="space-y-8">
              <LazyMount minHeight={180}>
                <Suspense fallback={<div className="h-[180px] rounded-xl border bg-card animate-pulse" />}>
                  <LiveMatchCarousel />
                </Suspense>
              </LazyMount>

              <LazyMount minHeight={180}>
                <Suspense fallback={<div className="h-[180px] rounded-xl border bg-card animate-pulse" />}>
                  <UpcomingMatchCarousel />
                </Suspense>
              </LazyMount>
            </div>
          </Section>

          {/* Content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10 sm:mt-14" id="main">
            <div className="lg:col-span-8 xl:col-span-9">
              <Section
                title={language === "bn" ? "সর্বশেষ নিউজ" : "Latest News"}
                subtitle={language === "bn" ? "নির্ভরযোগ্য আপডেট এবং বিশ্লেষণ" : "Reliable updates and analysis"}
              >
                {/* If searching, show results list; else show MainContent */}
                {query.trim() ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm text-muted-foreground">
                        {language === "bn"
                          ? `সার্চ ফলাফল: “${query.trim()}”`
                          : `Search results for “${query.trim()}”`}
                      </div>
                      <Button variant="outline" onClick={clearSearch}>
                        {language === "bn" ? "ক্লিয়ার" : "Clear"}
                      </Button>
                    </div>

                    {searchLoading ? (
                      <div className="space-y-3">
                        <div className="h-20 rounded-lg border bg-card animate-pulse" />
                        <div className="h-20 rounded-lg border bg-card animate-pulse" />
                        <div className="h-20 rounded-lg border bg-card animate-pulse" />
                      </div>
                    ) : searchError ? (
                      <div className="text-sm text-red-600 dark:text-red-300">
                        {language === "bn" ? "সার্চ ব্যর্থ হয়েছে: " : "Search failed: "}
                        {searchError}
                      </div>
                    ) : results.length === 0 ? (
                      <div className="text-sm text-muted-foreground">
                        {language === "bn" ? "কোনো ফলাফল নেই।" : "No results."}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {results.map((a) => (
                          <Link
                            key={a.id}
                            to={`/article/${a.id}`}
                            className="block rounded-xl border bg-card hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors overflow-hidden"
                          >
                            {a.image ? (
                              <img src={a.image} alt={a.title} className="h-44 w-full object-cover" loading="lazy" />
                            ) : (
                              <div className="h-44 w-full bg-gray-100 dark:bg-gray-900" />
                            )}

                            <div className="p-4">
                              <div className="text-sm font-semibold text-foreground dark:text-white line-clamp-2">
                                {a.title}
                              </div>
                              {a.description ? (
                                <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{a.description}</div>
                              ) : null}
                              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                {a.category ? <Pill>{a.category}</Pill> : null}
                                {a.date ? (
                                  <span className="inline-flex items-center gap-1">
                                    <Calendar size={12} />
                                    {new Date(a.date).toLocaleDateString(language === "bn" ? "bn-BD" : "en-US")}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <MainContent category={category === "all" ? undefined : category} />
                )}
              </Section>

              <div className="mt-10">
                <InlineAdCard />
              </div>
            </div>

            <div className="lg:col-span-4 xl:col-span-3">
              <div className="space-y-6 lg:sticky lg:top-24">
                <Sidebar />
                <VotingWidget />
                <NewsletterCard />
              </div>
            </div>
          </div>
        </div>

        <BackToTop />
      </motion.div>
    </AnimatePresence>
  );
};

export default HomePage;
