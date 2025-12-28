import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setLanguage('ce')}
        className={`px-3 py-2 rounded-md font-semibold text-sm transition-all duration-200 ${
          language === 'ce'
            ? 'bg-green-600 text-white shadow-lg'
            : 'bg-green-100 text-green-700 hover:bg-green-200'
        }`}
      >
        CE
      </button>

      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-2 rounded-md font-semibold text-sm transition-all duration-200 ${
          language === 'en'
            ? 'bg-red-600 text-white shadow-lg'
            : 'bg-red-100 text-red-700 hover:bg-red-200'
        }`}
      >
        ENG
      </button>

      <button
        onClick={() => setLanguage('ru')}
        className={`px-3 py-2 rounded-md font-semibold text-sm transition-all duration-200 ${
          language === 'ru'
            ? 'bg-blue-600 text-white shadow-lg'
            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
        }`}
      >
        RU
      </button>
    </div>
  );
};
