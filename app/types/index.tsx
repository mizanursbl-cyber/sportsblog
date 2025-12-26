// Article type is provided by Anima Playground SDK
export type { Article, ArticleDraft, Match, MatchDraft, User } from '@animaapp/playground-react-sdk';

export type Comment = {
  id: string;
  articleId: string;
  name: string;
  content: string;
  createdAt: Date;
  parentId?: string;
  isAdmin?: boolean;
};

export type Vote = {
  id: string;
  matchId: string;
  questionType: string;
  option: string;
  deviceId: string;
  createdAt: Date;
};

export type Prediction = {
  id: string;
  matchId: string;
  questionType: string;
  question: string;
  options: string[];
  enabled: boolean;
  startTime?: Date;
  endTime?: Date;
};

export type Language = 'en' | 'bn';

export type Theme = 'light' | 'dark';

export type FanPreferences = {
  language: Language;
  theme: Theme;
  favoriteTeam?: string;
};
