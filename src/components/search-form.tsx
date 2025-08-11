'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
  CalendarIcon,
  MapPinIcon,
  XIcon,
  Check,
  ChevronsUpDown,
  Clock,
  AlarmClock,
  Dumbbell,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { sports, boroughs, sites } from '@/data/facilities';
import { Input } from '@/components/ui/input';

export default function SearchForm() {
  const router = useRouter();
  const t = useTranslations('HomePage');
  const locale = useLocale();

  const [selectedSport, setSelectedSport] = useState<number | null>(null);
  const [selectedBoroughs, setSelectedBoroughs] = useState<number[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return [today];
  });
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isBoroughDropdownOpen, setIsBoroughDropdownOpen] = useState(false);
  const boroughDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedSiteId, setSelectedSiteId] = useState<number | null>(null);
  const [isSiteOpen, setIsSiteOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        boroughDropdownRef.current &&
        !boroughDropdownRef.current.contains(event.target as Node)
      ) {
        setIsBoroughDropdownOpen(false);
      }
    }

    if (isBoroughDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isBoroughDropdownOpen]);

  // Clear selected site if it does not belong to selected boroughs
  useEffect(() => {
    if (selectedSiteId && selectedBoroughs.length > 0) {
      const site = sites.find((s) => s.id === selectedSiteId);
      if (site && !selectedBoroughs.includes(site.boroughId)) {
        setSelectedSiteId(null);
      }
    }
  }, [selectedBoroughs, selectedSiteId]);

  const areSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const handleRemoveDate = (date: Date) => {
    setSelectedDates((prev) => prev.filter((d) => !areSameDay(d, date)));
  };

  const handleBoroughSelect = (boroughId: number) => {
    setSelectedBoroughs((prev) => {
      const isAlreadySelected = prev.includes(boroughId);

      if (isAlreadySelected) {
        return prev.filter((id) => id !== boroughId);
      } else {
        return [...prev, boroughId];
      }
    });
  };

  const handleSearch = () => {
    if (
      !selectedSport ||
      selectedDates.length === 0 ||
      (selectedBoroughs.length === 0 && selectedSiteId === null)
    ) {
      return;
    }

    const selectedSportName =
      sports.find((sport) => sport.id === selectedSport)?.name || '';

    const params = new URLSearchParams();
    params.set('boroughIds', selectedBoroughs.join(','));
    params.set(
      'dates',
      JSON.stringify(selectedDates.map((date) => date.toISOString()))
    );
    params.set('searchString', selectedSportName);

    if (startTime) {
      params.set('startTime', startTime);
    }
    if (endTime) {
      params.set('endTime', endTime);
    }
    if (selectedSiteId) {
      params.set('siteId', String(selectedSiteId));
    }

    router.push(`/slots?${params.toString()}`);
  };

  const isFormValid = Boolean(
    selectedSport &&
      selectedDates.length > 0 &&
      (selectedBoroughs.length > 0 || selectedSiteId !== null)
  );

  return (
    <div className="bg-card rounded-2xl shadow-lg border border-border p-8 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Dumbbell className="size-4" />
            {t('sport')}
          </label>
          <Select
            value={selectedSport?.toString() || ''}
            onValueChange={(value) => setSelectedSport(Number(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('sportPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              {sports.map((sport) => (
                <SelectItem key={sport.id} value={sport.id.toString()}>
                  {sport.name.charAt(0).toUpperCase() + sport.name.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <MapPinIcon className="size-4" />
            {t('boroughs')}
          </label>
          <div className="relative" ref={boroughDropdownRef}>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between text-left font-normal bg-transparent border-input"
              onClick={() => setIsBoroughDropdownOpen(!isBoroughDropdownOpen)}
            >
              {selectedBoroughs.length > 0 ? (
                <span>
                  {t('boroughsSelected', {
                    count: selectedBoroughs.length,
                  })}
                </span>
              ) : (
                <span className="text-muted-foreground">
                  {t('boroughsPlaceholder')}
                </span>
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>

            {isBoroughDropdownOpen && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-[300px] overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
                {boroughs.map((borough) => {
                  const isSelected = selectedBoroughs.includes(borough.id);

                  return (
                    <div
                      key={borough.id}
                      className="flex items-center space-x-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                      onClick={() => handleBoroughSelect(borough.id)}
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

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2 px-1">
            <Building2 className="size-4" />
            {t('site')}
          </label>
          <Popover open={isSiteOpen} onOpenChange={setIsSiteOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={isSiteOpen}
                className="w-full justify-between text-left font-normal bg-transparent border-input overflow-hidden min-w-0"
              >
                <span
                  className={cn(
                    'truncate flex-1',
                    !selectedSiteId && 'text-muted-foreground'
                  )}
                >
                  {selectedSiteId
                    ? sites.find((s) => s.id === selectedSiteId)?.name
                    : t('sitePlaceholder')}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
              <Command>
                <CommandInput
                  placeholder={t('sitePlaceholder')}
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No results.</CommandEmpty>
                  <CommandGroup>
                    {selectedSiteId && (
                      <CommandItem
                        value="__clear__"
                        onSelect={() => {
                          setSelectedSiteId(null);
                          setIsSiteOpen(false);
                        }}
                        className="text-muted-foreground italic"
                      >
                        {t('allSites')}
                      </CommandItem>
                    )}
                    {(() => {
                      const filteredSites =
                        selectedBoroughs.length > 0
                          ? sites.filter((site) =>
                              selectedBoroughs.includes(site.boroughId)
                            )
                          : sites;
                      return filteredSites.map((s) => (
                        <CommandItem
                          key={s.id}
                          value={s.name}
                          onSelect={(currentValue) => {
                            const matched = filteredSites.find(
                              (site) =>
                                site.name.toLowerCase() ===
                                currentValue.toLowerCase()
                            );
                            if (!matched) {
                              setSelectedSiteId(null);
                              setIsSiteOpen(false);
                              return;
                            }
                            setSelectedSiteId(
                              selectedSiteId === matched.id ? null : matched.id
                            );
                            setIsSiteOpen(false);
                          }}
                        >
                          {s.name}
                          <Check
                            className={cn(
                              'ml-auto',
                              selectedSiteId === s.id
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ));
                    })()}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <CalendarIcon className="size-4" />
            {t('dates')}
          </label>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal bg-transparent border-input',
                  !selectedDates.length && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDates.length > 0
                  ? t('datesSelected', { count: selectedDates.length })
                  : t('datesPlaceholder')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="multiple"
                selected={selectedDates}
                onSelect={(dates) => setSelectedDates(dates || [])}
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today;
                }}
                initialFocus
              />
              <div className="p-3 border-t">
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => setIsCalendarOpen(false)}
                >
                  {t('confirmDates', { count: selectedDates.length })}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2 px-1">
            <Clock className="size-4" />
            {t('startTime')}
          </label>
          <Input
            type="time"
            step="1"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2 px-1">
            <AlarmClock className="size-4" />
            {t('endTime')}
          </label>
          <Input
            type="time"
            step="1"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>

      {selectedBoroughs.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-foreground mb-2">
            {t('selectedBoroughs')}
          </p>
          <div className="flex flex-wrap gap-2">
            {[...selectedBoroughs]
              .sort((a, b) => {
                const nameA =
                  boroughs.find((borough) => borough.id === a)?.name || '';
                const nameB =
                  boroughs.find((borough) => borough.id === b)?.name || '';
                return nameA.localeCompare(nameB);
              })
              .map((boroughId) => {
                const borough = boroughs.find((b) => b.id === boroughId);
                return (
                  <span
                    key={boroughId}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                  >
                    {borough?.name}
                    <button
                      onClick={() => handleBoroughSelect(boroughId)}
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

      {selectedDates.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-foreground mb-2">
            {t('selectedDates')}
          </p>
          <div className="flex flex-wrap gap-2">
            {[...selectedDates]
              .sort((a, b) => a.getTime() - b.getTime())
              .map((date, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  {date.toLocaleDateString(locale, {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                  <button
                    onClick={() => handleRemoveDate(date)}
                    className="ml-2 hover:text-primary/70"
                  >
                    <XIcon className="size-3 cursor-pointer" />
                  </button>
                </span>
              ))}
          </div>
        </div>
      )}

      <Button
        onClick={handleSearch}
        disabled={!isFormValid}
        size="lg"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t('searchButton')}
      </Button>

      {!isFormValid && (
        <p className="text-sm text-muted-foreground mt-2 text-center">
          {t('validationMessage')}
        </p>
      )}
    </div>
  );
}
