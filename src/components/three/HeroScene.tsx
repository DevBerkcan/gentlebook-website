"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/**
 * Stilisierte 3D-Visualisierung des Buchungsflows:
 * Ein organisch "atmender" Gradient-Körper (die Marke) wird von
 * schwebenden, abgerundeten Kalender-Kacheln (Termin-Slots) umkreist.
 * Bewusst low-poly & lichtarm gehalten → mobile-tauglich.
 */

const VIOLET = "#6355E4";
const TEAL = "#17A398";
const INK = "#14162B";

function GradientOrb() {
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    // Farbverlauf Violett ↔ Türkis langsam durchwandern
    const t = (Math.sin(clock.elapsedTime * 0.25) + 1) / 2;
    matRef.current.color.lerpColors(
      new THREE.Color(VIOLET),
      new THREE.Color(TEAL),
      t
    );
  });

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.9}>
      <mesh>
        <icosahedronGeometry args={[1.35, 24]} />
        <MeshDistortMaterial
          ref={matRef as never}
          color={VIOLET}
          distort={0.32}
          speed={1.6}
          roughness={0.18}
          metalness={0.15}
          clearcoat={0.6}
          clearcoatRoughness={0.4}
        />
      </mesh>
    </Float>
  );
}

/** Abgerundete "Termin-Kachel" mit Zeit-Balken (rein geometrisch, keine Texturen) */
function BookingTile({
  position,
  rotation,
  accent,
  delay = 0,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  accent: string;
  delay?: number;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime + delay;
    group.current.position.y = position[1] + Math.sin(t * 0.9) * 0.12;
    group.current.rotation.z = (rotation?.[2] ?? 0) + Math.sin(t * 0.5) * 0.04;
  });

  return (
    <group ref={group} position={position} rotation={rotation}>
      <RoundedBox args={[1.15, 0.72, 0.09]} radius={0.09} smoothness={4}>
        <meshStandardMaterial color="#ffffff" roughness={0.35} metalness={0.05} />
      </RoundedBox>
      {/* Akzent-Balken = gebuchter Slot */}
      <RoundedBox args={[0.78, 0.12, 0.02]} radius={0.05} position={[-0.08, 0.14, 0.06]}>
        <meshStandardMaterial color={accent} roughness={0.4} />
      </RoundedBox>
      <RoundedBox args={[0.5, 0.08, 0.02]} radius={0.04} position={[-0.22, -0.06, 0.06]}>
        <meshStandardMaterial color={INK} roughness={0.5} opacity={0.25} transparent />
      </RoundedBox>
      <RoundedBox args={[0.62, 0.08, 0.02]} radius={0.04} position={[-0.16, -0.22, 0.06]}>
        <meshStandardMaterial color={INK} roughness={0.5} opacity={0.15} transparent />
      </RoundedBox>
    </group>
  );
}

function OrbitingTiles() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.12;
  });

  const tiles = useMemo(
    () =>
      [
        { position: [2.15, 0.55, 0.2], accent: VIOLET, delay: 0 },
        { position: [-2.05, -0.35, 0.4], accent: TEAL, delay: 1.4 },
        { position: [0.4, -1.5, 1.4], accent: VIOLET, delay: 2.6 },
      ] as const,
    []
  );

  return (
    <group ref={group}>
      {tiles.map((t, i) => (
        <BookingTile
          key={i}
          position={t.position as unknown as [number, number, number]}
          rotation={[0, i * 0.4 - 0.4, i % 2 === 0 ? 0.06 : -0.06]}
          accent={t.accent}
          delay={t.delay}
        />
      ))}
    </group>
  );
}

function ParallaxRig() {
  // Sanfte Kamerabewegung mit der Maus (Desktop) — kein Orbit nötig
  useFrame(({ camera, pointer }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.4, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.25, 0.04);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene({ reduced }: { reduced?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.4], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
      aria-hidden="true"
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 5, 6]} intensity={1.1} />
      <directionalLight position={[-5, -2, 3]} intensity={0.35} color={TEAL} />
      <GradientOrb />
      <OrbitingTiles />
      {!reduced && <ParallaxRig />}
      <hemisphereLight args={["#ffffff", "#ECEBF2", 0.5]} />
    </Canvas>
  );
}
