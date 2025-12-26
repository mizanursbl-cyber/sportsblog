import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@animaapp/playground-react-sdk';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';
import type { Language, Match, MatchDraft } from '@/types';

interface MatchEditorProps {
  language: Language;
  match?: Match | null;
  onClose: () => void;
}

const MatchEditor = ({ language, match, onClose }: MatchEditorProps) => {
  const [formData, setFormData] = useState<MatchDraft>({
    team1: '',
    team2: '',
    venue: '',
    matchTime: new Date(),
    score1: '',
    score2: '',
    overs1: '',
    overs2: '',
    status: 'upcoming',
  });

  const { create, update, isPending, error } = useMutation('Match');

  const content = {
    en: {
      title: match ? 'Edit Match' : 'Create New Match',
      team1Label: 'Team 1',
      team2Label: 'Team 2',
      venueLabel: 'Venue',
      matchTimeLabel: 'Match Time',
      score1Label: 'Team 1 Score',
      score2Label: 'Team 2 Score',
      overs1Label: 'Team 1 Overs',
      overs2Label: 'Team 2 Overs',
      statusLabel: 'Status',
      save: 'Save Match',
      cancel: 'Cancel',
      upcoming: 'Upcoming',
      live: 'Live',
      finished: 'Finished',
    },
    bn: {
      title: match ? 'ম্যাচ সম্পাদনা' : 'নতুন ম্যাচ তৈরি করুন',
      team1Label: 'দল ১',
      team2Label: 'দল ২',
      venueLabel: 'স্থান',
      matchTimeLabel: 'ম্যাচের সময়',
      score1Label: 'দল ১ স্কোর',
      score2Label: 'দল ২ স্কোর',
      overs1Label: 'দল ১ ওভার',
      overs2Label: 'দল ২ ওভার',
      statusLabel: 'অবস্থা',
      save: 'ম্যাচ সংরক্ষণ করুন',
      cancel: 'বাতিল',
      upcoming: 'আসন্ন',
      live: 'লাইভ',
      finished: 'সমাপ্ত',
    },
  };

  const text = content[language];

  useEffect(() => {
    if (match) {
      setFormData({
        team1: match.team1,
        team2: match.team2,
        venue: match.venue || '',
        matchTime: match.matchTime ? new Date(match.matchTime) : new Date(),
        score1: match.score1 || '',
        score2: match.score2 || '',
        overs1: match.overs1 || '',
        overs2: match.overs2 || '',
        status: match.status || 'upcoming',
      });
    }
  }, [match]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (match) {
        await update(match.id, formData);
      } else {
        await create(formData);
      }
      onClose();
    } catch (err) {
      console.error('Failed to save match:', err);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <Card className="p-6 dark:bg-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold dark:text-white">{text.title}</h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="dark:text-gray-300"
            >
              <X size={20} />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                  {text.team1Label}
                </label>
                <input
                  type="text"
                  value={formData.team1}
                  onChange={(e) => setFormData({ ...formData, team1: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                  {text.team2Label}
                </label>
                <input
                  type="text"
                  value={formData.team2}
                  onChange={(e) => setFormData({ ...formData, team2: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                {text.venueLabel}
              </label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                {text.matchTimeLabel}
              </label>
              <input
                type="datetime-local"
                value={formData.matchTime ? new Date(formData.matchTime).toISOString().slice(0, 16) : ''}
                onChange={(e) => setFormData({ ...formData, matchTime: new Date(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                {text.statusLabel}
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="upcoming">{text.upcoming}</option>
                <option value="live">{text.live}</option>
                <option value="finished">{text.finished}</option>
              </select>
            </div>

            {formData.status === 'live' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    {text.score1Label}
                  </label>
                  <input
                    type="text"
                    value={formData.score1}
                    onChange={(e) => setFormData({ ...formData, score1: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="245/6"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    {text.overs1Label}
                  </label>
                  <input
                    type="text"
                    value={formData.overs1}
                    onChange={(e) => setFormData({ ...formData, overs1: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="45.2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    {text.score2Label}
                  </label>
                  <input
                    type="text"
                    value={formData.score2}
                    onChange={(e) => setFormData({ ...formData, score2: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="180/4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    {text.overs2Label}
                  </label>
                  <input
                    type="text"
                    value={formData.overs2}
                    onChange={(e) => setFormData({ ...formData, overs2: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="32.0"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg">
                Error: {error.message}
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isPending ? 'Saving...' : text.save}
              </Button>
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="flex-1 dark:border-gray-600 dark:text-gray-300"
              >
                {text.cancel}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default MatchEditor;
