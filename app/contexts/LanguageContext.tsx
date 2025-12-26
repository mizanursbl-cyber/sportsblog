import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery, useMutation } from '@animaapp/playground-react-sdk';
import type { Language } from '@/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'preferred_language';
const DEFAULT_LANGUAGE: Language = 'bn'; // Default to Bangla

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch translations from database
  const { data: translations } = useQuery('Translation', {
    where: { languageCode: language }
  });

  // Initialize language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'bn')) {
      setLanguageState(savedLanguage);
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = savedLanguage || DEFAULT_LANGUAGE;
    setIsLoading(false);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    
    // Smooth scroll to top on language change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Translation function with fallback
  const t = (key: string, fallback?: string): string => {
    if (!translations) return fallback || key;
    
    const translation = translations.find(
      t => t.entityType === 'label' && t.fieldName === key
    );
    
    return translation?.translatedText || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
