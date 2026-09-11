export default function LandingFooter() {
  return (
    <footer className="border-t border-slate-200">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-md bg-blue-600 font-bold text-white">
            A
          </div>

          <div>
            <p className="font-semibold">Applytics</p>

            <p className="text-xs text-slate-400">Votre recherche. En mieux.</p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-7 text-sm text-slate-500">
          <a href="#" className="hover:text-slate-900">
            Confidentialité
          </a>

          <a href="#" className="hover:text-slate-900">
            Conditions d’utilisation
          </a>

          <a href="#" className="hover:text-slate-900">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
