'use client';

import {
  Sheet,
  SheetContent as OriginalSheetContent,
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

const sports = [
  { id: 1, name: 'tennis' },
  { id: 2, name: 'pickleball' },
  { id: 3, name: 'tennis de table' },
  { id: 4, name: 'volleyball' },
];

const boroughs = [
  { id: 3, name: 'Ahuntsic - Cartierville' },
  { id: 9, name: 'Côte-des-Neiges - Notre-Dame-de-Grâce' },
  { id: 2, name: 'Lachine' },
  { id: 19, name: 'LaSalle' },
  { id: 7, name: 'Le Plateau-Mont-Royal' },
  { id: 16, name: "L'Île-Bizard - Sainte-Geneviève" },
  { id: 6, name: 'Mercier - Hochelaga-Maisonneuve' },
  { id: 15, name: 'Outremont' },
  { id: 11, name: 'Rivière-des-Prairies - Pointe-aux-Trembles' },
  { id: 5, name: 'Rosemont - La Petite-Patrie' },
  { id: 17, name: 'Saint-Laurent' },
  { id: 14, name: 'Saint-Léonard' },
  { id: 1, name: 'Verdun' },
  { id: 8, name: 'Ville-Marie' },
  { id: 4, name: 'Villeray-Saint-Michel - Parc-Extension' },
];

const sites = [
  { id: -1, name: 'Tous' },
  { id: 694, name: 'Académie LaurenHill Junior campus' },
  { id: 669, name: 'Aréna Jacques-Lemaire' },
  { id: 1707, name: 'Aréna Saint-Louis' },
  { id: 882, name: 'Centre de Tennis Cavelier' },
  { id: 13, name: 'Centre Léonardo-da-Vinci' },
  { id: 1628, name: 'Centre Pierre-Charbonneau' },
  { id: 2120, name: 'Centre Sanaaq' },
  { id: 1265, name: 'Centre sportif Jean-Rougeau' },
  { id: 85, name: 'Complexe communautaire Saint-Léonard, t sport' },
  { id: 813, name: 'Complexe sportif Claude-Robillard' },
  { id: 848, name: 'Complexe sportif Marie-Victorin' },
  { id: 593, name: 'Complexe sportif Saint-Laurent' },
  { id: 674, name: 'École Île-des-Soeurs' },
  { id: 678, name: 'École Notre-Dame-de-Lourdes' },
  { id: 679, name: 'École Notre-Dame-des-Sept-Douleurs' },
  { id: 676, name: 'École secondaire Monseigneur-Richard' },
  { id: 956, name: 'Le TAZ' },
  { id: 1070, name: 'Parc Arthur-Therrien, terrain de sport' },
  { id: 1520, name: 'Parc Beaubien, terrain de sport' },
  { id: 67, name: 'Parc Coubertin, terrain de sport' },
  { id: 1061, name: 'Parc de la Fontaine, Île-des-Soeurs, Terrain sport' },
  { id: 740, name: 'Parc de la Reine-Élisabeth, terrain de sport' },
  { id: 1086, name: "Parc de L'Honorable-George-O'Reilly" },
  { id: 2073, name: 'Parc de Mésy' },
  { id: 2144, name: 'Parc des Érables, terrain de sport' },
  { id: 781, name: 'Parc des Hirondelles, terrain de sport' },
  { id: 1068, name: 'Parc Elgar, terrain de sport' },
  { id: 69, name: 'Parc Ferland, terrain de sport' },
  { id: 70, name: 'Parc Giuseppe-Garibaldi, terrain de sport' },
  { id: 71, name: 'Parc Hébert, terrain de sport' },
  { id: 455, name: 'Parc Jean-Duceppe, terrain de sport' },
  { id: 1726, name: 'Parc Jeanne-Mance, terrains sportifs' },
  { id: 1533, name: 'Parc Joseph-Paré, terrain de sport' },
  { id: 1734, name: 'Parc La Fontaine, terrains sportifs' },
  { id: 73, name: 'Parc Ladauversière, terrain de sport' },
  { id: 75, name: 'Parc Luigi-Pirandello, terrain de sport' },
  { id: 804, name: 'Parc Marcelin-Wilson, terrain de sport' },
  { id: 1755, name: 'Parc Martin-Luther-King, terrain de sport' },
  { id: 792, name: 'Parc Nicolas-Viel, terrain de sport' },
  { id: 1472, name: 'Parc Père-Marquette, terrain de sport' },
  { id: 74, name: 'Parc Pie-XII, terrain de sport' },
  { id: 1884, name: 'Parc Warren-Allmand, terrain de sport' },
  { id: 86, name: 'Parc Wilfrid-Bastien, terrain de sport' },
  { id: 1081, name: 'Parc Wilson, terrain de sport' },
  { id: 655, name: 'Patinoire du Centre sportif Dollard-Saint-Laurent' },
  { id: 911, name: 'Stade de soccer de Montréal' },
  { id: 87, name: 'Stade Hébert' },
  { id: 1033, name: 'Terrain de sport - Parc Gohier' },
  { id: 810, name: 'Terrains de sport - Marcel-Laurin' },
  { id: 1002, name: 'Terrains de sport - Marlborough' },
  { id: 1014, name: 'Terrains de sport - Parc Alexis-Nihon' },
  { id: 1029, name: 'Terrains de sport - Parc Cousineau' },
  { id: 1035, name: 'Terrains de sport - Parc Hartenstein' },
  { id: 1048, name: 'Terrains de sport - Parc Noël-Sud' },
  { id: 1004, name: 'Terrains de sport - Parc Painter' },
  { id: 1084, name: 'Terrains de sport - Parc Philippe-Laheurte' },
  { id: 1069, name: 'Terrains de sport - Parc Saint-Laurent' },
  { id: 919, name: 'Terrains de sport du parc Jonathan-Wilson' },
  { id: 653, name: 'Terrains de tennis Garneau (4)' },
  { id: 682, name: 'Terrains de tennis Joyce (3)' },
  { id: 654, name: 'Terrains de tennis Saint-Viateur (6)' },
  { id: 866, name: 'Terrains extérieurs Claude-Robillard' },
  { id: 2060, name: 'Terrains sportifs du parc LaSalle' },
];

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
            'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
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

    if (!hasRequiredFilters) {
      setOpen(true);
    }
  }, [filters, hasRequiredFilters]);

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
      <SheetContent showCloseButton={hasRequiredFilters} className="gap-1">
        <SheetHeader>
          <SheetTitle>Modifier les filtres</SheetTitle>
          <SheetDescription>
            Apportez des modifications à vos filtres ici. Cliquez sur
            sauvegarder quand vous avez terminé.
          </SheetDescription>
        </SheetHeader>

        {(!searchString || !boroughIds || !dates || dates.length === 0) && (
          <div className="flex flex-col gap-4 px-4">
            <Alert variant="destructive" className="m-auto w-fit">
              <AlertCircleIcon />
              <AlertTitle>Filtres obligatoires manquants</AlertTitle>
              <AlertDescription>
                <p>
                  Veuillez sélectionner au moins un sport, une date et un
                  arrondissement afin d'optimiser les temps de recherche.
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
                    ? dates
                        .map((d) => new Date(d).toLocaleDateString('fr-FR'))
                        .join(', ')
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
                  disabled={(date) => date < new Date()}
                  onSelect={(d) => {
                    setDates(d?.map((d) => d.toISOString()) ?? []);
                  }}
                />
              </PopoverContent>
            </Popover>
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
                    {boroughIds.split(',').length === 1
                      ? boroughs.find((b) => b.id === Number(boroughIds))?.name
                      : `${boroughIds.split(',').length} arrondissements sélectionnés`}
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    {breakpoint === 'xs'
                      ? `Sélectionnez des arrondissements`.slice(0, 25) + '...'
                      : `Sélectionnez des arrondissements...`}
                  </span>
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-[300px] overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
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
          </div>

          {/* Field 4: Site (...) - Single select */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="sites">Sites</Label>
            <Select
              value={sites.find((s) => s.id === siteId)?.name || ''}
              onValueChange={(value) =>
                setSiteId(sites.find((s) => s.name === value)?.id)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionnez un site..." />
              </SelectTrigger>
              <SelectContent>
                {sites.map((s) => (
                  <SelectItem key={s.id} value={s.name}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-row gap-2 w-full">
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
