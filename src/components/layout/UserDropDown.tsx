import { ChevronDown, LogOut, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import useAuth from '@/features/auth/hooks/useAuth';

type UserDropdownProps = {
  onDeleteAccount: () => void;
};

export default function UserDropdown({ onDeleteAccount }: UserDropdownProps) {
  const { user, signOut } = useAuth();

  if (!user) return null;

  const name =
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.email?.split('@')[0] ??
    'User';

  const initial = name.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" className="relative h-10 gap-2 px-2 sm:px-3" />}
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
          {initial}
        </span>

        <span className="hidden max-w-36 truncate text-sm font-medium sm:block">{name}</span>

        <ChevronDown className="hidden size-4 text-gray-400 sm:block" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <div className="px-2 py-2">
          <p className="truncate text-sm font-medium text-gray-900">{name}</p>

          {user.email && <p className="mt-0.5 truncate text-xs text-gray-500">{user.email}</p>}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onDeleteAccount} className="text-red-600 focus:text-red-600">
          <Trash2 className="size-4" />
          Supprimer mon compte
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={signOut}>
          <LogOut className="size-4" />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
