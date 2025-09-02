import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Zap, Code, BookOpen, Brain, Cog, Rocket } from "lucide-react";
import { useTranslation } from '@/hooks/useTranslation';

export function DigitalStrategySection() {
  const { t, dir } = useTranslation();
  
  const services = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: t('digital_strategy.landing_page.title'),
      description: t('digital_strategy.landing_page.description'),
      features: [
        t('digital_strategy.landing_page.feature1'),
        t('digital_strategy.landing_page.feature2'),
        t('digital_strategy.landing_page.feature3'),
        t('digital_strategy.landing_page.feature4')
      ]
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: t('digital_strategy.micro_saas.title'),
      description: t('digital_strategy.micro_saas.description'),
      features: [
        t('digital_strategy.micro_saas.feature1'),
        t('digital_strategy.micro_saas.feature2'),
        t('digital_strategy.micro_saas.feature3'),
        t('digital_strategy.micro_saas.feature4')
      ]
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: t('digital_strategy.boot_camps.title'),
      description: t('digital_strategy.boot_camps.description'),
      features: [
        t('digital_strategy.boot_camps.feature1'),
        t('digital_strategy.boot_camps.feature2'),
        t('digital_strategy.boot_camps.feature3'),
        t('digital_strategy.boot_camps.feature4')
      ],
      highlight: true
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: t('digital_strategy.gen_ai.title'),
      description: t('digital_strategy.gen_ai.description'),
      features: [
        t('digital_strategy.gen_ai.feature1'),
        t('digital_strategy.gen_ai.feature2'),
        t('digital_strategy.gen_ai.feature3'),
        t('digital_strategy.gen_ai.feature4')
      ]
    },
    {
      icon: <Cog className="w-6 h-6" />,
      title: t('digital_strategy.automation.title'),
      description: t('digital_strategy.automation.description'),
      features: [
        t('digital_strategy.automation.feature1'),
        t('digital_strategy.automation.feature2'),
        t('digital_strategy.automation.feature3'),
        t('digital_strategy.automation.feature4')
      ]
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('digital_strategy.no_code.title'),
      description: t('digital_strategy.no_code.description'),
      features: [
        t('digital_strategy.no_code.feature1'),
        t('digital_strategy.no_code.feature2'),
        t('digital_strategy.no_code.feature3'),
        t('digital_strategy.no_code.feature4')
      ]
    }
  ];

  const handleROOTSClick = () => {
    window.open('https://roots.tfq.one/', '_blank');
  };

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
    <section id="digital-strategy" className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-950 dark:via-slate-900 dark:to-indigo-950 py-16 md:py-24" dir={dir}>
      <div className="section-container">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {t('digital_strategy.badge')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-900 to-indigo-600 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent mb-6">
            {t('digital_strategy.title')}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
            {t('digital_strategy.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 auto-rows-fr">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`h-full flex flex-col shadow-unified hover:-translate-y-1 ${
                service.highlight 
                  ? 'ring-2 ring-blue-500 dark:ring-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950' 
                  : ''
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${
                    service.highlight 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {service.icon}
                  </div>
                  {service.highlight && (
                    <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">
                      {t('digital_strategy.focus_badge')}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-sm">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center shadow-unified">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {t('digital_strategy.roots.title')}
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            {t('digital_strategy.roots.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleROOTSClick}
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
            >
              {t('digital_strategy.roots.cta')}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              onClick={handleBookNow}
              className="bg-slate-800 text-white hover:bg-slate-700 border-slate-800 hover:border-slate-700 font-semibold transition-all duration-200"
            >
              {t('digital_strategy.consultation.cta')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}