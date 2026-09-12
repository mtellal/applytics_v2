import google from '@/assets/companies/google.svg';

type GoogleAuthButtonProps = {
  handleGoogleAuth: () => void;
};

export default function GoogleAuthButton({ handleGoogleAuth }: GoogleAuthButtonProps) {
  return (
    <button
      type="button"
      onClick={handleGoogleAuth}
      className="bg-gray-50  mt-8 flex w-full max-w-[330px] cursor-pointer items-center justify-center gap-3 rounded-xl  px-6 py-4 text-lg font-medium shadow-[0_10px_30px_rgba(37,99,235,0.20)] transition hover:bg-white border"
    >
      <img src={google} className="flex size-8 items-center justify-center text-sm font-bold" />
      Continuer avec Google
    </button>
  );
}
