import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';

const ArticlePage = () => {
  const { id } = useParams();
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const article = {
    title: language === 'en' 
      ? 'Bangladesh Wins Thrilling Match Against India' 
      : 'ভারতের বিরুদ্ধে রোমাঞ্চকর ম্যাচে জয় পেল বাংলাদেশ',
    date: '2024-01-15',
    author: 'Kamal Ahmed',
    image: 'https://c.animaapp.com/mjcf7krg02IrbV/img/ai_2.png',
    content: language === 'en' 
      ? `In a nail-biting finish that kept fans on the edge of their seats, Bangladesh secured a historic victory against India in what will be remembered as one of the most thrilling matches in recent cricket history.

The match, played at the Sher-e-Bangla National Stadium in Dhaka, saw exceptional performances from both teams. Bangladesh's batting lineup showed remarkable resilience, with key players delivering under pressure when it mattered most.

The turning point came in the final over when Bangladesh needed 12 runs to win. With nerves of steel, the batsmen executed their shots perfectly, bringing the crowd to their feet with every boundary.

This victory marks a significant milestone for Bangladesh cricket, demonstrating the team's growing prowess on the international stage. The win has sparked celebrations across the nation, with fans taking to the streets to express their joy and pride.

Cricket analysts have praised the team's strategic approach and mental fortitude, noting that this performance could be a turning point in Bangladesh's cricketing journey. The victory has also boosted the team's confidence ahead of upcoming international tournaments.

The match showcased the best of cricket - skill, strategy, and sportsmanship. Both teams displayed exceptional talent, making it a memorable contest for cricket enthusiasts worldwide.`
      : `ভক্তদের আসনের কিনারায় রাখা একটি রোমাঞ্চকর সমাপ্তিতে, বাংলাদেশ ভারতের বিরুদ্ধে একটি ঐতিহাসিক জয় অর্জন করেছে যা সাম্প্রতিক ক্রিকেট ইতিহাসের সবচেয়ে রোমাঞ্চকর ম্যাচগুলির একটি হিসাবে স্মরণীয় হয়ে থাকবে।

ঢাকার শের-ই-বাংলা জাতীয় স্টেডিয়ামে খেলা এই ম্যাচে উভয় দল থেকে ব্যতিক্রমী পারফরম্যান্স দেখা গেছে। বাংলাদেশের ব্যাটিং লাইনআপ অসাধারণ স্থিতিস্থাপকতা দেখিয়েছে, মূল খেলোয়াড়রা চাপের মধ্যে প্রয়োজনের সময় সরবরাহ করেছে।

চূড়ান্ত ওভারে টার্নিং পয়েন্ট এসেছিল যখন বাংলাদেশের জয়ের জন্য ১২ রান প্রয়োজন ছিল। ইস্পাতের স্নায়ু দিয়ে, ব্যাটসম্যানরা তাদের শট নিখুঁতভাবে সম্পাদন করেছে, প্রতিটি সীমানা দিয়ে ভিড়কে তাদের পায়ে নিয়ে এসেছে।

এই বিজয় বাংলাদেশ ক্রিকেটের জন্য একটি উল্লেখযোগ্য মাইলফলক চিহ্নিত করে, আন্তর্জাতিক মঞ্চে দলের ক্রমবর্ধমান দক্ষতা প্রদর্শন করে। জয়টি সারা দেশে উদযাপনের সূত্রপাত করেছে, ভক্তরা তাদের আনন্দ এবং গর্ব প্রকাশ করতে রাস্তায় নেমেছে।

ক্রিকেট বিশ্লেষকরা দলের কৌশলগত পদ্ধতি এবং মানসিক দৃঢ়তার প্রশংসা করেছেন, উল্লেখ করেছেন যে এই পারফরম্যান্স বাংলাদেশের ক্রিকেট যাত্রায় একটি টার্নিং পয়েন্ট হতে পারে। জয়টি আসন্ন আন্তর্জাতিক টুর্নামেন্টের আগে দলের আত্মবিশ্বাসও বাড়িয়েছে।

ম্যাচটি ক্রিকেটের সেরাটি প্রদর্শন করেছে - দক্ষতা, কৌশল এবং ক্রীড়াশীলতা। উভয় দল ব্যতিক্রমী প্রতিভা প্রদর্শন করেছে, এটি বিশ্বব্যাপী ক্রিকেট উত্সাহীদের জন্য একটি স্মরণীয় প্রতিযোগিতা তৈরি করেছে।`,
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <div className="container mx-auto px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/">
            <Button
              variant="ghost"
              className="mb-8 bg-transparent text-foreground dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="mr-2" size={20} strokeWidth={2} />
              {getTranslation(language, 'backToHome')}
            </Button>
          </Link>

          <article className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-muted-foreground dark:text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={20} strokeWidth={2} />
                <span>{new Date(article.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={20} strokeWidth={2} />
                <span>{article.author}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto bg-transparent text-foreground dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Share2 className="mr-2" size={16} strokeWidth={2} />
                {getTranslation(language, 'shareArticle')}
              </Button>
            </div>

            <img
              src={article.image}
              alt={article.title}
              className="w-full h-[500px] object-cover rounded-lg mb-8"
              loading="eager"
            />

            <div className="prose prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-foreground dark:text-gray-200 mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </motion.div>
      </div>
    </div>
  );
};

export default ArticlePage;
