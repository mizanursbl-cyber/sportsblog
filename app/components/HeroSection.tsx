import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';

const HeroSection = () => {
  const { language } = useLanguage();

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      {/* Video Background */}
      <motion.video
        src="https://c.animaapp.com/mjcf7krg02IrbV/img/ai_1.mp4"
        poster="https://c.animaapp.com/mjcf7krg02IrbV/img/ai_1-poster.png"
        alt="bangladesh sports video"
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/100" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-8 h-full flex flex-col justify-end pb-24">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-8 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {language === 'bn' 
            ? 'বাংলাদেশ ক্রিকেট দল ঐতিহাসিক জয় অর্জন করেছে'
            : 'Bangladesh Cricket Team Secures Historic Victory'
          }
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
          >
            {getTranslation(language, 'readMore')}
            <ArrowRight className="ml-2" size={20} strokeWidth={2} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
