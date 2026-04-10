'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function RalliaBanner() {
  const t = useTranslations('RalliaBanner');

  return (
    <div className="mb-10 rounded-xl border border-teal-500/20 bg-gradient-to-r from-teal-500/10 to-teal-600/5 p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Image
          src="/rallia_logo_dark.svg"
          alt="Rallia"
          width={100}
          height={39}
          className="shrink-0 hidden sm:block dark:sm:hidden"
        />
        <Image
          src="/rallia_logo_light.svg"
          alt="Rallia"
          width={100}
          height={39}
          className="shrink-0 hidden dark:sm:block"
        />
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-teal-500 px-2.5 py-0.5 text-xs font-semibold text-white">
              {t('badge')}
            </span>
            <h3 className="text-base font-semibold text-foreground">
              {t('title')}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">{t('description')}</p>
        </div>

        <a
          href="https://rallia.ca"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 shrink-0 rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600 transition-colors"
        >
          {t('cta')}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
