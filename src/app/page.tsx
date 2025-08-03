'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarIcon, MapPinIcon, TagIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { sports, boroughs } from '@/data/facilities';

export default function Home() {
  const router = useRouter();
  const [selectedSport, setSelectedSport] = useState<number | null>(null);
  const [selectedBorough, setSelectedBorough] = useState<number | null>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    setSelectedDates((prev) => {
      const isAlreadySelected = prev.some(
        (d) => d.toDateString() === date.toDateString()
      );

      if (isAlreadySelected) {
        return prev.filter((d) => d.toDateString() !== date.toDateString());
      } else {
        return [...prev, date];
      }
    });
  };

  const handleSearch = () => {
    if (!selectedSport || !selectedBorough || selectedDates.length === 0) {
      return;
    }

    // Find the sport name from the selected sport ID
    const selectedSportName =
      sports.find((sport) => sport.id === selectedSport)?.name || '';

    const params = new URLSearchParams();
    // Don't set facilityTypeIds from home page as requested
    params.set('boroughIds', selectedBorough.toString());
    params.set(
      'dates',
      JSON.stringify(selectedDates.map((date) => date.toISOString()))
    );
    params.set('searchString', selectedSportName);

    router.push(`/slots?${params.toString()}`);
  };

  const isFormValid =
    selectedSport && selectedBorough && selectedDates.length > 0;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col grow">
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="max-w-4xl w-full">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
              Trouvez vos créneaux de
              <span className="text-primary block">loisirs à Montréal</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Découvrez et réservez facilement des créneaux pour vos activités
              sportives préférées dans les installations municipales de
              Montréal.
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white dark:bg-card rounded-2xl shadow-lg border border-gray-200 dark:border-border p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
              {/* Sport Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <TagIcon className="size-4" />
                  Sport
                </label>
                <Select
                  value={selectedSport?.toString() || ''}
                  onValueChange={(value) => setSelectedSport(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choisissez votre sport" />
                  </SelectTrigger>
                  <SelectContent>
                    {sports.map((sport) => (
                      <SelectItem key={sport.id} value={sport.id.toString()}>
                        {sport.name.charAt(0).toUpperCase() +
                          sport.name.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Borough Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPinIcon className="size-4" />
                  Arrondissement
                </label>
                <Select
                  value={selectedBorough?.toString() || ''}
                  onValueChange={(value) => setSelectedBorough(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choisissez un arrondissement" />
                  </SelectTrigger>
                  <SelectContent>
                    {boroughs.map((borough) => (
                      <SelectItem
                        key={borough.id}
                        value={borough.id.toString()}
                      >
                        {borough.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <CalendarIcon className="size-4" />
                  Dates ({selectedDates.length} sélectionnée
                  {selectedDates.length !== 1 ? 's' : ''})
                </label>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !selectedDates.length && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDates.length > 0
                        ? `${selectedDates.length} date${selectedDates.length !== 1 ? 's' : ''} sélectionnée${selectedDates.length !== 1 ? 's' : ''}`
                        : 'Sélectionnez vos dates'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="multiple"
                      selected={selectedDates}
                      onSelect={(dates) => setSelectedDates(dates || [])}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                    <div className="p-3 border-t">
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => setIsCalendarOpen(false)}
                      >
                        Confirmer ({selectedDates.length} date
                        {selectedDates.length !== 1 ? 's' : ''})
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Selected Dates Display */}
            {selectedDates.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-foreground mb-2">
                  Dates sélectionnées:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedDates
                    .sort((a, b) => a.getTime() - b.getTime())
                    .map((date, index) => (
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
                          onClick={() => handleDateSelect(date)}
                          className="ml-2 hover:text-primary/70"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                </div>
              </div>
            )}

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              disabled={!isFormValid}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Rechercher les créneaux disponibles
            </Button>

            {!isFormValid && (
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Veuillez sélectionner un sport, un arrondissement et des dates
                pour effectuer une recherche
              </p>
            )}
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <TagIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Sélection simplifiée
              </h3>
              <p className="text-muted-foreground">
                Choisissez facilement votre sport et votre secteur préféré
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <CalendarIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Planification flexible
              </h3>
              <p className="text-muted-foreground">
                Sélectionnez plusieurs dates pour maximiser vos options
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <MapPinIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Proximité
              </h3>
              <p className="text-muted-foreground">
                Découvrez les installations près de chez vous
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
