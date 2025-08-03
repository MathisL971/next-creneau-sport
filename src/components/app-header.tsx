import { ModeToggle } from './mode-toggle';
import { CalendarDays, MapPin } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex-shrink-0">
                <CalendarDays className="h-4 w-4 sm:h-6 sm:w-6 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight truncate">
                  CréneauSport
                </h1>
                <div className="hidden sm:flex items-center space-x-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">
                    Activités sportives à Montréal
                  </span>
                </div>
              </div>
            </div>
          </div>
          <nav className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
