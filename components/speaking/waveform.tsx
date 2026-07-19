"use client";

type WaveformProps = {
  active: boolean;
};

export function Waveform({ active }: WaveformProps) {
  const bars = Array.from({ length: 24 }, (_, i) => i);
  return (
    <div className="flex h-12 items-center justify-center gap-0.5" aria-hidden>
      {bars.map((i) => (
        <div
          key={i}
          className={`w-1 rounded-full bg-lexora-teal transition-all ${
            active ? "animate-pulse" : "opacity-30"
          }`}
          style={{
            height: active ? `${12 + (i % 5) * 8}px` : "8px",
            animationDelay: `${i * 50}ms`,
          }}
        />
      ))}
    </div>
  );
}
