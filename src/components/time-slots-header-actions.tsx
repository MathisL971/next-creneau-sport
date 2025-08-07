'use client';

import { Button } from './ui/button';
import { useSetAtom } from 'jotai';
import { filtersSheetOpenAtom } from './filters-sheet';
import { Filter } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function TimeSlotsHeaderActions() {
  const setOpen = useSetAtom(filtersSheetOpenAtom);
  const t = useTranslations('TimeSlotsPage');

  return (
    <div className="flex gap-1">
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2"
      >
        <Filter className="h-4 w-4" />
        {t('filters')}
      </Button>
    </div>
  );
}
