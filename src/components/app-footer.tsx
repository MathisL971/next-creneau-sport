'use client';

import { ExternalLink, Heart, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function AppFooter() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('Footer');

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {/* About Section */}
          <div className="space-y-3 col-span-2">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              {t('about')}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('aboutDescription')}
            </p>
          </div>
          {/* Resources Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              {t('resources')}
            </h3>
            <div className="space-y-2">
              <a
                href="https://loisirs.montreal.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                <span>{t('officialSite')}</span>
              </a>
              <a
                href="https://montreal.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                <span>{t('cityOfMontreal')}</span>
              </a>
              <a
                href="https://creneausport.canny.io/feedback"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageSquare className="h-3 w-3" />
                <span>{t('feedbackSuggestions')}</span>
              </a>
              <a
                href="https://ko-fi.com/mathislefranc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <Image
                  src="/kofi_symbol.webp"
                  alt="Ko-fi"
                  width={16}
                  height={12}
                  className="w-4 h-3 object-contain"
                />
                <span>{t('supportProject')}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start space-x-1 text-xs text-muted-foreground">
            <span>{t('copyright', { year: currentYear })}</span>
            <div className="flex items-center space-x-1">
              <Heart className="h-3 w-3 text-red-500 flex-shrink-0" />
              <span>CréneauSport</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {t('dataProvider')}
          </div>
        </div>
      </div>
    </footer>
  );
}
