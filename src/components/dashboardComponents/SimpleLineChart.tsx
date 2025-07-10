import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ReferenceLine
} from 'recharts';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme, alpha } from '@mui/material';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';

// Type for chart data
interface ChartData {
  name: string;
  scans: number;
  threats: number;
  blocked: number;
}

// Sample data for the chart
const data = [
  { name: 'Mon', scans: 210, threats: 40, blocked: 30 },
  { name: 'Tue', scans: 190, threats: 45, blocked: 35 },
  { name: 'Wed', scans: 230, threats: 50, blocked: 45 },
  { name: 'Thu', scans: 225, threats: 55, blocked: 50 },
  { name: 'Fri', scans: 300, threats: 60, blocked: 55 },
  { name: 'Sat', scans: 220, threats: 50, blocked: 45 },
  { name: 'Sun', scans: 250, threats: 55, blocked: 50 },
];

// Colors for the chart
const COLORS = {
  primary: '#6366f1',
  danger: '#ef4444',
  info: '#06b6d4',
  success: '#10b981',
  warning: '#f59e0b',
  purple: '#8b5cf6',
  pink: '#ec4899',
  dark: '#111827',
  grey: '#9ca3af',
  chartPurple: '#9d6cff',
  chartPurpleLight: '#e9dfff',
  chartBlue: '#3e97ff',
  chartRed: '#ff5e5e',
};

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          backdropFilter: 'blur(8px)',
          background: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: COLORS.dark }}>
          {label}
        </Typography>
        
        {payload.map((entry: any, index: number) => {
          let color = COLORS.chartPurple;
          if (entry.dataKey === 'threats') color = COLORS.chartRed;
          if (entry.dataKey === 'blocked') color = COLORS.chartBlue;
          
          return (
            <Box key={`item-${index}`} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Box 
                sx={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  backgroundColor: color,
                  mr: 1
                }} 
              />
              <Typography variant="body2" sx={{ mr: 1, color: 'rgba(0, 0, 0, 0.6)' }}>
                {entry.dataKey === 'scans' ? 'Scans Conducted' : 
                 entry.dataKey === 'threats' ? 'Detected Threats' : 
                 'Blocked Attacks'}:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: COLORS.dark }}>
                {entry.value}
              </Typography>
            </Box>
          );
        })}
      </Paper>
    );
  }
  return null;
};

const SimpleLineChart: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Box>
      <Card sx={{ 
        borderRadius: 3, 
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        p: 3,
        position: 'relative',
        overflow: 'hidden',
        mb: 4,
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '8px',
          background: `linear-gradient(90deg, ${COLORS.chartPurple} 0%, ${COLORS.chartBlue} 100%)`,
        }
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            mb: 3,
            color: COLORS.dark,
            display: 'flex',
            alignItems: 'center',
            '&:after': {
              content: '""',
              display: 'block',
              width: '30px',
              height: '2px',
              background: `linear-gradient(90deg, ${COLORS.chartPurple} 0%, ${COLORS.chartBlue} 100%)`,
              marginLeft: '10px',
            }
          }}
        >
          Threat Activity
        </Typography>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={data} margin={{ top: 10, right: 30, bottom: 20, left: 10 }}>
                <defs>
                  <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.chartPurple} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={COLORS.chartPurpleLight} stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.chartBlue} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={COLORS.chartBlue} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.chartRed} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={COLORS.chartRed} stopOpacity={0} />
                  </linearGradient>
                </defs>
                
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false} 
                  stroke="rgba(0,0,0,0.03)" 
                />
                
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(0,0,0,0.5)', fontSize: 12 }}
                  dy={10}
                  padding={{ left: 20, right: 20 }}
                />
                
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(0,0,0,0.5)', fontSize: 12 }}
                  dx={-10}
                  domain={[0, 350]}
                  ticks={[0, 75, 150, 225, 300]}
                  padding={{ top: 20, bottom: 20 }}
                />
                
                <Tooltip content={<CustomTooltip />} />
                
                <Area 
                  type="monotone" 
                  dataKey="scans" 
                  fill="url(#colorPurple)" 
                  stroke="none"
                  fillOpacity={1}
                  activeDot={false}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                  isAnimationActive={true}
                />
                
                <Line 
                  type="monotone" 
                  dataKey="scans" 
                  stroke={COLORS.chartPurple}
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 8, fill: COLORS.chartPurple, stroke: '#fff', strokeWidth: 2 }}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
                
                <Line 
                  type="monotone" 
                  dataKey="threats" 
                  stroke={COLORS.chartRed}
                  strokeWidth={2}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6, fill: COLORS.chartRed, stroke: '#fff', strokeWidth: 2 }}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
                
                <Line 
                  type="monotone" 
                  dataKey="blocked" 
                  stroke={COLORS.chartBlue} 
                  strokeWidth={2}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6, fill: COLORS.chartBlue, stroke: '#fff', strokeWidth: 2 }}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
              </ComposedChart>
            </ResponsiveContainer>
      </Card>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Box sx={{ flex: '1 1 300px' }}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '40%',
              height: '100%',
              background: `linear-gradient(135deg, ${alpha(COLORS.chartPurple, 0)} 0%, ${alpha(COLORS.chartPurple, 0.05)} 100%)`,
              zIndex: 0
            }
          }}>
            <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(0, 0, 0, 0.6)', 
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontSize: '0.75rem',
                  mb: 1
                }}
              >
                Total Scans
              </Typography>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 700, 
                  color: COLORS.chartPurple, 
                  mb: 1,
                  letterSpacing: '-0.5px',
                  textShadow: `0 2px 4px ${alpha(COLORS.chartPurple, 0.15)}`
                }}
              >
                1,630
              </Typography>
              <Chip 
                label="+12.5% from last week" 
                size="small"
                sx={{ 
                  backgroundColor: alpha(COLORS.chartPurple, 0.1),
                  color: COLORS.chartPurple,
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 1
                }}
              />
            </CardContent>
          </Card>
        </Box>
        
        <Box sx={{ flex: '1 1 300px' }}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '40%',
              height: '100%',
              background: `linear-gradient(135deg, ${alpha(COLORS.chartRed, 0)} 0%, ${alpha(COLORS.chartRed, 0.05)} 100%)`,
              zIndex: 0
            }
          }}>
            <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(0, 0, 0, 0.6)', 
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontSize: '0.75rem',
                  mb: 1
                }}
              >
                Total Threats
              </Typography>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 700, 
                  color: COLORS.chartRed, 
                  mb: 1,
                  letterSpacing: '-0.5px',
                  textShadow: `0 2px 4px ${alpha(COLORS.chartRed, 0.15)}`
                }}
              >
                57
              </Typography>
              <Chip 
                label="+23.8% from last week" 
                size="small"
                sx={{ 
                  backgroundColor: alpha(COLORS.chartRed, 0.1),
                  color: COLORS.chartRed,
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 1
                }}
              />
            </CardContent>
          </Card>
        </Box>
        
        <Box sx={{ flex: '1 1 300px' }}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '40%',
              height: '100%',
              background: `linear-gradient(135deg, ${alpha(COLORS.chartBlue, 0)} 0%, ${alpha(COLORS.chartBlue, 0.05)} 100%)`,
              zIndex: 0
            }
          }}>
            <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(0, 0, 0, 0.6)', 
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontSize: '0.75rem',
                  mb: 1
                }}
              >
                Defense Rate
              </Typography>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 700, 
                  color: COLORS.chartBlue, 
                  mb: 1,
                  letterSpacing: '-0.5px',
                  textShadow: `0 2px 4px ${alpha(COLORS.chartBlue, 0.15)}`
                }}
              >
                93.4%
              </Typography>
              <Chip 
                label="+2.1% from last week" 
                size="small"
                sx={{ 
                  backgroundColor: alpha(COLORS.chartBlue, 0.1),
                  color: COLORS.chartBlue,
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 1
                }}
              />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default SimpleLineChart;