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
  Area
} from 'recharts';
 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';

// Type for chart data
interface ChartData {
  name: string;
  'Scans Conducted': number;
  'Detected Threats': number;
  'Blocked Attacks': number;
}

// Modern cybersecurity data with added field
const data: ChartData[] = [
  { name: 'Mon', 'Scans Conducted': 200, 'Detected Threats': 7, 'Blocked Attacks': 5 },
  { name: 'Tue', 'Scans Conducted': 180, 'Detected Threats': 5, 'Blocked Attacks': 3 },
  { name: 'Wed', 'Scans Conducted': 250, 'Detected Threats': 12, 'Blocked Attacks': 9 },
  { name: 'Thu', 'Scans Conducted': 230, 'Detected Threats': 6, 'Blocked Attacks': 5 },
  { name: 'Fri', 'Scans Conducted': 300, 'Detected Threats': 15, 'Blocked Attacks': 12 },
  { name: 'Sat', 'Scans Conducted': 210, 'Detected Threats': 4, 'Blocked Attacks': 2 },
  { name: 'Sun', 'Scans Conducted': 260, 'Detected Threats': 8, 'Blocked Attacks': 6 }
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <Paper 
        elevation={3}
        sx={{
          p: 1.5,
          borderRadius: 1,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          {label}
        </Typography>
        {payload.map((entry, index: number) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Box
              component="span"
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: entry.color,
                mr: 1,
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {entry.name}: <strong>{entry.value}</strong>
            </Typography>
          </Box>
        ))}
      </Paper>
    );
  }

  return null;
};

const SimpleLineChart: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <Paper 
          elevation={1}
          sx={{
            flex: '1 1 280px',
            p: 2,
            backgroundColor: 'rgba(25, 118, 210, 0.04)',
            borderRadius: 2,
            border: '1px solid rgba(25, 118, 210, 0.1)'
          }}
        >
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            Total Scans
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
            1,630
          </Typography>
          <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
            +12.5% from last week
          </Typography>
        </Paper>
        
        <Paper 
          elevation={1}
          sx={{
            flex: '1 1 280px',
            p: 2,
            backgroundColor: 'rgba(244, 67, 54, 0.04)',
            borderRadius: 2,
            border: '1px solid rgba(244, 67, 54, 0.1)'
          }}
        >
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            Total Threats
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#f44336' }}>
            57
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#f44336' }}>
            +23.8% from last week
          </Typography>
        </Paper>
        
        <Paper 
          elevation={1}
          sx={{
            flex: '1 1 280px',
            p: 2,
            backgroundColor: 'rgba(3, 169, 244, 0.04)',
            borderRadius: 2,
            border: '1px solid rgba(3, 169, 244, 0.1)'
          }}
        >
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            Defense Rate
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
            93.4%
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.secondary.main }}>
            +2.1% from last week
          </Typography>
        </Paper>
      </Box>
      
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart 
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f44336" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f44336" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#03a9f4" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#03a9f4" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7e57c2" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#7e57c2" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
          <XAxis 
            dataKey="name" 
            stroke="rgba(0, 0, 0, 0.5)"
            tick={{ fill: 'rgba(0, 0, 0, 0.6)' }}
          />
          <YAxis 
            stroke="rgba(0, 0, 0, 0.5)"
            tick={{ fill: 'rgba(0, 0, 0, 0.6)' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ 
              paddingTop: 20,
              fontWeight: 500
            }} 
          />
          
          <Area 
            type="monotone" 
            dataKey="Scans Conducted" 
            fill="url(#colorScans)" 
            stroke="#7e57c2"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Area
            type="monotone"
            dataKey="Detected Threats"
            fill="url(#colorThreats)"
            stroke="#f44336"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line 
            type="monotone" 
            dataKey="Blocked Attacks" 
            stroke="#03a9f4" 
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SimpleLineChart;