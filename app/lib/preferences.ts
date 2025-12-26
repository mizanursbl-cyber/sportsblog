import type { FanPreferences, Language, Theme } from '@/types';

const STORAGE_KEY = 'fan_preferences';
const DEVICE_ID_KEY = 'device_id';
const COMMENTER_NAME_KEY = 'commenter_name';

export function getDeviceId(): string {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  return deviceId;
}

export function getCommenterName(): string | null {
  return localStorage.getItem(COMMENTER_NAME_KEY);
}

export function setCommenterName(name: string): void {
  localStorage.setItem(COMMENTER_NAME_KEY, name);
}

export function getPreferences(): FanPreferences {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Fall through to defaults
    }
  }
  return {
    language: 'en',
    theme: 'light',
  };
}

export function savePreferences(preferences: FanPreferences): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
}

export function updateLanguage(language: Language): void {
  const prefs = getPreferences();
  savePreferences({ ...prefs, language });
}

export function updateTheme(theme: Theme): void {
  const prefs = getPreferences();
  savePreferences({ ...prefs, theme });
  
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export function updateFavoriteTeam(team: string): void {
  const prefs = getPreferences();
  savePreferences({ ...prefs, favoriteTeam: team });
}
