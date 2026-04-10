import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import TimeSlotsTable from './time-slots-table';
import { fetchSlotsFromFiltersViaAction } from '@/services/slots';
import { Filters } from '@/types/filters';

export default async function TimeSlots({ filters }: { filters: Filters }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['slots', filters],
    queryFn: () => fetchSlotsFromFiltersViaAction(filters),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TimeSlotsTable initialFilters={filters} />
    </HydrationBoundary>
  );
}
