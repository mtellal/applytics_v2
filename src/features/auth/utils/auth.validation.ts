import type { TFunction } from "i18next";

export type SignupValidationErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export type SigninValidationErrors = {
  email?: string;
  password?: string;
};

export function validateEmail(email: string, t: TFunction): string | undefined {
  if (!email.trim()) {
    return t("auth.validation.emailRequired");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.trim())) {
    return t("auth.validation.emailInvalid");
  }

  return undefined;
}

export function validatePassword(
  password: string,
  t: TFunction,
): string | undefined {
  if (password.length < 8) {
    return t("auth.validation.passwordMinLength");
  }

  if (!/[A-Z]/.test(password)) {
    return t("auth.validation.passwordUppercase");
  }

  if (!/[a-z]/.test(password)) {
    return t("auth.validation.passwordLowercase");
  }

  if (!/[0-9]/.test(password)) {
    return t("auth.validation.passwordDigit");
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return t("auth.validation.passwordSpecialChar");
  }

  return undefined;
}

export function validateSignupForm(
  email: string,
  password: string,
  confirmPassword: string,
  t: TFunction,
): SignupValidationErrors {
  const errors: SignupValidationErrors = {};

  const emailError = validateEmail(email, t);

  if (emailError) {
    errors.email = emailError;
  }

  const passwordError = validatePassword(password, t);

  if (passwordError) {
    errors.password = passwordError;
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = t("signupmodal.validateSignup.passwordsDiffer");
  }

  return errors;
}

export function validateSigninForm(
  email: string,
  password: string,
  t: TFunction,
): SigninValidationErrors {
  const errors: SigninValidationErrors = {};

  const emailError = validateEmail(email, t);

  if (emailError) {
    errors.email = emailError;
  }

  if (!password) {
    errors.password = t("auth.validation.passwordRequired");
  }

  return errors;
}
