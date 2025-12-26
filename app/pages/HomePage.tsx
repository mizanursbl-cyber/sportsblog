import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import HeroSection from '@/components/HeroSection';
import LiveMatchCarousel from '@/components/LiveMatchCarousel';
import UpcomingMatchCarousel from '@/components/UpcomingMatchCarousel';
import MainContent from '@/components/MainContent';
import Sidebar from '@/components/Sidebar';
import VotingWidget from '@/components/VotingWidget';

const HomePage = () => {
  const { language } = useLanguage();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={language}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <HeroSection />
        
        <div className="container mx-auto px-8 py-8">
          <LiveMatchCarousel />
          <UpcomingMatchCarousel />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
            <div className="lg:col-span-2">
              <MainContent />
            </div>
            <div className="lg:col-span-1">
              <Sidebar />
              <VotingWidget />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HomePage;
