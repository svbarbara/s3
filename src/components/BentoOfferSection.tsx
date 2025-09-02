import { PricingCard } from "@/components/ui/pricing-card";
import { useTranslation } from '@/hooks/useTranslation';

export function BentoOfferSection() {
  const { t, dir } = useTranslation();

  const handleBookNow = () => {
    const calWidget = document.getElementById('cal-widget');
    if (calWidget) {
      calWidget.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  return (
    <section id="bento-offer" className="bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen flex items-center py-8 md:py-16" dir={dir}>
      <div className="section-container">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-4 leading-tight">
            {t('offer.title')}
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('offer.subtitle')}
          </p>
        </div>
        
        <PricingCard
          title={t('offer.title')}
          description={t('offer.subtitle')}
          price={1490}
          originalPrice={2000}
          features={[
            {
              title: t('bento.llc.title'),
              items: [
                t('bento.llc.description'),
                "Enregistrement complet et légal",
                "Certificat d'incorporation",
                "Statuts de l'entreprise",
                "Numéro d'identification fiscale",
                "Conformité réglementaire"
              ]
            },
            {
              title: t('bento.banking.title'),
              items: [
                t('bento.banking.description'),
                "Processus 100% en ligne",
                "Compte multi-devises",
                "Cartes de débit internationales",
                "Services de paiement digital",
                "Support bancaire dédié"
              ]
            },
            {
              title: t('bento.services.title'),
              items: [
                t('bento.services.description'),
                "Réception et transmission du courrier",
                "Services de secrétariat",
                "Gestion des formalités administratives",
                "Assistance juridique continue",
                "Conformité fiscale internationale"
              ]
            },
            {
              title: t('bento.support.title'),
              items: [
                t('bento.support.description'),
                "Support juridique 6-12 mois",
                "Accompagnement fiscal personnalisé",
                "Support 24/7 en français",
                "Conseiller dédié",
                "Processus 100% digital"
              ]
            }
          ]}
          buttonText={t('offer.cta')}
          onButtonClick={handleBookNow}
        />
      </div>
    </section>
  );
}