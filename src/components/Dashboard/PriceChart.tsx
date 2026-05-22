import React from 'react';
import { Box, Paper, Typography, Stack, Tooltip } from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { time: '10 AM', price: 43000 },
  { time: '1 PM', price: 44500 },
  { time: '4 PM', price: 42000 },
  { time: '7 PM', price: 41000 },
  { time: '10 PM', price: 43500 },
  { time: '1 AM', price: 42500 },
  { time: '4 AM', price: 44000 },
  { time: '7 AM', price: 43000 },
  { time: '10 AM', price: 44500 },
];

const PriceChart: React.FC = () => {
  return (
    <Box sx={{ height: 350, width: '100%', mt: 2, position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5e5ce6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#5e5ce6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="rgba(0,0,0,0.05)" 
          />
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#70707c', fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            hide 
            domain={['dataMin - 1000', 'dataMax + 1000']} 
          />
          <RechartsTooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <Paper sx={{ 
                    p: 1.5, 
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)', 
                    borderRadius: 3,
                    border: 'none',
                    textAlign: 'center'
                  }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                      -1,480.67 ↓
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                      ${payload[0].value?.toLocaleString()}
                    </Typography>
                  </Paper>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#5e5ce6"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorPrice)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
      
      {/* Tooltip Indicator Line (Mocking the 7PM selection in the image) */}
      <Box sx={{ 
        position: 'absolute', 
        left: 'calc(37.5% + 0px)', // Adjustment for 7PM position
        top: 0, 
        bottom: 50, 
        width: 2, 
        bgcolor: 'rgba(94, 92, 230, 0.2)',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#5e5ce6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none'
      }}>
         <Box sx={{ 
            width: 8, 
            height: 8, 
            borderRadius: '50%', 
            bgcolor: '#5e5ce6', 
            border: '2px solid white',
            boxShadow: '0 0 0 4px rgba(94, 92, 230, 0.2)',
            position: 'absolute',
            top: '75%' // Estimated point on curve
         }} />
      </Box>
    </Box>
  );
};

export default PriceChart;
