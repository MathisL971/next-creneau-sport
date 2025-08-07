'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useTransition } from 'react';

const locales = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('Common');

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale) return; // Avoid unnecessary changes

    startTransition(() => {
      // Get the current pathname without locale prefix
      const pathWithoutLocale = pathname.startsWith('/')
        ? pathname
        : `/${pathname}`;

      // Preserve query parameters
      const queryString = searchParams.toString();
      const queryPart = queryString ? `?${queryString}` : '';

      // Construct the new URL with the correct locale and preserved query params
      const newUrl = `/${newLocale}${pathWithoutLocale}${queryPart}`;

      // Force a full page reload to ensure server-generated content is refetched
      window.location.href = newUrl;
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 px-0"
          disabled={isPending}
        >
          <Globe className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
          <span className="sr-only">{t('switchLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc.code}
            onClick={() => handleLocaleChange(loc.code)}
            disabled={isPending}
            className={
              locale === loc.code
                ? 'bg-accent text-accent-foreground'
                : 'cursor-pointer'
            }
          >
            <span className="mr-2">{loc.flag}</span>
            {loc.name}
            {locale === loc.code && (
              <span className="ml-auto text-xs text-muted-foreground">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
