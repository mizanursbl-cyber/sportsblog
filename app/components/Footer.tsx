import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';

const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white mt-32">
      <div className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={`about-${language}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4 text-white">
                {getTranslation(language, 'aboutUs')}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {getTranslation(language, 'aboutText')}
              </p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`links-${language}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-4 text-white">
                {getTranslation(language, 'quickLinks')}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    {getTranslation(language, 'home')}
                  </Link>
                </li>
                <li>
                  <Link to="/category/cricket" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    {getTranslation(language, 'cricket')}
                  </Link>
                </li>
                <li>
                  <Link to="/category/football" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    {getTranslation(language, 'football')}
                  </Link>
                </li>
                <li>
                  <Link to="/category/others" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    {getTranslation(language, 'others')}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    {getTranslation(language, 'contact')}
                  </Link>
                </li>
              </ul>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`social-${language}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-4 text-white">
                {getTranslation(language, 'followUs')}
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
                  aria-label="Facebook"
                >
                  <Facebook size={20} strokeWidth={2} className="text-white" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
                  aria-label="Twitter"
                >
                  <Twitter size={20} strokeWidth={2} className="text-white" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
                  aria-label="Instagram"
                >
                  <Instagram size={20} strokeWidth={2} className="text-white" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
                  aria-label="YouTube"
                >
                  <Youtube size={20} strokeWidth={2} className="text-white" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <AnimatePresence mode="wait">
          <motion.div 
            key={`copyright-${language}`}
            className="text-center text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{getTranslation(language, 'copyright')}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </footer>
  );
};

export default Footer;
