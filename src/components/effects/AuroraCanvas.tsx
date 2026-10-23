"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Lebendiges Marken-Polarlicht (Violett ↔ Türkis) als reiner WebGL-Fragment-Shader.
 * ─ kein three.js nötig, ~1 Draw-Call pro Frame
 * ─ rendert in halber Auflösung (das Licht ist ohnehin weich) → schont GPU & Akku
 * ─ pausiert außerhalb des Viewports, bei Reduced Motion nur ein Standbild
 * ─ darunter liegt immer ein CSS-Verlauf als Fallback (kein WebGL / Fehler)
 */

const VERTEX = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAGMENT = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uIntensity;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  float t = uTime * 0.045;

  vec2 q = vec2(fbm(p * 1.3 + vec2(t, -t)), fbm(p * 1.3 + vec2(3.1, 1.7) - t));
  vec2 r = vec2(fbm(p * 1.1 + q * 1.8 + vec2(1.7, 9.2) + t * 1.4),
                fbm(p * 1.1 + q * 1.8 + vec2(8.3, 2.8) - t));
  float f = fbm(p * 0.9 + r * 1.5);

  vec3 night  = vec3(0.043, 0.047, 0.102);
  vec3 violet = vec3(0.388, 0.333, 0.894);
  vec3 teal   = vec3(0.090, 0.639, 0.596);
  vec3 lilac  = vec3(0.788, 0.765, 1.0);

  vec3 col = night;
  col = mix(col, violet, smoothstep(0.42, 0.95, f) * 0.9);
  col = mix(col, teal, smoothstep(0.5, 0.95, r.y) * 0.6);
  col += lilac * pow(smoothstep(0.62, 1.0, f), 3.0) * 0.35;

  // Cursor-Licht
  vec2 m = vec2(uMouse.x * aspect, uMouse.y);
  float d = length(p - m);
  col += violet * 0.22 * exp(-d * d * 5.0);

  // Licht sammelt sich oben, unten läuft es in die Nacht aus
  float mask = smoothstep(-0.05, 0.75, uv.y) * (1.0 - smoothstep(0.55, 1.25, length((uv - vec2(0.5, 0.95)) * vec2(1.0, 1.4))));
  col = mix(night, col, clamp(mask * uIntensity, 0.0, 1.0));

  // Dithering gegen Banding
  col += (hash(gl_FragCoord.xy + uTime) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export default function AuroraCanvas({
  className,
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uIntensity = gl.getUniformLocation(program, "uIntensity");
    gl.uniform1f(uIntensity, intensity);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scale = 0.5;
    const mouse = { x: 0.65, y: 0.7, tx: 0.65, ty: 0.7 };

    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale));
      const h = Math.max(1, Math.floor(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    };

    let raf = 0;
    let visible = true;
    const start = performance.now() - 20000; // nicht mit „leerem" Muster starten

    const draw = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = () => {
      draw();
      if (visible && !reduced) raf = requestAnimationFrame(loop);
    };

    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduced) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    resize();
    draw();
    canvas.dataset.ready = "true";
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [intensity]);

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden bg-night", className)}>
      {/* CSS-Fallback & Grundlicht */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_10%,rgba(99,85,228,0.55),transparent_70%),radial-gradient(45%_40%_at_20%_20%,rgba(23,163,152,0.35),transparent_70%)]" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-[1600ms] data-[ready=true]:opacity-100"
      />
    </div>
  );
}
