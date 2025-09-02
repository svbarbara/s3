import { Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useTheme } from '@/components/ThemeProvider';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, dir } = useTranslation();
  const { actualTheme } = useTheme();

  const links = {
    services: [
      { label: t('footer.services.llc_delaware'), href: "#llc-delaware" },
      { label: t('footer.services.llc_wyoming'), href: "#llc-wyoming" },
      { label: t('footer.services.dubai_freezone'), href: "#dubai" },
      { label: t('footer.services.banking'), href: "#banking" }
    ],
    legal: [
      { label: t('footer.legal.mentions'), href: "#legal" },
      { label: t('footer.legal.privacy'), href: "#privacy" },
      { label: t('footer.legal.terms'), href: "#terms" },
      { label: t('footer.legal.compliance'), href: "#compliance" }
    ],
    support: [
      { label: t('footer.support.help'), href: "#help" },
      { label: t('footer.support.resources'), href: "#resources" },
      { label: t('footer.support.chatbot'), href: "#chatbot" },
      { label: t('footer.support.contact'), href: "#contact" }
    ]
  };

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/suitescorp", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/suitescorp", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com/@suitescorp", label: "YouTube" }
  ];

  return (
    <footer className="bg-neutral-dark dark:bg-background border-t border-border" dir={dir}>
      <div className="section-container">
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <img 
                  src="/logo-dark.png"
                  alt="Suites Ventures"
                  className="h-8 w-auto transition-opacity duration-300"
                />
              </div>
              
              <p className="text-neutral-light/80 dark:text-muted-foreground mb-6 leading-relaxed">
                {t('footer.description')}
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-neutral-light/80 dark:text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>contact@suitescorp.com</span>
                </div>
                <div className="flex items-center space-x-2 text-neutral-light/80 dark:text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>+33 (0)1 23 45 67 89</span>
                </div>
                <div className="flex items-center space-x-2 text-neutral-light/80 dark:text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Paris, France & Dubai, UAE</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-neutral-light/10 dark:bg-muted/20 rounded-lg flex items-center justify-center text-neutral-light dark:text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-neutral-light dark:text-foreground mb-4">{t('footer.services')}</h4>
              <ul className="space-y-2">
                {links.services.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-neutral-light/80 dark:text-muted-foreground hover:text-neutral-light dark:hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-neutral-light dark:text-foreground mb-4">{t('footer.support')}</h4>
              <ul className="space-y-2">
                {links.support.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-neutral-light/80 dark:text-muted-foreground hover:text-neutral-light dark:hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-neutral-light dark:text-foreground mb-4">{t('footer.legal')}</h4>
              <ul className="space-y-2">
                {links.legal.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-neutral-light/80 dark:text-muted-foreground hover:text-neutral-light dark:hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-8 border-t border-neutral-light/20 dark:border-border">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="font-semibold text-neutral-light dark:text-foreground mb-2">
                {t('footer.newsletter.title')}
              </h4>
              <p className="text-neutral-light/80 dark:text-muted-foreground">
                {t('footer.newsletter.description')}
              </p>
            </div>
            <div className={`flex ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-2`}>
              <input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                className="flex-1 px-4 py-2 bg-neutral-light/10 dark:bg-muted/20 border border-neutral-light/20 dark:border-border rounded-lg text-neutral-light dark:text-foreground placeholder-neutral-light/50 dark:placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-dark transition-colors">
                {t('footer.newsletter.subscribe')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-neutral-light/20 dark:border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-neutral-light/80 dark:text-muted-foreground text-sm">
              © {currentYear} Suites Ventures. {t('footer.rights')}
            </div>
            
            <div className={`flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-6 text-neutral-light/80 dark:text-muted-foreground text-sm`}>
              <span>🛡️ {t('footer.certifications.iso')}</span>
              <span>⚖️ {t('footer.certifications.gdpr')}</span>
              <span>🔒 {t('footer.certifications.ssl')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}