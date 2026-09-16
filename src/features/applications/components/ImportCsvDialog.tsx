import { useRef, useState } from 'react';
import { FileSpreadsheet, Info, Upload, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { importApplicationsSupabase } from '../services/applications.service';
import type { CsvParseResult, CsvValidationError } from '../types/csv.types';
import { parseApplicationsCsv, readCsvFile } from '../utils/parseApplicationsCsv';
import useAuth from '@/features/auth/hooks/useAuth';
import { useTranslation } from 'react-i18next';

type ImportCsvDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImported: () => Promise<void> | void;
};

export function ImportCsvDialog({ open, onOpenChange, onImported }: ImportCsvDialogProps) {
  const { user } = useAuth();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<CsvValidationError[]>([]);
  const [validCount, setValidCount] = useState(0);
  const [importing, setImporting] = useState(false);
  const [globalError, setGlobalError] = useState('');

  const { t } = useTranslation();

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
      <DialogContent className="max-h-[90vh] sm:max-w-3xl overflow-y-auto">
        <DialogHeader className="pr-8">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FileSpreadsheet className="size-6" />
            </div>

            <div>
              <DialogTitle className="text-xl">{t('ImportCSVDialog.title')}</DialogTitle>

              <DialogDescription className="mt-1 max-w-xl">
                {t('ImportCSVDialog.description')}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-xl border border-dashed p-8 text-center">
            <Upload className="mx-auto mb-4 size-8 text-slate-500" />

            <Button type="button" onClick={() => fileInputRef.current?.click()}>
              {t('ImportCSVDialog.buttonImport')}
            </Button>

            <p className="mt-3 text-sm text-slate-500">{t('ImportCSVDialog.csvFormat')}</p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {file && (
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="size-5 text-slate-500" />

                <div>
                  <p className="text-sm font-medium">{file.name}</p>

                  <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} Ko</p>
                </div>
              </div>

              <Button type="button" variant="ghost" size="icon" onClick={removeFile}>
                <X className="size-4" />
              </Button>
            </div>
          )}

          <div className="rounded-xl bg-slate-50 p-5">
            <div className="mb-5 flex items-start gap-3">
              <Info className="mt-0.5 size-5 shrink-0 text-blue-600" />

              <div>
                <h3 className="font-semibold">{t('ImportCSVDialog.requirement.title')}</h3>

                <p className="text-sm text-slate-500">
                  {t('ImportCSVDialog.requirement.description')}
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-medium">
                  {t('ImportCSVDialog.requirement.columns')}
                </p>

                <div className="flex flex-wrap gap-2">
                  {['company', 'jobTitle', 'field', 'status', 'appliedAt', 'location'].map(
                    (column) => (
                      <span
                        key={column}
                        className="rounded-md bg-white px-2 py-1 text-xs text-slate-600 shadow-sm"
                      >
                        {column}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium">
                  {t('ImportCSVDialog.requirement.optional')}
                </p>

                <div className="flex gap-2">
                  {['link', 'notes'].map((column) => (
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

            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <div>
                <p className="text-sm font-medium">{t('ImportCSVDialog.requirement.dateFormat')}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {t('ImportCSVDialog.requirement.dateExample')}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">{t('ImportCSVDialog.requirement.status')}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {t('ImportCSVDialog.requirement.statusExample')}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">{t('ImportCSVDialog.requirement.fields')}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {t('ImportCSVDialog.requirement.fieldsExample')}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-sm font-medium">
                {t('ImportCSvDialog.requirement.csvExample')}
              </p>

              <pre className="overflow-x-auto rounded-lg border bg-white p-3 text-xs text-slate-600">
                {t('ImportCSVDialog.requirement.csvExample')}
              </pre>
            </div>
          </div>

          {globalError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {globalError}
            </div>
          )}

          {errors.length > 0 && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
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
                    className="flex gap-3 border-b border-red-100 px-3 py-2 last:border-b-0"
                  >
                    <span className="shrink-0 text-sm font-medium text-red-700">
                      {t('ImportCSVDialog.requirement.line')} {error.row}
                    </span>

                    <span className="text-sm text-slate-600">{error.message}</span>
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
        </div>

        <DialogFooter>
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
