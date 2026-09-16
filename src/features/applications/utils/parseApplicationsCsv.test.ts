import { describe, expect, it } from 'vitest';

import { parseApplicationsCsv } from './parseApplicationsCsv';

describe('parseApplicationsCsv', () => {
  it('parses a valid CSV', async () => {
    const csv = `company,jobTitle,field,status,appliedAt,location,link,notes
Doctolib,Full Stack Developer,full-stack,in-progress,2026-09-15,Paris,,`;

    const result = await parseApplicationsCsv(csv);

    expect(result.errors).toHaveLength(0);

    expect(result.applications).toEqual([
      {
        company: 'Doctolib',
        jobTitle: 'Full Stack Developer',
        field: 'full-stack',
        status: 'in-progress',
        appliedAt: '2026-09-15',
        location: 'Paris',
        link: undefined,
        notes: undefined,
      },
    ]);
  });

  it('parses multiple valid applications', async () => {
    const csv = `company,jobTitle,field,status,appliedAt,location,link,notes
Doctolib,Full Stack Developer,full-stack,in-progress,2026-09-15,Paris,,
Fleet,Frontend Developer,frontend,interview,2026-09-14,Paris,https://fleet.co,Entretien prévu`;

    const result = await parseApplicationsCsv(csv);

    expect(result.errors).toHaveLength(0);
    expect(result.applications).toHaveLength(2);

    expect(result.applications[0]).toEqual({
      company: 'Doctolib',
      jobTitle: 'Full Stack Developer',
      field: 'full-stack',
      status: 'in-progress',
      appliedAt: '2026-09-15',
      location: 'Paris',
      link: undefined,
      notes: undefined,
    });

    expect(result.applications[1]).toEqual({
      company: 'Fleet',
      jobTitle: 'Frontend Developer',
      field: 'frontend',
      status: 'interview',
      appliedAt: '2026-09-14',
      location: 'Paris',
      link: 'https://fleet.co',
      notes: 'Entretien prévu',
    });
  });

  it('rejects CSV when a required column is missing', async () => {
    const csv = `company,jobTitle,status,appliedAt,location
Doctolib,Full Stack Developer,in-progress,2026-09-15,Paris`;

    await expect(parseApplicationsCsv(csv)).rejects.toThrow('Colonnes manquantes : field');
  });

  it('returns an error and ignores an invalid row', async () => {
    const csv = `company,jobTitle,field,status,appliedAt,location
Doctolib,Full Stack Developer,full-stack,invalid-status,2026-09-15,Paris`;

    const result = await parseApplicationsCsv(csv);

    expect(result.applications).toHaveLength(0);

    expect(result.errors).toEqual([
      {
        row: 2,
        message: 'status "invalid-status" invalide',
      },
    ]);
  });

  it('keeps valid rows and reports invalid rows', async () => {
    const csv = `company,jobTitle,field,status,appliedAt,location
Doctolib,Full Stack Developer,full-stack,in-progress,2026-09-15,Paris
Fleet,Frontend Developer,frontend,invalid-status,2026-09-14,Paris
Google,Backend Developer,backend,rejected,2026-09-13,Paris`;

    const result = await parseApplicationsCsv(csv);

    expect(result.applications).toHaveLength(2);
    expect(result.errors).toHaveLength(1);

    expect(result.applications[0].company).toBe('Doctolib');
    expect(result.applications[1].company).toBe('Google');

    expect(result.errors).toEqual([
      {
        row: 3,
        message: 'status "invalid-status" invalide',
      },
    ]);
  });

  it('converts empty optional fields to undefined', async () => {
    const csv = `company,jobTitle,field,status,appliedAt,location,link,notes
Doctolib,Full Stack Developer,full-stack,in-progress,2026-09-15,Paris,,`;

    const result = await parseApplicationsCsv(csv);

    expect(result.applications[0].link).toBeUndefined();
    expect(result.applications[0].notes).toBeUndefined();
  });

  it('trims text fields', async () => {
    const csv = `company,jobTitle,field,status,appliedAt,location,link,notes
" Doctolib "," Full Stack Developer ",full-stack,in-progress,2026-09-15," Paris "," https://example.com "," Some notes "`;

    const result = await parseApplicationsCsv(csv);

    expect(result.applications[0]).toEqual({
      company: 'Doctolib',
      jobTitle: 'Full Stack Developer',
      field: 'full-stack',
      status: 'in-progress',
      appliedAt: '2026-09-15',
      location: 'Paris',
      link: 'https://example.com',
      notes: 'Some notes',
    });
  });
});
