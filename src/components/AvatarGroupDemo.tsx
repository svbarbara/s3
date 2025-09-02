import { AvatarGroupWithTooltips, DEFAULT_AVATARS } from '@/components/ui/avatar-group-with-tooltip';
import { useTranslation } from '@/hooks/useTranslation';

export function AvatarGroupDemo() {
  const { t, dir } = useTranslation();

  // Avatars personnalisés pour la démo
  const customAvatars = [
    {
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
      name: "Marie Dubois, SaaS Founder",
      status: "online" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
      name: "Ahmed Al-Rashid, Crypto Investor",
      status: "busy" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
      name: "Sophie Martin, E-commerce Owner",
      status: "away" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      name: "David Rodriguez, Tech Startup",
      status: "online" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
      name: "Lisa Chen, Freelance Designer",
      status: "offline" as const,
    },
    {
      src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80",
      name: "Emma Johnson, Marketing Director",
      status: "online" as const,
    },
  ];

  return (
    <section className="py-16 bg-muted/30" dir={dir}>
      <div className="section-container">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Nos clients satisfaits
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez qui fait confiance à Suites Ventures pour créer leur entreprise internationale
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Groupe standard */}
          <div className="text-center space-y-4 p-6 bg-background rounded-lg border">
            <h4 className="font-semibold text-foreground">Nos fondateurs</h4>
            <div className="flex justify-center">
              <AvatarGroupWithTooltips 
                avatars={customAvatars.slice(0, 4)}
                maxDisplay={4}
                showStatus={false}
              />
            </div>
            <p className="text-sm text-muted-foreground">4 entrepreneurs satisfaits</p>
          </div>

          {/* Groupe avec statut */}
          <div className="text-center space-y-4 p-6 bg-background rounded-lg border">
            <h4 className="font-semibold text-foreground">Équipe en ligne</h4>
            <div className="flex justify-center">
              <AvatarGroupWithTooltips 
                avatars={customAvatars}
                maxDisplay={3}
                showStatus={true}
              />
            </div>
            <p className="text-sm text-muted-foreground">3 en ligne, 3 autres</p>
          </div>

          {/* Groupe avec limite */}
          <div className="text-center space-y-4 p-6 bg-background rounded-lg border">
            <h4 className="font-semibold text-foreground">Communauté</h4>
            <div className="flex justify-center">
              <AvatarGroupWithTooltips 
                avatars={customAvatars}
                maxDisplay={5}
                showStatus={false}
                className="scale-110"
              />
            </div>
            <p className="text-sm text-muted-foreground">500+ membres actifs</p>
          </div>
        </div>

        {/* Démo interactive */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-background/50 backdrop-blur-sm border rounded-full px-6 py-3">
            <span className="text-sm font-medium text-foreground">
              Survolez les avatars pour voir les détails →
            </span>
            <AvatarGroupWithTooltips 
              avatars={customAvatars}
              maxDisplay={3}
              showStatus={true}
              delayDuration={100}
              className="transition-all duration-500 hover:scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
}