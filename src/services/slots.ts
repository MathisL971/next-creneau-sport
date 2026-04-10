import { Filters } from '@/types/filters';
import { fetchSlotsFromFiltersAction } from '@/actions/slots';

const baseUrl =
  'https://loisirs.montreal.ca/IC3/api/U6510/public/search/?_=1753903640586';

export async function fetchSlotsFromFilters(filters: Partial<Filters>) {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
  });
  return res.json();
}

export async function fetchSlotsFromFiltersViaAction(
  filters: Partial<Filters>
) {
  const { success, data } = await fetchSlotsFromFiltersAction(filters);
  return success ? data : {};
}
