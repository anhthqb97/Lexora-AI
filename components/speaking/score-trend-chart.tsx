"use client";

type TrendPoint = {
  date: string;
  confidence: number;
  pronunciation: number;
  fluency: number;
  grammar: number;
  vocabulary: number;
};

type ScoreTrendChartProps = {
  points: TrendPoint[];
  metric?: keyof Omit<TrendPoint, "date">;
};

export function ScoreTrendChart({ points, metric = "confidence" }: ScoreTrendChartProps) {
  if (points.length === 0) {
    return <p className="py-8 text-center text-sm text-gray-500">Chưa có dữ liệu điểm số</p>;
  }

  const max = 100;
  const width = 320;
  const height = 120;
  const padding = 8;

  const coords = points.map((p, i) => {
    const x = padding + (i / Math.max(points.length - 1, 1)) * (width - padding * 2);
    const y = height - padding - ((p[metric] as number) / max) * (height - padding * 2);
    return `${x},${y}`;
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" aria-label="Score trend chart">
      <polyline fill="none" stroke="#0d9488" strokeWidth="2" points={coords.join(" ")} />
      {points.map((p, i) => {
        const x = padding + (i / Math.max(points.length - 1, 1)) * (width - padding * 2);
        const y = height - padding - ((p[metric] as number) / max) * (height - padding * 2);
        return <circle key={p.date} cx={x} cy={y} r="3" fill="#0d9488" />;
      })}
    </svg>
  );
}
