import { Filters } from '@/types/filters';

// Default filters as a constant
export const DEFAULT_FILTERS: Filters = {
  boroughIds: null,
  dates: [],
  endTime: null,
  facilityTypeIds: null,
  searchString: null,
  siteId: null,
  startTime: null,
  isSortOrderAsc: true,
  limit: 10,
  offset: 0,
  sortColumn: 'startDateTime',
} as const;
