import { useState, type FormEvent } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useTranslation } from 'react-i18next';

import type { UserCredentials } from '../types/auth.types';
import { validateSignupForm, type SignupValidationErrors } from '../utils/auth.validation';

import ProvidersAuth from './ProvidersAuth';
import { SignupForm } from './Signup/SignupForm';
import { useNavigate } from 'react-router-dom';
import { getAuthErrorMessage } from '../utils/auth.errors';

type SignUpModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoogleSignUp: () => void;
  onSignUp: (creds: UserCredentials) => Promise<void>;
  onSignIn: () => void;
};

export type UserSignupForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUpModal({
  open,
  onOpenChange,
  onGoogleSignUp,
  onSignUp,
  onSignIn,
}: SignUpModalProps) {
  const { t } = useTranslation();

  const [form, setForm] = useState<UserSignupForm>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<SignupValidationErrors>({});

  const [loading, setLoading] = useState(false);

  const [apiError, setApiError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setApiError(null);

    const validationErrors = validateSignupForm(form.email, form.password, form.confirmPassword, t);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      await onSignUp({
        email: form.email,
        password: form.password,
      });

      navigate('/dashboard', { replace: true });
    } catch (error) {
      setApiError(getAuthErrorMessage(error, t));
    } finally {
      setLoading(false);
    }
  };

  const updateForm = <K extends keyof UserSignupForm>(key: K, value: UserSignupForm[K]) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">{t('landing.hero.signup.title')}</DialogTitle>

          <DialogDescription>{t('landing.hero.signup.description')}</DialogDescription>
        </DialogHeader>

        <ProvidersAuth onGoogleSignUp={onGoogleSignUp} separator />

        {apiError && <p className="text-center text-sm text-red-500">{apiError}</p>}

        <SignupForm
          loading={loading}
          form={form}
          errors={errors}
          updateForm={updateForm}
          handleSubmit={handleSubmit}
        />

        <p className="text-center text-sm text-slate-500">
          {t('landing.hero.alreadyAccount')}{' '}
          <button
            type="button"
            onClick={onSignIn}
            className="cursor-pointer font-semibold text-blue-600 hover:text-blue-700"
          >
            {t('landing.hero.connect')}
          </button>
        </p>

        <p className="text-center text-xs leading-5 text-slate-400">
          {t('landing.hero.signup.politics')}
        </p>
      </DialogContent>
    </Dialog>
  );
}
