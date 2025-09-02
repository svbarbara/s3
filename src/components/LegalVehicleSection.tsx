import { Scale, Building, Shield, TrendingUp, Users, Globe } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function LegalVehicleSection() {
  const { t, dir } = useTranslation();

  const objectives = [
    {
      icon: Shield,
      titleKey: "legal.objectives.liability.title",
      descriptionKey: "legal.objectives.liability.desc"
    },
    {
      icon: TrendingUp,
      titleKey: "legal.objectives.tax.title",
      descriptionKey: "legal.objectives.tax.desc"
    },
    {
      icon: Building,
      titleKey: "legal.objectives.risk.title",
      descriptionKey: "legal.objectives.risk.desc"
    },
    {
      icon: Users,
      titleKey: "legal.objectives.partnership.title",
      descriptionKey: "legal.objectives.partnership.desc"
    },
    {
      icon: Scale,
      titleKey: "legal.objectives.heritage.title",
      descriptionKey: "legal.objectives.heritage.desc"
    },
    {
      icon: Globe,
      titleKey: "legal.objectives.international.title",
      descriptionKey: "legal.objectives.international.desc"
    }
  ];

  const vehicleTypes = [
    {
      typeKey: "legal.types.commercial.type",
      utilityKey: "legal.types.commercial.utility",
      examplesKey: "legal.types.commercial.examples"
    },
    {
      typeKey: "legal.types.holding.type",
      utilityKey: "legal.types.holding.utility",
      examplesKey: "legal.types.holding.examples"
    },
    {
      typeKey: "legal.types.trust.type",
      utilityKey: "legal.types.trust.utility",
      examplesKey: "legal.types.trust.examples"
    },
    {
      typeKey: "legal.types.realestate.type",
      utilityKey: "legal.types.realestate.utility",
      examplesKey: "legal.types.realestate.examples"
    },
    {
      typeKey: "legal.types.offshore.type",
      utilityKey: "legal.types.offshore.utility",
      examplesKey: "legal.types.offshore.examples"
    }
  ];

  const questions = [
    "legal.questions.q1",
    "legal.questions.q2",
    "legal.questions.q3",
    "legal.questions.q4",
    "legal.questions.q5"
  ];

  return (
    <section 
      id="legal" 
      className="py-20 bg-gradient-to-br from-background via-accent/5 to-background"
      dir={dir}
    >
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className={`inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
            <Scale className="w-4 h-4" />
            <span>{t('legal.badge')}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-6">
            {t('legal.title')}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {t('legal.subtitle')}
          </p>
        </div>

        {/* All content in consistent left-aligned layout */}
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Definition */}
          <div className="card-elevated p-8 animate-fade-in">
            <h3 className="text-2xl font-bold text-foreground mb-6">{t('legal.definition.title')}</h3>
            <div className="space-y-4 text-left">
              <p className="text-muted-foreground leading-relaxed">
                {t('legal.definition.text1')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('legal.definition.text2')}
              </p>
            </div>
          </div>

          {/* Objectives */}
          <div className="card-elevated p-8 animate-fade-in">
            <h3 className="text-2xl font-bold text-foreground mb-6">{t('legal.objectives.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {objectives.map((objective, index) => {
                const Icon = objective.icon;
                return (
                  <div key={index} className={`flex items-start p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-4`} style={{
                    animationDelay: `${index * 0.1}s`
                  }}>
                    <div className="flex-shrink-0 mt-1">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-foreground mb-2">{t(objective.titleKey)}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{t(objective.descriptionKey)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Vehicle Types */}
          <div className="card-elevated p-8 animate-fade-in">
            <h3 className="text-2xl font-bold text-foreground mb-6">{t('legal.types.title')}</h3>
            <div className="space-y-4">
              {vehicleTypes.map((vehicle, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                  <div className="text-left">
                    <h4 className="font-semibold text-foreground mb-2">{t(vehicle.typeKey)}</h4>
                    <p className="text-muted-foreground text-sm mb-2">{t(vehicle.utilityKey)}</p>
                    <p className="text-xs text-muted-foreground/80 italic">{t(vehicle.examplesKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* International Strategy */}
          <div className="card-elevated p-8 animate-fade-in">
            <h3 className="text-2xl font-bold text-foreground mb-6">{t('legal.strategy.title')}</h3>
            <div className="text-left space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {t('legal.strategy.intro')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className={`flex items-start ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-2`}>
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground text-sm">{t('legal.strategy.benefit1')}</span>
                </div>
                <div className={`flex items-start ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-2`}>
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground text-sm">{t('legal.strategy.benefit2')}</span>
                </div>
                <div className={`flex items-start ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-2`}>
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground text-sm">{t('legal.strategy.benefit3')}</span>
                </div>
                <div className={`flex items-start ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-2`}>
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground text-sm">{t('legal.strategy.benefit4')}</span>
                </div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg mt-6">
                <p className="text-sm text-muted-foreground text-left">
                  <strong>{t('legal.strategy.example.title')}</strong> {t('legal.strategy.example.text')}
                </p>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="card-elevated p-8 animate-fade-in">
            <h3 className="text-2xl font-bold text-foreground mb-6">{t('legal.questions.title')}</h3>
            <div className="space-y-3 text-left">
              {questions.map((questionKey, index) => (
                <div key={index} className={`flex items-start p-3 rounded-lg bg-muted/20 ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-3`}>
                  <span className="text-primary font-bold text-lg">•</span>
                  <span className="text-muted-foreground leading-relaxed">{t(questionKey)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="card-elevated p-8 animate-fade-in bg-gradient-to-r from-primary/5 to-primary/10">
            <h3 className="text-2xl font-bold text-foreground mb-6">{t('legal.summary.title')}</h3>
            <div className="text-left">
              <p className="text-muted-foreground leading-relaxed">
                {t('legal.summary.text')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}