import Papa from 'papaparse';

import type { CsvParseResult } from '../types/csv.types';
import { validateCsvApplication } from './validateApplicationsCsv';
import type { ApplicationForm } from '../types/types';
import type { ApplicationField, ApplicationStatus } from '@/models/applications';
import type { TFunction } from 'i18next';

const REQUIRED_COLUMNS = ['company', 'jobTitle', 'field', 'status', 'appliedAt', 'location'];

export async function readCsvFile(file: File): Promise<string> {
  return file.text();
}

export function parseApplicationsCsv(csv: string, t?: TFunction): Promise<CsvParseResult> {
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(csv, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        const headers = results.meta.fields ?? [];

        const missingColumns = REQUIRED_COLUMNS.filter((column) => !headers.includes(column));

        if (missingColumns.length > 0) {
          reject(new Error(`Colonnes manquantes : ${missingColumns.join(', ')}`));
          return;
        }

        const applications: ApplicationForm[] = [];
        const errors: CsvParseResult['errors'] = [];

        results.data.forEach((row, rowIndex) => {
          const rowErrors = validateCsvApplication(row, rowIndex + 2, t);

          if (rowErrors.length > 0) {
            errors.push(...rowErrors);
            return;
          }

          applications.push({
            company: row.company.trim(),
            jobTitle: row.jobTitle.trim(),
            field: row.field as ApplicationField,
            status: row.status as ApplicationStatus,
            appliedAt: row.appliedAt,
            location: row.location.trim(),
            link: row.link?.trim() || undefined,
            notes: row.notes?.trim() || undefined,
          });
        });

        resolve({
          applications,
          errors,
        });
      },

      error: (error: Error) => {
        reject(error);
      },
    });
  });
}
