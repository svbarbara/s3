import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useTranslation } from "@/hooks/useTranslation";
const officeImage = "/hero-business.jpg";

export function TeamSection() {
  const { t, dir } = useTranslation();

  const teamMembers = [
    {
      quote: t("team.member1.quote"),
      name: t("team.member1.name"),
      designation: t("team.member1.designation"),
      src: officeImage,
    },
  ];

  return (
    <section
      id="team"
      className="min-h-screen flex items-center py-16 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
      dir={dir}
    >
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-6">
            {t("team.title")}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {t("team.subtitle")}
          </p>
        </div>

        <div className={dir === "rtl" ? "rtl-arrows" : ""}>
          <AnimatedTestimonials
            testimonials={teamMembers}
            autoplay={true}
            className="py-0"
          />
        </div>
      </div>
    </section>
  );
}
