import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      tr: {
        translation: {
          // Türkçe çeviriler buraya yüklenecek
        }
      },
      en: {
        translation: {
          // İngilizce çeviriler buraya yüklenecek
        }
      }
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

// Dil dosyalarını dinamik olarak yükle
const loadLanguageFile = async (language: string) => {
  try {
    const response = await fetch(`/locales/${language}/translation.json`);
    const translations = await response.json();
    i18n.addResourceBundle(language, 'translation', translations, true, true);
  } catch (error) {
    console.error(`Failed to load ${language} translations:`, error);
  }
};

// Başlangıçta mevcut dil dosyalarını yükle
const initializeLanguages = async () => {
  await Promise.all([
    loadLanguageFile('tr'),
    loadLanguageFile('en')
  ]);
};

initializeLanguages();

export default i18n;
