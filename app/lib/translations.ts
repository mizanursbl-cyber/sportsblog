import type { Language } from '@/types';

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    cricket: 'Cricket',
    football: 'Football',
    others: 'Others',
    admin: 'Admin',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    create: 'Create',
    update: 'Update',
    search: 'Search',
    
    // Header
    languageSwitch: 'বাংলা',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    
    // Live Matches
    liveMatches: 'Live Matches',
    upcomingMatches: 'Upcoming Matches',
    finishedMatches: 'Finished Matches',
    live: 'Live',
    upcoming: 'Upcoming',
    finished: 'Finished',
    noLiveMatches: 'No live matches at the moment',
    noUpcomingMatches: 'No upcoming matches scheduled',
    
    // Match Details
    venue: 'Venue',
    matchTime: 'Match Time',
    team1: 'Team 1',
    team2: 'Team 2',
    score: 'Score',
    overs: 'Overs',
    status: 'Status',
    
    // Articles
    latestNews: 'Latest News',
    mostRead: 'Most Read',
    readMore: 'Read More',
    shareArticle: 'Share Article',
    backToHome: 'Back to Home',
    relatedArticles: 'Related Articles',
    author: 'Author',
    publishedOn: 'Published on',
    category: 'Category',
    
    // Categories
    allCategories: 'All Categories',
    localSports: 'Local Sports',
    international: 'International',
    analysis: 'Analysis',
    
    // Voting & Polls
    vote: 'Vote',
    voted: 'Thanks for voting!',
    totalVotes: 'Total votes',
    fanPrediction: 'Fan Prediction',
    
    // Admin Panel
    adminPanel: 'Admin Panel',
    dashboard: 'Dashboard',
    posts: 'Posts',
    matches: 'Matches',
    comments: 'Comments',
    analytics: 'Analytics',
    logout: 'Logout',
    loginRequired: 'Admin Login Required',
    loginButton: 'Login as Admin',
    
    // Admin - Posts
    managePosts: 'Manage Posts',
    newPost: 'New Post',
    editPost: 'Edit Post',
    createPost: 'Create New Post',
    postTitle: 'Title',
    postDescription: 'Description',
    postCategory: 'Category',
    postImage: 'Image URL',
    postAuthor: 'Author',
    postLanguage: 'Language',
    savePost: 'Save Post',
    deletePost: 'Delete',
    confirmDelete: 'Are you sure you want to delete this post?',
    noPosts: 'No posts yet',
    
    // Admin - Matches
    manageMatches: 'Manage Matches',
    newMatch: 'New Match',
    editMatch: 'Edit Match',
    createMatch: 'Create New Match',
    saveMatch: 'Save Match',
    deleteMatch: 'Delete',
    confirmDeleteMatch: 'Are you sure you want to delete this match?',
    noMatches: 'No matches yet',
    
    // Admin - Dashboard
    dashboardOverview: 'Dashboard Overview',
    totalPosts: 'Total Posts',
    totalMatches: 'Total Matches',
    liveMatchesCount: 'Live Matches',
    upcomingMatchesCount: 'Upcoming Matches',
    
    // Footer
    aboutUs: 'About Us',
    aboutText: 'Your trusted source for Bangladesh sports news, analysis, and live updates. Covering cricket, football, and local sports with passion.',
    quickLinks: 'Quick Links',
    contact: 'Contact',
    followUs: 'Follow Us',
    copyright: '© 2024 Bangladesh Sports News. All rights reserved.',
    
    // Time
    minutesAgo: 'minutes ago',
    hoursAgo: 'hours ago',
    daysAgo: 'days ago',
    
    // Errors
    errorLoadingArticles: 'Error loading articles',
    errorLoadingMatches: 'Error loading matches',
    errorSaving: 'Error saving',
    errorDeleting: 'Error deleting',
  },
  bn: {
    // Navigation
    home: 'হোম',
    cricket: 'ক্রিকেট',
    football: 'ফুটবল',
    others: 'অন্যান্য',
    admin: 'অ্যাডমিন',
    
    // Common
    loading: 'লোড হচ্ছে...',
    error: 'ত্রুটি',
    save: 'সংরক্ষণ করুন',
    cancel: 'বাতিল',
    edit: 'সম্পাদনা',
    delete: 'মুছুন',
    create: 'তৈরি করুন',
    update: 'আপডেট করুন',
    search: 'অনুসন্ধান',
    
    // Header
    languageSwitch: 'English',
    darkMode: 'ডার্ক মোড',
    lightMode: 'লাইট মোড',
    
    // Live Matches
    liveMatches: 'লাইভ ম্যাচ',
    upcomingMatches: 'আসন্ন ম্যাচ',
    finishedMatches: 'সমাপ্ত ম্যাচ',
    live: 'লাইভ',
    upcoming: 'আসন্ন',
    finished: 'সমাপ্ত',
    noLiveMatches: 'এই মুহূর্তে কোন লাইভ ম্যাচ নেই',
    noUpcomingMatches: 'কোন আসন্ন ম্যাচ নির্ধারিত নেই',
    
    // Match Details
    venue: 'স্থান',
    matchTime: 'ম্যাচের সময়',
    team1: 'দল ১',
    team2: 'দল ২',
    score: 'স্কোর',
    overs: 'ওভার',
    status: 'অবস্থা',
    
    // Articles
    latestNews: 'সর্বশেষ খবর',
    mostRead: 'সর্বাধিক পঠিত',
    readMore: 'আরও পড়ুন',
    shareArticle: 'নিবন্ধ শেয়ার করুন',
    backToHome: 'হোমে ফিরে যান',
    relatedArticles: 'সম্পর্কিত নিবন্ধ',
    author: 'লেখক',
    publishedOn: 'প্রকাশিত',
    category: 'বিভাগ',
    
    // Categories
    allCategories: 'সব বিভাগ',
    localSports: 'স্থানীয় খেলা',
    international: 'আন্তর্জাতিক',
    analysis: 'বিশ্লেষণ',
    
    // Voting & Polls
    vote: 'ভোট দিন',
    voted: 'ভোট দেওয়ার জন্য ধন্যবাদ!',
    totalVotes: 'মোট ভোট',
    fanPrediction: 'ভক্ত পূর্বাভাস',
    
    // Admin Panel
    adminPanel: 'অ্যাডমিন প্যানেল',
    dashboard: 'ড্যাশবোর্ড',
    posts: 'পোস্ট',
    matches: 'ম্যাচ',
    comments: 'মন্তব্য',
    analytics: 'বিশ্লেষণ',
    logout: 'লগআউট',
    loginRequired: 'অ্যাডমিন লগইন প্রয়োজন',
    loginButton: 'অ্যাডমিন হিসাবে লগইন করুন',
    
    // Admin - Posts
    managePosts: 'পোস্ট পরিচালনা',
    newPost: 'নতুন পোস্ট',
    editPost: 'পোস্ট সম্পাদনা',
    createPost: 'নতুন পোস্ট তৈরি করুন',
    postTitle: 'শিরোনাম',
    postDescription: 'বিবরণ',
    postCategory: 'বিভাগ',
    postImage: 'ছবির URL',
    postAuthor: 'লেখক',
    postLanguage: 'ভাষা',
    savePost: 'পোস্ট সংরক্ষণ করুন',
    deletePost: 'মুছুন',
    confirmDelete: 'আপনি কি এই পোস্টটি মুছে ফেলতে চান?',
    noPosts: 'এখনও কোন পোস্ট নেই',
    
    // Admin - Matches
    manageMatches: 'ম্যাচ পরিচালনা',
    newMatch: 'নতুন ম্যাচ',
    editMatch: 'ম্যাচ সম্পাদনা',
    createMatch: 'নতুন ম্যাচ তৈরি করুন',
    saveMatch: 'ম্যাচ সংরক্ষণ করুন',
    deleteMatch: 'মুছুন',
    confirmDeleteMatch: 'আপনি কি এই ম্যাচটি মুছে ফেলতে চান?',
    noMatches: 'এখনও কোন ম্যাচ নেই',
    
    // Admin - Dashboard
    dashboardOverview: 'ড্যাশবোর্ড ওভারভিউ',
    totalPosts: 'মোট পোস্ট',
    totalMatches: 'মোট ম্যাচ',
    liveMatchesCount: 'লাইভ ম্যাচ',
    upcomingMatchesCount: 'আসন্ন ম্যাচ',
    
    // Footer
    aboutUs: 'আমাদের সম্পর্কে',
    aboutText: 'বাংলাদেশ ক্রীড়া সংবাদ, বিশ্লেষণ এবং লাইভ আপডেটের জন্য আপনার বিশ্বস্ত উৎস। ক্রিকেট, ফুটবল এবং স্থানীয় খেলাধুলা আবেগের সাথে কভার করা।',
    quickLinks: 'দ্রুত লিঙ্ক',
    contact: 'যোগাযোগ',
    followUs: 'আমাদের অনুসরণ করুন',
    copyright: '© ২০২৪ বাংলাদেশ ক্রীড়া সংবাদ। সর্বস্বত্ব সংরক্ষিত।',
    
    // Time
    minutesAgo: 'মিনিট আগে',
    hoursAgo: 'ঘন্টা আগে',
    daysAgo: 'দিন আগে',
    
    // Errors
    errorLoadingArticles: 'নিবন্ধ লোড করতে ত্রুটি',
    errorLoadingMatches: 'ম্যাচ লোড করতে ত্রুটি',
    errorSaving: 'সংরক্ষণ করতে ত্রুটি',
    errorDeleting: 'মুছে ফেলতে ত্রুটি',
  }
};

export function getTranslation(language: Language, key: string): string {
  return translations[language][key as keyof typeof translations.en] || key;
}
