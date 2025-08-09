import { getTranslations } from 'next-intl/server';
import { CalendarIcon, MapPinIcon, TagIcon } from 'lucide-react';
import SearchForm from '@/components/search-form';

export default async function Home() {
  const t = await getTranslations('HomePage');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col grow">
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="max-w-4xl w-full">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
              {t('title')}
              <span className="text-primary block">{t('titleHighlight')}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {t('description')}
            </p>
          </div>

          {/* Search Form */}
          <SearchForm />

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <TagIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {t('features.selection.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('features.selection.description')}
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <CalendarIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {t('features.planning.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('features.planning.description')}
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <MapPinIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {t('features.proximity.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('features.proximity.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
