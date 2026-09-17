import type { ApplicationField, ApplicationStatus } from '@/models/applications';

import type { ApplicationForm } from '../types/types';

const APPLICATION_FIELDS = [
  'frontend',
  'backend',
  'full-stack',
  'mobile',
  'devops',
  'cybersecurity',
] as const satisfies readonly ApplicationField[];

const APPLICATION_STATUSES = [
  'in-progress',
  'interview',
  'offer',
  'rejected',
] as const satisfies readonly ApplicationStatus[];

export type ApplicationFormErrors = Partial<Record<keyof ApplicationForm, string>>;

type ValidationResult =
  | {
      success: true;
      data: ApplicationForm;
      errors: object;
    }
  | {
      success: false;
      data: null;
      errors: ApplicationFormErrors;
    };

function isValidField(value: string): value is ApplicationField {
  return APPLICATION_FIELDS.includes(value as ApplicationField);
}

function isValidStatus(value: string): value is ApplicationStatus {
  return APPLICATION_STATUSES.includes(value as ApplicationStatus);
}

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);

    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function validateApplicationForm(form: ApplicationForm): ValidationResult {
  const errors: ApplicationFormErrors = {};

  const normalizedForm: ApplicationForm = {
    ...form,
    company: form.company.trim(),
    jobTitle: form.jobTitle.trim(),
    location: form.location.trim(),
    link: form.link?.trim() ?? '',
    notes: form.notes?.trim() ?? '',
  };

  if (!normalizedForm.company) {
    errors.company = 'Company is required.';
  } else if (normalizedForm.company.length > 100) {
    errors.company = 'Company must contain at most 100 characters.';
  }

  if (!normalizedForm.jobTitle) {
    errors.jobTitle = 'Job title is required.';
  } else if (normalizedForm.jobTitle.length > 150) {
    errors.jobTitle = 'Job title must contain at most 150 characters.';
  }

  if (!isValidField(normalizedForm.field)) {
    errors.field = 'Invalid application field.';
  }

  if (!isValidStatus(normalizedForm.status)) {
    errors.status = 'Invalid application status.';
  }

  if (normalizedForm.location.length > 150) {
    errors.location = 'Location must contain at most 150 characters.';
  }

  if (normalizedForm.link && !isValidHttpUrl(normalizedForm.link)) {
    errors.link = 'The link must be a valid HTTP or HTTPS URL.';
  }

  if (normalizedForm.notes && normalizedForm.notes.length > 500) {
    errors.notes = 'Notes must contain at most 500 characters.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      data: null,
      errors,
    };
  }

  return {
    success: true,
    data: normalizedForm,
    errors: {},
  };
}
