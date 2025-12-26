import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';

const VotingWidget = () => {
  const { language } = useLanguage();
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState({
    option1: 45,
    option2: 35,
    option3: 20,
  });

  const handleVote = (option: 'option1' | 'option2' | 'option3') => {
    if (!voted) {
      setVotes(prev => ({
        ...prev,
        [option]: prev[option] + 1,
      }));
      setVoted(true);
    }
  };

  const totalVotes = votes.option1 + votes.option2 + votes.option3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-6 bg-card text-card-foreground dark:bg-gray-800">
        <h3 className="text-xl font-bold text-foreground dark:text-white mb-4">
          {getTranslation(language, 'fanPrediction')}
        </h3>
        <p className="text-foreground dark:text-gray-200 mb-6">
          {language === 'bn' ? 'পরবর্তী ম্যাচে কে জিতবে?' : 'Who will win the next match?'}
        </p>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground dark:text-white">
                {language === 'bn' ? 'বাংলাদেশ' : 'Bangladesh'}
              </span>
              <span className="text-sm text-muted-foreground dark:text-gray-400">
                {((votes.option1 / totalVotes) * 100).toFixed(1)}%
              </span>
            </div>
            <Progress value={(votes.option1 / totalVotes) * 100} className="h-2" />
            {!voted && (
              <Button
                onClick={() => handleVote('option1')}
                size="sm"
                className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {getTranslation(language, 'vote')}
              </Button>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground dark:text-white">
                {language === 'bn' ? 'ভারত' : 'India'}
              </span>
              <span className="text-sm text-muted-foreground dark:text-gray-400">
                {((votes.option2 / totalVotes) * 100).toFixed(1)}%
              </span>
            </div>
            <Progress value={(votes.option2 / totalVotes) * 100} className="h-2" />
            {!voted && (
              <Button
                onClick={() => handleVote('option2')}
                size="sm"
                className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {getTranslation(language, 'vote')}
              </Button>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground dark:text-white">
                {language === 'bn' ? 'ড্র' : 'Draw'}
              </span>
              <span className="text-sm text-muted-foreground dark:text-gray-400">
                {((votes.option3 / totalVotes) * 100).toFixed(1)}%
              </span>
            </div>
            <Progress value={(votes.option3 / totalVotes) * 100} className="h-2" />
            {!voted && (
              <Button
                onClick={() => handleVote('option3')}
                size="sm"
                className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {getTranslation(language, 'vote')}
              </Button>
            )}
          </div>
        </div>

        {voted && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-success font-medium mt-4"
          >
            {getTranslation(language, 'voted')}
          </motion.p>
        )}

        <p className="text-xs text-muted-foreground dark:text-gray-400 text-center mt-4">
          {getTranslation(language, 'totalVotes')}: {totalVotes}
        </p>
      </Card>
    </motion.div>
  );
};

export default VotingWidget;
