import { describe, expect, it } from 'vitest';

import { isValidDate, validateCsvApplication } from './validateApplicationsCsv';

const validRow = {
  company: 'Doctolib',
  jobTitle: 'Full Stack Developer',
  field: 'full-stack',
  status: 'in-progress',
  appliedAt: '2026-09-15',
  location: 'Paris',
  link: '',
  notes: '',
};

describe('isValidDate', () => {
  it('returns no error for a valid date', () => {
    expect(isValidDate('2026-09-01')).toBeTruthy();
  });

  it('returns an error for an invalid date', () => {
    expect(isValidDate('2029-02-30')).toBeFalsy();
  });
});

describe('validateCsvApplication', () => {
  it('returns no error for a valid application', () => {
    const result = validateCsvApplication(validRow, 2);

    expect(result).toHaveLength(0);
  });

  it('returns an error when company is missing', () => {
    const row = {
      ...validRow,
      company: '',
    };

    const result = validateCsvApplication(row, 2);

    expect(result).toEqual([
      {
        row: 2,
        message: 'company manquant',
      },
    ]);
  });

  it('returns an error when jobTitle is missing', () => {
    const row = {
      ...validRow,
      jobTitle: '',
    };

    const result = validateCsvApplication(row, 2);

    expect(result).toEqual([
      {
        row: 2,
        message: 'jobTitle manquant',
      },
    ]);
  });

  it('returns an error when field is missing', () => {
    const row = {
      ...validRow,
      field: '',
    };

    const result = validateCsvApplication(row, 2);

    expect(result).toEqual([
      {
        row: 2,
        message: 'field manquant',
      },
    ]);
  });

  it('returns an error when field is invalid', () => {
    const row = {
      ...validRow,
      field: 'lawyer',
    };

    const result = validateCsvApplication(row, 2);

    expect(result).toEqual([
      {
        row: 2,
        message: 'field "lawyer" invalide',
      },
    ]);
  });

  it('returns an error when status is missing', () => {
    const row = {
      ...validRow,
      status: '',
    };

    const result = validateCsvApplication(row, 2);

    expect(result).toEqual([
      {
        row: 2,
        message: 'status manquant',
      },
    ]);
  });

  it('returns an error when status is invalid', () => {
    const row = {
      ...validRow,
      status: 'xxx',
    };

    const result = validateCsvApplication(row, 2);

    expect(result).toEqual([
      {
        row: 2,
        message: 'status "xxx" invalide',
      },
    ]);
  });

  it('returns an error when appliedAt is missing', () => {
    const row = {
      ...validRow,
      appliedAt: '',
    };

    const result = validateCsvApplication(row, 2);

    expect(result).toEqual([
      {
        row: 2,
        message: 'appliedAt manquant',
      },
    ]);
  });

  it('returns an error when appliedAt has an invalid format', () => {
    const row = {
      ...validRow,
      appliedAt: '15/09/2026',
    };

    const result = validateCsvApplication(row, 2);

    expect(result).toEqual([
      {
        row: 2,
        message: 'appliedAt doit être au format YYYY-MM-DD',
      },
    ]);
  });

  it('returns an error when location is missing', () => {
    const row = {
      ...validRow,
      location: '',
    };

    const result = validateCsvApplication(row, 2);

    expect(result).toEqual([
      {
        row: 2,
        message: 'location manquant',
      },
    ]);
  });

  it('considers whitespace-only required fields as missing', () => {
    const row = {
      ...validRow,
      company: '   ',
    };

    const result = validateCsvApplication(row, 2);

    expect(result).toEqual([
      {
        row: 2,
        message: 'company manquant',
      },
    ]);
  });

  it('returns all errors when multiple fields are invalid', () => {
    const row = {
      ...validRow,
      company: '',
      status: '',
      location: '',
    };

    const result = validateCsvApplication(row, 7);

    expect(result).toEqual([
      { row: 7, message: 'company manquant' },
      { row: 7, message: 'status manquant' },
      { row: 7, message: 'location manquant' },
    ]);
  });

  it('returns an error for an impossible date', () => {
    const row = {
      ...validRow,
      appliedAt: '2026-99-84',
    };

    const result = validateCsvApplication(row, 2);

    expect(result).toEqual([
      {
        row: 2,
        message: 'appliedAt doit être au format YYYY-MM-DD',
      },
    ]);
  });
});
