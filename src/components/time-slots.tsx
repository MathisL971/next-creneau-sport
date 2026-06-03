import TimeSlotsTable from './time-slots-table';
import { Filters } from '@/types/filters';

// The table fetches its data client-side via React Query (see TimeSlotsTable),
// showing its own skeleton while loading. We deliberately do NOT prefetch on the
// server inside a Suspense boundary: streaming the resolved table through a
// Suspense reveal proved fragile (the interactive table could get stranded in a
// hidden streaming container, leaving pagination unresponsive). Rendering the
// client table directly hydrates reliably.
export default function TimeSlots({ filters }: { filters: Filters }) {
  return <TimeSlotsTable initialFilters={filters} />;
}
