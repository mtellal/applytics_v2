import { LockKeyhole, Mail } from 'lucide-react';
import { type FormEvent } from 'react';

import IconInput from '@/components/ui/input/InconInput';

import type { UserSignupForm } from '../SignupModal';
import type { SignupValidationErrors } from '../../utils/auth.validation';

import AuthButton from '../AuthButton';

type SignupFormProps = {
  loading: boolean;
  form: UserSignupForm;
  errors: SignupValidationErrors;
  updateForm: <T extends keyof UserSignupForm>(key: T, value: UserSignupForm[T]) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export function SignupForm({ loading, form, errors, updateForm, handleSubmit }: SignupFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <IconInput
        id="signup-email"
        type="email"
        icon={Mail}
        label="landing.hero.addressEmail"
        placeholder="landing.hero.addressEmailPlaceholder"
        value={form.email}
        autoComplete="email"
        onChange={(value) => updateForm('email', value)}
        error={errors.email}
      />

      <IconInput
        id="signup-password"
        type="password"
        icon={LockKeyhole}
        label="landing.hero.passwordLabel"
        placeholder="landing.hero.passwordPlaceholder"
        value={form.password}
        autoComplete="new-password"
        onChange={(value) => updateForm('password', value)}
        error={errors.password}
      />

      <IconInput
        id="signup-confirm-password"
        type="password"
        icon={LockKeyhole}
        label="landing.hero.signup.confirmPassword"
        placeholder="landing.hero.signup.confirmPasswordPlaceholder"
        value={form.confirmPassword}
        autoComplete="new-password"
        onChange={(value) => updateForm('confirmPassword', value)}
        error={errors.confirmPassword}
      />

      <AuthButton
        label="landing.hero.signup.createAccount"
        labelLoading="landing.hero.signup.creatingAccount"
        loading={loading}
      />
    </form>
  );
}
