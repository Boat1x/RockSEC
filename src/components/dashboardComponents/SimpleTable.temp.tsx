import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Button,
  Box,
  Typography,
  alpha,
  useTheme,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ArchiveIcon from '@mui/icons-material/Archive';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ShieldIcon from '@mui/icons-material/Shield';

// Define threat interface
interface Threat {
  id: number;
  name: string;
  date: string;
  source: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Investigating' | 'Resolved' | 'Pending' | 'Mitigated';
}

export default function SimpleTable() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedThreatId, setSelectedThreatId] = useState<number | null>(null);
  const open = Boolean(anchorEl);

  // Sample threat data
  const [threats] = useState<Threat[]>([
    { id: 1, name: 'Advanced Phishing Campaign', date: '2025-02-26', source: 'Email Gateway', severity: 'High', status: 'Investigating' },
    { id: 2, name: 'Ransomware Detected', date: '2025-02-24', source: 'Endpoint Scanner', severity: 'Critical', status: 'Resolved' },
    { id: 3, name: 'DDoS Attempt', date: '2025-02-25', source: 'Network Monitor', severity: 'Medium', status: 'Mitigated' },
    { id: 4, name: 'Suspicious Login Activity', date: '2025-02-27', source: 'User Authentication', severity: 'Medium', status: 'Investigating' },
    { id: 5, name: 'Outdated Software Vulnerability', date: '2025-02-26', source: 'Vulnerability Scanner', severity: 'Low', status: 'Pending' },
  ]);

  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, threatId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedThreatId(threatId);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedThreatId(null);
  };

  // Handle add threat
  const addThreat = () => {
    console.log('Add new threat');
    // Implementation would go here in a real app
  };

  // Handle delete threat
  const handleDeleteThreat = (id: number) => {
    console.log(`Delete threat ${id}`);
    // Implementation would go here in a real app
  };

  // Function to render severity chip with appropriate color and icon
  const renderSeverityChip = (severity: Threat['severity']) => {
    let bgColor = '';
    let textColor = '';
    let icon = <InfoIcon fontSize="small" />;

    switch (severity) {
      case 'Critical':
        icon = <ErrorIcon fontSize="small" />;
        bgColor = alpha('#f44336', 0.15);
        textColor = '#f44336';
        break;
      case 'High':
        icon = <WarningAmberIcon fontSize="small" />;
        bgColor = alpha('#f44336', 0.15);
        textColor = '#f44336';
        break;
      case 'Medium':
        icon = <WarningAmberIcon fontSize="small" />;
        bgColor = alpha('#ff9800', 0.15);
        textColor = '#ff9800';
        break;
      case 'Low':
        icon = <InfoIcon fontSize="small" />;
        bgColor = alpha('#2196f3', 0.15);
        textColor = '#2196f3';
        break;
    }

    return (
      <Chip
        icon={icon}
        label={severity}
        size="small"
        sx={{
          backgroundColor: bgColor,
          color: textColor,
          fontWeight: 600,
          borderRadius: '4px',
          '& .MuiChip-icon': {
            color: textColor,
            marginLeft: '4px',
          },
          px: 0.5,
        }}
      />
    );
  };

  // Function to render status chip with appropriate color and icon
  const renderStatusChip = (status: Threat['status']) => {
    let bgColor = '';
    let textColor = '';
    let icon = <InfoIcon fontSize="small" />;

    switch (status) {
      case 'Resolved':
        icon = <CheckCircleIcon fontSize="small" />;
        bgColor = alpha('#4caf50', 0.15);
        textColor = '#4caf50';
        break;
      case 'Investigating':
        icon = <WarningAmberIcon fontSize="small" />;
        bgColor = alpha('#ff9800', 0.15);
        textColor = '#ff9800';
        break;
      case 'Mitigated':
        icon = <ShieldIcon fontSize="small" />;
        bgColor = alpha('#2196f3', 0.15);
        textColor = '#2196f3';
        break;
      case 'Pending':
        icon = <PendingIcon fontSize="small" />;
        bgColor = alpha('#9e9e9e', 0.15);
        textColor = '#757575';
        break;
    }

    return (
      <Chip
        icon={icon}
        label={status}
        size="small"
        sx={{
          backgroundColor: bgColor,
          color: textColor,
          fontWeight: 600,
          borderRadius: '4px',
          '& .MuiChip-icon': {
            color: textColor,
            marginLeft: '4px',
          },
          px: 0.5,
        }}
      />
    );
  };

  return (
    <Card 
      sx={{ 
        borderRadius: 3, 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
        overflow: 'hidden',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        background: '#fff',
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            color: theme.palette.grey[800],
          }}
        >
          Recent Threats
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="small"
          onClick={addThreat}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.9),
            },
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Add Threat
        </Button>
      </Box>

      <CardContent sx={{ p: 0 }}>
        <TableContainer 
          component={Paper} 
          sx={{ 
            boxShadow: 'none',
            maxHeight: 400,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
              borderRadius: '4px',
            },
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="threat table">
            <TableHead>
              <TableRow sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.02) }}>
                <TableCell 
                  sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.grey[700],
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    py: 1.5,
                  }}
                >
                  Threat Details
                </TableCell>
                <TableCell 
                  sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.grey[700],
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    py: 1.5,
                  }}
                >
                  Date
                </TableCell>
                <TableCell 
                  sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.grey[700],
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    py: 1.5,
                  }}
                >
                  Source
                </TableCell>
                <TableCell 
                  sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.grey[700],
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    py: 1.5,
                  }}
                >
                  Severity
                </TableCell>
                <TableCell 
                  sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.grey[700],
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    py: 1.5,
                  }}
                >
                  Status
                </TableCell>
                <TableCell 
                  align="right"
                  sx={{ 
                    fontWeight: 600, 
                    color: theme.palette.grey[700],
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    py: 1.5,
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {threats.map((threat) => (
                <TableRow
                  key={threat.id}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.02) },
                    transition: 'background-color 0.2s',
                  }}
                >
                  <TableCell 
                    component="th" 
                    scope="row"
                    sx={{ 
                      fontWeight: 600, 
                      color: theme.palette.grey[800],
                      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    {threat.name}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      color: theme.palette.grey[700],
                      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    {threat.date}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      color: theme.palette.grey[700],
                      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    {threat.source}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    {renderSeverityChip(threat.severity)}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    {renderStatusChip(threat.status)}
                  </TableCell>
                  <TableCell 
                    align="right"
                    sx={{ 
                      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Tooltip title="More actions">
                        <IconButton
                          size="small"
                          onClick={(event) => handleMenuOpen(event, threat.id)}
                          sx={{ 
                            color: theme.palette.grey[600],
                            '&:hover': { 
                              backgroundColor: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main,
                            },
                          }}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete threat">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteThreat(threat.id)}
                          sx={{ 
                            color: theme.palette.error.main,
                            '&:hover': { 
                              backgroundColor: alpha(theme.palette.error.main, 0.1),
                            },
                            ml: 1,
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

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              borderRadius: 2,
              minWidth: 180,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              mt: 1,
              '& .MuiMenuItem-root': {
                fontSize: '0.875rem',
                py: 1,
              },
            },
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <VisibilityIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
            </ListItemIcon>
            <ListItemText primary="View Details" />
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <AssignmentIndIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />
            </ListItemIcon>
            <ListItemText primary="Assign" />
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <ArchiveIcon fontSize="small" sx={{ color: theme.palette.grey[600] }} />
            </ListItemIcon>
            <ListItemText primary="Archive" />
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
}
