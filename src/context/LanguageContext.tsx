'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextValue {
  language: Language;
  isBn: boolean;
  setLanguage: (language: Language) => void;
  t: (english: string, bangla: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('ipa-language');
      if (saved === 'bn' || saved === 'en') {
        setLanguage(saved);
      }
    } catch {
      /* no-op */
    }
  }, []);

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('ipa-language', nextLanguage);
    }
  };

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    isBn: language === 'bn',
    setLanguage: changeLanguage,
    t: (english, bangla) => (language === 'bn' ? bangla : english),
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
