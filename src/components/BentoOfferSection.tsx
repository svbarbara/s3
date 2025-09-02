import { lazy, Suspense, useState, useEffect, useRef } from "react";
import { useTranslation } from "@/hooks/useTranslation";

const PricingCard = lazy(() =>
  import("@/components/ui/pricing-card").then((module) => ({
    default: module.PricingCard,
  })),
);

export function BentoOfferSection() {
  const { t, dir } = useTranslation();
  const [shouldLoadCard, setShouldLoadCard] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleBookNow = () => {
    const calWidget = document.getElementById("cal-widget");
    if (calWidget) {
      calWidget.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadCard(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "100px 0px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const PricingCardFallback = () => (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-unified border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="p-6 lg:w-2/5 space-y-4">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 animate-pulse"></div>
            <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-750 p-6 lg:w-3/5">
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="h-5 bg-slate-200 dark:bg-slate-600 rounded w-1/3 animate-pulse"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[...Array(6)].map((_, j) => (
                      <div
                        key={j}
                        className="h-4 bg-slate-200 dark:bg-slate-600 rounded animate-pulse"
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="bento-offer"
      className="bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen flex items-center py-8 md:py-16"
      dir={dir}
    >
      <div className="section-container">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-4 leading-tight">
            {t("offer.title")}
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t("offer.subtitle")}
          </p>
        </div>

        <Suspense fallback={<PricingCardFallback />}>
          {shouldLoadCard && (
            <PricingCard
              title={t("offer.title")}
              description={t("offer.subtitle")}
              price={1490}
              originalPrice={2000}
              features={[
                {
                  title: t("bento.llc.title"),
                  items: [
                    t("bento.llc.description"),
                    "Enregistrement complet et légal",
                    "Certificat d'incorporation",
                    "Statuts de l'entreprise",
                    "Numéro d'identification fiscale",
                    "Conformité réglementaire",
                  ],
                },
                {
                  title: t("bento.banking.title"),
                  items: [
                    t("bento.banking.description"),
                    "Processus 100% en ligne",
                    "Compte multi-devises",
                    "Cartes de débit internationales",
                    "Services de paiement digital",
                    "Support bancaire dédié",
                  ],
                },
                {
                  title: t("bento.services.title"),
                  items: [
                    t("bento.services.description"),
                    "Réception et transmission du courrier",
                    "Services de secrétariat",
                    "Gestion des formalités administratives",
                    "Assistance juridique continue",
                    "Conformité fiscale internationale",
                  ],
                },
                {
                  title: t("bento.support.title"),
                  items: [
                    t("bento.support.description"),
                    "Support juridique 6-12 mois",
                    "Accompagnement fiscal personnalisé",
                    "Support 24/7 en français",
                    "Conseiller dédié",
                    "Processus 100% digital",
                  ],
                },
              ]}
              buttonText={t("offer.cta")}
              onButtonClick={handleBookNow}
            />
          )}
        </Suspense>
      </div>
    </section>
  );
}
