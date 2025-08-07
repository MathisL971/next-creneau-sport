'use client';

import TimeSlotsHeaderActions from './time-slots-header-actions';
import { useTranslations } from 'next-intl';

export default function TimeSlotsHeader() {
  const t = useTranslations('TimeSlotsPage');

  return (
    <div className="flex flex-row justify-between items-center border-b w-full pb-2 gap-2">
      <p className="scroll-m-20 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight first:mt-0 min-w-0">
        {t('title')}
      </p>
      <div className="flex-shrink-0">
        <TimeSlotsHeaderActions />
      </div>
    </div>
  );
}
