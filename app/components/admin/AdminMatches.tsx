import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation } from '@animaapp/playground-react-sdk';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import type { Language, Match } from '@/types';
import MatchEditor from './MatchEditor';

interface AdminMatchesProps {
  language: Language;
}

const AdminMatches = ({ language }: AdminMatchesProps) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);

  const { data: matches, isPending, error } = useQuery('Match', {
    orderBy: { createdAt: 'desc' }
  });

  const { remove, isPending: isDeleting } = useMutation('Match');

  const content = {
    en: {
      title: 'Manage Matches',
      newMatch: 'New Match',
      edit: 'Edit',
      delete: 'Delete',
      confirmDelete: 'Are you sure you want to delete this match?',
      noMatches: 'No matches yet',
    },
    bn: {
      title: 'ম্যাচ পরিচালনা',
      newMatch: 'নতুন ম্যাচ',
      edit: 'সম্পাদনা',
      delete: 'মুছুন',
      confirmDelete: 'আপনি কি এই ম্যাচটি মুছে ফেলতে চান?',
      noMatches: 'এখনও কোন ম্যাচ নেই',
    },
  };

  const text = content[language];

  const handleEdit = (match: Match) => {
    setEditingMatch(match);
    setIsEditorOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(text.confirmDelete)) {
      try {
        await remove(id);
      } catch (error) {
        console.error('Failed to delete match:', error);
      }
    }
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingMatch(null);
  };

  if (isPending) {
    return <div className="text-center py-12 dark:text-white">Loading matches...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600 dark:text-red-400">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">{text.title}</h1>
        <Button
          onClick={() => setIsEditorOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus size={20} className="mr-2" />
          {text.newMatch}
        </Button>
      </div>

      {!matches || matches.length === 0 ? (
        <Card className="p-12 text-center dark:bg-gray-800">
          <p className="text-muted-foreground dark:text-gray-400">{text.noMatches}</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {matches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="p-6 dark:bg-gray-800">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 dark:text-white">
                      {match.team1} vs {match.team2}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-gray-400">
                      <span className="capitalize">{match.status}</span>
                      {match.venue && (
                        <>
                          <span>•</span>
                          <span>{match.venue}</span>
                        </>
                      )}
                      {match.matchTime && (
                        <>
                          <span>•</span>
                          <span>{new Date(match.matchTime).toLocaleString()}</span>
                        </>
                      )}
                    </div>
                    {match.status === 'live' && (
                      <div className="mt-2 flex gap-8">
                        <span className="dark:text-white">
                          {match.team1}: {match.score1 || '0/0'} ({match.overs1 || '0.0'})
                        </span>
                        <span className="dark:text-white">
                          {match.team2}: {match.score2 || '0/0'} ({match.overs2 || '0.0'})
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      onClick={() => handleEdit(match)}
                      variant="outline"
                      size="sm"
                      className="dark:border-gray-600 dark:text-gray-300"
                    >
                      <Edit size={16} className="mr-1" />
                      {text.edit}
                    </Button>
                    <Button
                      onClick={() => handleDelete(match.id)}
                      disabled={isDeleting}
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-600 hover:bg-red-50 dark:border-red-500 dark:text-red-400"
                    >
                      <Trash2 size={16} className="mr-1" />
                      {text.delete}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {isEditorOpen && (
        <MatchEditor
          language={language}
          match={editingMatch}
          onClose={handleCloseEditor}
        />
      )}
    </div>
  );
};

export default AdminMatches;
