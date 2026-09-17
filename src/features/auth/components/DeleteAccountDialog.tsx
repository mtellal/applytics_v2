import { TriangleAlert } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type DeleteAccountDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void> | void;
  loading?: boolean;
};

export default function DeleteAccountDialog({
  open,
  onOpenChange,
  onConfirm,
  loading = false,
}: DeleteAccountDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex size-11 items-center justify-center rounded-full bg-red-50 text-red-600">
            <TriangleAlert className="size-5" />
          </div>

          <DialogTitle className="text-lg">Supprimer votre compte ?</DialogTitle>

          <DialogDescription className="text-sm leading-6">
            Cette action est définitive. Votre compte ainsi que toutes les données qui lui sont
            associées seront définitivement supprimés.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border border-red-100 bg-red-50 p-3">
          <p className="text-sm text-red-700">
            Vous ne pourrez pas récupérer votre compte ou vos données après la suppression.
          </p>
        </div>

        <DialogFooter className="grid grid-cols-2 gap-2 sm:flex">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => onOpenChange(false)}
          >
            Annuler
          </Button>

          <Button type="button" variant="destructive" disabled={loading} onClick={onConfirm}>
            {loading ? 'Suppression...' : 'Supprimer mon compte'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
