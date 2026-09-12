import FeatureHighlights from '@/features/landing/components/FeaturesHighlights';
import HeroCarousel from '@/features/landing/components/HeroCarousel';
import LandingFooter from '@/features/landing/components/LandingFooter';
import LandingHeader from '@/features/landing/components/LandingHeader';

import '@/lib/supabase';
import GoogleAuthButton from '@/features/auth/components/GoogleAuthButton';
import useAuth from '@/features/auth/hooks/useAuth';

export default function Landing() {
  const { signInGoogle } = useAuth();

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <LandingHeader />

      <section className="mx-auto max-w-[1360px] px-6 pt-14 pb-20 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.4fr]">
          <div className="max-w-xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
              <span className="size-2 rounded-full bg-blue-500" />
              Organisez · Suivez · Réussissez
            </div>

            <h1 className="leading-[1.08] font-bold tracking-[-0.03em] sm:text-5xl lg:text-[52px]">
              Prenez le contrôle
              <br />
              de votre recherche
              <br />
              de <span className="text-blue-600">stage</span>
            </h1>

            <p className="mt-7 max-w-[500px] text-lg leading-8 text-slate-500">
              Centralisez vos candidatures, suivez vos progrès et restez motivé tout au long de
              votre recherche. Simple, rapide et efficace.
            </p>

            <GoogleAuthButton handleGoogleAuth={signInGoogle} />

            <p className="mt-4 flex items-center gap-2 text-sm text-slate-400">
              <span>🔒</span>
              Aucun mot de passe requis
            </p>
          </div>

          <HeroCarousel />
        </div>

        <FeatureHighlights />

        <div className="mt-16 border-t border-slate-200 pt-8 text-center">
          <p className="text-sm text-slate-400">
            “ Un outil pensé par un développeur, pour les chercheurs d’opportunités. ”
          </p>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
