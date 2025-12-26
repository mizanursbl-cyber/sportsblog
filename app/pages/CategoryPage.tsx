import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import MainContent from '@/components/MainContent';
import Sidebar from '@/components/Sidebar';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { language } = useLanguage();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${category}-${language}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-8 py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MainContent category={category} />
          </div>
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CategoryPage;
