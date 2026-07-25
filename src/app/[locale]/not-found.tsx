import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Hinweis: not-found.tsx erhält in Next.js keine Route-Params, daher zweisprachig.
export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-lavender/30 px-6 pt-24 text-center">
      <p className="font-display text-6xl font-semibold text-ink/15">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
        Seite nicht gefunden · Page not found
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-mist">
        Diese Seite existiert nicht oder wurde verschoben.
        <br />
        This page doesn&apos;t exist or has moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:shadow-lifted"
        >
          Zur Startseite · Homepage
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
