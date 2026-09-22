import { useTranslation } from 'react-i18next';

type AuthButtonProps = {
  label: string;
  labelLoading: string;
  loading: boolean;
};

export default function AuthButton({ label, labelLoading, loading }: AuthButtonProps) {
  const { t } = useTranslation();

  return (
    <button
      disabled={loading}
      type="submit"
      className={`h-11 w-full rounded-lg font-semibold text-white transition ${loading ? 'bg-blue-300' : 'cursor-pointer bg-blue-600 hover:bg-blue-700'}`}
    >
      {loading ? t(labelLoading) : t(label)}
    </button>
  );
}
