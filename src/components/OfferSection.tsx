import { Check, Star, Zap, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { AwardBadge } from '@/components/ui/award-badge';
import { SimpleAwardBadge } from '@/components/ui/simple-award-badge';

export function OfferSection() {
  const { t } = useTranslation();
  const features = [
    "Constitution LLC ou Free Zone Dubai",
    "Documents légaux complets (EIN, Operating Agreement)",
    "Ouverture compte bancaire professionnel",
    "Adresse d'entreprise + boîte postale",
    "Chatbot IA expert fiscal 24/7",
    "Support client dédié",
    "Guide complet post-création",
    "Conformité fiscale première année"
  ];

  const urgencyFactors = [
    { icon: Clock, text: "Offre limitée jusqu'au 31 octobre 2025", color: "text-red-500" },
    { icon: Zap, text: "Plus que 23 places disponibles", color: "text-orange-500" },
    { icon: Shield, text: "Garantie satisfaction 30 jours", color: "text-green-500" }
  ];

  return (
    <section id="offer" className="py-20 bg-background">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            <span>Offre de lancement exceptionnelle</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Pack Création Entreprise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tout ce dont vous avez besoin pour créer et gérer votre entreprise internationale, 
            en un seul package au prix le plus compétitif du marché.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Pricing Card */}
            <div>
              <div className="card-elevated p-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
                
                <div className="relative z-10">
                  {/* Badge */}
                  <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold rotate-12">
                    Offre de lancement
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-8">
                    <div className="text-muted-foreground line-through text-xl mb-2">2,000 USD</div>
                    <div className="text-5xl font-bold text-foreground mb-2">
                      1,490<span className="text-2xl">USD</span>
                    </div>
                    <div className="text-muted-foreground">
                      {t('offer.price.note')} · Tout inclus
                    </div>
                    
                    {/* Badge test direct en HTML */}
                    <div className="flex justify-center mt-4 mb-2 bg-yellow-300 border-4 border-red-500 p-8">
                      <div className="bg-blue-600 text-white text-2xl font-bold px-8 py-4 rounded-lg">
                        🏆 BADGE TEST VISIBLE 🏆
                      </div>
                    </div>
                    
                    {/* Mini carte Financements */}
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl border border-blue-200 dark:border-blue-800 shadow-sm">
                      <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                        Vous pouvez également financer intégralement la création de votre société grâce au CPF ou aux OPCO.
                      </p>
                      <button 
                        className="text-sm font-medium text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 transition-colors duration-200"
                        onClick={() => {
                          const financingSection = document.getElementById('financing');
                          if (financingSection) {
                            financingSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        En savoir plus sur les financements →
                      </button>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button className="cta-button w-full text-lg py-4 mb-4">
                    Réserver maintenant
                  </Button>
                  
                  <p className="text-center text-xs text-muted-foreground">
                    💳 Paiement sécurisé · 🔒 Garantie 30 jours
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Benefits & Urgency */}
            <div className="space-y-8">
              {/* Urgency Factors */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Pourquoi agir maintenant ?
                </h3>
                {urgencyFactors.map((factor, index) => {
                  const Icon = factor.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-card border border-border rounded-lg shadow-unified-sm">
                      <Icon className={`w-6 h-6 ${factor.color}`} />
                      <span className="text-foreground font-medium">{factor.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Comparison */}
              <div className="card-elevated p-6">
                <h4 className="text-xl font-semibold text-foreground mb-4">
                  Comparaison avec la concurrence
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Autres prestataires</span>
                    <span className="text-foreground font-semibold">2,000 - 3,000 USD</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Faire soi-même</span>
                    <span className="text-foreground">1,200 USD + 40h de travail</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-primary font-semibold">Suites Ventures</span>
                    <span className="text-primary font-bold text-xl">1,490 USD</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    💰 <strong>Économisez jusqu'à 1,510 USD</strong> par rapport aux autres solutions !
                  </p>
                </div>
              </div>

              {/* Money-back guarantee */}
              <div className="text-center p-6 bg-muted/30 rounded-lg">
                <Shield className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Garantie satisfaction 30 jours
                </h4>
                <p className="text-sm text-muted-foreground">
                  Si vous n'êtes pas 100% satisfait, nous vous remboursons intégralement. 
                  Aucune question posée.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}