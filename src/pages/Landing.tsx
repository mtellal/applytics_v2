import GoogleAuthButton from '@/features/auth/components/GoogleAuthButton';
import useAuth from '@/features/auth/hooks/useAuth';
import FeatureHighlights from '@/features/landing/components/FeaturesHighlights';
import HeroCarousel from '@/features/landing/components/HeroCarousel';
import LandingFooter from '@/features/landing/components/LandingFooter';
import LandingHeader from '@/features/landing/components/LandingHeader';

import { useTranslation } from 'react-i18next';

export default function Landing() {
  const { signInGoogle } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <LandingHeader />

      <main>
        <section className="mx-auto max-w-[1360px] px-6 pt-14 lg:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.4fr]">
            <div className="max-w-xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                <span aria-hidden="true" className="size-2 rounded-full bg-blue-500" />

                {t('landing.hero.badge')}
              </div>

              <h1 className="leading-[1.08] font-bold tracking-[-0.03em] sm:text-5xl lg:text-[52px]">
                {t('landing.hero.title1')}
                <br />
                {t('landing.hero.title2')}
                <br />
                {t('landing.hero.title3')}
                <span className="text-blue-600">{t('landing.hero.internship')}</span>
              </h1>

              <p className="mt-7 max-w-[500px] text-lg leading-8 text-slate-500">
                {t('landing.hero.description')}
              </p>

              <GoogleAuthButton handleGoogleAuth={signInGoogle} />

              <p className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                <span aria-hidden="true">🔒</span>
                {t('landing.hero.password')}
              </p>
            </div>

            <HeroCarousel />
          </div>
        </section>

        <FeatureHighlights />

        <section className="mx-auto max-w-[1360px] px-6 lg:px-10 ">
          <div className="mt-16 border-t border-slate-200 text-center py-5 ">
            <p className="text-sm text-slate-400">{t('landing.dev')}</p>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
