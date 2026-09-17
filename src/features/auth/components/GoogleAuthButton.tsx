import google from '@/assets/companies/google.svg';
import { useTranslation } from 'react-i18next';

type GoogleAuthButtonProps = {
  handleGoogleAuth: () => void;
};

export default function GoogleAuthButton({ handleGoogleAuth }: GoogleAuthButtonProps) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={handleGoogleAuth}
      className="mt-7 flex w-full max-w-[300px] cursor-pointer items-center justify-center gap-2.5 rounded-lg border bg-gray-50 px-5 py-3 text-base font-medium shadow-[0_8px_24px_rgba(37,99,235,0.16)] transition hover:bg-white"
    >
      <img src={google} alt="" className="size-6" />

      {t('landing.hero.login')}
    </button>
  );
}
