import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ManufacturerProgressionChartProps {
  season: string;
}

// Points data per manufacturer per round — 2025 season (completed)
const PROGRESSION_DATA_2025 = [
  { round: 'R1\nQatar', Ferrari: 26, Toyota: 20, Porsche: 15, Alpine: 12, BMW: 10, Cadillac: 8, Peugeot: 6, 'Aston Martin': 4 },
  { round: 'R2\nImola', Ferrari: 51, Toyota: 38, Porsche: 28, Alpine: 22, BMW: 19, Cadillac: 14, Peugeot: 11, 'Aston Martin': 7 },
  { round: 'R3\nSpa', Ferrari: 76, Toyota: 58, Porsche: 44, Alpine: 31, BMW: 27, Cadillac: 21, Peugeot: 16, 'Aston Martin': 10 },
  { round: 'R4\nLe Mans', Ferrari: 133, Toyota: 59, Porsche: 50, Alpine: 31, BMW: 27, Cadillac: 21, Peugeot: 16, 'Aston Martin': 16 },
];

// 2026 — only R1 Imola completed so far
const PROGRESSION_DATA_2026 = [
  { round: 'R1\nQatar', Ferrari: 46, Toyota: 50, Alpine: 22, BMW: 30, Cadillac: 14, Peugeot: 6, 'Aston Martin': 8 },
];

const MANUFACTURER_COLORS: Record<string, string> = {
  Ferrari: '#DC0000',
  Toyota: '#E60012',
  Porsche: '#C4A747',
  Alpine: '#0039A6',
  BMW: '#1C69D4',
  Cadillac: '#6B9FD4',
  Peugeot: '#E8C840',
  'Aston Martin': '#005140',
};

const ManufacturerProgressionChart = ({ season }: ManufacturerProgressionChartProps) => {
  const data = season === '2025' ? PROGRESSION_DATA_2025 : PROGRESSION_DATA_2026;
  const manufacturers = Object.keys(MANUFACTURER_COLORS).filter(m =>
    data.some(d => (d as Record<string, number | string>)[m] !== undefined)
  );

  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-bold text-foreground mb-1">
        Manufacturers Championship — {season}
      </h2>
      <p className="text-xs text-muted-foreground mb-6">
        Cumulative points after each round
      </p>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="round"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            interval={0}
          />
          <YAxis
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            width={40}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--foreground))',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))' }}
          />
          {manufacturers.map(manufacturer => (
            <Line
              key={manufacturer}
              type="monotone"
              dataKey={manufacturer}
              stroke={MANUFACTURER_COLORS[manufacturer]}
              strokeWidth={2}
              dot={{ r: 4, fill: MANUFACTURER_COLORS[manufacturer] }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ManufacturerProgressionChart;