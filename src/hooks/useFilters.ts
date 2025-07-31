import type { Filters } from '@/types/filters';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { DEFAULT_PARAMS } from '@/components/time-slots';

// Default filters as a constant
const DEFAULT_FILTERS: Filters = {
  boroughIds: null,
  dates: [],
  endTime: null,
  facilityTypeIds: null,
  searchString: null,
  siteId: null,
  startTime: null,
  ...DEFAULT_PARAMS,
} as const;

// Helper functions to serialize/deserialize query parameters
const serializeValue = (value: unknown): string | undefined => {
  if (value === null || value === undefined) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value.length > 0 ? JSON.stringify(value) : undefined;
  }
  if (typeof value === 'boolean') {
    return value.toString();
  }
  if (typeof value === 'number') {
    return value.toString();
  }
  if (typeof value === 'string') {
    return value;
  }
  return JSON.stringify(value);
};

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

// Convert filters to query parameters
const filtersToQuery = (filters: Filters): Record<string, string> => {
  const query: Record<string, string> = {};

  Object.keys(filters).forEach((key) => {
    const filterKey = key as keyof Filters;
    const value = filters[filterKey];
    const defaultValue = DEFAULT_FILTERS[filterKey];

    // Only add to query if different from default
    if (JSON.stringify(value) !== JSON.stringify(defaultValue)) {
      const serialized = serializeValue(value);
      if (serialized !== undefined) {
        query[key] = serialized;
      }
    }
  });

  return query;
};

export function useFilters(): {
  filters: Filters;
  updateFilters: (partialFilters: Partial<Filters>) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
  hasRequiredFilters: boolean;
} {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const pendingURLUpdateRef = useRef<Filters | null>(null);

  // Initialize filters from query parameters or defaults
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  // Update filters when router query changes
  useEffect(() => {
    setMounted(true);
    // Only parse query params on client side to avoid hydration mismatch
    const newFilters = parseQueryToFilters(Object.fromEntries(searchParams));
    setFilters(newFilters);
  }, [searchParams]);

  // Handle URL updates in a separate effect to avoid setState during render
  useEffect(() => {
    if (pendingURLUpdateRef.current && mounted) {
      const query = filtersToQuery(pendingURLUpdateRef.current);
      router.push(`?${new URLSearchParams(query).toString()}`);
      pendingURLUpdateRef.current = null;
    }
  }, [router, mounted, filters]);

  // Check for active filters (non-default values)
  const hasActiveFilters = Object.keys(filters).some((key) => {
    const filterKey = key as keyof Filters;
    const currentValue = filters[filterKey];
    const defaultValue = DEFAULT_FILTERS[filterKey];

    // Handle array comparison
    if (Array.isArray(currentValue) && Array.isArray(defaultValue)) {
      return (
        currentValue.length !== defaultValue.length ||
        currentValue.some((val, index) => val !== defaultValue[index])
      );
    }
    return currentValue !== defaultValue;
  });

  // Check for required filters
  const hasRequiredFilters =
    filters.boroughIds !== null &&
    filters.searchString !== null &&
    filters.dates &&
    filters.dates.length > 0;

  function updateFilters(partialFilters: Partial<Filters>) {
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        ...partialFilters,
      };

      // Schedule URL update to happen in the next effect
      pendingURLUpdateRef.current = newFilters;
      return newFilters;
    });
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
    // Schedule URL update to happen in the next effect
    pendingURLUpdateRef.current = DEFAULT_FILTERS;
  }

  return {
    filters,
    updateFilters,
    resetFilters,
    hasActiveFilters,
    hasRequiredFilters,
  };
}
