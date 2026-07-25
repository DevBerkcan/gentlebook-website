"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// 3D nur client-seitig & lazy — hält das Initial-Bundle klein
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <StaticFallback />,
});

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/** Statisches Fallback-Visual (SVG) für schwache Geräte / WebGL-Fehler / Reduced Motion */
function StaticFallback() {
  return (
    <Image
      src="/hero-fallback.svg"
      alt=""
      aria-hidden="true"
      fill
      priority
      sizes="(max-width: 1024px) 90vw, 620px"
      className="object-contain"
    />
  );
}

export default function HeroVisual() {
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<"pending" | "3d" | "static">("pending");
  const [crashed, setCrashed] = useState(false);

  useEffect(() => {
    // Heuristik: kein WebGL, sehr kleine Geräte oder wenige Kerne → statisch
    const lowEnd =
      typeof navigator !== "undefined" &&
      (navigator.hardwareConcurrency ?? 8) <= 2;
    const smallScreen = window.innerWidth < 480;

    if (!supportsWebGL() || lowEnd || smallScreen) {
      setMode("static");
    } else {
      setMode("3d");
    }
  }, []);

  // WebGL-Context-Verlust zur Laufzeit → sauber auf statisch wechseln
  useEffect(() => {
    const onLost = () => setCrashed(true);
    window.addEventListener("webglcontextlost", onLost, true);
    return () => window.removeEventListener("webglcontextlost", onLost, true);
  }, []);

  const showStatic = mode === "static" || crashed || (reduced && mode !== "3d");

  return (
    <div className="relative h-full w-full" role="presentation">
      {mode === "pending" || showStatic ? (
        <StaticFallback />
      ) : (
        <HeroScene reduced={reduced} />
      )}
    </div>
  );
}
