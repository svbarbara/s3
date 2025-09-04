type Language = 'fr' | 'en' | 'ar';

// Mapping des codes pays vers les langues préférées
const countryLanguageMap: Record<string, Language> = {
  // Pays francophones
  'FR': 'fr', // France
  'BE': 'fr', // Belgique 
  'CH': 'fr', // Suisse
  'CA': 'fr', // Canada (note: pourrait être en ou fr selon la région)
  'LU': 'fr', // Luxembourg
  'MC': 'fr', // Monaco
  'SN': 'fr', // Sénégal
  'CI': 'fr', // Côte d'Ivoire
  'MA': 'fr', // Maroc (français largement parlé)
  'TN': 'fr', // Tunisie
  'DZ': 'fr', // Algérie
  
  // Pays arabophones
  'AE': 'ar', // Émirats Arabes Unis
  'SA': 'ar', // Arabie Saoudite
  'QA': 'ar', // Qatar
  'BH': 'ar', // Bahreïn
  'KW': 'ar', // Koweït
  'OM': 'ar', // Oman
  'JO': 'ar', // Jordanie
  'LB': 'ar', // Liban
  'SY': 'ar', // Syrie
  'IQ': 'ar', // Irak
  'EG': 'ar', // Égypte
  'LY': 'ar', // Libye
  'YE': 'ar', // Yémen
  
  // Pays anglophones par défaut (et autres)
  'US': 'en', // États-Unis
  'GB': 'en', // Royaume-Uni
  'AU': 'en', // Australie
  'NZ': 'en', // Nouvelle-Zélande
  'IE': 'en', // Irlande
  'ZA': 'en', // Afrique du Sud
  'SG': 'en', // Singapour
  'HK': 'en', // Hong Kong
  'IN': 'en', // Inde
};

// Mapping des codes de langue du navigateur
const browserLanguageMap: Record<string, Language> = {
  'fr': 'fr',
  'fr-FR': 'fr',
  'fr-CA': 'fr',
  'fr-BE': 'fr',
  'fr-CH': 'fr',
  
  'ar': 'ar',
  'ar-SA': 'ar',
  'ar-AE': 'ar',
  'ar-QA': 'ar',
  'ar-BH': 'ar',
  'ar-KW': 'ar',
  'ar-OM': 'ar',
  'ar-JO': 'ar',
  'ar-LB': 'ar',
  'ar-SY': 'ar',
  'ar-IQ': 'ar',
  'ar-EG': 'ar',
  'ar-LY': 'ar',
  'ar-MA': 'ar',
  'ar-TN': 'ar',
  'ar-DZ': 'ar',
  'ar-YE': 'ar',
  
  // Toutes les autres langues par défaut vers l'anglais
  'en': 'en',
  'en-US': 'en',
  'en-GB': 'en',
  'en-AU': 'en',
  'en-CA': 'en',
  'en-NZ': 'en',
  'en-IE': 'en',
  'en-ZA': 'en',
  'en-SG': 'en',
  'en-HK': 'en',
  'en-IN': 'en',
};

/**
 * Détecte la langue préférée basée sur la géolocalisation et les préférences du navigateur
 */
export async function detectPreferredLanguage(): Promise<Language> {
  // 1. Essayer de détecter par géolocalisation IP
  try {
    const geoLanguage = await detectLanguageByGeolocation();
    if (geoLanguage) {
      console.log('🌍 Language detected by geolocation:', geoLanguage);
      return geoLanguage;
    }
  } catch (error) {
    console.warn('⚠️ Geolocation detection failed:', error);
  }

  // 2. Fallback: utiliser les préférences du navigateur
  const browserLanguage = detectLanguageByBrowser();
  console.log('🌐 Language detected by browser:', browserLanguage);
  return browserLanguage;
}

/**
 * Détecte la langue basée sur la géolocalisation IP
 */
async function detectLanguageByGeolocation(): Promise<Language | null> {
  try {
    // Créer une promesse avec timeout manuel pour plus de fiabilité
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    // Utilisation d'un service gratuit pour obtenir le pays basé sur l'IP
    const response = await fetch('https://ipapi.co/json/', {
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Geolocation API failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    const countryCode = data.country_code as string;
    
    if (countryCode && countryLanguageMap[countryCode]) {
      return countryLanguageMap[countryCode];
    }
    
    return null;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn('⏱️ Geolocation request timed out after 3 seconds');
    } else {
      console.warn('🌍 Geolocation detection failed:', error);
    }
    return null;
  }
}

/**
 * Détecte la langue basée sur les préférences du navigateur
 */
function detectLanguageByBrowser(): Language {
  if (typeof window === 'undefined') {
    return 'fr'; // Défaut côté serveur
  }

  // Obtenir toutes les langues préférées du navigateur
  const languages = navigator.languages || [navigator.language];
  
  // Essayer de matcher chaque langue
  for (const lang of languages) {
    const normalizedLang = lang.toLowerCase();
    
    // Match exact
    if (browserLanguageMap[normalizedLang]) {
      return browserLanguageMap[normalizedLang];
    }
    
    // Match par code de langue principal (ex: 'fr' dans 'fr-BE')
    const primaryLang = normalizedLang.split('-')[0];
    if (browserLanguageMap[primaryLang]) {
      return browserLanguageMap[primaryLang];
    }
  }
  
  // Défaut si aucune langue connue n'est trouvée
  return 'en';
}

/**
 * Obtient la langue sauvegardée ou détecte automatiquement
 */
export async function getInitialLanguage(): Promise<Language> {
  // Vérifier d'abord le localStorage
  if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['fr', 'en', 'ar'].includes(savedLanguage)) {
      console.log('💾 Using saved language:', savedLanguage);
      return savedLanguage;
    }
  }
  
  // Si pas de langue sauvegardée, détecter automatiquement
  console.log('🔍 Auto-detecting language...');
  const detectedLanguage = await detectPreferredLanguage();
  
  // Sauvegarder la langue détectée
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', detectedLanguage);
  }
  
  return detectedLanguage;
}