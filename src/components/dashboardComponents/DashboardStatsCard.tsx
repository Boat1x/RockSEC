import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  useTheme
} from '@mui/material';

// Icons
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface DashboardStatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  trend?: {
    value: string;
    isUp: boolean;
    text?: string;
  };
  bgcolor?: string;
}

const DashboardStatsCard: React.FC<DashboardStatsCardProps> = ({
  title,
  value,
  icon,
  color,
  trend,
  bgcolor = 'white'
}) => {
  const theme = useTheme();
  
  return (
    <Card 
      sx={{ 
        borderRadius: 2, 
        height: '100%',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0, 0, 0, 0.04)',
        bgcolor,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar 
            sx={{ 
              bgcolor: `${color}15`, 
              color: color, 
              mr: 2,
              width: 48,
              height: 48
            }}
          >
            {icon}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color }}>
              {value}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {title}
            </Typography>
          </Box>
        </Box>
        
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            {trend.isUp ? 
              <TrendingUpIcon sx={{ color, fontSize: 16, mr: 0.5 }} /> : 
              <TrendingDownIcon sx={{ color, fontSize: 16, mr: 0.5 }} />
            }
            <Typography variant="caption" sx={{ fontWeight: 500, color }}>
              {trend.value} {trend.text || 'from last week'}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardStatsCard;