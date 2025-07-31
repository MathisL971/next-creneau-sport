import { ModeToggle } from './mode-toggle';
import { CalendarDays, MapPin } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <CalendarDays className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  Loisirs Montréal
                </h1>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>Activités sportives à Montréal</span>
                </div>
              </div>
            </div>
          </div>
          <nav className="flex items-center space-x-4">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
