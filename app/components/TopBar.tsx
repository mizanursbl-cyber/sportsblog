import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Globe, Moon, Sun } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";
import type { Theme } from "@/types";

interface TopBarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

const LOGO_SRC = "/websitelogo/android-chrome-192x192.png";

const TopBar = ({ theme, onToggleTheme }: TopBarProps) => {
  const { language, setLanguage } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAnimating, setIsAnimating] = useState(false);

  // ✅ Spin trigger (increments to restart animation)
  const [spinKey, setSpinKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ✅ Spin → stop → spin loop
  useEffect(() => {
    // Spin duration + stop duration; tune these
    const SPIN_EVERY_MS = 4500; // total cycle time
    const t = setInterval(() => setSpinKey((k) => k + 1), SPIN_EVERY_MS);
    return () => clearInterval(t);
  }, []);

  const formatDate = (date: Date) => {
    if (language === "bn") {
      return date.toLocaleDateString("bn-BD", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === "bn" ? "bn-BD" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleLanguageToggle = () => {
    setIsAnimating(true);
    const newLang = language === "en" ? "bn" : "en";

    setTimeout(() => {
      setLanguage(newLang);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <motion.div
      className="sticky top-0 z-50 bg-primary dark:bg-gray-800 text-primary-foreground py-3 px-8"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center gap-4">
        {/* ✅ Left: Logo + Date/Time */}
        <div className="flex items-center gap-4 min-w-0">
          {/* Logo + name */}
          <motion.div
            className="flex items-center gap-3 select-none"
            onMouseEnter={() => setSpinKey((k) => k + 1)} // optional hover spin
          >
            <motion.img
              key={spinKey}
              src={LOGO_SRC}
              alt="BDSportsArena logo"
              className="h-9 w-9 rounded-xl bg-white/90 border border-white/30 object-contain"
              // Spin once then stop (because it only animates on key change)
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 0.9,
                ease: "easeInOut",
              }}
            />
            <div className="hidden sm:block">
              <div className="text-sm font-black leading-none">BDSportsArena</div>
              <div className="text-[11px] opacity-90 leading-none">
                From Field to Fan – Sports Uncovered.
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={language}
              className="hidden md:flex items-center gap-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-sm font-medium text-primary-foreground dark:text-gray-100">
                {formatDate(currentTime)}
              </span>
              <span className="text-sm font-medium text-primary-foreground dark:text-gray-100">
                {formatTime(currentTime)}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ✅ Right: Buttons */}
        <div className="flex items-center gap-2">
          <Button
            onClick={onToggleTheme}
            variant="ghost"
            size="sm"
            className="bg-transparent text-primary-foreground dark:text-gray-100 hover:bg-primary-foreground/10 border border-primary-foreground/20"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="mr-2" size={16} strokeWidth={2} />
            ) : (
              <Sun className="mr-2" size={16} strokeWidth={2} />
            )}
            <span className="hidden sm:inline">{theme === "light" ? "Dark" : "Light"}</span>
          </Button>

          <Button
            onClick={handleLanguageToggle}
            variant="ghost"
            size="sm"
            className="bg-transparent text-primary-foreground dark:text-gray-100 hover:bg-primary-foreground/10 border border-primary-foreground/20 min-w-[100px]"
            disabled={isAnimating}
            aria-label="Switch language"
          >
            <Globe className="mr-2" size={16} strokeWidth={2} />
            <AnimatePresence mode="wait">
              <motion.span
                key={language}
                className="text-primary-foreground dark:text-gray-100"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                {getTranslation(language, "languageSwitch")}
              </motion.span>
            </AnimatePresence>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TopBar;
