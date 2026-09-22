import { useState, type FormEvent } from 'react';
import { Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import IconInput from '@/components/ui/input/InconInput';

import { getAuthErrorMessage } from '../utils/auth.errors';
import { validateEmail } from '../utils/auth.validation';

import AuthButton from './AuthButton';

type ForgotPasswordModalProps = {
  open: boolean;
  onClose: () => void;
  onForgotPassword: (email: string) => Promise<void>;
  onSignIn: () => void;
};

export function ForgotPasswordModal({
  open,
  onClose,
  onForgotPassword,
  onSignIn,
}: ForgotPasswordModalProps) {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string>();
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateEmail(email, t);

    setEmailError(validationError);

    if (validationError) {
      return;
    }

    setApiError(null);
    setLoading(true);

    try {
      await onForgotPassword(email);
      setSent(true);
    } catch (error) {
      setApiError(getAuthErrorMessage(error, t));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {!sent ? (
          <>
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-bold">
                {t('auth.forgotPassword.title')}
              </DialogTitle>

              <DialogDescription>{t('auth.forgotPassword.description')}</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5">
              <IconInput
                id="forgot-password-email"
                type="email"
                icon={Mail}
                label="auth.addressEmail"
                placeholder="auth.addressEmailPlaceholder"
                value={email}
                autoComplete="email"
                onChange={(value) => {
                  setEmail(value);
                  setEmailError(undefined);
                }}
                error={emailError}
              />

              {apiError && (
                <p role="alert" className="text-center text-sm text-red-500">
                  {apiError}
                </p>
              )}

              <AuthButton
                label="auth.forgotPassword.send"
                labelLoading="auth.forgotPassword.sending"
                loading={loading}
              />
            </form>

            <p className="text-center text-sm text-slate-500">
              <button
                type="button"
                onClick={onSignIn}
                className="cursor-pointer font-semibold text-blue-600 hover:text-blue-700"
              >
                {t('auth.forgotPassword.backToSignIn')}
              </button>
            </p>
          </>
        ) : (
          <>
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-bold">
                {t('auth.forgotPassword.sentTitle')}
              </DialogTitle>

              <DialogDescription>{t('auth.forgotPassword.sentDescription')}</DialogDescription>
            </DialogHeader>

            <p className="text-center text-sm text-slate-500">{email}</p>

            <button
              type="button"
              onClick={onSignIn}
              className="h-11 w-full cursor-pointer rounded-lg bg-blue-600 font-medium text-white transition hover:bg-blue-700"
            >
              {t('auth.forgotPassword.backToSignIn')}
            </button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
