'use client';

import { Area, Bar, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface ReactComposedChartProps {
  sizeClassName?: string;
  data: {
    [field: string]: number | string;
  }[];
  xAxis: string;
  yAxis1: string;
  yAxis2: string;
  fill1?: string;
  fill2?: string;
  gradientStart?: number;
  gradientEnd?: number;
}
const ReactComposedChart = ({
  sizeClassName = 'w-full h-80',
  data,
  xAxis,
  yAxis1,
  yAxis2,
  fill1 = 'rgba(99,102,241,1)',
  fill2 = 'rgba(130,202,157,1)',
  gradientStart = 0.8,
  gradientEnd = 0,
}: ReactComposedChartProps) => {
  return (
    <div className={sizeClassName}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} maxBarSize={14} margin={{ left: 10 }}>
          <CartesianGrid vertical={false} stroke="rgba(209,213,219,0.7)" />
          <XAxis dataKey={xAxis} tickLine={false} axisLine={false} />
          <YAxis dataKey={yAxis1} tickLine={false} axisLine={false} orientation="left" yAxisId={yAxis1} />
          <YAxis dataKey={yAxis2} tickLine={false} axisLine={false} orientation="right" yAxisId={yAxis2} />
          <Tooltip contentStyle={{ borderRadius: '4px', boxShadow: '4px 4px 4px 0px rgba(0, 0, 0, 0.1)' }} />
          <Area
            type="monotone"
            dataKey={yAxis1}
            fill={`url(#color${yAxis1})`}
            stroke={fill1}
            yAxisId={yAxis1}
            style={{ borderRadius: 9999 }}
          />
          <Bar
            type="monotone"
            dataKey={yAxis2}
            fill={`url(#color${yAxis2})`}
            stroke={fill2}
            yAxisId={yAxis2}
            style={{ borderRadius: 9999 }}
          />
          <defs>
            <linearGradient id={`color${yAxis1}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={fill1} stopOpacity={gradientStart} />
              <stop offset="95%" stopColor={fill1} stopOpacity={gradientEnd} />
            </linearGradient>
            <linearGradient id={`color${yAxis2}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={fill2} stopOpacity={gradientStart} />
              <stop offset="95%" stopColor={fill2} stopOpacity={gradientEnd} />
            </linearGradient>
          </defs>
          <Legend />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
export default ReactComposedChart;
