import { useFilters } from './useFilters';
import { useQuery } from '@tanstack/react-query';

const baseUrl =
  'https://loisirs.montreal.ca/IC3/api/U6510/public/search/?_=1753912784323';

export function useTimeSlots() {
  const { filters, hasRequiredFilters } = useFilters();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['timeSlots', filters],
    queryFn: () =>
      fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
      }).then((res) => res.json()),
    enabled: hasRequiredFilters,
  });

  return { data, isLoading, error, isError };
}
