import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@animaapp/playground-react-sdk';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';
import type { Language, Article, ArticleDraft } from '@/types';

interface PostEditorProps {
  language: Language;
  post?: Article | null;
  onClose: () => void;
}

const PostEditor = ({ language, post, onClose }: PostEditorProps) => {
  const [formData, setFormData] = useState<ArticleDraft>({
    title: '',
    description: '',
    category: 'cricket',
    image: '',
    date: new Date(),
    author: '',
  });

  const { create, update, isPending, error } = useMutation('Article');

  const content = {
    en: {
      title: post ? 'Edit Post' : 'Create New Post',
      titleLabel: 'Title',
      descriptionLabel: 'Description',
      categoryLabel: 'Category',
      imageLabel: 'Image URL',
      authorLabel: 'Author',
      save: 'Save Post',
      cancel: 'Cancel',
      cricket: 'Cricket',
      football: 'Football',
      others: 'Others',
    },
    bn: {
      title: post ? 'পোস্ট সম্পাদনা' : 'নতুন পোস্ট তৈরি করুন',
      titleLabel: 'শিরোনাম',
      descriptionLabel: 'বিবরণ',
      categoryLabel: 'বিভাগ',
      imageLabel: 'ছবির URL',
      authorLabel: 'লেখক',
      save: 'পোস্ট সংরক্ষণ করুন',
      cancel: 'বাতিল',
      cricket: 'ক্রিকেট',
      football: 'ফুটবল',
      others: 'অন্যান্য',
    },
  };

  const text = content[language];

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        description: post.description,
        category: post.category,
        image: post.image,
        date: new Date(post.date),
        author: post.author,
      });
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (post) {
        await update(post.id, formData);
      } else {
        await create(formData);
      }
      onClose();
    } catch (err) {
      console.error('Failed to save post:', err);
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
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                {text.titleLabel}
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                {text.descriptionLabel}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg h-32 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                {text.categoryLabel}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="cricket">{text.cricket}</option>
                <option value="football">{text.football}</option>
                <option value="others">{text.others}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                {text.imageLabel}
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                {text.authorLabel}
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

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

export default PostEditor;
