import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';

interface UpcomingMatchesPanelProps {
  language: 'en' | 'bn';
}

const UpcomingMatchesPanel = ({ language }: UpcomingMatchesPanelProps) => {
  const content = {
    en: {
      title: 'Upcoming Matches',
      venue: 'Venue',
    },
    bn: {
      title: 'আসন্ন ম্যাচ',
      venue: 'স্থান',
    },
  };

  const text = content[language];

  const matches = [
    {
      id: 1,
      team1: 'Bangladesh',
      team2: 'South Africa',
      venue: 'Sher-e-Bangla Stadium, Dhaka',
      matchTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 2,
      team1: 'West Indies',
      team2: 'New Zealand',
      venue: 'Zahur Ahmed Chowdhury Stadium, Chattogram',
      matchTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    },
  ];

  const [countdowns, setCountdowns] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const updateCountdowns = () => {
      const newCountdowns: { [key: number]: string } = {};
      matches.forEach((match) => {
        const now = new Date().getTime();
        const distance = match.matchTime.getTime() - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        newCountdowns[match.id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      });
      setCountdowns(newCountdowns);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval);
  }, []);

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <span className="text-xl font-bold text-foreground">{match.team1}</span>
                <span className="text-muted-foreground font-medium">vs</span>
                <span className="text-xl font-bold text-foreground">{match.team2}</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin size={16} strokeWidth={2} />
                <span className="text-sm">{match.venue}</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <Calendar size={16} strokeWidth={2} />
                <span className="text-sm">{match.matchTime.toLocaleDateString()}</span>
              </div>

              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <span className="text-2xl font-bold text-primary">{countdowns[match.id]}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingMatchesPanel;
