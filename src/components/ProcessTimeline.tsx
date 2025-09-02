import { CheckCircle, Clock, FileText, Building, CreditCard, Headphones } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function ProcessTimeline() {
  const { t, dir } = useTranslation();
  
  const steps = [{
    icon: FileText,
    title: t('process.step1.title'),
    subtitle: t('process.step1.subtitle'),
    description: t('process.step1.description'),
    duration: t('process.step1.duration'),
    status: "pending"
  }, {
    icon: Building,
    title: t('process.step2.title'),
    subtitle: t('process.step2.subtitle'),
    description: t('process.step2.description'),
    duration: t('process.step2.duration'),
    status: "pending"
  }, {
    icon: CreditCard,
    title: t('process.step3.title'),
    subtitle: t('process.step3.subtitle'),
    description: t('process.step3.description'),
    duration: t('process.step3.duration'),
    status: "pending"
  }];

  return (
    <section id="process" className="min-h-screen flex items-center py-16 bg-muted/30" dir={dir}>
      <div className="section-container">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('process.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('process.subtitle')}
          </p>
        </div>

        <div>
          {/* Desktop Cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index} 
                  className="relative group animate-slide-up hover:scale-105 transition-all duration-300" 
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="bg-card border border-border rounded-xl p-6 h-full shadow-unified">
                    {/* Step Number */}
                    <div className={`absolute -top-3 ${dir === 'rtl' ? '-right-3' : '-left-3'} w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold`}>
                      {index + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto ${
                      step.status === 'active' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground'
                    } transition-colors duration-300`}>
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-3">
                      <div>
                        <h3 className="font-bold text-lg text-foreground mb-1">
                          {step.title}
                        </h3>
                        <p className="text-sm text-primary font-medium">
                          {step.subtitle}
                        </p>
                      </div>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                      
                      <div className={`inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-2 rounded-full text-sm font-medium ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
                        <Clock className="w-4 h-4" />
                        <span>{step.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className={`absolute top-1/2 ${dir === 'rtl' ? '-left-3' : '-right-3'} w-6 h-0.5 bg-border z-10 hidden xl:block`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index} 
                  className="bg-card border border-border rounded-xl p-5 animate-fade-in shadow-unified" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`flex items-start space-x-4 ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0 relative">
                      <div className={`absolute -top-2 ${dir === 'rtl' ? '-right-2' : '-left-2'} w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold`}>
                        {index + 1}
                      </div>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        step.status === 'active' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-foreground">{step.title}</h3>
                          <p className="text-sm text-primary font-medium">{step.subtitle}</p>
                        </div>
                        <div className={`inline-flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
                          <Clock className="w-3 h-3" />
                          <span>{step.duration}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}