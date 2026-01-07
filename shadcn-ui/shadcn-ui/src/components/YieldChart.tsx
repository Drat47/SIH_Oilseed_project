import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface YieldChartProps {
  data: Array<{ month: string; predicted: number; actual?: number }>;
}

export default function YieldChart({ data }: YieldChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Yield Prediction Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis label={{ value: 'Yield (kg/ha)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="predicted" fill="#16A34A" name="Predicted Yield" />
            {data.some(d => d.actual) && <Bar dataKey="actual" fill="#0F766E" name="Actual Yield" />}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}