import type { Filters } from '@/types/filters';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { DEFAULT_FILTERS } from '@/constants';
import { useAtom } from 'jotai';
import { filtersAtom } from '@/atoms/filtersAtom';

// Helper to deserialize a single query parameter into its filter value.
const deserializeValue = (
  key: string,
  value: string | string[],
  defaultValue: unknown
): unknown => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return defaultValue;
  }

  switch (key) {
    case 'searchString':
      return value;
    case 'dates':
      return Array.isArray(value) ? value : JSON.parse(value);
    case 'startTime':
    case 'endTime':
      return value;
    case 'boroughIds':
      return value;
    case 'siteId':
      return Number(value);
    case 'limit':
      return Number(value);
    case 'offset':
      return Number(value);
    default:
      break;
  }
};

// Parse query parameters into filters
const parseQueryToFilters = (
  query: Record<string, string | string[]>
): Filters => {
  const filters: Filters = { ...DEFAULT_FILTERS };

  (Object.keys(DEFAULT_FILTERS) as Array<keyof Filters>).forEach((key) => {
    const queryValue = query[key];
    const defaultValue = DEFAULT_FILTERS[key];

    if (queryValue !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (filters as any)[key] = deserializeValue(key, queryValue, defaultValue);
    }
  });

  return filters;
};

// Tracks the last URL query string that was synced into the shared filters
// atom. `useFilters` is called by several components (the table, the loading
// skeleton, the filters sheet, ...), and each call has its own init effect.
// Without this guard, every consumer mount would re-parse the URL and overwrite
// in-memory state — most visibly resetting the pagination offset back to 0 the
// moment the loading skeleton mounts. Syncing once per real navigation fixes it.
let lastSyncedSearch: string | null = null;

export function useFilters(): {
  filters: Filters;
  updateFilters: (partialFilters: Partial<Filters>) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
  hasRequiredFilters: boolean;
} {
  const searchParams = useSearchParams();
  // Depend on the serialized query string, not the ReadonlyURLSearchParams
  // object: the object identity can change on every render, which made the
  // init effect below re-run constantly and clobber in-memory filter/pagination
  // changes (e.g. resetting offset back to 0 right after paginating).
  const searchParamsString = searchParams.toString();
  // Jotai shared state instead of local useState
  const [filters, setFilters] = useAtom(filtersAtom);

  // Initialize filters from the URL query parameters on load (and on real
  // navigations, e.g. a new search). After that, the atom is the single source
  // of truth — filter/pagination changes update the atom directly (see
  // updateFilters), which re-keys the React Query and refetches. Because this
  // depends on searchParamsString, it only runs when the URL actually changes,
  // so it no longer reverts in-memory pagination changes.
  useEffect(() => {
    if (lastSyncedSearch === searchParamsString) return;
    lastSyncedSearch = searchParamsString;
    const newFilters = parseQueryToFilters(
      Object.fromEntries(new URLSearchParams(searchParamsString))
    );
    setFilters(newFilters);
  }, [searchParamsString, setFilters]);

  const hasActiveFilters = Object.keys(filters).some((key) => {
    const filterKey = key as keyof Filters;
    const currentValue = filters[filterKey];
    const defaultValue = DEFAULT_FILTERS[filterKey];

    if (Array.isArray(currentValue) && Array.isArray(defaultValue)) {
      return (
        currentValue.length !== defaultValue.length ||
        currentValue.some((val, index) => val !== defaultValue[index])
      );
    }
    return currentValue !== defaultValue;
  });

  const hasRequiredFilters =
    filters.searchString !== null &&
    filters.dates &&
    filters.dates.length > 0 &&
    (filters.boroughIds !== null ||
      (filters.siteId !== null && filters.siteId !== undefined));

  // Filter/pagination changes are kept purely in the shared atom, which is the
  // single source of truth for the table's React Query. We no longer mirror them
  // back into the URL (the previous window.history.replaceState approach added
  // router coupling without a clear benefit here). The initial URL is still
  // parsed on load above, so deep links / shared search URLs keep working.
  function updateFilters(partialFilters: Partial<Filters>) {
    setFilters({ ...filters, ...partialFilters } as Filters);
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  return {
    filters,
    updateFilters,
    resetFilters,
    hasActiveFilters,
    hasRequiredFilters,
  };
}
