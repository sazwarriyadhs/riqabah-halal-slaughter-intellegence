"use client";

import { useEffect, useState } from "react";
import { DashboardMain } from "@/components/commander/Commander";
import { translations, Language } from "@/components/commander/dictionaries";

export default function DashboardPage() {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang] || translations.en;

  useEffect(() => {
    const updateLang = () => {
      const currentLang = localStorage.getItem('app_lang') as Language;
      if (currentLang && translations[currentLang]) setLang(currentLang);
    };
    updateLang();
    window.addEventListener('languageChanged', updateLang);
    window.addEventListener('storage', updateLang);
    return () => {
      window.removeEventListener('languageChanged', updateLang);
      window.removeEventListener('storage', updateLang);
    };
  }, []);

  return <DashboardMain t={t} />;
}
