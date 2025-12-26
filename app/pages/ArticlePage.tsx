import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  User,
  Share2,
  Link as LinkIcon,
  Bookmark,
  BookmarkCheck,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";

// If you created supabaseClient.ts as suggested:
import { supabase } from "@/lib/supabaseClient";

type ArticleRecord = {
  id: string;
  title: string;
  description?: string | null;
  content: string;
  category?: string | null;
  image?: string | null;
  author?: string | null;
  date?: string | null;
  language_code?: "en" | "bn" | string | null;
};

function estimateReadingTimeMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const wpm = 220;
  return Math.max(1, Math.round(words / wpm));
}

function formatDate(dateISO: string | null | undefined, lang: "en" | "bn") {
  if (!dateISO) return "";
  const d = new Date(dateISO);
  if (Number.isNaN(d.getTime())) return "";
  try {
    return new Intl.DateTimeFormat(lang === "bn" ? "bn-BD" : "en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(d);
  } catch {
    return d.toLocaleDateString();
  }
}

// Simple “pill” without relying on extra UI components
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold text-foreground/90 dark:text-white/90">
      {children}
    </span>
  );
}

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-800 ${className}`} />;
}

const ArticlePage = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [article, setArticle] = useState<ArticleRecord | null>(null);

  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const url = useMemo(() => {
    // This will be correct on Render domains too
    return window.location.origin + location.pathname;
  }, [location.pathname]);

  // Scroll to top on article change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Load bookmark state
  useEffect(() => {
    if (!id) return;
    try {
      const raw = localStorage.getItem("bookmarks:articles");
      const list = raw ? (JSON.parse(raw) as string[]) : [];
      setBookmarked(list.includes(id));
    } catch {
      setBookmarked(false);
    }
  }, [id]);

  const demoArticle: ArticleRecord = useMemo(() => {
    return {
      id: id || "demo",
      title:
        language === "en"
          ? "Bangladesh Wins Thrilling Match Against India"
          : "ভারতের বিরুদ্ধে রোমাঞ্চকর ম্যাচে জয় পেল বাংলাদেশ",
      description:
        language === "en"
          ? "A nail-biting finish, brilliant performances, and a historic win that sparked celebrations across the nation."
          : "রোমাঞ্চকর সমাপ্তি, দারুণ পারফরম্যান্স, এবং একটি ঐতিহাসিক জয় যা সারা দেশে উদযাপন শুরু করেছে।",
      date: "2024-01-15",
      author: "Kamal Ahmed",
      category: language === "en" ? "Cricket" : "ক্রিকেট",
      image: "https://c.animaapp.com/mjcf7krg02IrbV/img/ai_2.png",
      content:
        language === "en"
          ? `In a nail-biting finish that kept fans on the edge of their seats, Bangladesh secured a historic victory against India in what will be remembered as one of the most thrilling matches in recent cricket history.

The match, played at the Sher-e-Bangla National Stadium in Dhaka, saw exceptional performances from both teams. Bangladesh's batting lineup showed remarkable resilience, with key players delivering under pressure when it mattered most.

The turning point came in the final over when Bangladesh needed 12 runs to win. With nerves of steel, the batsmen executed their shots perfectly, bringing the crowd to their feet with every boundary.

This victory marks a significant milestone for Bangladesh cricket, demonstrating the team's growing prowess on the international stage. The win has sparked celebrations across the nation, with fans taking to the streets to express their joy and pride.

Cricket analysts have praised the team's strategic approach and mental fortitude, noting that this performance could be a turning point in Bangladesh's cricketing journey. The victory has also boosted the team's confidence ahead of upcoming international tournaments.

The match showcased the best of cricket - skill, strategy, and sportsmanship. Both teams displayed exceptional talent, making it a memorable contest for cricket enthusiasts worldwide.`
          : `ভক্তদের আসনের কিনারায় রাখা একটি রোমাঞ্চকর সমাপ্তিতে, বাংলাদেশ ভারতের বিরুদ্ধে একটি ঐতিহাসিক জয় অর্জন করেছে যা সাম্প্রতিক ক্রিকেট ইতিহাসের সবচেয়ে রোমাঞ্চকর ম্যাচগুলির একটি হিসাবে স্মরণীয় হয়ে থাকবে।

ঢাকার শের-ই-বাংলা জাতীয় স্টেডিয়ামে খেলা এই ম্যাচে উভয় দল থেকে ব্যতিক্রমী পারফরম্যান্স দেখা গেছে। বাংলাদেশের ব্যাটিং লাইনআপ অসাধারণ স্থিতিস্থাপকতা দেখিয়েছে, মূল খেলোয়াড়রা চাপের মধ্যে প্রয়োজনের সময় সরবরাহ করেছে।

চূড়ান্ত ওভারে টার্নিং পয়েন্ট এসেছিল যখন বাংলাদেশের জয়ের জন্য ১২ রান প্রয়োজন ছিল। ইস্পাতের স্নায়ু দিয়ে, ব্যাটসম্যানরা তাদের শট নিখুঁতভাবে সম্পাদন করেছে, প্রতিটি সীমানা দিয়ে ভিড়কে তাদের পায়ে নিয়ে এসেছে।

এই বিজয় বাংলাদেশ ক্রিকেটের জন্য একটি উল্লেখযোগ্য মাইলফলক চিহ্নিত করে, আন্তর্জাতিক মঞ্চে দলের ক্রমবর্ধমান দক্ষতা প্রদর্শন করে। জয়টি সারা দেশে উদযাপনের সূত্রপাত করেছে, ভক্তরা তাদের আনন্দ এবং গর্ব প্রকাশ করতে রাস্তায় নেমেছে।

ক্রিকেট বিশ্লেষকরা দলের কৌশলগত পদ্ধতি এবং মানসিক দৃঢ়তার প্রশংসা করেছেন, উল্লেখ করেছেন যে এই পারফরম্যান্স বাংলাদেশের ক্রিকেট যাত্রায় একটি টার্নিং পয়েন্ট হতে পারে। জয়টি আসন্ন আন্তর্জাতিক টুর্নামেন্টের আগে দলের আত্মবিশ্বাসও বাড়িয়েছে।

ম্যাচটি ক্রিকেটের সেরাটি প্রদর্শন করেছে - দক্ষতা, কৌশল এবং ক্রীড়াশীলতা। উভয় দল ব্যতিক্রমী প্রতিভা প্রদর্শন করেছে, এটি বিশ্বব্যাপী ক্রিকেট উত্সাহীদের জন্য একটি স্মরণীয় প্রতিযোগিতা তৈরি করেছে।`,
    };
  }, [id, language]);

  const readingTime = useMemo(() => {
    if (!article?.content) return 1;
    return estimateReadingTimeMinutes(article.content);
  }, [article?.content]);

  const fetchArticle = async () => {
    setLoading(true);
    setErrorMsg(null);

    // If no id, just show demo
    if (!id) {
      setArticle(demoArticle);
      setLoading(false);
      return;
    }

    // Try Supabase first
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("id,title,description,content,category,image,author,date,language_code")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        // fallback to demo, but show useful error message in console
        console.error("Supabase article fetch error:", error);
        setArticle(demoArticle);
        setLoading(false);
        return;
      }

      if (!data) {
        setArticle(null);
        setLoading(false);
        return;
      }

      // If you store both languages as separate rows, you can filter here.
      // If not, keep as-is.
      setArticle(data as ArticleRecord);
      setLoading(false);
    } catch (e: any) {
      console.error(e);
      setErrorMsg(e?.message || "Failed to load article.");
      // still show demo so site doesn't look broken
      setArticle(demoArticle);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, language]);

  const handleShare = async () => {
    const title = article?.title || "Article";
    const shareData = { title, url };

    try {
      // Native share (mobile)
      // @ts-ignore
      if (navigator.share) {
        // @ts-ignore
        await navigator.share(shareData);
        return;
      }
    } catch {
      // ignore share cancel
    }

    // Fallback: copy link
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // last resort: prompt
      window.prompt("Copy this link:", url);
    }
  };

  const toggleBookmark = () => {
    if (!id) return;
    try {
      const raw = localStorage.getItem("bookmarks:articles");
      const list = raw ? (JSON.parse(raw) as string[]) : [];
      const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
      localStorage.setItem("bookmarks:articles", JSON.stringify(next));
      setBookmarked(next.includes(id));
    } catch {
      // ignore
    }
  };

  const heroMeta = useMemo(() => {
    const d = formatDate(article?.date, language);
    const author = article?.author || (language === "bn" ? "সম্পাদক" : "Editor");
    const category = article?.category || (language === "bn" ? "খেলা" : "Sports");
    return { d, author, category };
  }, [article?.author, article?.category, article?.date, language]);

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          {/* Top actions */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <Link to="/">
              <Button variant="ghost" className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800">
                <ArrowLeft className="mr-2" size={18} />
                {getTranslation(language, "backToHome")}
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={toggleBookmark} disabled={!id}>
                {bookmarked ? <BookmarkCheck className="mr-2" size={16} /> : <Bookmark className="mr-2" size={16} />}
                {language === "bn" ? (bookmarked ? "সংরক্ষিত" : "সংরক্ষণ") : bookmarked ? "Saved" : "Save"}
              </Button>

              <Button variant="outline" onClick={handleShare}>
                {copied ? <LinkIcon className="mr-2" size={16} /> : <Share2 className="mr-2" size={16} />}
                {copied ? (language === "bn" ? "কপি হয়েছে" : "Copied") : getTranslation(language, "shareArticle")}
              </Button>
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-5 w-1/2 mb-8" />
                <Skeleton className="h-[360px] w-full mb-8" />
                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-4 w-11/12 mb-3" />
                <Skeleton className="h-4 w-10/12 mb-3" />
                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-4 w-9/12 mb-3" />
              </div>
              <div className="lg:col-span-4">
                <Skeleton className="h-40 w-full mb-6" />
                <Skeleton className="h-56 w-full" />
              </div>
            </div>
          ) : null}

          {/* Error banner (only if no article) */}
          {!loading && errorMsg && !article ? (
            <Card className="p-6 border-red-200 dark:border-red-900">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-500 mt-0.5" />
                <div className="flex-1">
                  <div className="font-bold text-foreground dark:text-white">
                    {language === "bn" ? "লোড করতে সমস্যা হয়েছে" : "Failed to load"}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{errorMsg}</div>
                  <div className="mt-4">
                    <Button onClick={fetchArticle}>
                      <RefreshCw className="mr-2" size={16} />
                      {language === "bn" ? "আবার চেষ্টা করুন" : "Retry"}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ) : null}

          {/* Not found */}
          {!loading && !errorMsg && !article ? (
            <Card className="p-8 text-center">
              <div className="text-2xl font-bold dark:text-white">
                {language === "bn" ? "আর্টিকেল পাওয়া যায়নি" : "Article not found"}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {language === "bn"
                  ? "এই আইডির সাথে কোনো আর্টিকেল নেই।"
                  : "No article exists with this ID."}
              </p>
              <div className="mt-6">
                <Link to="/">
                  <Button>{language === "bn" ? "হোমে ফিরে যান" : "Go Home"}</Button>
                </Link>
              </div>
            </Card>
          ) : null}

          {/* Article */}
          {!loading && article ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main */}
              <article className="lg:col-span-8">
                {/* Breadcrumbs */}
                <div className="text-xs text-muted-foreground mb-3">
                  <Link className="hover:underline" to="/">
                    {language === "bn" ? "হোম" : "Home"}
                  </Link>
                  <span className="mx-2">/</span>
                  <span className="text-foreground/80 dark:text-white/80">
                    {article.category || (language === "bn" ? "খেলা" : "Sports")}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground dark:text-white">
                  {article.title}
                </h1>

                {/* Description */}
                {article.description ? (
                  <p className="mt-4 text-base sm:text-lg text-muted-foreground">
                    {article.description}
                  </p>
                ) : null}

                {/* Meta row */}
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>{heroMeta.d}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={18} />
                    <span>{heroMeta.author}</span>
                  </div>
                  <Pill>{heroMeta.category}</Pill>
                  <span className="ml-auto text-xs">
                    {language === "bn"
                      ? `পড়তে সময়: ${readingTime} মিনিট`
                      : `${readingTime} min read`}
                  </span>
                </div>

                {/* Hero image */}
                {article.image ? (
                  <div className="mt-8 overflow-hidden rounded-xl border bg-card">
                    <div className="relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-[260px] sm:h-[420px] object-cover"
                        loading="eager"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    </div>
                  </div>
                ) : null}

                {/* Content */}
                <div className="mt-8">
                  {article.content.split("\n\n").map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-foreground dark:text-gray-200 mb-6 leading-relaxed text-base sm:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Footer actions */}
                <div className="mt-10 flex flex-wrap gap-2 border-t pt-6">
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="mr-2" size={16} />
                    {language === "bn" ? "শেয়ার" : "Share"}
                  </Button>
                  <Button variant="outline" onClick={() => navigator.clipboard?.writeText(article.title).catch(() => {})}>
                    {language === "bn" ? "শিরোনাম কপি" : "Copy title"}
                  </Button>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 h-fit">
                {/* Share box */}
                <Card className="p-5">
                  <div className="font-bold text-foreground dark:text-white">
                    {language === "bn" ? "দ্রুত অ্যাকশন" : "Quick Actions"}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === "bn"
                      ? "লিংক কপি করুন বা বন্ধুদের সাথে শেয়ার করুন।"
                      : "Copy the link or share with friends."}
                  </p>

                  <div className="mt-4 space-y-2">
                    <Button className="w-full" onClick={handleShare}>
                      <Share2 className="mr-2" size={16} />
                      {language === "bn" ? "শেয়ার / কপি লিংক" : "Share / Copy link"}
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => navigator.clipboard.writeText(url)}>
                      <LinkIcon className="mr-2" size={16} />
                      {language === "bn" ? "লিংক কপি" : "Copy link"}
                    </Button>
                    <Button variant="outline" className="w-full" onClick={toggleBookmark} disabled={!id}>
                      {bookmarked ? <BookmarkCheck className="mr-2" size={16} /> : <Bookmark className="mr-2" size={16} />}
                      {language === "bn" ? (bookmarked ? "সংরক্ষিত" : "সংরক্ষণ") : bookmarked ? "Saved" : "Save"}
                    </Button>
                  </div>
                </Card>

                {/* Related / More (placeholder until you connect real data) */}
                <Card className="p-5">
                  <div className="font-bold text-foreground dark:text-white">
                    {language === "bn" ? "আরও পড়ুন" : "More to read"}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === "bn"
                      ? "শিগগিরই এখানে সম্পর্কিত আর্টিকেল দেখানো হবে।"
                      : "Related articles will appear here soon."}
                  </p>

                  <div className="mt-4 space-y-3">
                    <Link to="/" className="block rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="text-sm font-semibold dark:text-white">
                        {language === "bn" ? "আজকের সেরা হাইলাইটস" : "Today’s top highlights"}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {language === "bn" ? "হাইলাইটস • ২ মিনিট" : "Highlights • 2 min"}
                      </div>
                    </Link>

                    <Link to="/" className="block rounded-md border p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="text-sm font-semibold dark:text-white">
                        {language === "bn" ? "ফুটবল: লিগ আপডেট" : "Football: League updates"}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {language === "bn" ? "ফুটবল • ৩ মিনিট" : "Football • 3 min"}
                      </div>
                    </Link>
                  </div>
                </Card>

                {/* Newsletter (simple UI; wire to Supabase later) */}
                <Card className="p-5">
                  <div className="font-bold text-foreground dark:text-white">
                    {language === "bn" ? "নিউজলেটার" : "Newsletter"}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === "bn"
                      ? "সেরা আপডেট আপনার ইনবক্সে।"
                      : "Get the best updates in your inbox."}
                  </p>
                  <div className="mt-4">
                    <Link to="/">
                      <Button className="w-full">
                        {language === "bn" ? "সাবস্ক্রাইব" : "Subscribe"}
                      </Button>
                    </Link>
                  </div>
                </Card>
              </aside>
            </div>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
};

export default ArticlePage;
