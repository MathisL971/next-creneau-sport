import { ExternalLink, Heart, Info } from 'lucide-react';

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              À propos
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Interface alternative dédiée à la réservation d&apos;espaces
              sportifs et de loisirs de la Ville de Montréal. Créée pour offrir
              une expérience utilisateur améliorée par rapport à la plateforme
              officielle, avec une recherche plus intuitive et une navigation
              simplifiée.
            </p>
          </div>

          {/* Resources Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Ressources
            </h3>
            <div className="space-y-2">
              <a
                href="https://loisirs.montreal.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Site officiel Loisirs Montréal</span>
              </a>
              <a
                href="https://montreal.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Ville de Montréal</span>
              </a>
            </div>
          </div>

          {/* Help Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Aide
            </h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span>
                  Sélectionnez un sport, un arrondissement et une date pour
                  commencer votre recherche.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start space-x-1 text-xs text-muted-foreground">
            <span>© {currentYear} Application non-officielle pour</span>
            <div className="flex items-center space-x-1">
              <Heart className="h-3 w-3 text-red-500 flex-shrink-0" />
              <span>les loisirs montréalais</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Données fournies par la Ville de Montréal
          </div>
        </div>
      </div>
    </footer>
  );
}
