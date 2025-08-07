'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { LockIcon, CirclePlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FacilityReservation } from '@/types/reservation';
import { useFilters } from '@/hooks/useFilters';
import { useTranslations, useLocale } from 'next-intl';

export type TimeSlotsResponse = {
  results: FacilityReservation[];
  recordCount?: number;
};

export const columns: ColumnDef<FacilityReservation>[] = [
  {
    accessorFn: (row) => row.canReserve.value,
    id: 'canReserve.value',
    header: 'Statut',
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue('canReserve.value') ? 'Disponible' : 'Indisponible'}
      </div>
    ),
  },
  {
    accessorFn: (row) => row.facility.name,
    id: 'facility.name',
    header: 'Site',
    cell: ({ row }) => (
      <div className="capitalize">
        {(row.getValue('facility.name') as string)
          .split(', ')
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join(', ')}
      </div>
    ),
  },
  {
    accessorFn: (row) => [row.startDateTime, row.endDateTime],
    id: 'time',
    header: 'Quand ?',
    cell: ({ row }) => {
      const [startDateTime, endDateTime] = row.getValue('time') as [
        string,
        string,
      ];

      // Use consistent formatting to avoid hydration mismatch
      const formatDateTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return (
          date.toLocaleDateString('fr-CA') +
          ' ' +
          date.toLocaleTimeString('fr-FR', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
          })
        );
      };

      const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString('fr-FR', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        });
      };

      return (
        <div>
          {formatDateTime(startDateTime)} - {formatTime(endDateTime)}
        </div>
      );
    },
  },
  {
    accessorKey: 'totalPrice',
    header: 'Prix',
    cell: ({ row }) => {
      const totalPrice = row.getValue('totalPrice') as number;
      return <div>{totalPrice} $</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const reservation = row.original;

      return (
        <Button
          variant={reservation.canReserve.value ? 'outline' : 'destructive'}
          className={`h-8 w-8 p-0 ${
            reservation.canReserve.value
              ? 'cursor-pointer'
              : 'cursor-not-allowed'
          }`}
          onClick={() => {
            if (reservation.canReserve.value) {
              const finalUrl = `https://loisirs.montreal.ca/IC3/#/U6510/view/${reservation.facility.id}/${reservation.startDateTime}/${reservation.endDateTime}/${reservation.facilityScheduleId}`;
              window.open(finalUrl, '_blank');
            }
          }}
        >
          {reservation.canReserve.value ? (
            <CirclePlusIcon size={20} />
          ) : (
            <LockIcon size={20} />
          )}
        </Button>
      );
    },
  },
];

export default function TimeSlotsTable({
  timeSlots,
}: {
  timeSlots: TimeSlotsResponse;
}) {
  const { filters, updateFilters } = useFilters();
  const t = useTranslations('TimeSlotsTable');
  const locale = useLocale();
  const [isClient, setIsClient] = React.useState(false);

  // Create translated columns
  const translatedColumns: ColumnDef<FacilityReservation>[] = React.useMemo(
    () => [
      {
        accessorFn: (row) => row.canReserve.value,
        id: 'canReserve.value',
        header: t('status'),
        cell: ({ row }) => (
          <div className="capitalize">
            {row.getValue('canReserve.value')
              ? t('available')
              : t('unavailable')}
          </div>
        ),
      },
      {
        accessorFn: (row) => row.facility.name,
        id: 'facility.name',
        header: t('site'),
        cell: ({ row }) => (
          <div className="capitalize">
            {(row.getValue('facility.name') as string)
              .split(', ')
              .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
              .join(', ')}
          </div>
        ),
      },
      {
        accessorFn: (row) => [row.startDateTime, row.endDateTime],
        id: 'time',
        header: t('when'),
        cell: ({ row }) => {
          const [startDateTime, endDateTime] = row.getValue('time') as [
            string,
            string,
          ];

          // Use locale-aware formatting
          const formatDateTime = (dateStr: string) => {
            const date = new Date(dateStr);
            return (
              date.toLocaleDateString(locale) +
              ' ' +
              date.toLocaleTimeString(locale, {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
              })
            );
          };

          const formatTime = (dateStr: string) => {
            const date = new Date(dateStr);
            return date.toLocaleTimeString(locale, {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
            });
          };

          return (
            <div>
              {formatDateTime(startDateTime)} - {formatTime(endDateTime)}
            </div>
          );
        },
      },
      {
        accessorKey: 'totalPrice',
        header: t('price'),
        cell: ({ row }) => {
          const totalPrice = row.getValue('totalPrice') as number;
          return <div>{totalPrice} $</div>;
        },
      },
      {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
          const reservation = row.original;

          return (
            <Button
              variant={reservation.canReserve.value ? 'outline' : 'destructive'}
              className={`h-8 w-8 p-0 ${
                reservation.canReserve.value
                  ? 'cursor-pointer'
                  : 'cursor-not-allowed'
              }`}
              onClick={() => {
                if (reservation.canReserve.value) {
                  const finalUrl = `https://loisirs.montreal.ca/IC3/#/U6510/view/${reservation.facility.id}/${reservation.startDateTime}/${reservation.endDateTime}/${reservation.facilityScheduleId}`;
                  window.open(finalUrl, '_blank');
                }
              }}
            >
              {reservation.canReserve.value ? (
                <CirclePlusIcon size={20} />
              ) : (
                <LockIcon size={20} />
              )}
            </Button>
          );
        },
      },
    ],
    [t, locale]
  );

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  // Initialize pagination from filters
  const [pagination, setPagination] = React.useState({
    pageIndex: Math.floor(filters.offset / filters.limit),
    pageSize: filters.limit,
  });

  // Set client flag after mount to avoid hydration issues
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Update pagination when filters change
  React.useEffect(() => {
    const newPageIndex = Math.floor(filters.offset / filters.limit);
    const newPageSize = filters.limit;

    setPagination((prev) => {
      if (prev.pageIndex !== newPageIndex || prev.pageSize !== newPageSize) {
        return {
          pageIndex: newPageIndex,
          pageSize: newPageSize,
        };
      }
      return prev;
    });
  }, [filters.limit, filters.offset]);

  // Update filters when pagination changes locally
  const handlePaginationChange = React.useCallback(
    (
      updatedPagination:
        | ((old: { pageIndex: number; pageSize: number }) => {
            pageIndex: number;
            pageSize: number;
          })
        | { pageIndex: number; pageSize: number }
    ) => {
      if (typeof updatedPagination === 'function') {
        setPagination((prev) => {
          const newPagination = updatedPagination(prev);
          const newOffset = newPagination.pageIndex * newPagination.pageSize;

          // Only update filters if values actually changed
          if (
            filters.limit !== newPagination.pageSize ||
            filters.offset !== newOffset
          ) {
            updateFilters({
              limit: newPagination.pageSize,
              offset: newOffset,
            });
          }

          return newPagination;
        });
      } else {
        const newOffset =
          updatedPagination.pageIndex * updatedPagination.pageSize;

        // Only update filters if values actually changed
        if (
          filters.limit !== updatedPagination.pageSize ||
          filters.offset !== newOffset
        ) {
          updateFilters({
            limit: updatedPagination.pageSize,
            offset: newOffset,
          });
        }

        setPagination(updatedPagination);
      }
    },
    [updateFilters, filters.limit, filters.offset]
  );

  // Calculate total count and page count for display
  const totalResults = timeSlots?.recordCount || 0;
  const currentPageResults = timeSlots?.results?.length || 0;
  const estimatedTotal =
    totalResults ||
    (currentPageResults === pagination.pageSize
      ? (pagination.pageIndex + 1) * pagination.pageSize + 1 // At least one more page
      : pagination.pageIndex * pagination.pageSize + currentPageResults); // This is the last page

  const pageCount = React.useMemo(() => {
    if (!timeSlots) return 0;

    if (totalResults > 0) {
      return Math.ceil(totalResults / pagination.pageSize);
    }

    // If no total, estimate based on whether we got a full page
    if (currentPageResults === pagination.pageSize) {
      return pagination.pageIndex + 2; // At least one more page
    }

    return Math.max(1, pagination.pageIndex + 1); // This is the last page
  }, [
    timeSlots,
    totalResults,
    pagination.pageSize,
    pagination.pageIndex,
    currentPageResults,
  ]);

  const table = useReactTable({
    data: timeSlots?.results || [],
    columns: translatedColumns,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: handlePaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    // Enable manual pagination for server-side pagination
    manualPagination: true,
    pageCount,
    state: {
      columnFilters,
      columnVisibility,
      pagination,
    },
  });

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {t('noResults')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col space-y-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-2 gap-2">
        <div className="text-muted-foreground text-sm order-2 sm:order-1 text-center sm:text-left">
          {isClient && totalResults > 0 && (
            <span>
              {t('resultsCount', {
                from: filters.offset + 1,
                to: Math.min(
                  filters.offset + currentPageResults,
                  estimatedTotal
                ),
                total: estimatedTotal,
              })}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2 sm:space-x-6 lg:space-x-8 order-1 sm:order-2 justify-center sm:justify-end">
          {/* Page size selector */}
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium hidden sm:block">
              {t('rowsPerPage')}
            </p>
            <p className="text-sm font-medium sm:hidden">{t('rows')}</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                const newPageSize = Number(value);
                // Reset to first page when changing page size to avoid empty pages
                table.setPageSize(newPageSize);
                table.setPageIndex(0);
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 30, 50, 100].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Page navigation info */}
          <div className="flex min-w-0 items-center justify-center text-sm font-medium">
            {isClient ? (
              <span className="whitespace-nowrap">
                {t('pageOf', {
                  current: pagination.pageIndex + 1,
                  total: Math.max(1, table.getPageCount()),
                })}
              </span>
            ) : (
              t('loading')
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">{t('goToFirstPage')}</span>⇤
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">{t('goToPreviousPage')}</span>←
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">{t('goToNextPage')}</span>→
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">{t('goToLastPage')}</span>⇥
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
