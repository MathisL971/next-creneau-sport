import type { Filters } from '@/types/filters';
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { DEFAULT_FILTERS } from '@/constants';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { filtersAtom } from '@/atoms/filtersAtom';

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
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  // Jotai shared state instead of local useState
  const [filters, setFilters] = useAtom(filtersAtom);

  const [mounted, setMounted] = useState(false);

  // Initialize filters from query parameters or defaults
  useEffect(() => {
    setMounted(true);
    const newFilters = parseQueryToFilters(Object.fromEntries(searchParams));
    setFilters(newFilters);
  }, [searchParams, setFilters]);

  // React Query refetches when the queryKey changes (filters),
  // so we avoid manual invalidation to prevent duplicate requests.

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

  function updateFilters(partialFilters: Partial<Filters>) {
    const next = { ...filters, ...partialFilters } as Filters;
    setFilters(next);

    const query = filtersToQuery(next);
    const queryString = new URLSearchParams(query).toString();
    if (typeof window !== 'undefined') {
      const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;
      window.history.replaceState({}, '', nextUrl);
    }
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', pathname);
    }
  }

  return {
    filters,
    updateFilters,
    resetFilters,
    hasActiveFilters,
    hasRequiredFilters,
  };
}
