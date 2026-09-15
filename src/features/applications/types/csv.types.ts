import type { ApplicationForm } from './types';

export type CsvValidationError = {
  row: number;
  message: string;
};

export type CsvParseResult = {
  applications: ApplicationForm[];
  errors: CsvValidationError[];
};
