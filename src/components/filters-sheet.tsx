'use client';

import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  AlertCircleIcon,
  CalendarIcon,
  Check,
  ChevronsUpDown,
  XIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';
import { atom, useAtom } from 'jotai';
import { useFilters } from '@/hooks/useFilters';
import { Calendar } from '@/components/ui/calendar';
import { Input } from './ui/input';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { sports, boroughs, sites } from '@/data/facilities';

export const filtersSheetOpenAtom = atom(false);

// Custom SheetContent that conditionally shows the close button
function SheetContent({
  className,
  children,
  side = 'right',
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left';
  showCloseButton?: boolean;
}) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay
        className={cn(
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50'
        )}
      />
      <SheetPrimitive.Content
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
          side === 'right' &&
            'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-full border-l sm:max-w-sm',
          side === 'left' &&
            'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
          side === 'top' &&
            'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
          side === 'bottom' &&
            'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

// Helper function to compare current filters with last saved filters
const filtersEqual = (
  current: {
    searchString?: string;
    boroughIds?: string;
    siteId?: number;
    dates: string[];
    startTime?: string;
    endTime?: string;
  },
  saved: {
    searchString?: string;
    boroughIds?: string;
    siteId?: number;
    dates: string[];
    startTime?: string;
    endTime?: string;
  }
): boolean => {
  // Compare primitive values
  if (
    current.searchString !== saved.searchString ||
    current.boroughIds !== saved.boroughIds ||
    current.siteId !== saved.siteId ||
    current.startTime !== saved.startTime ||
    current.endTime !== saved.endTime
  ) {
    return false;
  }

  // Compare dates arrays
  if (current.dates.length !== saved.dates.length) {
    return false;
  }

  // Sort both arrays to compare them properly
  const currentDatesSorted = [...current.dates].sort();
  const savedDatesSorted = [...saved.dates].sort();

  return currentDatesSorted.every(
    (date, index) => date === savedDatesSorted[index]
  );
};

export default function FiltersSheet() {
  const { filters, updateFilters, hasRequiredFilters } = useFilters();
  const breakpoint = useBreakpoint();
  const [searchString, setSearchString] = useState(
    filters.searchString ?? undefined
  );
  const [boroughIds, setBoroughIds] = useState(filters.boroughIds ?? undefined);
  const [siteId, setSiteId] = useState(filters.siteId ?? undefined);
  const [dates, setDates] = useState(filters.dates ?? []);
  const [startTime, setStartTime] = useState(filters.startTime ?? undefined);
  const [endTime, setEndTime] = useState(filters.endTime ?? undefined);

  // Track last saved filters to disable save button when no changes
  const [lastSavedFilters, setLastSavedFilters] = useState({
    searchString: filters.searchString ?? undefined,
    boroughIds: filters.boroughIds ?? undefined,
    siteId: filters.siteId ?? undefined,
    dates: filters.dates ?? [],
    startTime: filters.startTime ?? undefined,
    endTime: filters.endTime ?? undefined,
  });

  const [open, setOpen] = useAtom(filtersSheetOpenAtom);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync local state with filters when they change (e.g., from query params)
  useEffect(() => {
    const newFilterState = {
      searchString: filters.searchString ?? undefined,
      boroughIds: filters.boroughIds ?? undefined,
      siteId: filters.siteId ?? undefined,
      dates: filters.dates ?? [],
      startTime: filters.startTime ?? undefined,
      endTime: filters.endTime ?? undefined,
    };

    setSearchString(newFilterState.searchString);
    setBoroughIds(newFilterState.boroughIds);
    setSiteId(newFilterState.siteId);
    setDates(newFilterState.dates);
    setStartTime(newFilterState.startTime);
    setEndTime(newFilterState.endTime);

    // Update last saved filters to match current filters
    setLastSavedFilters(newFilterState);

    // Removed automatic opening of filters sheet
    // if (!hasRequiredFilters) {
    //   setOpen(true);
    // }
  }, [filters, hasRequiredFilters, setOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [dropdownOpen]);

  // Clear site selection when it's no longer in the filtered list
  useEffect(() => {
    if (siteId && boroughIds) {
      const selectedBoroughIds = boroughIds.split(',').map((id) => Number(id));
      const selectedSite = sites.find((site) => site.id === siteId);

      if (
        selectedSite &&
        !selectedBoroughIds.includes(selectedSite.boroughId)
      ) {
        setSiteId(undefined);
      }
    }
  }, [boroughIds, siteId]);

  return (
    <Sheet
      open={open}
      onOpenChange={(newOpen) => {
        // Only allow closing if required filters are set or if forcing to open
        if (!newOpen && !hasRequiredFilters) {
          return; // Prevent closing
        }
        setOpen(newOpen);
      }}
    >
      <SheetContent
        showCloseButton={hasRequiredFilters}
        className="gap-1 flex flex-col"
      >
        <SheetHeader>
          <SheetTitle>Modifier les filtres</SheetTitle>
          <SheetDescription>
            Apportez des modifications à vos filtres ici. Cliquez sur
            sauvegarder quand vous avez terminé.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {(!searchString || !boroughIds || !dates || dates.length === 0) && (
            <div className="flex flex-col gap-4 px-4">
              <Alert variant="destructive" className="m-auto w-fit">
                <AlertCircleIcon />
                <AlertTitle>Filtres obligatoires manquants</AlertTitle>
                <AlertDescription>
                  <p>
                    Veuillez sélectionner au moins un sport, une date et un
                    arrondissement afin d&apos;optimiser les temps de recherche.
                  </p>
                </AlertDescription>
              </Alert>
            </div>
          )}

          <div className="flex flex-col gap-4 p-4">
            {/* Field 1: Sport (tennis, tennis de table, badminton, pickleball, volleyball) */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="sport">Sport *</Label>
              <Select
                value={searchString || ''}
                onValueChange={(value) => setSearchString(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez un sport..." />
                </SelectTrigger>
                <SelectContent>
                  {sports.map((s) => (
                    <SelectItem key={s.id} value={s.name}>
                      {s.name.slice(0, 1).toUpperCase() + s.name.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Field 2: Dates */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="date" className="px-1">
                Dates *
              </Label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-full justify-between font-normal"
                  >
                    {dates && dates.length > 0
                      ? `${dates.length} date${dates.length !== 1 ? 's' : ''} sélectionnée${dates.length !== 1 ? 's' : ''}`
                      : 'Sélectionnez des dates...'}
                    <CalendarIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="multiple"
                    selected={dates?.map((d) => new Date(d))}
                    captionLayout="dropdown"
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                    onSelect={(d) => {
                      setDates(d?.map((d) => d.toISOString()) ?? []);
                    }}
                  />
                </PopoverContent>
              </Popover>

              {/* Selected Dates Display */}
              {dates && dates.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-foreground mb-2">
                    Dates sélectionnées:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dates
                      .sort(
                        (a, b) => new Date(a).getTime() - new Date(b).getTime()
                      )
                      .map((dateStr, index) => {
                        const date = new Date(dateStr);
                        return (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                          >
                            {date.toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                            })}
                            <button
                              onClick={() => {
                                const newDates = dates.filter(
                                  (d) => d !== dateStr
                                );
                                setDates(newDates);
                              }}
                              className="ml-2 hover:text-primary/70"
                            >
                              <XIcon className="size-3 cursor-pointer" />
                            </button>
                          </span>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>

            {/* Field 3: Arrondissement (...) - Multiple select */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="boroughs">Arrondissements *</Label>
              <div className="relative" ref={dropdownRef}>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between text-left font-normal"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {boroughIds && boroughIds.length > 0 ? (
                    <span>
                      {`${boroughIds.split(',').length} arrondissement${boroughIds.split(',').length !== 1 ? 's' : ''} sélectionné${boroughIds.split(',').length !== 1 ? 's' : ''}`}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">
                      {breakpoint === 'xs'
                        ? `Sélectionnez des arrondissements`.slice(0, 25) +
                          '...'
                        : `Sélectionnez des arrondissements...`}
                    </span>
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-[300px] overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
                    {boroughs.map((borough) => {
                      const isSelected = boroughIds
                        ?.split(',')
                        .includes(borough.id.toString());

                      return (
                        <div
                          key={borough.id}
                          className="flex items-center space-x-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                          onClick={() => {
                            const currentIds = boroughIds
                              ? boroughIds.split(',')
                              : [];
                            const boroughIdStr = borough.id.toString();

                            if (isSelected) {
                              // Remove borough
                              const newIds = currentIds.filter(
                                (id) => id !== boroughIdStr
                              );
                              setBoroughIds(
                                newIds.length > 0 ? newIds.join(',') : undefined
                              );
                            } else {
                              // Add borough
                              const newIds = [...currentIds, boroughIdStr];
                              setBoroughIds(newIds.join(','));
                            }
                          }}
                        >
                          <div className="flex h-4 w-4 items-center justify-center rounded-sm border border-primary">
                            {isSelected && <Check className="h-3 w-3" />}
                          </div>
                          <span className="flex-1">{borough.name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Selected Boroughs Display */}
              {boroughIds && boroughIds.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-foreground mb-2">
                    Arrondissements sélectionnés:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {boroughIds
                      .split(',')
                      .sort((a, b) => {
                        const nameA =
                          boroughs.find((borough) => borough.id === Number(a))
                            ?.name || '';
                        const nameB =
                          boroughs.find((borough) => borough.id === Number(b))
                            ?.name || '';
                        return nameA.localeCompare(nameB);
                      })
                      .map((boroughIdStr) => {
                        const boroughId = Number(boroughIdStr);
                        const borough = boroughs.find(
                          (b) => b.id === boroughId
                        );
                        return (
                          <span
                            key={boroughId}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                          >
                            {borough?.name}
                            <button
                              onClick={() => {
                                const currentIds = boroughIds
                                  ? boroughIds.split(',')
                                  : [];
                                const newIds = currentIds.filter(
                                  (id) => id !== boroughIdStr
                                );
                                setBoroughIds(
                                  newIds.length > 0
                                    ? newIds.join(',')
                                    : undefined
                                );
                              }}
                              className="ml-2 hover:text-primary/70"
                            >
                              <XIcon className="size-3 cursor-pointer" />
                            </button>
                          </span>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>

            {/* Field 4: Site (...) - Single select */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="sites">Sites</Label>
              <Select
                value={sites.find((s) => s.id === siteId)?.name || ''}
                onValueChange={(value) => {
                  if (value === '__clear__') {
                    setSiteId(undefined);
                  } else {
                    setSiteId(sites.find((s) => s.name === value)?.id);
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez un site..." />
                </SelectTrigger>
                <SelectContent>
                  {siteId && (
                    <SelectItem
                      value="__clear__"
                      className="text-muted-foreground italic"
                    >
                      Tous les sites
                    </SelectItem>
                  )}
                  {(() => {
                    // Filter sites based on selected neighborhoods
                    const selectedBoroughIds = boroughIds
                      ? boroughIds.split(',').map((id) => Number(id))
                      : [];

                    const filteredSites =
                      selectedBoroughIds.length > 0
                        ? sites.filter((site) =>
                            selectedBoroughIds.includes(site.boroughId)
                          )
                        : sites;

                    return filteredSites.map((s) => (
                      <SelectItem key={s.id} value={s.name}>
                        {s.name}
                      </SelectItem>
                    ));
                  })()}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 w-full">
              {/* Field 5: Start Time */}
              <div className="flex flex-col gap-2 grow">
                <Label htmlFor="start-time-picker" className="px-1">
                  Heure de début
                </Label>
                <Input
                  type="time"
                  id="start-time-picker"
                  step="1"
                  value={startTime ?? ''}
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>

              {/* Field 6: End Time */}
              <div className="flex flex-col gap-2 grow">
                <Label htmlFor="end-time-picker" className="px-1">
                  Heure de fin
                </Label>
                <Input
                  type="time"
                  id="end-time-picker"
                  step="1"
                  value={endTime ?? ''}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
            </div>

            {/* Field 7: Type de plateau */}
            {/* TODO IF NEEDED */}
          </div>
        </div>

        <SheetFooter>
          <Button
            disabled={
              !searchString ||
              !boroughIds ||
              !dates ||
              dates.length === 0 ||
              filtersEqual(
                {
                  searchString,
                  boroughIds,
                  siteId,
                  dates,
                  startTime,
                  endTime,
                },
                lastSavedFilters
              )
            }
            onClick={() => {
              const newFilters = {
                searchString,
                boroughIds,
                siteId,
                dates,
                startTime,
                endTime,
              };

              updateFilters(newFilters);

              // Update last saved filters to current state
              setLastSavedFilters(newFilters);

              if (calendarOpen) {
                setCalendarOpen(false);
              }
              if (open) {
                setOpen(false);
              }
            }}
          >
            Sauvegarder
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const resetState = {
                searchString: undefined,
                boroughIds: undefined,
                siteId: undefined,
                dates: [],
                startTime: undefined,
                endTime: undefined,
              };

              setSearchString(resetState.searchString);
              setBoroughIds(resetState.boroughIds);
              setSiteId(resetState.siteId);
              setDates(resetState.dates);
              setStartTime(resetState.startTime);
              setEndTime(resetState.endTime);

              // Reset last saved filters to enable save button
              setLastSavedFilters(resetState);
            }}
            disabled={
              !searchString &&
              !boroughIds &&
              (!dates || dates.length === 0) &&
              !siteId &&
              !startTime &&
              !endTime
            }
          >
            Réinitialiser les filtres
          </Button>
          <SheetClose asChild>
            <Button variant="outline" disabled={!hasRequiredFilters}>
              Fermer
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
