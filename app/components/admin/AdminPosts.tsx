import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation } from '@animaapp/playground-react-sdk';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import type { Language, Article } from '@/types';
import PostEditor from './PostEditor';

interface AdminPostsProps {
  language: Language;
}

const AdminPosts = ({ language }: AdminPostsProps) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Article | null>(null);

  const { data: articles, isPending, error } = useQuery('Article', {
    orderBy: { createdAt: 'desc' }
  });

  const { remove, isPending: isDeleting } = useMutation('Article');

  const content = {
    en: {
      title: 'Manage Posts',
      newPost: 'New Post',
      edit: 'Edit',
      delete: 'Delete',
      confirmDelete: 'Are you sure you want to delete this post?',
      noPosts: 'No posts yet',
    },
    bn: {
      title: 'পোস্ট পরিচালনা',
      newPost: 'নতুন পোস্ট',
      edit: 'সম্পাদনা',
      delete: 'মুছুন',
      confirmDelete: 'আপনি কি এই পোস্টটি মুছে ফেলতে চান?',
      noPosts: 'এখনও কোন পোস্ট নেই',
    },
  };

  const text = content[language];

  const handleEdit = (post: Article) => {
    setEditingPost(post);
    setIsEditorOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(text.confirmDelete)) {
      try {
        await remove(id);
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingPost(null);
  };

  if (isPending) {
    return <div className="text-center py-12 dark:text-white">Loading posts...</div>;
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
          {text.newPost}
        </Button>
      </div>

      {!articles || articles.length === 0 ? (
        <Card className="p-12 text-center dark:bg-gray-800">
          <p className="text-muted-foreground dark:text-gray-400">{text.noPosts}</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="p-6 dark:bg-gray-800">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 dark:text-white">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground dark:text-gray-400 mb-2 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-gray-400">
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      onClick={() => handleEdit(article)}
                      variant="outline"
                      size="sm"
                      className="dark:border-gray-600 dark:text-gray-300"
                    >
                      <Edit size={16} className="mr-1" />
                      {text.edit}
                    </Button>
                    <Button
                      onClick={() => handleDelete(article.id)}
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
        <PostEditor
          language={language}
          post={editingPost}
          onClose={handleCloseEditor}
        />
      )}
    </div>
  );
};

export default AdminPosts;
