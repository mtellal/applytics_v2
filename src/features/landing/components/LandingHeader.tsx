import logo from '@/assets/Applytics_logo.png';

type LandingHeaderProps = {
  onLogin: () => void;
};

export default function LandingHeader({ onLogin }: LandingHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-18 max-w-[1360px] items-center justify-between px-6 lg:px-10">
        <a href="#" className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg text-xl font-bold text-white">
            <img src={logo} alt="Applytics" className="size-9" />
          </div>

          <span className="text-xl font-bold">Applytics</span>
        </a>

        <nav className="hidden items-center gap-10 text-sm text-slate-600 md:flex">
          <a href="#features" className="transition hover:text-slate-950">
            Fonctionnalités
          </a>

          <a href="#why" className="transition hover:text-slate-950">
            Pourquoi Applytics ?
          </a>

          <a href="#about" className="transition hover:text-slate-950">
            À propos
          </a>
        </nav>

        <button
          type="button"
          onClick={onLogin}
          className="cursor-pointer rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Se connecter
        </button>
      </div>
    </header>
  );
}
