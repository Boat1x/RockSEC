import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  useTheme,
  alpha
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
        borderRadius: 3, 
        height: '100%',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
        border: '1px solid rgba(0, 0, 0, 0.04)',
        bgcolor,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 12px 28px rgba(0, 0, 0, 0.1)',
          '& .card-icon': {
            transform: 'scale(1.1) rotate(5deg)'
          }
        },
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '30%',
          height: '100%',
          background: `linear-gradient(135deg, ${alpha(color, 0)} 0%, ${alpha(color, 0.05)} 100%)`,
          zIndex: 0
        }
      }}
    >
      <CardContent sx={{ position: 'relative', zIndex: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h4" sx={{ 
              fontWeight: 700, 
              color, 
              mb: 0.5, 
              letterSpacing: '-0.5px',
              textShadow: `0 2px 4px ${alpha(color, 0.15)}`
            }}>
              {value}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(0, 0, 0, 0.6)', 
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontSize: '0.75rem'
              }}
            >
              {title}
            </Typography>
          </Box>
          
          <Avatar 
            className="card-icon"
            sx={{ 
              bgcolor: alpha(color, 0.15), 
              color: color, 
              width: 56,
              height: 56,
              boxShadow: `0 4px 12px ${alpha(color, 0.25)}`,
              transition: 'transform 0.3s ease'
            }}
          >
            {icon}
          </Avatar>
        </Box>
        
        {trend && (
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mt: 2,
              py: 0.75,
              px: 1.5,
              borderRadius: 2,
              backgroundColor: alpha(color, 0.08),
              width: 'fit-content'
            }}
          >
            {trend.isUp ? 
              <TrendingUpIcon sx={{ color, fontSize: 18, mr: 0.75 }} /> : 
              <TrendingDownIcon sx={{ color, fontSize: 18, mr: 0.75 }} />
            }
            <Typography variant="caption" sx={{ fontWeight: 600, color, letterSpacing: '0.25px' }}>
              {trend.value} {trend.text || 'from last week'}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardStatsCard;