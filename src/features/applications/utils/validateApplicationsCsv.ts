import {
  APPLICATION_FIELDS,
  APPLICATIONS_STATUSES,
  type ApplicationField,
  type ApplicationStatus,
} from '@/models/applications';

function isApplicationStatus(value: string): value is ApplicationStatus {
  return APPLICATIONS_STATUSES.includes(value as ApplicationStatus);
}

function isApplicationField(value: string): value is ApplicationField {
  return APPLICATION_FIELDS.includes(value as ApplicationField);
}

function isValidDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function validateCsvApplication(row: Record<string, string>, rowIndex: number) {
  const errors: string[] = [];

  if (!row.company?.trim()) {
    errors.push('company manquant');
  }

  if (!row.jobTitle?.trim()) {
    errors.push('jobTitle manquant');
  }

  if (!row.field?.trim()) {
    errors.push('field manquant');
  } else if (!isApplicationField(row.field)) {
    // errors.push(`field "${row.field}" invalide`);
  }

  if (!row.status?.trim()) {
    errors.push('status manquant');
  } else if (!isApplicationStatus(row.status)) {
    errors.push(`status "${row.status}" invalide`);
  }

  if (!row.appliedAt?.trim()) {
    errors.push('appliedAt manquant');
  } else if (!isValidDate(row.appliedAt)) {
    errors.push('appliedAt doit être au format YYYY-MM-DD');
  }

  if (!row.location?.trim()) {
    errors.push('location manquant');
  }

  return errors.map((message) => ({
    row: rowIndex,
    message,
  }));
}
