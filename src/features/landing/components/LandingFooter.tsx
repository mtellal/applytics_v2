import logo from '@/assets/Applytics_logo.png';
import { useTranslation } from 'react-i18next';

export default function LandingFooter() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-slate-200">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Applytics" className="size-9" />

          <div>
            <p className="font-semibold">Applytics</p>

            <p className="text-xs text-slate-400">{t('landing.footer.text')}</p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-7 text-sm text-slate-500">
          <a href="#" className="hover:text-slate-900">
            {t('landing.footer.privacy')}
          </a>

          <a href="#" className="hover:text-slate-900">
            {t('landing.footer.terms')}
          </a>

          <a href="#" className="hover:text-slate-900">
            {t('landing.footer.contact')}
          </a>
        </nav>
      </div>
    </footer>
  );
}
