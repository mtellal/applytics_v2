import AppHeader from '@/components/layout/AppHeader';
import DeleteAccountDialog from '@/features/auth/components/DeleteAccountDialog';
import { deleteAccount } from '@/features/auth/services/auth.service';
import { useState } from 'react';
import { Outlet } from 'react-router';

export default function AppLayout() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [deletingAccount, setDeletingAccount] = useState(false);

  async function handleDeleteAccount() {
    try {
      setDeletingAccount(true);
      await deleteAccount();
      setDeleteDialogOpen(false);
    } finally {
      setDeletingAccount(false);
    }
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50 overflow-y-auto">
      <AppHeader onDeleteAccount={() => setDeleteDialogOpen(true)} />

      <main className="flex-1  px-5 py-5 md:px-20 md:py-2 ">
        <Outlet />
      </main>

      <DeleteAccountDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteAccount}
        loading={deletingAccount}
      />
    </div>
  );
}
