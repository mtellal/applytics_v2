import logo from '@/assets/Applytics_logo.png';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { useTranslation } from 'react-i18next';

export default function LandingHeader() {
  const { t } = useTranslation();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-18 max-w-[1360px] items-center justify-between px-6 lg:px-10">
        <a href="#" className="flex items-center gap-3">
          <div className="flex size-14 items-center justify-center rounded-lg text-xl font-bold text-white">
            <img src={logo} alt="Applytics" />
          </div>

          <h1 className="text-3xl font-bold">Applytics</h1>
        </a>

        <nav className="hidden items-center gap-10 text-sm text-slate-600 md:flex">
          <a href="#features" className="transition hover:text-slate-950">
            {t('landing.header.features')}
          </a>

          <a href="#why" className="transition hover:text-slate-950">
            {t('landing.header.why')}
          </a>

          <a href="#about" className="transition hover:text-slate-950">
            {t('landing.header.about')}
          </a>
        </nav>
        <LanguageSelector />
      </div>
    </header>
  );
}
