import { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@animaapp/playground-react-sdk';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  LayoutDashboard,
  FileText,
  Trophy,
  MessageSquare,
  BarChart3,
  LogOut
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/types';

import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminPosts from '@/components/admin/AdminPosts';
import AdminMatches from '@/components/admin/AdminMatches';
import AdminComments from '@/components/admin/AdminComments';
import AdminAnalytics from '@/components/admin/AdminAnalytics';

const AdminPage = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const { user, isPending, isAnonymous, login, logout } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const content: Record<Language, any> = {
    en: {
      title: 'Admin Panel',
      dashboard: 'Dashboard',
      posts: 'Posts',
      matches: 'Matches',
      comments: 'Comments',
      analytics: 'Analytics',
      logout: 'Logout',
      loginRequired: 'Admin Login Required',
      loginButton: 'Login as Admin',
    },
    bn: {
      title: 'অ্যাডমিন প্যানেল',
      dashboard: 'ড্যাশবোর্ড',
      posts: 'পোস্ট',
      matches: 'ম্যাচ',
      comments: 'মন্তব্য',
      analytics: 'বিশ্লেষণ',
      logout: 'লগআউট',
      loginRequired: 'অ্যাডমিন লগইন প্রয়োজন',
      loginButton: 'অ্যাডমিন হিসাবে লগইন করুন',
    },
  };

  const textForLang = content[language];

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-xl dark:text-white">Loading...</div>
      </div>
    );
  }

  if (isAnonymous) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="p-8 max-w-md w-full dark:bg-gray-800">
          <h1 className="text-2xl font-bold mb-4 text-center dark:text-white">
            {textForLang.loginRequired}
          </h1>
          <Button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            {isLoggingIn ? 'Logging in...' : textForLang.loginButton}
          </Button>
        </Card>
      </div>
    );
  }

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: textForLang.dashboard },
    { path: '/admin/posts', icon: FileText, label: textForLang.posts },
    { path: '/admin/matches', icon: Trophy, label: textForLang.matches },
    { path: '/admin/comments', icon: MessageSquare, label: textForLang.comments },
    { path: '/admin/analytics', icon: BarChart3, label: textForLang.analytics },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <motion.aside
          className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold text-primary dark:text-white mb-8">
              {textForLang.title}
            </h1>

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Logged in as:</p>
                <p className="font-medium dark:text-white">{user?.name || user?.email}</p>
              </div>
              <Button
                onClick={logout}
                variant="outline"
                className="w-full dark:border-gray-600 dark:text-gray-300"
              >
                <LogOut size={16} className="mr-2" />
                {textForLang.logout}
              </Button>
            </div>
          </div>
        </motion.aside>

        <main className="flex-1 p-8">
          <Routes>
            <Route index element={<AdminDashboard language={language} />} />
            <Route path="posts" element={<AdminPosts language={language} />} />
            <Route path="matches" element={<AdminMatches language={language} />} />
            <Route path="comments" element={<AdminComments language={language} />} />
            <Route path="analytics" element={<AdminAnalytics language={language} />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
