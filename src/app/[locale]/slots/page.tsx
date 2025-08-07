import { Suspense } from 'react';
import FiltersSheet from '@/components/filters-sheet';
import TimeSlotsHeader from '@/components/time-slots-header';
import TimeSlots from '@/components/time-slots';
import TimeSlotsSkeleton from '@/components/time-slots-skeleton';

export default async function SlotsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 gap-2 flex flex-col grow py-10">
      <TimeSlotsHeader />
      <Suspense key={JSON.stringify(params)} fallback={<TimeSlotsSkeleton />}>
        <TimeSlots searchParams={searchParams} />
      </Suspense>
      <FiltersSheet />
    </div>
  );
}
