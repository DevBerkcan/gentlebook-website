"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { localizedPath, type Locale } from "@/lib/locales";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Dezente Sticky-CTA-Leiste, nur auf Mobilgeräten sichtbar, erscheint erst
 * nach dem Scrollen weg vom Hero (damit sie den primären Hero-CTA nicht doppelt).
 */
export default function MobileStickyCta({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 p-3 backdrop-blur-lg transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <Button href={localizedPath(locale, siteConfig.routes.register)} className="w-full justify-center">
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
