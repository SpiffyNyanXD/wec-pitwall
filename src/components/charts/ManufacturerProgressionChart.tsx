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
  { round: 'R5\nSao Paulo', Ferrari: 148, Toyota: 84, Porsche: 65, Alpine: 41, BMW: 35, Cadillac: 27, Peugeot: 20, 'Aston Martin': 18 },
  { round: 'R6\nCOTA', Ferrari: 173, Toyota: 99, Porsche: 77, Alpine: 51, BMW: 43, Cadillac: 33, Peugeot: 24, 'Aston Martin': 20 },
  { round: 'R7\nFuji', Ferrari: 198, Toyota: 124, Porsche: 89, Alpine: 59, BMW: 49, Cadillac: 39, Peugeot: 28, 'Aston Martin': 22 },
  { round: 'R8\nBahrain', Ferrari: 236, Toyota: 163, Porsche: 107, Alpine: 71, BMW: 59, Cadillac: 47, Peugeot: 34, 'Aston Martin': 26 },
];

// 2024
const PROGRESSION_DATA_2024 = [
  { round: 'R1\nQatar', Porsche: 39, Toyota: 9, Ferrari: 12, Alpine: 15, BMW: 3, Cadillac: 12, Peugeot: 0, Lamborghini: 0 },
  { round: 'R2\nImola', Porsche: 53, Toyota: 43, Ferrari: 31, Alpine: 15, BMW: 15, Cadillac: 12, Peugeot: 4, Lamborghini: 0 },
  { round: 'R3\nSpa', Porsche: 83, Toyota: 58, Ferrari: 49, Alpine: 23, BMW: 21, Cadillac: 12, Peugeot: 4, Lamborghini: 0 },
  { round: 'R4\nLe Mans', Porsche: 108, Toyota: 96, Ferrari: 99, Alpine: 23, BMW: 21, Cadillac: 14, Peugeot: 4, Lamborghini: 2 },
  { round: 'R5\nSao Paulo', Porsche: 126, Toyota: 122, Ferrari: 109, Alpine: 25, BMW: 25, Cadillac: 14, Peugeot: 10, Lamborghini: 2 },
  { round: 'R6\nCOTA', Porsche: 141, Toyota: 147, Ferrari: 128, Alpine: 37, BMW: 37, Cadillac: 24, Peugeot: 12, Lamborghini: 2 },
  { round: 'R7\nFuji', Porsche: 161, Toyota: 151, Ferrari: 134, Alpine: 52, BMW: 49, Peugeot: 34, Cadillac: 30, Lamborghini: 11 },
  { round: 'R8\nBahrain', Toyota: 190, Porsche: 188, Ferrari: 137, Alpine: 70, BMW: 64, Peugeot: 57, Cadillac: 42, Lamborghini: 11 },
];

// 2026
const PROGRESSION_DATA_2026 = [
  { round: 'R1\nImola', Ferrari: 18, Toyota: 25, BMW: 16, 'Aston Martin': 6, Alpine: 4, Cadillac: 4, Peugeot: 0, Genesis: 0 },
  { round: 'R2\nSpa', Toyota: 50, Ferrari: 41, BMW: 41, 'Aston Martin': 14, Alpine: 12, Cadillac: 6, Peugeot: 6, Genesis: 4 },
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
  Genesis: '#B22222',
};

const ManufacturerProgressionChart = ({ season }: ManufacturerProgressionChartProps) => {
  const data = season === '2025' ? PROGRESSION_DATA_2025 : (season === '2024' ? PROGRESSION_DATA_2024 : PROGRESSION_DATA_2026);
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
            iconType="circle"
            iconSize={8}
            verticalAlign="bottom"
            align="center"
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