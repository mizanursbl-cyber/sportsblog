import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Search, Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language } = useLanguage();

  const navItems = [
    { label: getTranslation(language, 'home'), path: '/' },
    { label: getTranslation(language, 'cricket'), path: '/category/cricket' },
    { label: getTranslation(language, 'football'), path: '/category/football' },
    { label: getTranslation(language, 'others'), path: '/category/others' },
  ];

  return (
    <motion.nav 
      className="sticky top-[52px] z-40 bg-neutral dark:bg-gray-800 border-b border-border dark:border-gray-700"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          <AnimatePresence mode="wait">
            <motion.div 
              key={language}
              className="hidden md:flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer rounded-md ${
                    location.pathname === item.path
                      ? 'bg-primary text-primary-foreground dark:bg-primary'
                      : 'text-neutral-foreground dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>

          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex bg-transparent text-neutral-foreground dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Search size={20} strokeWidth={2} />
          </Button>

          <div className="md:hidden flex items-center gap-4 w-full justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="bg-transparent text-neutral-foreground dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {mobileMenuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-transparent text-neutral-foreground dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Search size={20} strokeWidth={2} />
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden bg-neutral dark:bg-gray-800 border-t border-border dark:border-gray-700 py-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                    location.pathname === item.path
                      ? 'bg-primary text-primary-foreground dark:bg-primary'
                      : 'text-neutral-foreground dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default NavBar;
