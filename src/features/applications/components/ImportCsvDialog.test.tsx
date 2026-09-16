import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ImportCsvDialog } from './ImportCsvDialog';
import { importApplicationsSupabase } from '../services/applications.service';

vi.mock('@/features/auth/hooks/useAuth', () => ({
  default: () => ({
    user: {
      id: 'user-123',
    },
  }),
}));

vi.mock('../services/applications.service', () => ({
  importApplicationsSupabase: vi.fn(),
}));

const validCsv = `company,jobTitle,field,status,appliedAt,location,link,notes
Doctolib,Full Stack Developer,full-stack,in-progress,2026-09-10,Paris,https://doctolib.fr,Test`;

const invalidCsv = `company,jobTitle,field,status,appliedAt,location,link,notes
Doctolib,Full Stack Developer,invalid-field,in-progress,2026-09-10,Paris,,`;

type RenderDialogProps = {
  onOpenChange?: (open: boolean) => void;
  onImported?: () => Promise<void> | void;
};

function renderDialog({ onOpenChange = vi.fn(), onImported = vi.fn() }: RenderDialogProps = {}) {
  render(<ImportCsvDialog open={true} onOpenChange={onOpenChange} onImported={onImported} />);

  return {
    onOpenChange,
    onImported,
  };
}

function getFileInput() {
  return document.querySelector('input[type="file"]') as HTMLInputElement;
}

function createCsvFile(content: string, name = 'applications.csv') {
  return new File([content], name, {
    type: 'text/csv',
  });
}

describe('ImportCsvDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays the dialog when open', () => {
    renderDialog();

    expect(
      screen.getByRole('heading', {
        name: 'Importer des candidatures',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Choisir un fichier CSV',
      }),
    ).toBeInTheDocument();
  });

  it('disables the import button when no file is selected', () => {
    renderDialog();

    expect(
      screen.getByRole('button', {
        name: 'Importer',
      }),
    ).toBeDisabled();
  });

  it('displays the selected CSV file and enables import', async () => {
    const user = userEvent.setup();

    renderDialog();

    const file = createCsvFile(validCsv);

    await user.upload(getFileInput(), file);

    expect(screen.getByText('applications.csv')).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Importer',
      }),
    ).toBeEnabled();
  });

  it('displays an error when a non-CSV file is selected', async () => {
    const user = userEvent.setup({
      applyAccept: false,
    });

    renderDialog();

    const file = new File(['hello'], 'applications.txt', {
      type: 'text/plain',
    });

    await user.upload(getFileInput(), file);

    expect(screen.getByText('Veuillez sélectionner un fichier CSV.')).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Importer',
      }),
    ).toBeDisabled();
  });

  it('removes the selected file', async () => {
    const user = userEvent.setup();

    renderDialog();

    await user.upload(getFileInput(), createCsvFile(validCsv));

    expect(screen.getByText('applications.csv')).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');

    const removeButton = buttons.find(
      (button) =>
        button !== screen.getByRole('button', { name: 'Importer' }) &&
        button !== screen.getByRole('button', { name: 'Annuler' }) &&
        button !==
          screen.getByRole('button', {
            name: 'Choisir un fichier CSV',
          }),
    );

    expect(removeButton).toBeDefined();

    await user.click(removeButton!);

    expect(screen.queryByText('applications.csv')).not.toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Importer',
      }),
    ).toBeDisabled();
  });

  it('does not import applications when the CSV contains validation errors', async () => {
    const user = userEvent.setup();

    renderDialog();

    await user.upload(getFileInput(), createCsvFile(invalidCsv));

    await user.click(
      screen.getByRole('button', {
        name: 'Importer',
      }),
    );

    expect(await screen.findByText(/erreur.*détectée/i)).toBeInTheDocument();

    expect(importApplicationsSupabase).not.toHaveBeenCalled();
  });

  it('imports applications from a valid CSV', async () => {
    const user = userEvent.setup();

    renderDialog();

    await user.upload(getFileInput(), createCsvFile(validCsv));

    await user.click(
      screen.getByRole('button', {
        name: 'Importer',
      }),
    );

    expect(importApplicationsSupabase).toHaveBeenCalledWith(
      [
        {
          company: 'Doctolib',
          jobTitle: 'Full Stack Developer',
          field: 'full-stack',
          status: 'in-progress',
          appliedAt: '2026-09-10',
          location: 'Paris',
          link: 'https://doctolib.fr',
          notes: 'Test',
        },
      ],
      'user-123',
    );
  });

  it('refreshes applications and closes the dialog after a successful import', async () => {
    const user = userEvent.setup();

    const onImported = vi.fn();
    const onOpenChange = vi.fn();

    renderDialog({
      onImported,
      onOpenChange,
    });

    await user.upload(getFileInput(), createCsvFile(validCsv));

    await user.click(
      screen.getByRole('button', {
        name: 'Importer',
      }),
    );

    expect(onImported).toHaveBeenCalledOnce();

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('displays an error when the import service fails', async () => {
    const user = userEvent.setup();

    vi.mocked(importApplicationsSupabase).mockRejectedValueOnce(new Error('Erreur serveur'));

    renderDialog();

    await user.upload(getFileInput(), createCsvFile(validCsv));

    await user.click(
      screen.getByRole('button', {
        name: 'Importer',
      }),
    );

    expect(await screen.findByText('Erreur serveur')).toBeInTheDocument();
  });

  it('closes the dialog when cancel is clicked', async () => {
    const user = userEvent.setup();

    const onOpenChange = vi.fn();

    renderDialog({
      onOpenChange,
    });

    await user.click(
      screen.getByRole('button', {
        name: 'Annuler',
      }),
    );

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
