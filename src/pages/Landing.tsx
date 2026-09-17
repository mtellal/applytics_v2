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
        <section className="mx-auto max-w-[1360px] px-4 pt-10 sm:px-6 sm:pt-14 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.4fr] lg:gap-14">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-xs font-medium text-blue-600 sm:mb-7 sm:px-4 sm:text-sm">
                <span aria-hidden="true" className="size-2 rounded-full bg-blue-500" />

                {t('landing.hero.badge')}
              </div>
              <h1 className="text-4xl leading-[1.08] font-bold tracking-[-0.03em] sm:text-5xl lg:text-[52px]">
                {t('landing.hero.title1')}
                <br />
                {t('landing.hero.title2')}
                <br />
                {t('landing.hero.title3')}
                <span className="text-blue-600">{t('landing.hero.internship')}</span>
              </h1>
              <p className="mx-auto mt-5 max-w-[500px] text-base leading-7 text-slate-500 lg:mx-0 sm:mt-7 sm:text-lg sm:leading-8">
                {t('landing.hero.description')}
              </p>
              <div className="mx-auto w-fit lg:mx-0">
                <GoogleAuthButton handleGoogleAuth={signInGoogle} />
              </div>
              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400 sm:text-sm lg:justify-start">
                {' '}
                <span aria-hidden="true">🔒</span>
                {t('landing.hero.password')}
              </p>
            </div>

            <HeroCarousel />
          </div>
        </section>

        <FeatureHighlights />

        <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
          <div className="mt-12 border-t border-slate-200 py-5 text-center sm:mt-16">
            <p className="text-sm text-slate-400">{t('landing.dev')}</p>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
