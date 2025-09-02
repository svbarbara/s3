import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { BentoOfferSection } from "@/components/BentoOfferSection";
import { DigitalStrategySection } from "@/components/DigitalStrategySection";
import { RemoteSectionWithGlobe } from "@/components/RemoteSectionWithGlobe";
import { TeamSection } from "@/components/TeamSection";
import { FAQ } from "@/components/FAQ";
import { LegalVehicleSection } from "@/components/LegalVehicleSection";
import { FinancingSection } from "@/components/FinancingSection";
import { CalWidget } from "@/components/CalWidget";
import { Footer } from "@/components/Footer";
import { SocialMeta } from "@/components/SocialMeta";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TranslationProvider } from "@/hooks/useTranslation";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";

const Index = () => {
  // Initialize keyboard navigation
  useKeyboardNavigation();

  // Load Chatbase AI widget
  useEffect(() => {
    // Initialize chatbase if not already initialized
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...args) => {
        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(args);
      };
      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") {
            return target.q;
          }
          return (...args) => target(prop, ...args);
        },
      });
    }

    const onLoad = function () {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "ufpsfpA7INzeEiuou-evP";
      script.setAttribute("domain", "www.chatbase.co");
      document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    // Load analytics
    const plausibleScript = document.createElement("script");
    plausibleScript.defer = true;
    plausibleScript.setAttribute("data-domain", "suitesventures.com");
    plausibleScript.src = "https://plausible.io/js/script.js";
    document.head.appendChild(plausibleScript);

    // Load Google Analytics
    const gtagScript = document.createElement("script");
    gtagScript.async = true;
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-Y44WDCMX9Z";
    document.head.appendChild(gtagScript);

    const gtagInlineScript = document.createElement("script");
    gtagInlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Y44WDCMX9Z');
    `;
    document.head.appendChild(gtagInlineScript);

    return () => {
      // Cleanup
      const existingChatbase = document.querySelector(
        'script[id="ufpsfpA7INzeEiuou-evP"]',
      );
      const existingPlausible = document.querySelector(
        'script[src="https://plausible.io/js/script.js"]',
      );
      if (existingChatbase) document.body.removeChild(existingChatbase);
      if (existingPlausible) document.head.removeChild(existingPlausible);

      // Remove load event listener
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <TranslationProvider>
      <ThemeProvider>
        <SocialMeta />
        <div className="min-h-screen bg-background text-foreground theme-aware">
          <Header />
          <Hero />
          <ProcessTimeline />
          <BentoOfferSection />
          <RemoteSectionWithGlobe />
          <TeamSection />
          <LegalVehicleSection />
          <FinancingSection />
          <DigitalStrategySection />
          <FAQ />
          <CalWidget />
          <Footer />
        </div>
      </ThemeProvider>
    </TranslationProvider>
  );
};

export default Index;
