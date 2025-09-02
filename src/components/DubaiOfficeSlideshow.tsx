import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

type Slide = { base: string; ext: "jpg" | "png"; alt: string };

// Noms de fichiers présents dans /public (sans extension)
const slides: Slide[] = [
  { base: "dubai-office-1", ext: "jpg", alt: "Bureau moderne à Dubai Marina" },
  { base: "dubai-office-2", ext: "jpg", alt: "Espace de travail DIFC Dubai" },
  { base: "dubai-office-3", ext: "jpg", alt: "Centre d'affaires Dubai Downtown" },
  { base: "new-image-1",    ext: "png", alt: "Nouvelle image ajoutée au slideshow" },
  { base: "dubai-office-4", ext: "jpg", alt: "Bureau exécutif Business Bay Dubai" },
  { base: "dubai-office-5", ext: "jpg", alt: "Salle de réunion Dubai Free Zone" },
  { base: "dubai-office-6", ext: "jpg", alt: "Espace coworking Dubai Silicon Oasis" },
  { base: "new-image-2",    ext: "png", alt: "Nouvelle image ajoutée au slideshow" },
  { base: "dubai-office-7", ext: "jpg", alt: "Bureau panoramique Burj Khalifa District" },

  { base: "dubai1", ext: "jpg", alt: "Vue aérienne de Dubai Marina" },
  { base: "dubai2", ext: "jpg", alt: "Skyline de Dubai au coucher du soleil" },
  { base: "dubai3", ext: "jpg", alt: "Centre financier international de Dubai" },
  { base: "dubai4", ext: "jpg", alt: "Architecture moderne de Dubai" },
  { base: "new-image-3", ext: "png", alt: "Nouvelle image ajoutée au slideshow" },
  { base: "dubai5", ext: "jpg", alt: "Quartier d'affaires de Dubai" },
  { base: "dubai6", ext: "jpg", alt: "Towers de Dubai Business Bay" },
  { base: "dubai7", ext: "jpg", alt: "Vue panoramique de Dubai City" },
  { base: "dubai8", ext: "jpg", alt: "Gratte-ciel de Dubai Downtown" },
  { base: "dubai9", ext: "jpg", alt: "Horizon de Dubai illuminé" },

  { base: "us1", ext: "jpg", alt: "Modern US office space" },
  { base: "us2", ext: "jpg", alt: "American business district" },
  { base: "us3", ext: "jpg", alt: "Contemporary US workspace" },
  { base: "us4", ext: "jpg", alt: "US corporate headquarters" },
  { base: "us5", ext: "jpg", alt: "American commercial building" },
  { base: "us6", ext: "jpg", alt: "US business center interior" },
  { base: "new-image-4", ext: "png", alt: "Nouvelle image ajoutée au slideshow" },
  { base: "us7", ext: "jpg", alt: "American office building exterior" },
  { base: "us8", ext: "jpg", alt: "Downtown US skyline at dusk" },
];

export function DubaiOfficeSlideshow() {
  const { dir } = useTranslation();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl group shadow-unified">
      {slides.map((s, i) => {
        const visible = i === idx;
        const eager = i === 0;

        return (
          <picture
            key={`${s.base}-${i}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${visible ? "opacity-100" : "opacity-0"}`}
          >
            {/* Formats modernes d'abord (générés par ton script) */}
            <source srcSet={`/${s.base}.avif`} type="image/avif" />
            <source srcSet={`/${s.base}.webp`} type="image/webp" />
            {/* Fallback */}
            <img
              src={`/${s.base}.${s.ext}`}
              alt={s.alt}
              className="w-full h-full object-cover"
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={eager ? ("high" as any) : undefined}
              dir={dir}
            />
          </picture>
        );
      })}
    </div>
  );
}
