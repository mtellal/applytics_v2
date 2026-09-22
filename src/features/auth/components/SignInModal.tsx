import { useState, type FormEvent } from 'react';
import { LockKeyhole, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import IconInput from '@/components/ui/input/InconInput';

import type { UserCredentials } from '../types/auth.types';
import { getAuthErrorMessage } from '../utils/auth.errors';
import AuthButton from './AuthButton';
import ProvidersAuth from './ProvidersAuth';
import { validateSigninForm, type SigninValidationErrors } from '../utils/auth.validation';

type SignInModalProps = {
  open: boolean;
  onClose: () => void;
  onGoogleSignIn: () => void;
  onSignIn: (creds: UserCredentials) => Promise<void>;
  onSignUp: () => void;
  onForgotPassword: () => void;
};

export function SignInModal({
  open,
  onClose,
  onGoogleSignIn,
  onSignIn,
  onSignUp,
  onForgotPassword,
}: SignInModalProps) {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<SigninValidationErrors>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateSigninForm(email, password, t);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setApiError(null);
    setLoading(true);

    try {
      await onSignIn({
        email,
        password,
      });
    } catch (error) {
      setApiError(getAuthErrorMessage(error, t));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">{t('landing.hero.signin.title')}</DialogTitle>

          <DialogDescription>{t('landing.hero.signin.description')}</DialogDescription>
        </DialogHeader>

        <ProvidersAuth onGoogleSignUp={onGoogleSignIn} separator />

        <form onSubmit={handleSubmit} className="space-y-5">
          <IconInput
            id="signin-email"
            type="email"
            icon={Mail}
            label="landing.hero.addressEmail"
            placeholder="landing.hero.addressEmailPlaceholder"
            value={email}
            autoComplete="email"
            onChange={(value) => {
              setEmail(value);

              setErrors((prev) => ({
                ...prev,
                email: undefined,
              }));
            }}
            error={errors.email}
          />

          <div>
            <IconInput
              id="signin-password"
              type="password"
              icon={LockKeyhole}
              label="landing.hero.passwordLabel"
              placeholder="landing.hero.passwordPlaceholder"
              value={password}
              autoComplete="current-password"
              onChange={(value) => {
                setPassword(value);

                setErrors((prev) => ({
                  ...prev,
                  password: undefined,
                }));
              }}
              error={errors.password}
            />

            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={onForgotPassword}
                className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                {t('landing.hero.passwordForgot')}
              </button>
            </div>
          </div>

          {apiError && (
            <p role="alert" className="text-center text-sm text-red-500">
              {apiError}
            </p>
          )}

          <AuthButton
            label="landing.hero.connect"
            labelLoading="landing.hero.connecting"
            loading={loading}
          />
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          {t('landing.hero.notAccountYet')}{' '}
          <button
            type="button"
            onClick={onSignUp}
            className="cursor-pointer font-semibold text-blue-600 hover:text-blue-700"
          >
            {t('landing.hero.signupText')}
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
