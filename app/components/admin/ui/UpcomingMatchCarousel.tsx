import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslatedMatches } from '@/hooks/useTranslatedContent';
import { getTranslation } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const UpcomingMatchCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [countdowns, setCountdowns] = useState<{ [key: string]: string }>({});
  const { language } = useLanguage();
  
  const { data: matches, isPending, error } = useTranslatedMatches({
    where: { status: 'upcoming' },
    orderBy: { matchTime: 'asc' }
  });

  useEffect(() => {
    if (!matches || matches.length === 0) return;

    const updateCountdowns = () => {
      const newCountdowns: { [key: string]: string } = {};
      matches.forEach((match) => {
        if (!match.matchTime) return;
        
        const now = new Date().getTime();
        const matchTime = new Date(match.matchTime).getTime();
        const distance = matchTime - now;

        if (distance < 0) {
          newCountdowns[match.id] = language === 'bn' ? 'শীঘ্রই শুরু' : 'Starting soon';
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        newCountdowns[match.id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      });
      setCountdowns(newCountdowns);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval);
  }, [matches, language]);

  if (isPending) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          {getTranslation(language, 'upcomingMatches')}
        </h2>
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-48 rounded-lg"></div>
      </div>
    );
  }

  if (error || !matches || matches.length === 0) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          {getTranslation(language, 'upcomingMatches')}
        </h2>
        <Card className="p-8 text-center dark:bg-gray-800">
          <p className="text-muted-foreground dark:text-gray-400">
            {getTranslation(language, 'noUpcomingMatches')}
          </p>
        </Card>
      </div>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? matches.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === matches.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-8">
      <AnimatePresence mode="wait">
        <motion.h2 
          key={language}
          className="text-2xl md:text-3xl font-bold mb-6 dark:text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          {getTranslation(language, 'upcomingMatches')}
        </motion.h2>
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIndex}-${language}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 bg-card dark:bg-gray-800 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold dark:text-white">{matches[currentIndex].team1}</span>
                <span className="text-muted-foreground dark:text-gray-400 font-medium">vs</span>
                <span className="text-xl font-bold dark:text-white">{matches[currentIndex].team2}</span>
              </div>

              {matches[currentIndex].venue && (
                <div className="flex items-center gap-2 text-muted-foreground dark:text-gray-400 mb-4">
                  <MapPin size={16} strokeWidth={2} />
                  <span className="text-sm">{matches[currentIndex].venue}</span>
                </div>
              )}

              {matches[currentIndex].matchTime && (
                <div className="flex items-center gap-2 text-muted-foreground dark:text-gray-400 mb-4">
                  <Calendar size={16} strokeWidth={2} />
                  <span className="text-sm">
                    {new Date(matches[currentIndex].matchTime).toLocaleDateString()}
                  </span>
                </div>
              )}

              <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4 text-center">
                <span className="text-2xl font-bold text-primary dark:text-primary-foreground">
                  {countdowns[matches[currentIndex].id] || (language === 'bn' ? 'লোড হচ্ছে...' : 'Loading...')}
                </span>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {matches.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600"
              aria-label="Previous match"
            >
              <ChevronLeft size={24} className="dark:text-white" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600"
              aria-label="Next match"
            >
              <ChevronRight size={24} className="dark:text-white" />
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default UpcomingMatchCarousel;
