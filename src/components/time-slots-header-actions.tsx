'use client';

import { Button } from './ui/button';
import { useSetAtom } from 'jotai';
import { filtersSheetOpenAtom } from './filters-sheet';

export default function TimeSlotsHeaderActions() {
  const setOpen = useSetAtom(filtersSheetOpenAtom);

  return (
    <div className="flex gap-1">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Filtres
      </Button>
    </div>
  );
}
