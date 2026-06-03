import FiltersSheet from '@/components/filters-sheet';
import RalliaBanner from '@/components/rallia-banner';
import TimeSlotsHeader from '@/components/time-slots-header';
import TimeSlots from '@/components/time-slots';
import { filtersAtom, filtersStore } from '@/atoms/filtersAtom';
import { DEFAULT_FILTERS } from '@/constants';

export default async function SlotsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filters = await searchParams;

  const completeFilters = {
    ...DEFAULT_FILTERS,
    ...filters,
    siteId: filters.siteId ? JSON.parse(filters.siteId as string) : null,
    dates: JSON.parse(filters.dates as string),
    // Coerce pagination params to numbers so the table's initial pagination
    // state and query key are computed from numbers (matching the client's
    // parsed filters), not strings from the raw search params.
    limit: filters.limit ? Number(filters.limit) : DEFAULT_FILTERS.limit,
    offset: filters.offset ? Number(filters.offset) : DEFAULT_FILTERS.offset,
  };

  const hasMandatoryFilters =
    completeFilters.searchString &&
    completeFilters.dates &&
    completeFilters.dates.length > 0 &&
    (completeFilters.boroughIds || completeFilters.siteId);

  if (!hasMandatoryFilters) {
    return <div>Missing appropriate filters</div>;
  }

  filtersStore.set(filtersAtom, completeFilters);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 gap-2 flex flex-col grow py-10">
      <RalliaBanner />
      <TimeSlotsHeader />
      <TimeSlots filters={completeFilters} />
      <FiltersSheet />
    </div>
  );
}
