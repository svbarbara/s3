import { useState, useEffect } from 'react';
import { Globe, Moon, Sun, Monitor, Menu, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { useTranslation } from '@/hooks/useTranslation';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme, actualTheme, isTransitioning } = useTheme();
  const { language, setLanguage, t, dir } = useTranslation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ar', label: 'العربية', flag: '🇦🇪' }
  ];

  const themeOptions = [
    { value: 'light', icon: Sun, label: t('theme.light') || 'Clair', description: t('theme.light.desc') || 'Mode clair' },
    { value: 'dark', icon: Moon, label: t('theme.dark') || 'Sombre', description: t('theme.dark.desc') || 'Mode sombre' },
    { value: 'system', icon: Monitor, label: t('theme.system') || 'Système', description: t('theme.system.desc') || 'Suit le système' }
  ];

  const getThemeIcon = () => {
    if (theme === 'system') {
      return actualTheme === 'dark' ? Moon : Sun;
    }
    const themeOption = themeOptions.find(t => t.value === theme);
    return themeOption ? themeOption.icon : Sun;
  };

  const ThemeIcon = getThemeIcon();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`} dir={dir}>
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex items-center hover:opacity-80 transition-opacity duration-200`}
          >
            <img 
              src={actualTheme === 'dark' ? '/logo-dark.png' : '/logo-light.png'}
              alt="Suites Ventures"
              className="h-8 w-auto transition-opacity duration-300"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center space-x-8 ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
            <button 
              onClick={() => {
                const element = document.getElementById('process');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {t('header.process')}
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('bento-offer');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {t('header.offer')}
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('testimonials');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {t('header.testimonials')}
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('faq');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {t('header.faq')}
            </button>
          </nav>

          {/* Actions */}
          <div className={`flex items-center space-x-2 ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
            {/* Language Selector */}
            <div className="relative group">
              <Button variant="ghost" size="sm" className={`flex items-center space-x-1 transition-all duration-200 ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {languages.find(l => l.code === language)?.flag}
                </span>
              </Button>
              <div className={`absolute ${dir === 'rtl' ? 'left-0' : 'right-0'} top-full mt-1 bg-popover/95 backdrop-blur-sm border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[150px]`}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={`w-full text-${dir === 'rtl' ? 'right' : 'left'} px-3 py-2 hover:bg-accent/50 first:rounded-t-lg last:rounded-b-lg flex items-center justify-between transition-colors duration-150 ${
                      language === lang.code ? 'bg-accent/30' : ''
                    }`}
                  >
                    <div className={`flex items-center space-x-2 ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
                      <span>{lang.flag}</span>
                      <span className="text-sm">{lang.label}</span>
                    </div>
                    {language === lang.code && <Check className="w-3 h-3 text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="relative group">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`transition-all duration-200 ${
                  isTransitioning ? 'opacity-70 scale-95' : 'hover:scale-105'
                }`}
                disabled={isTransitioning}
              >
                <ThemeIcon className={`w-4 h-4 transition-all duration-300 ${
                  isTransitioning ? 'rotate-180' : ''
                }`} />
              </Button>
              <div className={`absolute ${dir === 'rtl' ? 'left-0' : 'right-0'} top-full mt-1 bg-popover/95 backdrop-blur-sm border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[160px]`}>
                {themeOptions.map((option) => {
                  const Icon = option.icon;
                  const isActive = theme === option.value;
                  
                  return (
                    <button
                      key={option.value}
                      onClick={() => setTheme(option.value as any)}
                      disabled={isTransitioning}
                      className={`w-full text-${dir === 'rtl' ? 'right' : 'left'} px-3 py-2 hover:bg-accent/50 first:rounded-t-lg last:rounded-b-lg flex items-center justify-between transition-all duration-150 ${
                        isActive ? 'bg-accent/30' : ''
                      } ${isTransitioning ? 'opacity-50' : ''}`}
                    >
                      <div className={`flex items-center space-x-2 ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
                        <Icon className={`w-4 h-4 transition-colors duration-200 ${
                          isActive ? 'text-primary' : ''
                        }`} />
                        <div>
                          <div className="text-sm font-medium">{option.label}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                          {option.value === 'system' && (
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {t('theme.currently')}: {actualTheme === 'dark' ? t('theme.dark') : t('theme.light')}
                            </div>
                          )}
                        </div>
                      </div>
                      {isActive && <Check className="w-3 h-3 text-primary" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA Button */}
            <Button 
              className="cta-button hidden sm:inline-flex"
              onClick={() => {
                const calWidget = document.getElementById('cal-widget');
                if (calWidget) {
                  calWidget.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {t('header.cta')}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden transition-transform duration-200 hover:scale-105"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border">
            <nav className="px-4 py-4 space-y-3">
              <button 
                onClick={() => {
                  const element = document.getElementById('process');
                  element?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {t('header.process')}
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('bento-offer');
                  element?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {t('header.offer')}
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('testimonials');
                  element?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {t('header.testimonials')}
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('faq');
                  element?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {t('header.faq')}
              </button>
              <Button 
                className="cta-button w-full mt-4"
                onClick={() => {
                  const calWidget = document.getElementById('cal-widget');
                  if (calWidget) {
                    calWidget.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsMenuOpen(false);
                }}
              >
                {t('header.cta')}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}