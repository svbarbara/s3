import { Globe as GlobeComponent } from "@/components/ui/globe";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { Globe, Wifi, MapPin, Users } from "lucide-react";

export function RemoteSectionWithGlobe() {
  const { t, dir } = useTranslation();

  const features = [
    {
      icon: Globe,
      title: t("remote.feature1.title"),
      description: t("remote.feature1.description"),
      color: "from-primary to-accent",
    },
    {
      icon: Wifi,
      title: t("remote.feature2.title"),
      description: t("remote.feature2.description"),
      color: "from-primary-dark to-primary",
    },
    {
      icon: MapPin,
      title: t("remote.feature3.title"),
      description: t("remote.feature3.description"),
      color: "from-accent to-primary",
    },
    {
      icon: Users,
      title: t("remote.feature4.title"),
      description: t("remote.feature4.description"),
      color: "from-primary to-primary-dark",
    },
  ];

  return (
    <section
      id="remote-globe"
      className="min-h-screen flex items-center py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
      dir={dir}
    >
      <div className="section-container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-slate-900 dark:text-white">
                {t("remote.title.remote")}{" "}
              </span>
              <motion.span
                className="text-neutral-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {t("remote.title.business")}
              </motion.span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {t("remote.subtitle.line1")}
              <br />
              {t("remote.subtitle.line2")}
              <br />
              {t("remote.subtitle.line3")}
            </p>
          </motion.div>
        </div>

        {/* Features and Globe Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-16 items-center mb-16">
          {/* Features Grid - Left Side */}
          <motion.div
            className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-unified border border-slate-200 dark:border-slate-700 hover:-translate-y-1 h-full flex flex-col transition-transform duration-200">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-grow flex flex-col">
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                        {feature.title}
                      </h3>

                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed flex-grow">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Globe - Right Side */}
          <div className="xl:col-span-2 flex justify-center items-center min-h-[400px] md:min-h-[500px] xl:min-h-[600px] xl:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[500px] md:h-[500px] xl:w-[600px] xl:h-[600px] flex items-center justify-center overflow-visible"
            >
              <GlobeComponent className="top-0" />
              <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.15),rgba(255,255,255,0))]" />
            </motion.div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-700/50 shadow-unified-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {t("remote.cta.title")}
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
              {t("remote.cta.description.line1")}
              <br />
              {t("remote.cta.description.line2")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Globe className="w-4 h-4" />
                <span>{t("remote.cta.stat1")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Users className="w-4 h-4" />
                <span>{t("remote.cta.stat2")}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
