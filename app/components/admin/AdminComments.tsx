import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import type { Language } from '@/types';

interface AdminCommentsProps {
  language: Language;
}

const AdminComments = ({ language }: AdminCommentsProps) => {
  const content = {
    en: {
      title: 'Manage Comments',
      comingSoon: 'Comment moderation coming soon',
    },
    bn: {
      title: 'মন্তব্য পরিচালনা',
      comingSoon: 'মন্তব্য মডারেশন শীঘ্রই আসছে',
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

export default AdminComments;
