export interface Filters {
  boroughIds: string | null;
  dates: string[];
  endTime: string | null;
  facilityTypeIds: string | string[] | null;
  isSortOrderAsc: boolean;
  limit: number;
  offset: number;
  searchString: string | null;
  siteId: number | null;
  sortColumn: string;
  startTime: string | null;
}

// Alternative with more specific types
export interface FiltersStrict {
  boroughIds: string | null;
  dates: string[]; // ISO date strings
  endTime: string | null; // Time string like "14:00"
  facilityTypeIds: string | string[] | null; // Could be single ID or array
  isSortOrderAsc: boolean;
  limit: number;
  offset: number;
  searchString: string | null;
  siteId: string | number | null;
  sortColumn: 'totalPrice' | 'startDateTime' | 'facilityName' | string; // Add known sort columns
  startTime: string | null; // Time string like "09:00"
}

// If you want to make some fields optional (common for filter objects)
export interface FiltersOptional {
  boroughIds?: string | null;
  dates?: string[] | null;
  endTime?: string | null;
  facilityTypeIds?: string | string[] | null;
  isSortOrderAsc?: boolean;
  limit?: number;
  offset?: number;
  searchString?: string | null;
  siteId?: string | number | null;
  sortColumn?: string;
  startTime?: string | null;
}

// Utility type for creating filters with defaults
export type CreateFilters = Partial<Filters> & {
  // These might be required
  limit: number;
  offset: number;
  isSortOrderAsc: boolean;
};
