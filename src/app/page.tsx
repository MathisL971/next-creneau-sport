import { Suspense } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import FiltersSheet from '@/components/filters-sheet';
import TimeSlotsHeader from '@/components/time-slots-header';
import TimeSlots from '@/components/time-slots';
import TimeSlotsSkeleton from '@/components/time-slots-skeleton';
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const hasMandatoryFilters =
    params.boroughIds &&
    params.searchString &&
    params.dates &&
    JSON.parse(params.dates as string).length > 0;

  return (
    <div className="font-sans min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex flex-col w-full grow py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 gap-2 flex flex-col grow">
          <TimeSlotsHeader />
          {hasMandatoryFilters ? (
            <Suspense
              key={JSON.stringify(params)}
              fallback={<TimeSlotsSkeleton />}
            >
              <TimeSlots searchParams={searchParams} />
            </Suspense>
          ) : (
            <Alert
              variant="default"
              className="mx-auto max-w-md w-full sm:max-w-lg"
            >
              <AlertCircleIcon />
              <AlertTitle>Filtres obligatoires manquants</AlertTitle>
              <AlertDescription>
                <p>
                  Veuillez sélectionner au moins un sport, un arrondissement et
                  une date pour rechercher des créneaux disponibles.
                </p>
              </AlertDescription>
            </Alert>
          )}
          <FiltersSheet />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
