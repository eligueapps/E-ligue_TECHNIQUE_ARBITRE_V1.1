
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CHART_DATA } from '../../constants';

const StatsChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={CHART_DATA}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
        barGap={10}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
        <YAxis orientation="right" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
        <Tooltip
          cursor={{ fill: 'rgba(239, 246, 255, 0.5)' }}
          contentStyle={{
            borderRadius: '0.75rem',
            borderColor: '#e5e7eb',
            fontFamily: 'Cairo Play, sans-serif'
          }}
        />
        <Legend wrapperStyle={{ fontSize: '14px' }}/>
        <Bar dataKey="matches" fill="#0057B8" name="المباريات" radius={[4, 4, 0, 0]} />
        <Bar dataKey="reports" fill="#FFD700" name="التقارير" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatsChart;
   