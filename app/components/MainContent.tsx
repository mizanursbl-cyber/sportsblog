import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslatedArticles } from '@/hooks/useTranslatedContent';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import ArticleCard from './ArticleCard';
import { Button } from '@/components/ui/button';

interface MainContentProps {
  category?: string;
}

const MainContent = ({ category }: MainContentProps) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const { language } = useLanguage();

  const { data: articles, isPending, error } = useTranslatedArticles({
    where: category ? { category } : undefined,
    orderBy: { date: 'desc' },
    limit: visibleCount
  });

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  if (isPending) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400">
          {getTranslation(language, 'errorLoadingArticles')}: {error.message}
        </p>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground dark:text-gray-400">
          {getTranslation(language, 'noPosts')}
        </p>
      </div>
    );
  }

  const categories = category ? [category] : ['cricket', 'football', 'others'];

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={language}
        className="space-y-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {categories.map((cat) => {
          const categoryArticles = articles.filter(article => article.category === cat);
          
          if (categoryArticles.length === 0) return null;

          return (
            <section key={cat}>
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {getTranslation(language, cat)}
              </motion.h2>
              <div className="space-y-6">
                {categoryArticles.map((article, index) => (
                  <ArticleCard key={article.id} article={article} index={index} />
                ))}
              </div>
            </section>
          );
        })}

        {articles.length >= visibleCount && (
          <div className="flex justify-center pt-8">
            <Button
              onClick={handleLoadMore}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {getTranslation(language, 'readMore')}
            </Button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default MainContent;
