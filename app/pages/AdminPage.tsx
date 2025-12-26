import { useEffect, useMemo, useState } from "react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Trophy,
  MessageSquare,
  BarChart3,
  LogOut,
  Menu,
  ShieldAlert
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/types";
import { supabase } from "@/lib/supabaseClient";

import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminPosts from "@/components/admin/AdminPosts";
import AdminMatches from "@/components/admin/AdminMatches";
import AdminComments from "@/components/admin/AdminComments";
import AdminAnalytics from "@/components/admin/AdminAnalytics";

type AdminProfile = { is_admin: boolean; email: string | null; full_name: string | null };

const AdminPage = () => {
  const location = useLocation();
  const { language } = useLanguage();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Supabase auth state
  const [authReady, setAuthReady] = useState(false);
  const [sessionUser, setSessionUser] = useState<{ id: string; email?: string | null } | null>(null);

  // Profile/admin state
  const [profileLoading, setProfileLoading] = useState(false);
  const [profile, setProfile] = useState<AdminProfile | null>(null);

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const content: Record<Language, any> = useMemo(
    () => ({
      en: {
        title: "Admin Panel",
        dashboard: "Dashboard",
        posts: "Posts",
        matches: "Matches",
        comments: "Comments",
        analytics: "Analytics",
        logout: "Logout",
        loginRequired: "Admin Login Required",
        loginButton: "Login",
        email: "Email",
        password: "Password",
        forgot: "Forgot password?",
        sending: "Sending...",
        unauthorized: "You are not an admin.",
        unauthorizedHelp: "Ask the site owner to mark your account as admin in Supabase.",
        loading: "Loading...",
      },
      bn: {
        title: "অ্যাডমিন প্যানেল",
        dashboard: "ড্যাশবোর্ড",
        posts: "পোস্ট",
        matches: "ম্যাচ",
        comments: "মন্তব্য",
        analytics: "বিশ্লেষণ",
        logout: "লগআউট",
        loginRequired: "অ্যাডমিন লগইন প্রয়োজন",
        loginButton: "লগইন",
        email: "ইমেইল",
        password: "পাসওয়ার্ড",
        forgot: "পাসওয়ার্ড ভুলে গেছেন?",
        sending: "পাঠানো হচ্ছে...",
        unauthorized: "আপনি অ্যাডমিন নন।",
        unauthorizedHelp: "Supabase-এ আপনার অ্যাকাউন্টকে admin হিসেবে সেট করতে বলুন।",
        loading: "লোড হচ্ছে...",
      },
    }),
    []
  );

  const t = content[language];

  // 1) Load session + subscribe changes
  useEffect(() => {
    let mounted = true;

    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!mounted) return;
        if (error) console.error(error);
        const user = data.session?.user;
        setSessionUser(user ? { id: user.id, email: user.email } : null);
        setAuthReady(true);
      })
      .catch(() => setAuthReady(true));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      const user = newSession?.user;
      setSessionUser(user ? { id: user.id, email: user.email } : null);
      setProfile(null);
      setAuthError(null);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // 2) If logged in, fetch profile + is_admin
  useEffect(() => {
    const loadProfile = async () => {
      if (!sessionUser?.id) return;
      setProfileLoading(true);
      setAuthError(null);

      const { data, error } = await supabase
        .from("profiles")
        .select("is_admin,email,full_name")
        .eq("id", sessionUser.id)
        .single();

      if (error) {
        console.error(error);
        setAuthError(error.message);
        setProfile(null);
      } else {
        setProfile(data as AdminProfile);
      }
      setProfileLoading(false);
    };

    loadProfile();
  }, [sessionUser?.id]);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setAuthError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) setAuthError(error.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleForgotPassword = async () => {
    setIsLoggingIn(true);
    setAuthError(null);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: window.location.origin + "/admin",
      });
      if (error) setAuthError(error.message);
      else alert(language === "bn" ? "ইমেইল পাঠানো হয়েছে (চেক করুন)" : "Password reset email sent");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSidebarOpen(false);
  };

  // --- UI states ---
  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-xl dark:text-white">{t.loading}</div>
      </div>
    );
  }

  // Not logged in -> login form
  if (!sessionUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <Card className="p-6 sm:p-8 max-w-md w-full dark:bg-gray-800">
          <h1 className="text-2xl font-bold mb-2 text-center dark:text-white">{t.loginRequired}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6">
            {language === "bn"
              ? "ইমেইল ও পাসওয়ার্ড দিয়ে লগইন করুন"
              : "Login with your email and password"}
          </p>

          {authError ? (
            <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300 dark:border-red-900">
              {authError}
            </div>
          ) : null}

          <label className="text-sm font-medium dark:text-white">{t.email}</label>
          <input
            className="mt-1 mb-4 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring dark:bg-gray-900 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            autoComplete="email"
          />

          <label className="text-sm font-medium dark:text-white">{t.password}</label>
          <input
            className="mt-1 mb-4 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring dark:bg-gray-900 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            type="password"
            autoComplete="current-password"
          />

          <Button
            onClick={handleLogin}
            disabled={isLoggingIn || !email || !password}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            {isLoggingIn ? (language === "bn" ? "লগইন হচ্ছে..." : "Logging in...") : t.loginButton}
          </Button>

          <Button
            variant="ghost"
            className="w-full mt-2"
            onClick={handleForgotPassword}
            disabled={isLoggingIn || !email}
          >
            {isLoggingIn ? t.sending : t.forgot}
          </Button>
        </Card>
      </div>
    );
  }

  // Logged in, profile loading
  if (profileLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-xl dark:text-white">{t.loading}</div>
      </div>
    );
  }

  // Logged in but not admin
  if (!profile.is_admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <Card className="p-6 sm:p-8 max-w-md w-full dark:bg-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="text-red-500" />
            <h1 className="text-xl font-bold dark:text-white">{t.unauthorized}</h1>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">{t.unauthorizedHelp}</p>
          <Button onClick={handleLogout} variant="outline" className="w-full">
            <LogOut size={16} className="mr-2" />
            {t.logout}
          </Button>
        </Card>
      </div>
    );
  }

  const menuItems = [
    { path: "/admin", icon: LayoutDashboard, label: t.dashboard },
    { path: "/admin/posts", icon: FileText, label: t.posts },
    { path: "/admin/matches", icon: Trophy, label: t.matches },
    { path: "/admin/comments", icon: MessageSquare, label: t.comments },
    { path: "/admin/analytics", icon: BarChart3, label: t.analytics },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Mobile top bar */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
          <div className="font-bold dark:text-white">{t.title}</div>
          <Button variant="outline" size="icon" onClick={() => setSidebarOpen((v) => !v)}>
            <Menu size={18} />
          </Button>
        </div>

        <motion.aside
          className={[
            "bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen",
            "w-64",
            "fixed lg:static top-0 left-0 z-40",
            "pt-16 lg:pt-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            "transition-transform"
          ].join(" ")}
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold text-primary dark:text-white mb-8 hidden lg:block">
              {t.title}
            </h1>

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={[
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    ].join(" ")}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === "bn" ? "লগইন করা:" : "Logged in as:"}
                </p>
                <p className="font-medium dark:text-white">{profile.full_name || profile.email || sessionUser.email}</p>
              </div>

              <Button onClick={handleLogout} variant="outline" className="w-full dark:border-gray-600 dark:text-gray-300">
                <LogOut size={16} className="mr-2" />
                {t.logout}
              </Button>
            </div>
          </div>
        </motion.aside>

        <main className="flex-1 p-4 sm:p-8 pt-20 lg:pt-8 lg:ml-0">
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
