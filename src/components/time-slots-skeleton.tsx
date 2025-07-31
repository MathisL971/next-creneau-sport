'use client';

import { Skeleton } from './ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useFilters } from '@/hooks/useFilters';

export default function TimeSlotsSkeleton() {
  const { filters } = useFilters();
  return (
    <div className="w-full">
      {/* Table skeleton matching the structure of TimeSlotsTable */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">
                <Skeleton className="h-6 w-20 mx-auto" />
              </TableHead>
              <TableHead className="text-center">
                <Skeleton className="h-6 w-16 mx-auto" />
              </TableHead>
              <TableHead className="text-center">
                <Skeleton className="h-6 w-20 mx-auto" />
              </TableHead>
              <TableHead className="text-center">
                <Skeleton className="h-6 w-12 mx-auto" />
              </TableHead>
              <TableHead className="text-center">
                <Skeleton className="h-6 w-8 mx-auto" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: filters.limit }, (_, i) => (
              <TableRow key={i}>
                {/* Status column */}
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-20 mx-auto" />
                </TableCell>
                {/* Site column */}
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-32 mx-auto" />
                </TableCell>
                {/* Time column */}
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-40 mx-auto" />
                </TableCell>
                {/* Price column */}
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-16 mx-auto" />
                </TableCell>
                {/* Actions column */}
                <TableCell className="text-center">
                  <Skeleton className="h-8 w-8 mx-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination skeleton matching the structure of TimeSlotsTable */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          <Skeleton className="h-4 w-64" />
        </div>

        <div className="flex items-center space-x-6 lg:space-x-8">
          {/* Page size selector skeleton */}
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-[70px]" />
          </div>

          {/* Page navigation info skeleton */}
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Navigation buttons skeleton */}
          <div className="flex items-center space-x-2">
            <Skeleton className="hidden h-8 w-8 lg:flex" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="hidden h-8 w-8 lg:flex" />
          </div>
        </div>
      </div>
    </div>
  );
}
