import { useState, type FormEvent } from "react";
import { LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import IconInput from "@/components/ui/input/InconInput";

import useAuth from "@/features/auth/hooks/useAuth";
import { getAuthErrorMessage } from "@/features/auth/utils/auth.errors";
import AuthButton from "@/features/auth/components/AuthButton";
import { validatePassword } from "@/features/auth/utils/auth.validation";

export default function ResetPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { resetPassword } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState<string>();
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>();

  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validatePassword(password, t);

    setPasswordError(validationError);
    setConfirmPasswordError(undefined);

    if (validationError) {
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(t("auth.validation.passwordsDiffer"));
      return;
    }

    setApiError(null);
    setLoading(true);

    try {
      await resetPassword(password);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setApiError(getAuthErrorMessage(error, t));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold">
            {t("auth.resetPassword.successTitle")}
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            {t("auth.resetPassword.successDescription")}
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-6 h-11 w-full cursor-pointer rounded-lg bg-blue-600 font-medium text-white hover:bg-blue-700"
          >
            {t("auth.resetPassword.backToSignIn")}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">
            {t("auth.resetPassword.title")}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {t("auth.resetPassword.description")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <IconInput
            id="reset-password"
            type="password"
            icon={LockKeyhole}
            label="auth.resetPassword.password"
            placeholder="landing.hero.passwordPlaceholder"
            value={password}
            autoComplete="new-password"
            onChange={(value) => {
              setPassword(value);
              setPasswordError(undefined);
            }}
            error={passwordError}
          />

          <IconInput
            id="reset-confirm-password"
            type="password"
            icon={LockKeyhole}
            label="auth.resetPassword.confirmPassword"
            placeholder="landing.hero.signup.confirmPasswordPlaceholder"
            value={confirmPassword}
            autoComplete="new-password"
            onChange={(value) => {
              setConfirmPassword(value);
              setConfirmPasswordError(undefined);
            }}
            error={confirmPasswordError}
          />

          {apiError && (
            <p role="alert" className="text-center text-sm text-red-500">
              {apiError}
            </p>
          )}

          <AuthButton
            label="auth.resetPassword.submit"
            labelLoading="auth.resetPassword.loading"
            loading={loading}
          />
        </form>
      </div>
    </main>
  );
}
