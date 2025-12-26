import { motion, AnimatePresence } from 'framer-motion';
import { useTranslatedMatches } from '@/hooks/useTranslatedContent';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const LiveMatchCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();
  
  const { data: matches, isPending, error } = useTranslatedMatches({
    where: { status: 'live' },
    orderBy: { createdAt: 'desc' }
  });

  if (isPending) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          {getTranslation(language, 'liveMatches')}
        </h2>
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-48 rounded-lg"></div>
      </div>
    );
  }

  if (error || !matches || matches.length === 0) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          {getTranslation(language, 'liveMatches')}
        </h2>
        <Card className="p-8 text-center dark:bg-gray-800">
          <p className="text-muted-foreground dark:text-gray-400">
            {getTranslation(language, 'noLiveMatches')}
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
          {getTranslation(language, 'liveMatches')}
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
                <Badge className="bg-tertiary text-tertiary-foreground">
                  <motion.span
                    className="inline-block w-2 h-2 bg-white rounded-full mr-2"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  {getTranslation(language, 'live')}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg dark:text-white">
                    {matches[currentIndex].team1}
                  </span>
                  <div className="text-right">
                    <span className="text-2xl font-bold dark:text-white">
                      {matches[currentIndex].score1 || '0/0'}
                    </span>
                    {matches[currentIndex].overs1 && (
                      <span className="text-sm text-muted-foreground dark:text-gray-400 ml-2">
                        ({matches[currentIndex].overs1})
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg dark:text-white">
                    {matches[currentIndex].team2}
                  </span>
                  <div className="text-right">
                    <span className="text-2xl font-bold dark:text-white">
                      {matches[currentIndex].score2 || '0/0'}
                    </span>
                    {matches[currentIndex].overs2 && (
                      <span className="text-sm text-muted-foreground dark:text-gray-400 ml-2">
                        ({matches[currentIndex].overs2})
                      </span>
                    )}
                  </div>
                </div>

                {matches[currentIndex].venue && (
                  <p className="text-sm text-muted-foreground dark:text-gray-400 mt-4">
                    📍 {matches[currentIndex].venue}
                  </p>
                )}
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

export default LiveMatchCarousel;
