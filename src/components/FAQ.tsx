import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const { t, dir } = useTranslation();
  
  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
    { question: t('faq.q6'), answer: t('faq.a6') },
    { question: t('faq.q7'), answer: t('faq.a7') },
    { question: t('faq.q8'), answer: t('faq.a8') },
    { question: t('faq.q9'), answer: t('faq.a9') },
    { question: t('faq.q10'), answer: t('faq.a10') }
  ];
  
  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Add FAQ Schema.org structured data
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    // Remove existing FAQ schema if it exists
    const existingSchema = document.querySelector('script[type="application/ld+json"][data-schema="faq"]');
    if (existingSchema) {
      existingSchema.remove();
    }

    // Add new FAQ schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'faq');
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const schemaToRemove = document.querySelector('script[type="application/ld+json"][data-schema="faq"]');
      if (schemaToRemove) {
        schemaToRemove.remove();
      }
    };
  }, [faqs]);
  
  return (
    <section id="faq" className="py-20 bg-background" dir={dir}>
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className={`inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
            <HelpCircle className="w-4 h-4" />
            <span>{t('faq.badge')}</span>
          </div>
          
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('faq.header.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('faq.header.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card-elevated animate-fade-in" style={{
                animationDelay: `${index * 0.1}s`
              }}>
                <button onClick={() => toggleFAQ(index)} className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-semibold text-foreground ${dir === 'rtl' ? 'pl-4' : 'pr-4'}`}>
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openFAQ === index ? 
                        <ChevronUp className="w-5 h-5 text-primary transition-transform duration-200" /> : 
                        <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-200" />
                      }
                    </div>
                  </div>
                </button>
                
                {openFAQ === index && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <div className="pt-4 border-t border-border">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center animate-fade-in">
          
        </div>
      </div>
    </section>
  );
}