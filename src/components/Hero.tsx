import { useState, useEffect } from 'react';
import { ArrowRight, Play, CheckCircle, TrendingUp, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DubaiOfficeSlideshow } from '@/components/DubaiOfficeSlideshow';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="w-full h-full text-slate-950 dark:text-white opacity-30"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.01}
            initial={{ pathLength: 0.3, opacity: 0.4 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.4, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function Hero() {
  const { t, dir } = useTranslation();

  return (
    <section
      id="hero-section"
      className="hero-section min-h-screen flex items-center pt-16 relative overflow-hidden"
      dir={dir}
    >
      {/* Background Paths Effect */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="section-container relative z-10">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${dir === 'rtl' ? 'lg:grid-cols-2' : ''}`}>
          {/* Left Content */}
          <div className={`space-y-8 ${dir === 'rtl' ? 'lg:order-2 text-right' : 'lg:order-1'}`}>
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <div className={`flex items-center gap-2 flex-wrap ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-foreground">{t('hero.title.part1')} </span>
                  <span className="brand-gradient-text">{t('hero.title.highlight')}</span>
                  <span className="text-2xl md:text-3xl lg:text-4xl transition-transform duration-300 hover:scale-110">🇺🇸</span>
                </div>
                <div className={`flex items-center gap-2 flex-wrap ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-foreground">{t('hero.title.part2')} </span>
                  <span className="brand-gradient-text">{t('hero.title.highlight2')}</span>
                  <span className="text-2xl md:text-3xl lg:text-4xl transition-transform duration-300 hover:scale-110">🇦🇪</span>
                </div>
                <div className={`flex items-center gap-2 flex-wrap ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-foreground" dangerouslySetInnerHTML={{ __html: t('hero.title.part3') }}></span>
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                    {t('hero.title.time')}
                  </span>
                </div>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl">
                {t('hero.subtitle')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className={`flex justify-start ${dir === 'rtl' ? 'justify-end' : ''}`}>
              <Button
                size="lg"
                className="cta-button group"
                onClick={() => {
                  const calWidget = document.getElementById('cal-widget');
                  if (calWidget) {
                    calWidget.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {t('hero.cta.primary')}
                <ArrowRight className={`ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform ${dir === 'rtl' ? 'ml-0 mr-2 group-hover:-translate-x-1 rotate-180' : ''}`} />
              </Button>
            </div>
          </div>

          {/* Right Content */}
          <div className={`relative ${dir === 'rtl' ? 'lg:order-1' : 'lg:order-2'}`}>
            {/* Main Image/Slideshow */}
            <div className="relative w-full h-[500px] lg:h-[600px]">
              <DubaiOfficeSlideshow />

              {/* Floating Country Flags */}
              <div className={`absolute ${dir === 'rtl' ? 'left-4' : 'right-4'} top-4 flex flex-col gap-2`}>
                <div className="group relative">
                  <div className="w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-border shadow-unified flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <span className="text-2xl">🇺🇸</span>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    USA
                  </div>
                </div>
                <div className="group relative">
                  <div className="w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-border shadow-unified flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <span className="text-2xl">🇦🇪</span>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    UAE
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
