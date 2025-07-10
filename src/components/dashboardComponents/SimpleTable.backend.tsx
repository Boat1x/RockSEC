import React, { useState, useEffect, useContext } from 'react';
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
  Tooltip,
  CircularProgress,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent
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
import { AuthContext } from '../../context/AuthContext';
import { ThreatApi } from '../../backend';

// Define threat interface to match the backend model
interface Threat {
  id: string;
  threatType: string;
  detectedDate: string;
  source?: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'mitigated' | 'false_positive';
  affectedSystems?: string[];
  description?: string;
  remediationSteps?: string;
  clientId: string;
  lastUpdated?: string;
}

// New threat form data interface
interface ThreatFormData {
  threatType: string;
  severity: Threat['severity'];
  status: Threat['status'];
  description: string;
  affectedSystems: string;
}

export default function SimpleTable() {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedThreatId, setSelectedThreatId] = useState<string | null>(null);
  const [threats, setThreats] = useState<Threat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{open: boolean, message: string, severity: 'success' | 'error'}>({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<ThreatFormData>({
    threatType: '',
    severity: 'medium',
    status: 'active',
    description: '',
    affectedSystems: ''
  });
  
  // Default client ID - in a real app, this would come from context or props
  const clientId = "client123";
  
  useEffect(() => {
    fetchThreats();
  }, []);
  
  // Fetch threats from the backend
  const fetchThreats = async () => {
    setLoading(true);
    try {
      const response = await ThreatApi.getThreats(clientId, user?.id || 'anonymous');
      if (response.success && response.data) {
        setThreats(response.data);
      } else {
        setError(response.error || 'Failed to fetch threats');
      }
    } catch (err) {
      setError('An error occurred while fetching threats');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, threatId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedThreatId(threatId);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedThreatId(null);
  };
  
  // Handle add threat dialog open
  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };
  
  // Handle add threat dialog close
  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    // Reset form data
    setFormData({
      threatType: '',
      severity: 'medium',
      status: 'active',
      description: '',
      affectedSystems: ''
    });
  };
  
  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle select changes
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle add threat submission
  const handleAddThreatSubmit = async () => {
    try {
      const response = await ThreatApi.createThreat({
        clientId,
        threatType: formData.threatType,
        severity: formData.severity,
        status: formData.status,
        description: formData.description,
        affectedSystems: formData.affectedSystems.split(',').map(s => s.trim()),
      }, user?.id || 'anonymous');
      
      if (response.success) {
        setSnackbar({
          open: true,
          message: 'Threat added successfully',
          severity: 'success'
        });
        fetchThreats(); // Refresh the threats list
        handleAddDialogClose();
      } else {
        setSnackbar({
          open: true,
          message: response.error || 'Failed to add threat',
          severity: 'error'
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'An error occurred while adding the threat',
        severity: 'error'
      });
      console.error(err);
    }
  };
  
  // Handle delete threat dialog open
  const handleDeleteDialogOpen = (id: string) => {
    setSelectedThreatId(id);
    setDeleteDialogOpen(true);
  };
  
  // Handle delete threat dialog close
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedThreatId(null);
  };
  
  // Handle delete threat
  const handleDeleteThreat = async () => {
    if (!selectedThreatId) return;
    
    try {
      const response = await ThreatApi.deleteThreat(selectedThreatId, user?.id || 'anonymous');
      
      if (response.success) {
        setSnackbar({
          open: true,
          message: 'Threat deleted successfully',
          severity: 'success'
        });
        fetchThreats(); // Refresh the threats list
      } else {
        setSnackbar({
          open: true,
          message: response.error || 'Failed to delete threat',
          severity: 'error'
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'An error occurred while deleting the threat',
        severity: 'error'
      });
      console.error(err);
    } finally {
      handleDeleteDialogClose();
    }
  };
  
  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  // Function to render severity chip with appropriate color and icon
  const renderSeverityChip = (severity: Threat['severity']) => {
    let bgColor = '';
    let textColor = '';
    let icon = <InfoIcon fontSize="small" />;
    
    // Convert to title case for display
    const displaySeverity = severity.charAt(0).toUpperCase() + severity.slice(1);

    switch (severity) {
      case 'critical':
        icon = <ErrorIcon fontSize="small" />;
        bgColor = alpha('#f44336', 0.15);
        textColor = '#f44336';
        break;
      case 'high':
        icon = <WarningAmberIcon fontSize="small" />;
        bgColor = alpha('#f44336', 0.15);
        textColor = '#f44336';
        break;
      case 'medium':
        icon = <WarningAmberIcon fontSize="small" />;
        bgColor = alpha('#ff9800', 0.15);
        textColor = '#ff9800';
        break;
      case 'low':
        icon = <InfoIcon fontSize="small" />;
        bgColor = alpha('#2196f3', 0.15);
        textColor = '#2196f3';
        break;
    }

    return (
      <Chip
        icon={icon}
        label={displaySeverity}
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
        }}
      />
    );
  };

  // Function to render status chip with appropriate color and icon
  const renderStatusChip = (status: Threat['status']) => {
    let bgColor = '';
    let textColor = '';
    let icon = <InfoIcon fontSize="small" />;
    
    // Convert to title case and replace underscores with spaces for display
    const displayStatus = status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    switch (status) {
      case 'active':
        icon = <WarningAmberIcon fontSize="small" />;
        bgColor = alpha('#ff9800', 0.15);
        textColor = '#ff9800';
        break;
      case 'mitigated':
        icon = <ShieldIcon fontSize="small" />;
        bgColor = alpha('#4caf50', 0.15);
        textColor = '#4caf50';
        break;
      case 'false_positive':
        icon = <CheckCircleIcon fontSize="small" />;
        bgColor = alpha('#9e9e9e', 0.15);
        textColor = '#9e9e9e';
        break;
    }

    return (
      <Chip
        icon={icon}
        label={displayStatus}
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
        }}
      />
    );
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <Card 
      sx={{ 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#203a43' }}>
            Recent Security Threats
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddDialogOpen}
            size="small"
            sx={{ 
              textTransform: 'none',
              borderRadius: 1.5,
              boxShadow: 'none',
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
              }
            }}
          >
            Add Threat
          </Button>
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ p: 3 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ boxShadow: 'none', maxHeight: 400 }}>
            <Table stickyHeader aria-label="security threats table">
              <TableHead>
                <TableRow>
                  <TableCell 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#203a43',
                      backgroundColor: alpha(theme.palette.primary.main, 0.03),
                      pl: 3
                    }}
                  >
                    Threat Name
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#203a43',
                      backgroundColor: alpha(theme.palette.primary.main, 0.03)
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#203a43',
                      backgroundColor: alpha(theme.palette.primary.main, 0.03)
                    }}
                  >
                    Source
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#203a43',
                      backgroundColor: alpha(theme.palette.primary.main, 0.03)
                    }}
                  >
                    Severity
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#203a43',
                      backgroundColor: alpha(theme.palette.primary.main, 0.03)
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell 
                    align="center"
                    sx={{ 
                      fontWeight: 600, 
                      color: '#203a43',
                      backgroundColor: alpha(theme.palette.primary.main, 0.03),
                      pr: 3
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {threats.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="textSecondary">
                        No threats found. Add a new threat to get started.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  threats.map((threat) => (
                    <TableRow
                      key={threat.id}
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: alpha(theme.palette.primary.main, 0.03),
                        }
                      }}
                    >
                      <TableCell 
                        sx={{ 
                          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                          color: threat.severity === 'critical' ? '#d32f2f' : '#203a43',
                          pl: 3
                        }}
                      >
                        {threat.threatType}
                      </TableCell>
                      <TableCell sx={{ color: 'rgba(0, 0, 0, 0.7)', fontWeight: 500 }}>
                        {formatDate(threat.detectedDate)}
                      </TableCell>
                      <TableCell sx={{ color: 'rgba(0, 0, 0, 0.7)', fontWeight: 500 }}>
                        {threat.source || 'Unknown'}
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
                      <TableCell align="center" sx={{ pr: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Tooltip title="More actions">
                            <IconButton 
                              onClick={(e) => handleMenuOpen(e, threat.id)}
                              size="small"
                              sx={{ 
                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                transition: 'all 0.2s ease',
                                '&:hover': { 
                                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                  transform: 'scale(1.1)'
                                }
                              }}
                            >
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete threat">
                            <IconButton 
                              color="error" 
                              onClick={() => handleDeleteDialogOpen(threat.id)}
                              size="small"
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
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        
        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
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
            }
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
        
        {/* Add Threat Dialog */}
        <Dialog open={addDialogOpen} onClose={handleAddDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Threat</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Enter the details of the new security threat.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="threatType"
              label="Threat Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.threatType}
              onChange={handleFormChange}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
              <InputLabel id="severity-label">Severity</InputLabel>
              <Select
                labelId="severity-label"
                name="severity"
                value={formData.severity}
                label="Severity"
                onChange={handleSelectChange}
              >
                <MenuItem value="critical">Critical</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={formData.status}
                label="Status"
                onChange={handleSelectChange}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="mitigated">Mitigated</MenuItem>
                <MenuItem value="false_positive">False Positive</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              value={formData.description}
              onChange={handleFormChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="affectedSystems"
              label="Affected Systems (comma separated)"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.affectedSystems}
              onChange={handleFormChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddDialogClose} color="inherit">Cancel</Button>
            <Button 
              onClick={handleAddThreatSubmit} 
              variant="contained"
              disabled={!formData.threatType}
            >
              Add Threat
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this threat? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose} color="inherit">Cancel</Button>
            <Button onClick={handleDeleteThreat} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Snackbar for notifications */}
        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleSnackbarClose} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
}
