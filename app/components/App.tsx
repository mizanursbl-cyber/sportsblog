import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { getPreferences, updateTheme } from '@/lib/preferences';
import type { Theme } from '@/types';

import TopBar from './components/TopBar';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import CategoryPage from './pages/CategoryPage';
import AdminPage from './pages/AdminPage';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const prefs = getPreferences();
    setTheme(prefs.theme);
    updateTheme(prefs.theme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    updateTheme(newTheme);
  };

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors">
          <TopBar 
            theme={theme}
            onToggleTheme={toggleTheme}
          />
          <NavBar />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
