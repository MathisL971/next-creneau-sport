'use client';

import { ModeToggle } from './mode-toggle';
import LanguageSwitcher from './language-switcher';
import { MapPin, MessageSquare } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';

export default function AppHeader() {
  const t = useTranslations('Header');

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-sm flex-shrink-0 overflow-hidden">
                  <Image
                    src="/creneau-sport.PNG"
                    alt="CréneauSport Logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl font-bold tracking-tight truncate">
                    CréneauSport
                  </h1>
                  <div className="hidden sm:flex items-center space-x-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{t('tagline')}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <nav className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {/* Feedback Button - Desktop */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.open('https://creneausport.canny.io/feedback', '_blank');
              }}
              className="hidden sm:flex items-center space-x-2 text-xs bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 hover:bg-primary/10 hover:border-primary/30 text-primary hover:text-primary"
            >
              <MessageSquare className="h-3 w-3" />
              <span>{t('feedback')}</span>
            </Button>

            {/* Feedback Button - Mobile */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                window.open('https://creneausport.canny.io/feedback', '_blank');
              }}
              style={{ marginRight: 0 }}
              className="sm:hidden text-primary hover:text-primary hover:bg-primary/10"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              asChild
              className="hidden sm:flex items-center space-x-2 text-xs bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 hover:bg-primary/10 hover:border-primary/30 text-primary hover:text-primary"
            >
              <a
                href="https://ko-fi.com/mathislefranc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/kofi_symbol.webp"
                  alt="Ko-fi"
                  width={16}
                  height={12}
                  className="w-4 h-3 object-contain"
                />
                <span>{t('support')}</span>
              </a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="sm:hidden text-primary hover:text-primary hover:bg-primary/10"
            >
              <a
                href="https://ko-fi.com/mathislefranc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/kofi_symbol.webp"
                  alt="Ko-fi"
                  width={16}
                  height={12}
                  className="w-4 h-3 object-contain"
                />
              </a>
            </Button>
            <LanguageSwitcher />
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
