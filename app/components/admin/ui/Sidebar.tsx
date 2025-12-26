import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';

const Sidebar = () => {
  const { language } = useLanguage();

  const latestNews = [
    { 
      id: 1, 
      title: language === 'en' ? 'Breaking: New Cricket Stadium Announced' : 'ব্রেকিং: নতুন ক্রিকেট স্টেডিয়াম ঘোষণা', 
      time: '5 min ago' 
    },
    { 
      id: 2, 
      title: language === 'en' ? 'Football Team Signs International Player' : 'ফুটবল দল আন্তর্জাতিক খেলোয়াড় স্বাক্ষর করেছে', 
      time: '15 min ago' 
    },
    { 
      id: 3, 
      title: language === 'en' ? 'Local Sports Festival Begins Tomorrow' : 'স্থানীয় ক্রীড়া উৎসব আগামীকাল শুরু', 
      time: '30 min ago' 
    },
    { 
      id: 4, 
      title: language === 'en' ? 'Cricket Coach Announces Retirement' : 'ক্রিকেট কোচ অবসর ঘোষণা করেছেন', 
      time: '1 hour ago' 
    },
    { 
      id: 5, 
      title: language === 'en' ? 'Youth League Registration Opens' : 'যুব লীগ নিবন্ধন খোলা', 
      time: '2 hours ago' 
    },
  ];

  const mostRead = [
    { 
      id: 1, 
      title: language === 'en' ? 'Historic Victory Against India' : 'ভারতের বিরুদ্ধে ঐতিহাসিক জয়', 
      views: '15.2K' 
    },
    { 
      id: 2, 
      title: language === 'en' ? 'World Cup Preparation Updates' : 'বিশ্বকাপ প্রস্তুতি আপডেট', 
      views: '12.8K' 
    },
    { 
      id: 3, 
      title: language === 'en' ? 'Football Championship Finals' : 'ফুটবল চ্যাম্পিয়নশিপ ফাইনাল', 
      views: '10.5K' 
    },
    { 
      id: 4, 
      title: language === 'en' ? 'Kabaddi Tournament Highlights' : 'কাবাডি টুর্নামেন্ট হাইলাইট', 
      views: '9.3K' 
    },
    { 
      id: 5, 
      title: language === 'en' ? 'Sports Infrastructure Development' : 'ক্রীড়া অবকাঠামো উন্নয়ন', 
      views: '8.7K' 
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <Card className="p-6 bg-card text-card-foreground dark:bg-gray-800">
        <Tabs defaultValue="latest" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="latest" className="text-foreground dark:text-gray-200">
              <Clock className="mr-2" size={16} strokeWidth={2} />
              {getTranslation(language, 'latestNews')}
            </TabsTrigger>
            <TabsTrigger value="mostRead" className="text-foreground dark:text-gray-200">
              <TrendingUp className="mr-2" size={16} strokeWidth={2} />
              {getTranslation(language, 'mostRead')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="latest" className="space-y-4">
            {latestNews.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="pb-4 border-b border-border dark:border-gray-700 last:border-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded transition-colors"
              >
                <h4 className="font-semibold text-sm text-foreground dark:text-white mb-1 line-clamp-2">
                  {item.title}
                </h4>
                <span className="text-xs text-muted-foreground dark:text-gray-400">{item.time}</span>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="mostRead" className="space-y-4">
            {mostRead.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="pb-4 border-b border-border dark:border-gray-700 last:border-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded transition-colors"
              >
                <h4 className="font-semibold text-sm text-foreground dark:text-white mb-1 line-clamp-2">
                  {item.title}
                </h4>
                <span className="text-xs text-muted-foreground dark:text-gray-400">{item.views} views</span>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </Card>
    </motion.div>
  );
};

export default Sidebar;
