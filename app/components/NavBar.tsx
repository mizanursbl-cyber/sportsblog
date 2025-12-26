import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language } = useLanguage();

  // Spin trigger (changes key to replay a single spin)
  const [spinKey, setSpinKey] = useState(0);

  useEffect(() => {
    // spin -> stop -> spin
    const SPIN_EVERY_MS = 4500;
    const t = setInterval(() => setSpinKey((k) => k + 1), SPIN_EVERY_MS);
    return () => clearInterval(t);
  }, []);

  const SITE = useMemo(() => {
    return {
      name: "BDSportsArena",
      sloganEn: "From Field to Fan – Sports Uncovered.",
      sloganBn: "মাঠ থেকে দর্শক — খেলাধুলার আসল গল্প।",
      logoSrc: "/websitelogo/android-chrome-192x192.png",
    };
  }, []);

  const navItems = [
    { label: getTranslation(language, "home"), path: "/" },
    { label: getTranslation(language, "cricket"), path: "/category/cricket" },
    { label: getTranslation(language, "football"), path: "/category/football" },
    { label: getTranslation(language, "others"), path: "/category/others" },
  ];

  return (
    <motion.nav
      // ✅ Not sticky => it will NOT cover your page while scrolling
      className="relative z-40 bg-neutral dark:bg-gray-800 border-b border-border dark:border-gray-700"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, delay: 0.05 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* ✅ Brand: Logo spins counter-clockwise (right->left) */}
          <Link
            to="/"
            className="flex items-center gap-3 min-w-0"
            onMouseEnter={() => setSpinKey((k) => k + 1)} // optional hover spin
          >
            <motion.img
              key={spinKey}
              src={SITE.logoSrc}
              alt={`${SITE.name} logo`}
              className="h-9 w-9 rounded-xl border bg-white object-contain shrink-0"
              loading="eager"
              initial={{ rotate: 0 }}
              animate={{ rotate: -360 }} // ✅ right-to-left spin
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
            <div className="min-w-0 leading-tight">
              <div className="font-black text-base sm:text-lg text-neutral-foreground dark:text-white truncate">
                {SITE.name}
              </div>
              <div className="text-[11px] text-muted-foreground truncate hidden sm:block">
                {language === "bn" ? SITE.sloganBn : SITE.sloganEn}
              </div>
            </div>
          </Link>

          {/* Desktop menu */}
          <AnimatePresence mode="wait">
            <motion.div
              key={language}
              className="hidden md:flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer rounded-md ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground dark:bg-primary"
                      : "text-neutral-foreground dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Desktop search icon */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex bg-transparent text-neutral-foreground dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Search"
          >
            <Search size={20} strokeWidth={2} />
          </Button>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="bg-transparent text-neutral-foreground dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-transparent text-neutral-foreground dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={2} />
            </Button>
          </div>
        </div>

        {/* Mobile menu items */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden bg-neutral dark:bg-gray-800 border-t border-border dark:border-gray-700 py-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-4 pb-3 text-xs text-muted-foreground">
                {language === "bn" ? SITE.sloganBn : SITE.sloganEn}
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground dark:bg-primary"
                      : "text-neutral-foreground dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default NavBar;
