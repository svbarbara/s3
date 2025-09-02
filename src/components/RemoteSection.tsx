import { WorldMap } from "@/components/ui/world-map";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { Globe, Wifi, MapPin, Users } from "lucide-react";

export function RemoteSection() {
  const { t, dir } = useTranslation();

  const features = [
    {
      icon: Globe,
      title: t('remote.feature1.title'),
      description: t('remote.feature1.description'),
      color: "from-primary to-accent"
    },
    {
      icon: Wifi,
      title: t('remote.feature2.title'),
      description: t('remote.feature2.description'),
      color: "from-primary-dark to-primary"
    },
    {
      icon: MapPin,
      title: t('remote.feature3.title'),
      description: t('remote.feature3.description'),
      color: "from-accent to-primary"
    },
    {
      icon: Users,
      title: t('remote.feature4.title'),
      description: t('remote.feature4.description'),
      color: "from-primary to-primary-dark"
    }
  ];

  return (
    <section id="remote" className="min-h-screen flex items-center py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" dir={dir}>
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-slate-900 dark:text-white">{t('remote.title.remote')} </span>
              <span className="text-neutral-400">
                {t('remote.title.business').split("").map((letter, idx) => (
                  <motion.span
                    key={idx}
                    className="inline-block"
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.04 }}
                    viewport={{ once: true }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {t('remote.subtitle.line1')}<br />
              {t('remote.subtitle.line2')}<br />
              {t('remote.subtitle.line3')}
            </p>
          </motion.div>
        </div>

        {/* World Map */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <WorldMap
              dots={[
                {
                  start: { lat: 40.7128, lng: -74.0060 }, // New York
                  end: { lat: 25.2048, lng: 52.2708 }, // Dubai - ajusté pour projection
                },
                {
                  start: { lat: 25.2048, lng: 52.2708 }, // Dubai - ajusté pour projection
                  end: { lat: 49.2, lng: 2.0 }, // Paris - ajusté pour projection
                },
                {
                  start: { lat: 49.2, lng: 2.0 }, // Paris - ajusté pour projection
                  end: { lat: 35.6762, lng: 139.6503 }, // Tokyo
                },
                {
                  start: { lat: 51.8, lng: -0.5 }, // London - ajusté pour projection
                  end: { lat: -33.8688, lng: 151.2093 }, // Sydney
                },
                {
                  start: { lat: 37.7749, lng: -122.4194 }, // San Francisco
                  end: { lat: -22.9068, lng: -43.1729 }, // Rio de Janeiro
                },
                {
                  start: { lat: 1.3521, lng: 103.8198 }, // Singapore
                  end: { lat: 19.4326, lng: -99.1332 }, // Mexico City
                },
                {
                  start: { lat: 25.2048, lng: 52.2708 }, // Dubai - ajusté pour projection
                  end: { lat: 51.8, lng: -0.5 }, // London - ajusté pour projection
                },
                {
                  start: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
                  end: { lat: 33.5731, lng: -7.5898 }, // Casablanca
                }
              ]}
              specialMarkers={[
                {
                  lat: 25.2048,
                  lng: 52.2708,
                  color: "#BBE0FD",
                  label: "Dubai HQ",
                  size: 6
                },
                {
                  lat: 49.2,
                  lng: 2.0,
                  color: "#00486D",
                  label: "Paris Office",
                  size: 5
                },
                {
                  lat: 51.8,
                  lng: -0.5,
                  color: "#00486D",
                  label: "London Office",
                  size: 5
                }
              ]}
              lineColor="#00486D"
            />
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-unified border border-slate-200 dark:border-slate-700 group-hover:-translate-y-2">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-700/50 shadow-unified-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {t('remote.cta.title')}
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
              {t('remote.cta.description.line1')}<br />{t('remote.cta.description.line2')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Globe className="w-4 h-4" />
                <span>{t('remote.cta.stat1')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Users className="w-4 h-4" />
                <span>{t('remote.cta.stat2')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}