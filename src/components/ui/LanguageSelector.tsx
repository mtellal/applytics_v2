import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const languages = [
  {
    value: 'fr',
    label: 'FR - Français',
  },
  {
    value: 'en',
    label: 'EN - English',
  },
] as const;

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  function handleLanguageChange(language: string) {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  }

  return (
    <Select
      value={i18n.language}
      onValueChange={(language) => {
        if (language) {
          handleLanguageChange(language);
        }
      }}
    >
      <SelectTrigger className="w-24 bg-white">
        <Languages className="size-4 text-gray-500" />
        <SelectValue />
      </SelectTrigger>

      <SelectContent className="p-1" alignItemWithTrigger={false}>
        {languages.map((language) => (
          <SelectItem key={language.value} value={language.value} className="cursor-pointer">
            {language.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
