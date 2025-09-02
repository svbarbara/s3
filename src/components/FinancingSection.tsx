import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Users, BookOpen, Globe } from "lucide-react";
import { useTranslation } from '@/hooks/useTranslation';

export function FinancingSection() {
  const { t, dir } = useTranslation();

  const financingOptions = [
    {
      icon: Wallet,
      title: "CPF",
      description: "Financement par le Compte Personnel de Formation"
    },
    {
      icon: Users,
      title: "OPCO",
      description: "Financement par les Organismes Paritaires Collecteurs Agréés"
    },
    {
      icon: BookOpen,
      title: "Formation",
      description: "Formation intégrale à la création d'entreprise"
    },
    {
      icon: Globe,
      title: "Site Internet",
      description: "Développement de votre présence en ligne"
    }
  ];

  return (
    <section 
      id="financing" 
      className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
      dir={dir}
    >
      <div className="section-container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-slate-900 dark:text-white">
                {t("financing.title")}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
              {t("financing.subtitle")}
            </p>
          </motion.div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-unified">
              <CardContent className="p-8">
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {t("financing.description1")}
                </p>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {t("financing.description2")}
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t("financing.description3")}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Financing Options */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {financingOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-unified border border-slate-200 dark:border-slate-700 hover:-translate-y-1 transition-transform duration-200"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      {option.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {option.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center"
        >
          <Button 
            size="lg" 
            className="cta-button text-lg px-8 py-6 rounded-xl"
            onClick={() => {
              // Faire défiler vers le widget Cal comme dans le header
              const calWidget = document.getElementById('cal-widget');
              if (calWidget) {
                calWidget.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {t("financing.cta")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}