import { motion } from 'framer-motion';
import { useQuery } from '@animaapp/playground-react-sdk';
import { Card } from '@/components/ui/card';
import { FileText, Trophy, MessageSquare, TrendingUp } from 'lucide-react';
import type { Language } from '@/types';

interface AdminDashboardProps {
  language: Language;
}

const AdminDashboard = ({ language }: AdminDashboardProps) => {
  const { data: articles } = useQuery('Article');
  const { data: matches } = useQuery('Match');

  const content = {
    en: {
      title: 'Dashboard Overview',
      totalPosts: 'Total Posts',
      totalMatches: 'Total Matches',
      liveMatches: 'Live Matches',
      upcomingMatches: 'Upcoming Matches',
    },
    bn: {
      title: 'ড্যাশবোর্ড ওভারভিউ',
      totalPosts: 'মোট পোস্ট',
      totalMatches: 'মোট ম্যাচ',
      liveMatches: 'লাইভ ম্যাচ',
      upcomingMatches: 'আসন্ন ম্যাচ',
    },
  };

  const text = content[language];

  const stats = [
    {
      icon: FileText,
      label: text.totalPosts,
      value: articles?.length || 0,
      color: 'bg-blue-500',
    },
    {
      icon: Trophy,
      label: text.totalMatches,
      value: matches?.length || 0,
      color: 'bg-green-500',
    },
    {
      icon: TrendingUp,
      label: text.liveMatches,
      value: matches?.filter(m => m.status === 'live').length || 0,
      color: 'bg-red-500',
    },
    {
      icon: MessageSquare,
      label: text.upcomingMatches,
      value: matches?.filter(m => m.status === 'upcoming').length || 0,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 dark:text-white">{text.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="p-6 dark:bg-gray-800">
                <div className="flex items-center gap-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold dark:text-white">{stat.value}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
