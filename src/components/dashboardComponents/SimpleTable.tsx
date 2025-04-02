import { useState, ReactElement } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip, { ChipProps } from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import ShieldIcon from '@mui/icons-material/Shield';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

interface ThreatData {
  id: number;
  name: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Pending' | 'Investigating' | 'Mitigated' | 'Resolved';
  date: string;
  source: string;
}

// Type for the status props return
interface StatusProps {
  color: ChipProps['color'];
  icon: ReactElement;
}

export default function SimpleTable() {
  const [threats, setThreats] = useState<ThreatData[]>([
    { 
      id: 1, 
      name: 'Advanced Phishing Campaign', 
      severity: 'High', 
      status: 'Investigating',
      date: '2025-02-26',
      source: 'Email Gateway'
    },
    { 
      id: 2, 
      name: 'Ransomware Detected', 
      severity: 'Critical', 
      status: 'Resolved',
      date: '2025-02-24',
      source: 'Endpoint Scanner'
    },
    { 
      id: 3, 
      name: 'DDoS Attempt', 
      severity: 'Medium', 
      status: 'Mitigated',
      date: '2025-02-25',
      source: 'Network Monitor'
    },
    { 
      id: 4, 
      name: 'Suspicious Login Activity', 
      severity: 'Medium', 
      status: 'Investigating',
      date: '2025-02-27',
      source: 'User Authentication'
    },
    { 
      id: 5, 
      name: 'Outdated Software Vulnerability', 
      severity: 'Low', 
      status: 'Pending',
      date: '2025-02-26',
      source: 'Vulnerability Scanner'
    },
  ]);

  const addThreat = () => {
    const newThreat: ThreatData = {
      id: threats.length + 1,
      name: 'New Threat Alert',
      severity: 'Low',
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      source: 'Manual Entry'
    };
    setThreats([...threats, newThreat]);
  };

  const removeThreat = (id: number) => {
    setThreats(threats.filter(threat => threat.id !== id));
  };

  // Helper function to get color for severity
  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'Critical': return '#d32f2f'; // Darker red
      case 'High': return '#f44336'; // Red
      case 'Medium': return '#ff9800'; // Orange
      case 'Low': return '#03a9f4'; // Light blue
      default: return '#03a9f4';
    }
  };

  // Helper function to get status styling
  const getStatusProps = (status: string): StatusProps => {
    switch (status) {
      case 'Resolved':
        return { 
          color: 'success', 
          icon: <ShieldIcon fontSize="small" />
        };
      case 'Investigating':
        return { 
          color: 'warning', 
          icon: <InfoIcon fontSize="small" />
        };
      case 'Mitigated':
        return { 
          color: 'info', 
          icon: <ShieldIcon fontSize="small" />
        };
      case 'Pending':
        return { 
          color: 'default', 
          icon: <InfoIcon fontSize="small" />
        };
      default:
        return { 
          color: 'default', 
          icon: <InfoIcon fontSize="small" />
        };
    }
  };

  // Function to render status chip with icon
  const renderStatusChip = (status: string) => {
    const { color, icon } = getStatusProps(status);
    
    return (
      <Chip
        icon={icon}
        label={status}
        color={color}
        size="small"
        variant="outlined"
        sx={{ 
          fontWeight: 500,
          fontSize: '0.75rem',
          borderRadius: '6px'
        }}
      />
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={addThreat}
          startIcon={<AddIcon />}
          sx={{ 
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)',
            fontWeight: 500,
            px: 2
          }}
        >
          Add Threat
        </Button>
      </Box>
      
      <TableContainer component={Paper} sx={{ 
        borderRadius: 2, 
        overflow: 'hidden',
        backgroundColor: 'white',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
        '& .MuiTableCell-root': {
          borderColor: 'rgba(0, 0, 0, 0.08)'
        }
      }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ 
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
              '& .MuiTableCell-root': {
                fontWeight: 600,
                color: 'rgba(0, 0, 0, 0.7)',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.5px'
              }
            }}>
              <TableCell padding="normal">Threat Details</TableCell>
              <TableCell padding="normal">Date</TableCell>
              <TableCell padding="normal">Source</TableCell>
              <TableCell padding="normal">Severity</TableCell>
              <TableCell padding="normal">Status</TableCell>
              <TableCell padding="normal" align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {threats.map((threat) => (
              <TableRow 
                key={threat.id}
                sx={{ 
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.02)' },
                  transition: 'background-color 0.2s ease'
                }}
              >
                <TableCell 
                  component="th" 
                  scope="row"
                  sx={{ 
                    fontWeight: threat.severity === 'Critical' ? 700 : 500,
                    color: threat.severity === 'Critical' ? '#d32f2f' : 'inherit'
                  }}
                >
                  {threat.name}
                </TableCell>
                <TableCell>{threat.date}</TableCell>
                <TableCell>{threat.source}</TableCell>
                <TableCell>
                  <Chip
                    label={threat.severity}
                    size="small"
                    sx={{
                      backgroundColor: `${getSeverityColor(threat.severity)}15`,
                      color: getSeverityColor(threat.severity),
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      borderRadius: '6px'
                    }}
                  />
                </TableCell>
                <TableCell>
                  {renderStatusChip(threat.status)}
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Tooltip title="Delete threat">
                      <IconButton 
                        color="error" 
                        onClick={() => removeThreat(threat.id)}
                        size="small"
                        sx={{ 
                          backgroundColor: 'rgba(244, 67, 54, 0.08)',
                          '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.15)' }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}