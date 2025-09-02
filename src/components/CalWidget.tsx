import { useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export function CalWidget() {
  const { t, dir } = useTranslation();

  useEffect(() => {
    // Load Cal.com widget script and initialize
    const script = document.createElement("script");
    script.innerHTML = `
      (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", "30min", {origin:"https://app.cal.com"});

      Cal.ns["30min"]("inline", {
        elementOrSelector:"#my-cal-inline-30min",
        config: {"layout":"month_view"},
        calLink: "suites-ventures/30min",
      });

      Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    `;
    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      const existingScript = document.querySelector(
        'script[src="https://app.cal.com/embed/embed.js"]',
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <section id="cal-widget" className="py-20 bg-background" dir={dir}>
      <div className="section-container">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t("cal.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("cal.subtitle")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card-elevated p-8">
            {/* Cal.com inline widget */}
            <div
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              id="my-cal-inline-30min"
              className="cal-widget"
            ></div>

            {/* Fallback content */}
            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">{t("cal.fallback")}</p>
              <a
                href="tel:+33123456789"
                className="text-primary hover:text-primary-dark font-semibold"
              >
                +33 (0)1 23 45 67 89
              </a>
            </div>
          </div>
        </div>

        {/* Benefits reminder */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary font-semibold">1</span>
            </div>
            <h4 className="font-semibold text-foreground mb-2">
              {t("cal.step1.title")}
            </h4>
            <p className="text-sm text-muted-foreground">
              {t("cal.step1.description")}
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary font-semibold">2</span>
            </div>
            <h4 className="font-semibold text-foreground mb-2">
              {t("cal.step2.title")}
            </h4>
            <p className="text-sm text-muted-foreground">
              {t("cal.step2.description")}
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-primary font-semibold">3</span>
            </div>
            <h4 className="font-semibold text-foreground mb-2">
              {t("cal.step3.title")}
            </h4>
            <p className="text-sm text-muted-foreground">
              {t("cal.step3.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
