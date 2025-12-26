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

const TopBar = ({ theme, onToggleTheme }: TopBarProps) => {
  const { language, setLanguage } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const locale = language === "bn" ? "bn-BD" : "en-US";
    return date.toLocaleDateString(locale, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const formatTime = (date: Date) => {
    const locale = language === "bn" ? "bn-BD" : "en-US";
    return date.toLocaleTimeString(locale, {
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
      className="sticky top-0 z-50 bg-primary dark:bg-gray-800 text-primary-foreground border-b border-primary-foreground/10"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Narrow height */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between gap-3">
        {/* Left: date/time (compact) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={language}
            className="flex items-center gap-3 min-w-0"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-xs font-medium text-primary-foreground/95 dark:text-gray-100 whitespace-nowrap">
              {formatDate(currentTime)}
            </span>
            <span className="text-xs font-medium text-primary-foreground/95 dark:text-gray-100 whitespace-nowrap">
              {formatTime(currentTime)}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Right: buttons (compact) */}
        <div className="flex items-center gap-2">
          <Button
            onClick={onToggleTheme}
            variant="ghost"
            size="sm"
            className="h-8 px-2 bg-transparent text-primary-foreground dark:text-gray-100 hover:bg-primary-foreground/10 border border-primary-foreground/20"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={16} strokeWidth={2} /> : <Sun size={16} strokeWidth={2} />}
          </Button>

          <Button
            onClick={handleLanguageToggle}
            variant="ghost"
            size="sm"
            className="h-8 px-2 bg-transparent text-primary-foreground dark:text-gray-100 hover:bg-primary-foreground/10 border border-primary-foreground/20"
            disabled={isAnimating}
            aria-label="Switch language"
          >
            <Globe className="mr-2" size={16} strokeWidth={2} />
            <AnimatePresence mode="wait">
              <motion.span
                key={language}
                className="text-xs font-medium"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.15 }}
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
