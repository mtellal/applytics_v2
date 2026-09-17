import logo from '@/assets/Applytics_logo.png';
import { useTranslation } from 'react-i18next';

export default function LandingFooter() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-slate-200">
      <div
        className="
          mx-auto flex max-w-[1360px] flex-col items-center gap-6
          px-4 py-7
          sm:flex-row sm:justify-between sm:px-6 sm:py-8
          lg:px-10
        "
      >
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:gap-3 sm:text-left">
          <img src={logo} alt="Applytics" className="size-9" />

          <div>
            <p className="font-semibold">Applytics</p>

            <p className="text-xs text-slate-400">{t('landing.footer.text')}</p>
          </div>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-500 sm:justify-end sm:gap-7">
          <a href="#" className="transition-colors hover:text-slate-900">
            {t('landing.footer.privacy')}
          </a>

          <a href="#" className="transition-colors hover:text-slate-900">
            {t('landing.footer.terms')}
          </a>

          <a href="#" className="transition-colors hover:text-slate-900">
            {t('landing.footer.contact')}
          </a>
        </nav>
      </div>
    </footer>
  );
}
