import { SignInModal } from '@/features/auth/components/SignInModal';
import { SignUpModal } from '@/features/auth/components/SignupModal';
import { ForgotPasswordModal } from '@/features/auth/components/ForgotPasswordModal';

import useAuth from '@/features/auth/hooks/useAuth';
import type { NavigationAuthModal } from '@/features/auth/types/auth.types';

import FeatureHighlights from '@/features/landing/components/FeaturesHighlights';
import HeroCarousel from '@/features/landing/components/HeroCarousel';
import LandingFooter from '@/features/landing/components/LandingFooter';
import LandingHeader from '@/features/landing/components/LandingHeader';

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Landing() {
  const [authModal, setAuthModal] = useState<NavigationAuthModal>('signin');

  const [openModal, setOpenModal] = useState(false);

  const { signIn, signUp, signInGoogle, forgetPassword } = useAuth();

  const { t } = useTranslation();

  const onOpenModal = () => {
    setOpenModal(true);
    setAuthModal('signin');
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

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

              <p className="mx-auto mt-5 max-w-[500px] text-base leading-7 text-slate-500 sm:mt-7 sm:text-lg sm:leading-8 lg:mx-0">
                {t('landing.hero.description')}
              </p>

              <div className="mx-auto w-fit lg:mx-0">
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="group mt-7 flex cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-[0_8px_24px_rgba(37,99,235,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_12px_30px_rgba(37,99,235,0.28)] active:translate-y-0"
                >
                  {t('landing.hero.startButton')}

                  <ArrowRight
                    size={19}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>
              </div>
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

      {authModal === 'signin' && (
        <SignInModal
          open={openModal}
          onClose={onCloseModal}
          onGoogleSignIn={signInGoogle}
          onSignIn={signIn}
          onSignUp={() => setAuthModal('signup')}
          onForgotPassword={() => setAuthModal('forgetPassword')}
        />
      )}

      {authModal === 'signup' && (
        <SignUpModal
          open={openModal}
          onOpenChange={setOpenModal}
          onGoogleSignUp={signInGoogle}
          onSignUp={signUp}
          onSignIn={() => setAuthModal('signin')}
        />
      )}

      {authModal === 'forgetPassword' && (
        <ForgotPasswordModal
          open={openModal}
          onClose={onCloseModal}
          onForgotPassword={forgetPassword}
          onSignIn={() => setAuthModal('signin')}
        />
      )}
    </div>
  );
}
