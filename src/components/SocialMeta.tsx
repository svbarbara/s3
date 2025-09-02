import { useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export function SocialMeta() {
  const { language, t } = useTranslation();

  useEffect(() => {
    // Update document title based on language
    const titles = {
      fr: 'Suites Ventures - Création LLC US & Free Zone Dubai en 3 clics',
      en: 'Suites Ventures - Create your US LLC & Dubai Free Zone in 3 clicks',
      ar: 'سويتس فنتشرز - أنشئ شركتك الأمريكية أو منطقة دبي الحرة في 3 نقرات'
    };

    const descriptions = {
      fr: 'Expert en création d\'entreprises internationales. Votre LLC US 🇺🇸 ou Free Zone Dubai 🇦🇪 créée en 3 clics seulement. De 2000 USD à 1490 USD Offre de lancement - Support 24/7 - 100% Digital',
      en: 'Expert in international business creation. Your US LLC 🇺🇸 or Dubai Free Zone 🇦🇪 created in just 3 clicks. From $2000 USD to $1490 USD Launch Offer - 24/7 Support - 100% Digital',
      ar: 'خبير في إنشاء الشركات الدولية. شركتك الأمريكية 🇺🇸 أو منطقة دبي الحرة 🇦🇪 منشأة في 3 نقرات فقط. من 2000 دولار إلى 1490 دولار عرض الإطلاق - دعم 24/7 - 100% رقمي'
    };

    const ogTitles = {
      fr: 'Suites Ventures - Votre LLC US 🇺🇸 ou Free Zone Dubai 🇦🇪 créée en 3 clics',
      en: 'Suites Ventures - Your US LLC 🇺🇸 or Dubai Free Zone 🇦🇪 created in 3 clicks',
      ar: 'سويتس فنتشرز - شركتك الأمريكية 🇺🇸 أو منطقة دبي الحرة 🇦🇪 منشأة في 3 نقرات'
    };

    // Update title
    document.title = titles[language];

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptions[language]);
    }

    // Update Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', ogTitles[language]);
    }

    // Update Open Graph description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', descriptions[language]);
    }

    // Update Open Graph image (use Apple-optimized image)
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', 'https://suitesventures.com/apple-share-image.jpg');
    }

    const ogImageSecure = document.querySelector('meta[property="og:image:secure_url"]');
    if (ogImageSecure) {
      ogImageSecure.setAttribute('content', 'https://suitesventures.com/apple-share-image.jpg');
    }

    // Update Twitter title
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', ogTitles[language]);
    }

    // Update Twitter description
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', descriptions[language]);
    }

    // Update Twitter image (use same Apple-optimized image)
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute('content', 'https://suitesventures.com/apple-share-image.jpg');
    }

    // Update html lang attribute
    document.documentElement.lang = language === 'ar' ? 'ar' : language;

    // Update og:locale
    const locales = {
      fr: 'fr_FR',
      en: 'en_US',
      ar: 'ar_AE'
    };

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      ogLocale.setAttribute('content', locales[language]);
    }

    // Add canonical URL and hreflang links
    const baseUrl = 'https://suitesventures.com';
    
    // Remove existing canonical and hreflang links
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    const existingHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
    
    if (existingCanonical) existingCanonical.remove();
    existingHreflangs.forEach(link => link.remove());

    // Add canonical URL
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = language === 'fr' ? baseUrl : `${baseUrl}?lang=${language}`;
    document.head.appendChild(canonical);

    // Add hreflang links
    const hreflangs = [
      { lang: 'fr', url: baseUrl },
      { lang: 'en', url: `${baseUrl}?lang=en` },
      { lang: 'ar', url: `${baseUrl}?lang=ar` },
      { lang: 'x-default', url: baseUrl }
    ];

    hreflangs.forEach(({ lang, url }) => {
      const hreflang = document.createElement('link');
      hreflang.rel = 'alternate';
      hreflang.hreflang = lang;
      hreflang.href = url;
      document.head.appendChild(hreflang);
    });

  }, [language]);

  return null; // This component doesn't render anything
}