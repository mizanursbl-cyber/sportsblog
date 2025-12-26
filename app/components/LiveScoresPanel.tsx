import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LiveScoresPanelProps {
  language: 'en' | 'bn';
}

const LiveScoresPanel = ({ language }: LiveScoresPanelProps) => {
  const content = {
    en: {
      title: 'Live Cricket Scores',
      live: 'Live',
      upcoming: 'Upcoming',
      finished: 'Finished',
    },
    bn: {
      title: 'লাইভ ক্রিকেট স্কোর',
      live: 'লাইভ',
      upcoming: 'আসন্ন',
      finished: 'সমাপ্ত',
    },
  };

  const text = content[language];

  const matches = [
    {
      id: 1,
      team1: 'Bangladesh',
      team2: 'India',
      score1: '245/6',
      score2: '180/4',
      overs1: '45.2',
      overs2: '32.0',
      status: 'live',
    },
    {
      id: 2,
      team1: 'Pakistan',
      team2: 'Sri Lanka',
      score1: '320/8',
      score2: '285/10',
      overs1: '50.0',
      overs2: '48.3',
      status: 'finished',
    },
    {
      id: 3,
      team1: 'Australia',
      team2: 'England',
      score1: '-',
      score2: '-',
      overs1: '-',
      overs2: '-',
      status: 'upcoming',
    },
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'live') {
      return (
        <Badge className="bg-tertiary text-tertiary-foreground">
          <motion.span
            className="inline-block w-2 h-2 bg-white rounded-full mr-2"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          {text.live}
        </Badge>
      );
    }
    if (status === 'upcoming') {
      return <Badge className="bg-warning text-foreground">{text.upcoming}</Badge>;
    }
    return <Badge className="bg-gray-400 text-white">{text.finished}</Badge>;
  };

  return (
    <section className="py-16">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-foreground mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {text.title}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match, index) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="p-6 bg-card text-card-foreground hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center mb-4">
                {getStatusBadge(match.status)}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">{match.team1}</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-foreground">{match.score1}</span>
                    {match.overs1 !== '-' && (
                      <span className="text-sm text-muted-foreground ml-2">({match.overs1})</span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">{match.team2}</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-foreground">{match.score2}</span>
                    {match.overs2 !== '-' && (
                      <span className="text-sm text-muted-foreground ml-2">({match.overs2})</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LiveScoresPanel;
