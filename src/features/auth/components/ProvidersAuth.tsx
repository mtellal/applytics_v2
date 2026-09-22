import googleIcon from '@/assets/companies/google.svg';
import { useTranslation } from 'react-i18next';

type ProvidersAuthProps = {
  onGoogleSignUp: () => void;
  separator: boolean;
};

export default function ProvidersAuth({ onGoogleSignUp, separator = true }: ProvidersAuthProps) {
  const { t } = useTranslation();

  return (
    <>
      <button
        type="button"
        onClick={onGoogleSignUp}
        className="flex h-11 w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white font-medium text-slate-800 transition hover:bg-slate-50"
      >
        <img src={googleIcon} alt="" className="h-5 w-5" />
        {t('landing.hero.continueGoogle')}
      </button>
      {separator && (
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />

          <span className="text-sm text-slate-400">{t('landing.hero.or')}</span>

          <div className="h-px flex-1 bg-slate-200" />
        </div>
      )}
    </>
  );
}
