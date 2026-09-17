import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/i18n/locales/en.json';
import fr from '@/i18n/locales/fr.json';

export const testI18n = createInstance();

await testI18n.use(initReactI18next).init({
  lng: 'fr',
  fallbackLng: 'fr',
  resources: { en: { translation: en }, fr: { translation: fr } },
  interpolation: { escapeValue: false },
});

export const frenchT = testI18n.getFixedT('fr');
