'use client';

import { Bar, ComposedChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

interface ReactBarChartProps {
  sizeClassName: string;
  data: {
    [field: string]: number | string;
  }[];
  xAxis: string;
  yAxis: string;
  fill?: string;
}
const ReactBarChart = ({ sizeClassName, data, xAxis, yAxis, fill = '#48de80' }: ReactBarChartProps) => {
  return (
    <div className={sizeClassName}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} maxBarSize={14} margin={{ bottom: -10 }}>
          <XAxis dataKey={xAxis} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ borderRadius: '4px', boxShadow: '4px 4px 4px 0px rgba(0, 0, 0, 0.1)' }} />
          <Bar type="monotone" dataKey={yAxis} fill={fill} yAxisId={0} style={{ borderRadius: 9999 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
export default ReactBarChart;
