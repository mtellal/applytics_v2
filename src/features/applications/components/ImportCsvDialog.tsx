import { useRef, useState } from 'react';
import { FileSpreadsheet, Info, Upload, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import useAuth from '@/features/auth/hooks/useAuth';

import { importApplicationsSupabase } from '../services/applications.service';
import type { CsvParseResult, CsvValidationError } from '../types/csv.types';
import { parseApplicationsCsv, readCsvFile } from '../utils/parseApplicationsCsv';

type ImportCsvDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImported: () => Promise<void> | void;
};

const REQUIRED_COLUMNS = ['company', 'jobTitle', 'field', 'status', 'appliedAt', 'location'];

const OPTIONAL_COLUMNS = ['link', 'notes'];

export function ImportCsvDialog({ open, onOpenChange, onImported }: ImportCsvDialogProps) {
  const { user } = useAuth();
  const { t } = useTranslation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<CsvValidationError[]>([]);
  const [validCount, setValidCount] = useState(0);
  const [importing, setImporting] = useState(false);
  const [globalError, setGlobalError] = useState('');

  function resetDialog() {
    setFile(null);
    setErrors([]);
    setValidCount(0);
    setGlobalError('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      resetDialog();
    }

    onOpenChange(nextOpen);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.csv')) {
      setGlobalError('Veuillez sélectionner un fichier CSV.');
      return;
    }

    setFile(selectedFile);
    setErrors([]);
    setValidCount(0);
    setGlobalError('');
  }

  function removeFile() {
    resetDialog();
  }

  async function handleImport() {
    if (!file || !user) return;

    try {
      setImporting(true);
      setGlobalError('');

      const csv = await readCsvFile(file);
      const result: CsvParseResult = await parseApplicationsCsv(csv, t);

      setErrors(result.errors);
      setValidCount(result.applications.length);

      if (result.applications.length === 0) {
        return;
      }

      if (result.errors.length > 0) {
        return;
      }

      await importApplicationsSupabase(result.applications, user.id);

      await onImported();

      handleOpenChange(false);
    } catch (error) {
      setGlobalError(
        error instanceof Error ? error.message : "Une erreur est survenue pendant l'import.",
      );
    } finally {
      setImporting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="
          flex max-h-[95dvh] w-[calc(100%-1rem)] flex-col
          gap-0 overflow-hidden p-0
          sm:max-h-[90vh] sm:max-w-3xl
        "
      >
        <DialogHeader className="shrink-0 border-b px-4 py-4 pr-12 sm:px-6 sm:py-5 sm:pr-12">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:size-12">
              <FileSpreadsheet className="size-5 sm:size-6" />
            </div>

            <div className="min-w-0 text-left">
              <DialogTitle className="text-lg sm:text-xl">{t('ImportCSVDialog.title')}</DialogTitle>

              <DialogDescription className="mt-1 text-sm">
                {t('ImportCSVDialog.description')}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="space-y-4 p-4 sm:p-6">
            <div className="rounded-xl border border-dashed p-5 text-center sm:p-8">
              <Upload className="mx-auto mb-3 size-7 text-slate-500 sm:mb-4 sm:size-8" />

              <Button type="button" onClick={() => fileInputRef.current?.click()}>
                {t('ImportCSVDialog.buttonImport')}
              </Button>

              <p className="mt-2 text-xs text-slate-500 sm:mt-3 sm:text-sm">
                {t('ImportCSVDialog.csvFormat')}
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {file && (
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3 sm:px-4">
                <FileSpreadsheet className="size-5 shrink-0 text-slate-500" />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{file.name}</p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {(file.size / 1024).toFixed(1)} Ko
                  </p>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  onClick={removeFile}
                >
                  <X className="size-4" />
                  <span className="sr-only">Remove selected file</span>
                </Button>
              </div>
            )}

            {errors.length > 0 && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 sm:p-4">
                <div className="mb-3">
                  <p className="font-medium text-red-900">
                    {errors.length} {t('ImportCSVDialog.requirement.error')}
                    {errors.length > 1 ? 's' : ''} {t('ImportCSVDialog.requirement.detected')}
                    {errors.length > 1 ? 's' : ''}
                  </p>

                  <p className="mt-1 text-sm text-red-700">
                    {t('ImportCSVDialog.requirement.correct')}
                  </p>
                </div>

                <div className="max-h-40 overflow-y-auto rounded-lg border border-red-200 bg-white">
                  {errors.map((error, index) => (
                    <div
                      key={`${error.row}-${index}`}
                      className="
                        flex flex-col gap-1 border-b border-red-100
                        px-3 py-2 last:border-b-0
                        sm:flex-row sm:gap-3
                      "
                    >
                      <span className="shrink-0 text-sm font-medium text-red-700">
                        {t('ImportCSVDialog.requirement.line')} {error.row}
                      </span>

                      <span className="min-w-0 text-sm text-slate-600">{error.message}</span>
                    </div>
                  ))}
                </div>

                {validCount > 0 && (
                  <p className="mt-3 text-sm text-red-700">
                    {validCount} {t('ImportCSVDialog.requirement.line')}
                    {validCount > 1 ? 's' : ''} {t('ImportCSVDialog.requirement.valid')}
                    {validCount > 1 ? 's' : ''}.
                  </p>
                )}
              </div>
            )}

            {globalError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-700 sm:px-4">
                {globalError}
              </div>
            )}

            <div className="rounded-xl bg-slate-50 p-4 sm:p-5">
              <div className="mb-4 flex items-start gap-3 sm:mb-5">
                <Info className="mt-0.5 size-5 shrink-0 text-blue-600" />

                <div className="min-w-0">
                  <h3 className="font-semibold">{t('ImportCSVDialog.requirement.title')}</h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {t('ImportCSVDialog.requirement.description')}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 md:gap-5">
                <div>
                  <p className="mb-2 text-sm font-medium">
                    {t('ImportCSVDialog.requirement.columns')}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {REQUIRED_COLUMNS.map((column) => (
                      <span
                        key={column}
                        className="rounded-md bg-white px-2 py-1 text-xs text-slate-600 shadow-sm"
                      >
                        {column}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">
                    {t('ImportCSVDialog.requirement.optional')}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {OPTIONAL_COLUMNS.map((column) => (
                      <span
                        key={column}
                        className="rounded-md bg-white px-2 py-1 text-xs text-slate-600 shadow-sm"
                      >
                        {column}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <details className="mt-4 overflow-hidden rounded-lg border bg-white md:hidden">
                <summary className="cursor-pointer px-3 py-3 text-sm font-medium select-none">
                  {t('ImportCSVDialog.requirement.details', 'Voir les formats et un exemple CSV')}
                </summary>

                <div className="space-y-4 border-t p-3">
                  <CsvTechnicalDetails t={t} />
                </div>
              </details>

              <div className="mt-5 hidden md:block">
                <CsvTechnicalDetails t={t} />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter
          className="
            grid shrink-0 grid-cols-2 gap-2 border-t
            bg-white pb-8
            flex-row px-10
            items-center
            sm:flex sm:px-6
            "
        >
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={importing}
          >
            {t('ImportCSVDialog.buttons.cancel')}
          </Button>

          <Button type="button" onClick={handleImport} disabled={!file || importing}>
            {importing
              ? t('ImportCSVDialog.buttons.importation')
              : t('ImportCSVDialog.buttons.import')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type CsvTechnicalDetailsProps = {
  t: ReturnType<typeof useTranslation>['t'];
};

function CsvTechnicalDetails({ t }: CsvTechnicalDetailsProps) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        <div>
          <p className="text-sm font-medium">{t('ImportCSVDialog.requirement.dateFormat')}</p>

          <p className="mt-1 text-sm text-slate-500">
            {t('ImportCSVDialog.requirement.dateExample')}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium">{t('ImportCSVDialog.requirement.status')}</p>

          <p className="mt-1 break-words text-sm text-slate-500">
            {t('ImportCSVDialog.requirement.statusExample')}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium">{t('ImportCSVDialog.requirement.fields')}</p>

          <p className="mt-1 break-words text-sm text-slate-500">
            {t('ImportCSVDialog.requirement.fieldsExample')}
          </p>
        </div>
      </div>

      <div className="mt-4 md:mt-5">
        <p className="mb-2 text-sm font-medium">{t('ImportCSVDialog.requirement.csvExample')}</p>

        <pre className="max-w-full overflow-x-auto rounded-lg border bg-white p-3 text-xs text-slate-600">
          {t('ImportCSVDialog.requirement.csvExample')}
        </pre>
      </div>
    </>
  );
}
