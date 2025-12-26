import { useQuery } from '@animaapp/playground-react-sdk';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Article, Match } from '@/types';

export function useTranslatedArticles(filters?: any) {
  const { language } = useLanguage();
  
  const { data: articles, isPending, error } = useQuery('Article', {
    ...filters,
    where: {
      ...filters?.where,
      languageCode: language
    }
  });

  return { data: articles, isPending, error };
}

export function useTranslatedArticle(id: string) {
  const { language } = useLanguage();
  
  const { data: articles, isPending, error } = useQuery('Article', {
    where: {
      id,
      languageCode: language
    }
  });

  return { 
    data: articles?.[0], 
    isPending, 
    error 
  };
}

export function useTranslatedMatches(filters?: any) {
  const { language } = useLanguage();
  
  const { data: matches, isPending, error } = useQuery('Match', {
    ...filters,
    where: {
      ...filters?.where,
      languageCode: language
    }
  });

  return { data: matches, isPending, error };
}

export function useTranslation(entityType: string, entityId: string, fieldName: string) {
  const { language } = useLanguage();
  
  const { data: translations } = useQuery('Translation', {
    where: {
      entityType,
      entityId,
      languageCode: language,
      fieldName
    }
  });

  return translations?.[0]?.translatedText || '';
}
