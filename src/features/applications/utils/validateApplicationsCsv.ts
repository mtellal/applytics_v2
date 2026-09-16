import {
  APPLICATION_FIELDS,
  APPLICATIONS_STATUSES,
  type ApplicationField,
  type ApplicationStatus,
} from '@/models/applications';

import type { TFunction } from 'i18next';

function isApplicationStatus(value: string): value is ApplicationStatus {
  return APPLICATIONS_STATUSES.includes(value as ApplicationStatus);
}

function isApplicationField(value: string): value is ApplicationField {
  return APPLICATION_FIELDS.includes(value as ApplicationField);
}

export function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const [year, month, day] = value.split('-').map(Number);

  if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date.getTime() <= today.getTime();
}

export function validateCsvApplication(
  row: Record<string, string>,
  rowIndex: number,
  t: TFunction,
) {
  const errors: string[] = [];

  if (!row.company?.trim()) {
    errors.push(`company ${t('validateCsvApplication.missing')}`);
  }

  if (!row.jobTitle?.trim()) {
    errors.push(`jobTitle ${t('validateCsvApplication.missing')}`);
  }

  if (!row.field?.trim()) {
    errors.push(`field ${t('validateCsvApplication.missing')}`);
  } else if (!isApplicationField(row.field)) {
    errors.push(`field "${row.field}" ${t('validateCsvApplication.invalid')}`);
  }

  if (!row.status?.trim()) {
    errors.push(`status ${t('validateCsvApplication.missing')}`);
  } else if (!isApplicationStatus(row.status)) {
    errors.push(`status "${row.status}" ${t('validateCsvApplication.invalid')}`);
  }

  if (!row.appliedAt?.trim()) {
    errors.push(`appliedAt ${t('validateCsvApplication.missing')}`);
  } else if (!isValidDate(row.appliedAt)) {
    errors.push(`appliedAt ${t('validateCsvApplication.dateFormat')}`);
  }

  if (!row.location?.trim()) {
    errors.push(`location ${t('validateCsvApplication.missing')}`);
  }

  return errors.map((message) => ({
    row: rowIndex,
    message,
  }));
}
