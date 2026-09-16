import { Ellipsis, Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';

type ApplicationActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function ApplicationActions({ onEdit, onDelete }: ApplicationActionsProps) {
  const { t } = useTranslation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
        <Ellipsis />
        <span className="sr-only">Application actions</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>
          <Pencil />
          {t('ApplicationsTable.buttons.edit')}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onDelete} className="text-red-600">
          <Trash2 />
          {t('ApplicationsTable.buttons.delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
