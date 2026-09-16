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
      const result: CsvParseResult = await parseApplicationsCsv(csv);

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
              <DialogTitle className="text-xl">Importer des candidatures</DialogTitle>

              <DialogDescription className="mt-1 max-w-xl">
                Importez plusieurs candidatures à partir d&apos;un fichier CSV. Le fichier doit
                respecter le format indiqué ci-dessous.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-xl border border-dashed p-8 text-center">
            <Upload className="mx-auto mb-4 size-8 text-slate-500" />

            <Button type="button" onClick={() => fileInputRef.current?.click()}>
              Choisir un fichier CSV
            </Button>

            <p className="mt-3 text-sm text-slate-500">Formats acceptés : .csv</p>

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
                <h3 className="font-semibold">Format attendu du CSV</h3>

                <p className="text-sm text-slate-500">
                  Votre fichier doit contenir les colonnes suivantes.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-medium">Colonnes obligatoires</p>

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
                <p className="mb-2 text-sm font-medium">Colonnes optionnelles</p>

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
                <p className="text-sm font-medium">Format de la date</p>
                <p className="mt-1 text-sm text-slate-500">YYYY-MM-DD</p>
              </div>

              <div>
                <p className="text-sm font-medium">Statuts acceptés</p>
                <p className="mt-1 text-sm text-slate-500">
                  in-progress, interview, offer, rejected
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">Domaines acceptés</p>
                <p className="mt-1 text-sm text-slate-500">
                  frontend, backend, full-stack, mobile, devops, cybersecurity, other
                </p>
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-sm font-medium">Exemple de fichier CSV</p>

              <pre className="overflow-x-auto rounded-lg border bg-white p-3 text-xs text-slate-600">
                {`company,jobTitle,field,status,appliedAt,location,link,notes
Google,Frontend Developer,frontend,in-progress,2026-09-10,Paris,https://example.com,`}
              </pre>
            </div>
          </div>

          {globalError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {globalError}
            </div>
          )}

          {errors.length > 0 && (
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
              <p className="font-medium text-orange-900">
                {errors.length} erreur
                {errors.length > 1 ? 's' : ''} détectée
                {errors.length > 1 ? 's' : ''}
              </p>

              <div className="mt-2 max-h-32 space-y-1 overflow-y-auto">
                {errors.map((error, index) => (
                  <p key={`${error.row}-${index}`} className="text-sm text-orange-800">
                    Ligne {error.row} : {error.message}
                  </p>
                ))}
              </div>

              {validCount > 0 && (
                <p className="mt-3 text-sm text-orange-800">
                  {validCount} ligne
                  {validCount > 1 ? 's' : ''} valide
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
            Annuler
          </Button>

          <Button type="button" onClick={handleImport} disabled={!file || importing}>
            {importing ? 'Importation...' : 'Importer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
