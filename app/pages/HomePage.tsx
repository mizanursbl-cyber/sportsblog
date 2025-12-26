import React, { Suspense, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

const LiveMatchCarousel = React.lazy(() => import("@/components/LiveMatchCarousel"));
const UpcomingMatchCarousel = React.lazy(() => import("@/components/UpcomingMatchCarousel"));

const HomePage = () => {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();

  const [category, setCategory] = useState<HomeCategory>("all");

  const pageTitle = useMemo(() => {
    return language === "bn" ? "স্পোর্টসব্লগ বিডি — সর্বশেষ খেলা" : "SportsBlogBD — Latest Sports";
  }, [language]);

  const subTitle = useMemo(() => {
    return language === "bn"
      ? "লাইভ স্কোর, ফিক্সচার, ট্রেন্ডিং নিউজ এবং বিশ্লেষণ"
      : "Live scores, fixtures, trending news & analysis";
  }, [language]);

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

        {/* UX polish */}
        <ScrollProgressBar />

        {/* Hero stays as you already designed it */}
        <HeroSection />

        {/* Main shell */}
        <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {/* Headline area */}
          <div className="mb-6 sm:mb-10">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-foreground dark:text-white"
              initial={reduceMotion ? false : { y: 10, opacity: 0 }}
              whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.35 }}
            >
              {pageTitle}
            </motion.h1>
            <p className="mt-2 text-base sm:text-lg text-muted-foreground">
              {subTitle}
            </p>

            <div className="mt-4">
              <BreakingTicker />
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
              // optional: route to /matches if you have it
              window.location.hash = "#main";
            }}
          >
            <div className="space-y-8">
              {/* Lazy-mount heavy UI only when near viewport */}
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
            {/* Main content */}
            <div className="lg:col-span-8 xl:col-span-9">
              <Section
                title={language === "bn" ? "সর্বশেষ নিউজ" : "Latest News"}
                subtitle={language === "bn" ? "নির্ভরযোগ্য আপডেট এবং বিশ্লেষণ" : "Reliable updates and analysis"}
              >
                {/* Pass category filter into your existing module */}
                <MainContent category={category === "all" ? undefined : category} />
              </Section>

              {/* Inline ad placeholder (optional) */}
              <div className="mt-10">
                <InlineAdCard />
              </div>
            </div>

            {/* Sidebar */}
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
