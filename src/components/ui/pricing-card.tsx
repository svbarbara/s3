"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/hooks/useTranslation";
import { AwardBadge } from "@/components/ui/award-badge";

interface PricingFeature {
  title: string;
  items: string[];
}

interface PricingCardProps {
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  features: PricingFeature[];
  buttonText?: string;
  onButtonClick?: () => void;
}

export function PricingCard({
  title,
  description,
  price,
  originalPrice,
  features,
  buttonText = "Get Started",
  onButtonClick,
}: PricingCardProps) {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
        duration: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className="w-full"
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <Card className="relative mx-auto w-full max-w-6xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <motion.div
            className="flex flex-col justify-between p-4 lg:w-2/5 lg:p-6"
            variants={itemVariants}
          >
            <div>
              <CardHeader className="p-0">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold">
                      {title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <motion.div className="mt-6 space-y-4" variants={itemVariants}>
                <div className="flex items-baseline">
                  <span className="text-5xl font-extrabold">${price}</span>
                  {originalPrice && (
                    <span className="ml-2 text-xl text-muted-foreground line-through">
                      ${originalPrice}
                    </span>
                  )}
                </div>
                <span className="block text-sm text-muted-foreground">
                  {t('offer.price.note')}
                </span>
                
                {/* Nouvelle mini carte Financements repensée */}
                <div className="mt-4 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-800 dark:via-blue-900/30 dark:to-indigo-900/30 rounded-xl border border-blue-200/60 dark:border-blue-700/50 shadow-lg">
                  {/* Background pattern subtil */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.3)_1px,transparent_0)] [background-size:20px_20px]"></div>
                  </div>
                  
                  {/* Contenu */}
                  <div className="relative p-5">
                    {/* Header avec icône */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                          💰 Financement possible
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          CPF • OPCO • Formation
                        </p>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                      {t('financing.mini_card.text')} <span className="font-medium text-blue-700 dark:text-blue-300">Financez intégralement votre projet</span> sans frais personnels.
                    </p>
                    
                    {/* Badge CTA intégré comme bouton principal */}
                    <div className="transform hover:scale-[1.02] transition-transform duration-200">
                      <AwardBadge 
                        type="product-of-the-day"
                        customText={t('financing.mini_card.badge')}
                        size="full"
                        onClick={() => {
                          const financingSection = document.getElementById('financing');
                          if (financingSection) {
                            financingSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      />
                    </div>
                    
                    {/* Note discrète */}
                    <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-2 opacity-80">
                      ✨ Jusqu'à 100% pris en charge
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.div className="mt-8" variants={itemVariants}>
              <Button className="w-full" size="lg" onClick={onButtonClick}>
                {buttonText}
              </Button>
            </motion.div>
          </motion.div>
          <Separator className="lg:my-6 lg:hidden" />
          <motion.div
            className="bg-muted/50 p-4 lg:w-3/5 lg:p-6"
            variants={itemVariants}
          >
            <div className="space-y-4">
              {features.map((feature, featureIndex) => (
                <div key={featureIndex} className="space-y-3">
                  <h3 className="mb-3 text-base font-semibold">
                    {feature.title}:
                  </h3>
                  <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {feature.items.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {featureIndex < features.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
