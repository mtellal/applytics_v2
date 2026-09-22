import { isAuthApiError } from '@supabase/supabase-js';
import type { TFunction } from 'i18next';

export function getAuthErrorMessage(error: unknown, t: TFunction): string {
  if (!isAuthApiError(error)) {
    return t('auth.errors.generic');
  }

  switch (error.code) {
    case 'invalid_credentials':
      return t('auth.errors.invalidCredentials');

    case 'user_already_exists':
      return t('auth.errors.userAlreadyExists');

    case 'weak_password':
      return t('auth.errors.weakPassword');

    case 'email_address_invalid':
      return t('auth.errors.invalidEmail');

    case 'over_request_rate_limit':
      return t('auth.errors.rateLimit');

    default:
      return t('auth.errors.generic');
  }
}
