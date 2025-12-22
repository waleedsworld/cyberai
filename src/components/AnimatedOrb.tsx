import { useMemo } from "react";

type AnimatedOrbProps = {
  size?: number;
  className?: string;
};

const AnimatedOrb = ({ size = 620, className = "" }: AnimatedOrbProps) => {
  // Dust particles drifting upward around the orb
  const dust = useMemo(
    () =>
      Array.from({ length: 28 }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 7 + Math.random() * 7,
        size: 0.8 + Math.random() * 2.2,
        drift: (Math.random() - 0.5) * 80,
      })),
    []
  );

  // Orbital satellite dots
  const satellites = useMemo(
    () => [
      { radius: 46, start: 0, duration: 32, size: 4 },
      { radius: 49, start: 120, duration: 38, size: 3 },
      { radius: 43, start: 240, duration: 28, size: 2.5 },
    ],
    []
  );

  return (
    <div
      aria-hidden="true"
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Background aurora — drifts behind everything */}
      <div className="absolute inset-[-30%] pointer-events-none">
        <div
          className="absolute inset-0 aurora-drift opacity-80"
          style={{
            background:
              "radial-gradient(40% 60% at 30% 35%, rgba(208,32,48,0.45), transparent 65%), radial-gradient(50% 50% at 75% 70%, rgba(102,0,8,0.7), transparent 60%), radial-gradient(35% 45% at 50% 80%, rgba(255,90,102,0.28), transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Expanding ring pulses behind orb */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-[6%] rounded-full ring-expand"
          style={{
            border: "1px solid rgba(255,90,102,0.25)",
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute inset-[6%] rounded-full ring-expand"
          style={{
            border: "1px solid rgba(208,32,48,0.18)",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute inset-[6%] rounded-full ring-expand"
          style={{
            border: "1px solid rgba(255,180,187,0.14)",
            animationDelay: "4s",
          }}
        />
      </div>

      {/* Outer soft halo blob — morphs slowly */}
      <div className="absolute inset-[2%] sphere-blob-rev">
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(circle at 38% 32%, rgba(255,140,150,0.55) 0%, rgba(208,32,48,0.4) 20%, rgba(102,0,8,0.7) 50%, rgba(20,0,4,0.95) 88%)",
            filter: "blur(30px)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Main sphere — soft organic, morphing border */}
      <div className="absolute inset-[10%] sphere-blob overflow-hidden" style={{ borderRadius: "50%" }}>
        {/* Base ball */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 35% 28%, #ffd4d9 0%, #ff8a96 8%, #f52b43 24%, #d02030 38%, #660008 65%, #220000 88%, #050000 100%)",
            borderRadius: "inherit",
          }}
        />

        {/* Liquid swirl overlay 1 */}
        <div
          className="absolute inset-0 sphere-blob"
          style={{
            background:
              "radial-gradient(ellipse 70% 45% at 70% 60%, rgba(34,0,0,0.7), transparent 60%), radial-gradient(ellipse 55% 80% at 25% 75%, rgba(102,0,8,0.6), transparent 60%)",
            mixBlendMode: "multiply",
            borderRadius: "inherit",
          }}
        />

        {/* Liquid swirl overlay 2 — slower, opposite direction */}
        <div
          className="absolute inset-0 sphere-blob-rev opacity-70"
          style={{
            background:
              "radial-gradient(ellipse 60% 90% at 80% 25%, rgba(255,90,102,0.45), transparent 55%), radial-gradient(ellipse 90% 40% at 20% 80%, rgba(255,180,187,0.18), transparent 50%)",
            mixBlendMode: "screen",
            borderRadius: "inherit",
          }}
        />

        {/* Specular sheen — slowly drifts */}
        <div
          className="absolute inset-0 aurora-drift"
          style={{
            background:
              "radial-gradient(ellipse 22% 14% at 32% 24%, rgba(255,255,255,0.78), rgba(255,255,255,0.15) 28%, transparent 50%)",
            borderRadius: "inherit",
          }}
        />

        {/* Soft rim light */}
        <div
          className="absolute inset-0"
          style={{
            boxShadow:
              "inset 0 -50px 100px rgba(20,0,0,0.85), inset 0 40px 90px rgba(255,140,150,0.25), inset 28px 0 60px rgba(255,90,102,0.18), inset -28px 0 70px rgba(20,0,0,0.7)",
            borderRadius: "inherit",
          }}
        />

        {/* Internal volumetric light streak */}
        <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: "inherit" }}>
          <div
            className="absolute top-0 bottom-0 w-[55%] light-sweep"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,200,210,0.18), rgba(255,255,255,0.4), rgba(255,200,210,0.18), transparent)",
              filter: "blur(8px)",
              animationDelay: "1.5s",
            }}
          />
        </div>

        {/* Sub-surface noise / faint dotted texture */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full opacity-25 mix-blend-overlay"
          style={{ borderRadius: "inherit" }}
        >
          <defs>
            <radialGradient id="orbNoiseMask" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
            <filter id="orbNoise">
              <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="3" />
              <feColorMatrix
                values="0 0 0 0 1
                        0 0 0 0 0.55
                        0 0 0 0 0.6
                        0 0 0 0.35 0"
              />
            </filter>
          </defs>
          <rect width="100" height="100" filter="url(#orbNoise)" mask="url(#orbNoiseMask)" />
        </svg>
      </div>

      {/* Soft outer atmospheric ring */}
      <div
        className="absolute inset-[4%] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, transparent 56%, rgba(255,90,102,0.18) 58%, transparent 62%)",
          filter: "blur(6px)",
        }}
      />

      {/* Orbital satellite dots — small bright points orbiting */}
      <div className="absolute inset-0">
        {satellites.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 slow-spin"
            style={{
              animationDuration: `${s.duration}s`,
              transform: `rotate(${s.start}deg)`,
              animationDirection: i % 2 === 0 ? "normal" : "reverse",
            }}
          >
            <div
              className="absolute top-1/2 left-1/2 rounded-full"
              style={{
                width: s.size,
                height: s.size,
                marginTop: -(s.size / 2),
                marginLeft: -(s.size / 2),
                transform: `translateX(${s.radius}%)`,
                background: "rgba(255,220,225,0.95)",
                boxShadow:
                  "0 0 12px rgba(255,90,102,0.95), 0 0 24px rgba(255,90,102,0.55)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Drifting dust particles around orb */}
      <div className="absolute inset-[-10%] overflow-hidden pointer-events-none">
        {dust.map((p, i) => (
          <span
            key={i}
            className="absolute bottom-0 rounded-full"
            style={
              {
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: "rgba(255,180,187,0.9)",
                boxShadow: "0 0 6px rgba(255,90,102,0.75)",
                animation: `dust-rise ${p.duration}s ease-out ${p.delay}s infinite`,
                "--drift": `${p.drift}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Floating accent: subtle outer glow ring */}
      <div
        className="absolute -inset-12 rounded-full pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(circle, transparent 48%, rgba(208,32,48,0.18) 55%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />
    </div>
  );
};

export default AnimatedOrb;
