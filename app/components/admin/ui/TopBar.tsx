import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Globe, Moon, Sun } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import type { Theme } from '@/types';

interface TopBarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

const TopBar = ({ theme, onToggleTheme }: TopBarProps) => {
  const { language, setLanguage } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    if (language === 'bn') {
      return date.toLocaleDateString('bn-BD', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === 'bn' ? 'bn-BD' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleLanguageToggle = () => {
    setIsAnimating(true);
    const newLang = language === 'en' ? 'bn' : 'en';
    
    // Smooth transition
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
      <div className="container mx-auto flex justify-between items-center">
        <AnimatePresence mode="wait">
          <motion.div 
            key={language}
            className="flex items-center gap-8"
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
        
        <div className="flex items-center gap-2">
          <Button
            onClick={onToggleTheme}
            variant="ghost"
            size="sm"
            className="bg-transparent text-primary-foreground dark:text-gray-100 hover:bg-primary-foreground/10 border border-primary-foreground/20"
          >
            {theme === 'light' ? (
              <Moon className="mr-2" size={16} strokeWidth={2} />
            ) : (
              <Sun className="mr-2" size={16} strokeWidth={2} />
            )}
          </Button>
          
          <Button
            onClick={handleLanguageToggle}
            variant="ghost"
            size="sm"
            className="bg-transparent text-primary-foreground dark:text-gray-100 hover:bg-primary-foreground/10 border border-primary-foreground/20 min-w-[100px]"
            disabled={isAnimating}
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
                {getTranslation(language, 'languageSwitch')}
              </motion.span>
            </AnimatePresence>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TopBar;
