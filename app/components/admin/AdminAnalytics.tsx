import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import type { Language } from '@/types';

interface AdminAnalyticsProps {
  language: Language;
}

const AdminAnalytics = ({ language }: AdminAnalyticsProps) => {
  const content = {
    en: {
      title: 'Analytics',
      comingSoon: 'Advanced analytics coming soon',
    },
    bn: {
      title: 'বিশ্লেষণ',
      comingSoon: 'উন্নত বিশ্লেষণ শীঘ্রই আসছে',
    },
  };

  const text = content[language];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 dark:text-white">{text.title}</h1>
      <Card className="p-12 text-center dark:bg-gray-800">
        <p className="text-muted-foreground dark:text-gray-400">{text.comingSoon}</p>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
