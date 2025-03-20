import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Chip,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  LinearProgress
} from '@mui/material';

// Charts
import {
  ResponsiveContainer,
  ComposedChart,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import WarningIcon from '@mui/icons-material/Warning';
import SecurityIcon from '@mui/icons-material/Security';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LanIcon from '@mui/icons-material/Lan';
import PhishingIcon from '@mui/icons-material/Phishing';
import LockIcon from '@mui/icons-material/Lock';
import ComputerIcon from '@mui/icons-material/Computer';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PublicIcon from '@mui/icons-material/Public';
import InfoIcon from '@mui/icons-material/Info';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Sample data for threat trends
const threatTrendsData = [
  { month: 'Sep', ransomware: 42, phishing: 63, malware: 28 },
  { month: 'Oct', ransomware: 47, phishing: 58, malware: 35 },
  { month: 'Nov', ransomware: 55, phishing: 65, malware: 40 },
  { month: 'Dec', ransomware: 58, phishing: 62, malware: 45 },
  { month: 'Jan', ransomware: 60, phishing: 68, malware: 48 },
  { month: 'Feb', ransomware: 65, phishing: 75, malware: 52 },
];

// Threat distribution by type
const threatDistribution = [
  { name: 'Phishing', value: 35 },
  { name: 'Ransomware', value: 25 },
  { name: 'Malware', value: 20 },
  { name: 'Social Engineering', value: 15 },
  { name: 'Other', value: 5 },
];

// Attack vector distribution
const attackVectorData = [
  { name: 'Email', value: 45 },
  { name: 'Web', value: 25 },
  { name: 'Network', value: 15 },
  { name: 'Physical', value: 8 },
  { name: 'Other', value: 7 },
];

// Colors for pie charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Latest threats data
const latestThreats = [
  {
    id: 1,
    name: 'Emotet Phishing Campaign',
    type: 'Phishing',
    severity: 'High',
    target: 'Financial Services',
    date: 'March 15, 2025',
    description: 'New Emotet phishing campaign targeting financial services with fake invoice attachments.'
  },
  {
    id: 2,
    name: 'BlackByte Ransomware',
    type: 'Ransomware',
    severity: 'Critical',
    target: 'Healthcare',
    date: 'March 14, 2025',
    description: 'BlackByte ransomware strain targeting healthcare providers with double-extortion tactics.'
  },
  {
    id: 3,
    name: 'Microsoft Exchange Zero-Day',
    type: 'Vulnerability',
    severity: 'Critical',
    target: 'All Industries',
    date: 'March 13, 2025',
    description: 'Zero-day vulnerability in Microsoft Exchange Server being actively exploited in the wild.'
  },
  {
    id: 4,
    name: 'BEC Campaign',
    type: 'Social Engineering',
    severity: 'Medium',
    target: 'Manufacturing',
    date: 'March 12, 2025',
    description: 'Business Email Compromise campaign targeting manufacturing sector with supplier impersonation.'
  },
  {
    id: 5,
    name: 'Magecart Skimming',
    type: 'Web Attack',
    severity: 'Medium',
    target: 'Retail',
    date: 'March 11, 2025',
    description: 'Magecart credit card skimming attack targeting retail e-commerce platforms.'
  },
];

// Vulnerable software
const vulnerableSoftware = [
  {
    name: 'Microsoft Exchange Server',
    cve: 'CVE-2025-1234',
    severity: 'Critical',
    affectedVersions: 'All versions prior to 2023 CU5',
    description: 'Remote code execution vulnerability in Microsoft Exchange Server.'
  },
  {
    name: 'Apache Log4j',
    cve: 'CVE-2025-2345',
    severity: 'Critical',
    affectedVersions: '2.0 - 2.14.1',
    description: 'Remote code execution vulnerability in Log4j logging framework.'
  },
  {
    name: 'Cisco ASA',
    cve: 'CVE-2025-3456',
    severity: 'High',
    affectedVersions: '9.2 - 9.8',
    description: 'Privilege escalation vulnerability in Cisco ASA firewall software.'
  },
  {
    name: 'WordPress Plugin XYZ',
    cve: 'CVE-2025-4567',
    severity: 'High',
    affectedVersions: 'All versions prior to 3.2.4',
    description: 'SQL injection vulnerability in popular WordPress plugin.'
  },
  {
    name: 'VMware vCenter',
    cve: 'CVE-2025-5678',
    severity: 'High',
    affectedVersions: '6.5, 6.7, 7.0',
    description: 'Authentication bypass vulnerability in VMware vCenter Server.'
  },
];

// Regional threat heatmap
const regionalThreats = [
  { region: 'North America', level: 85 },
  { region: 'Europe', level: 78 },
  { region: 'Asia-Pacific', level: 92 },
  { region: 'Latin America', level: 65 },
  { region: 'Middle East', level: 70 },
  { region: 'Africa', level: 55 },
];

// Function to get color based on severity
const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'Critical': return '#d32f2f';
    case 'High': return '#f44336';
    case 'Medium': return '#ff9800';
    case 'Low': return '#03a9f4';
    default: return '#03a9f4';
  }
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`threat-tabpanel-${index}`}
      aria-labelledby={`threat-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Custom tooltip for the charts
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<any>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
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
        {payload.map((entry, index) => (
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

const ThreatIntelligence: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Threat Intelligence
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Monitor and analyze the latest cybersecurity threats to protect your clients
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            placeholder="Search threats..."
            size="small"
            sx={{ width: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button 
            variant="contained" 
            startIcon={<NotificationsIcon />}
            sx={{ 
              borderRadius: 2,
              background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
            }}
          >
            Set Alerts
          </Button>
        </Box>
      </Box>

      {/* Threat Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ 
            borderRadius: 2, 
            height: '100%',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.04)',
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ bgcolor: 'rgba(244, 67, 54, 0.1)', color: '#f44336' }}>
                  <WarningIcon />
                </Avatar>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    352
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Active Threats
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUpIcon sx={{ color: '#f44336', fontSize: 16, mr: 0.5 }} />
                <Typography variant="caption" sx={{ fontWeight: 500, color: '#f44336' }}>
                  +8.5% from last week
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ 
            borderRadius: 2, 
            height: '100%',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.04)',
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ bgcolor: 'rgba(25, 118, 210, 0.1)', color: '#1976d2' }}>
                  <PhishingIcon />
                </Avatar>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    128
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Phishing Campaigns
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUpIcon sx={{ color: '#f44336', fontSize: 16, mr: 0.5 }} />
                <Typography variant="caption" sx={{ fontWeight: 500, color: '#f44336' }}>
                  +12.3% from last week
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ 
            borderRadius: 2, 
            height: '100%',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.04)',
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ bgcolor: 'rgba(255, 152, 0, 0.1)', color: '#ff9800' }}>
                  <LockIcon />
                </Avatar>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    74
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Ransomware Strains
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUpIcon sx={{ color: '#f44336', fontSize: 16, mr: 0.5 }} />
                <Typography variant="caption" sx={{ fontWeight: 500, color: '#f44336' }}>
                  +5.7% from last week
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ 
            borderRadius: 2, 
            height: '100%',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.04)',
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)', color: '#4caf50' }}>
                  <SecurityIcon />
                </Avatar>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    93
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Security Patches
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingDownIcon sx={{ color: '#4caf50', fontSize: 16, mr: 0.5 }} />
                <Typography variant="caption" sx={{ fontWeight: 500, color: '#4caf50' }}>
                  -3.2% from last week
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content Tabs */}
      <Paper sx={{ borderRadius: 2, mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="threat intelligence tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Threat Landscape" />
            <Tab label="Latest Threats" />
            <Tab label="Vulnerabilities" />
            <Tab label="Regional Intelligence" />
            <Tab label="Industry Targets" />
          </Tabs>
        </Box>

        {/* Tab 1: Threat Landscape */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Threat Trends (Last 6 Months)
                </Typography>
                <Paper sx={{ p: 2, borderRadius: 2 }}>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={threatTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="phishing" 
                        fill="rgba(25, 118, 210, 0.1)" 
                        stroke="#1976d2" 
                        name="Phishing"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="ransomware" 
                        stroke="#ff9800" 
                        name="Ransomware" 
                        strokeWidth={2} 
                      />
                      <Bar 
                        dataKey="malware" 
                        barSize={20} 
                        fill="#f44336" 
                        name="Malware" 
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </Paper>
              </Box>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                      Threat Distribution by Type
                    </Typography>
                    <Paper sx={{ p: 2, borderRadius: 2, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={threatDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {threatDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </Paper>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Attack Vector Distribution
                </Typography>
                <Paper sx={{ p: 2, borderRadius: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={attackVectorData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {attackVectorData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                          Key Insights
                        </Typography>
                        <List dense disablePadding>
                          <ListItem disablePadding sx={{ mb: 1 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <InfoIcon fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Email continues to be the primary attack vector (45%)"
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                          <ListItem disablePadding sx={{ mb: 1 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <InfoIcon fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Web-based attacks increased by 8% compared to last quarter"
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                          <ListItem disablePadding sx={{ mb: 1 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <InfoIcon fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Phishing remains the most common attack type (35%)"
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <InfoIcon fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Ransomware attacks showing 5.7% increase over previous month"
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        </List>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 2: Latest Threats */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Recently Detected Threats
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                startIcon={<FilterListIcon />}
                variant="outlined"
                size="small"
              >
                Filter
              </Button>
              <Button 
                startIcon={<DownloadIcon />}
                variant="outlined"
                size="small"
              >
                Export
              </Button>
            </Box>
          </Box>
          
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 'none', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Software</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>CVE</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Severity</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Affected Versions</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vulnerableSoftware.map((item, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {item.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: 500 }}>
                        {item.cve}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={item.severity} 
                        size="small"
                        sx={{ 
                          backgroundColor: `${getSeverityColor(item.severity)}15`,
                          color: getSeverityColor(item.severity),
                          fontWeight: 500,
                          fontSize: '0.75rem'
                        }} 
                      />
                    </TableCell>
                    <TableCell>{item.affectedVersions}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {item.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="text" 
                        size="small"
                        startIcon={<VisibilityIcon />}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Tab 4: Regional Intelligence */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Regional Threat Levels
              </Typography>
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Global Average
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      74
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={74} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      backgroundColor: 'rgba(0, 0, 0, 0.08)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#ff9800'
                      }
                    }} 
                  />
                </Box>
                
                {regionalThreats.map((region, index) => (
                  <Box sx={{ mb: 2 }} key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {region.region}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {region.level}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={region.level} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: region.level > 80 ? '#f44336' : 
                                           region.level > 70 ? '#ff9800' : 
                                           region.level > 60 ? '#2196f3' : '#4caf50'
                        }
                      }} 
                    />
                  </Box>
                ))}
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Global Threat Map
              </Typography>
              <Paper sx={{ p: 3, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ 
                  bgcolor: 'rgba(0, 0, 0, 0.03)', 
                  borderRadius: 2, 
                  p: 2,
                  mb: 2,
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <PublicIcon sx={{ fontSize: 80, color: 'rgba(0, 0, 0, 0.2)', mb: 2 }} />
                    <Typography variant="body2" color="textSecondary">
                      Interactive map available in the full version
                    </Typography>
                  </Box>
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                    Regional Highlights
                  </Typography>
                  <List dense disablePadding>
                    <ListItem disablePadding sx={{ mb: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <InfoIcon fontSize="small" color="error" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Asia-Pacific region showing highest threat activity (92)"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding sx={{ mb: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <InfoIcon fontSize="small" color="warning" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="North America experiencing increase in ransomware (85)"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <InfoIcon fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Europe seeing rise in phishing campaigns targeting financial sector (78)"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 5: Industry Targets */}
        <TabPanel value={tabValue} index={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Most Targeted Industries
              </Typography>
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Healthcare', threats: 85 },
                        { name: 'Financial', threats: 78 },
                        { name: 'Manufacturing', threats: 65 },
                        { name: 'Government', threats: 72 },
                        { name: 'Education', threats: 58 },
                        { name: 'Retail', threats: 52 }
                      ]}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="threats" fill="#1976d2" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Industry Specific Threats
              </Typography>
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <List>
                  <ListItem 
                    sx={{ 
                      p: 2, 
                      bgcolor: 'rgba(244, 67, 54, 0.05)', 
                      borderRadius: 2,
                      mb: 2
                    }}
                  >
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'rgba(244, 67, 54, 0.2)', color: '#f44336' }}>
                        <LanIcon />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Healthcare Industry
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="textSecondary" paragraph>
                            Primary threats: Ransomware, Data breaches, Phishing
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Notable strains: BlackByte Ransomware, Royal Ransomware targeting patient data
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  
                  <ListItem 
                    sx={{ 
                      p: 2, 
                      bgcolor: 'rgba(25, 118, 210, 0.05)', 
                      borderRadius: 2,
                      mb: 2
                    }}
                  >
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'rgba(25, 118, 210, 0.2)', color: '#1976d2' }}>
                        <LanIcon />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Financial Services
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="textSecondary" paragraph>
                            Primary threats: Phishing, API attacks, Credential stuffing
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Notable campaigns: Emotet banking trojan resurgence, BEC attacks targeting wire transfers
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  
                  <ListItem 
                    sx={{ 
                      p: 2, 
                      bgcolor: 'rgba(255, 152, 0, 0.05)', 
                      borderRadius: 2
                    }}
                  >
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'rgba(255, 152, 0, 0.2)', color: '#ff9800' }}>
                        <LanIcon />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Manufacturing
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="textSecondary" paragraph>
                            Primary threats: ICS attacks, Ransomware, Intellectual property theft
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Notable trends: Supply chain attacks, OT/IT convergence vulnerabilities
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Recommendation Section */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Client Recommendations
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Based on the current threat landscape, consider implementing these security measures for your clients:
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 2, height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'rgba(244, 67, 54, 0.1)', color: '#f44336', mr: 2 }}>
                    <PhishingIcon />
                  </Avatar>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Phishing Protection
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  Implement enhanced email filtering and conduct regular phishing awareness training for all clients.
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Chip 
                    label="High Priority" 
                    size="small"
                    sx={{ 
                      backgroundColor: 'rgba(244, 67, 54, 0.1)',
                      color: '#f44336',
                      fontWeight: 500
                    }} 
                  />
                  <Button 
                    variant="text" 
                    size="small"
                    endIcon={<MoreHorizIcon />}
                  >
                    Resources
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 2, height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'rgba(255, 152, 0, 0.1)', color: '#ff9800', mr: 2 }}>
                    <LockIcon />
                  </Avatar>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Ransomware Mitigation
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  Ensure regular backups, implement application whitelisting, and restrict administrative privileges.
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Chip 
                    label="High Priority" 
                    size="small"
                    sx={{ 
                      backgroundColor: 'rgba(244, 67, 54, 0.1)',
                      color: '#f44336',
                      fontWeight: 500
                    }} 
                  />
                  <Button 
                    variant="text" 
                    size="small"
                    endIcon={<MoreHorizIcon />}
                  >
                    Resources
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 2, height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'rgba(25, 118, 210, 0.1)', color: '#1976d2', mr: 2 }}>
                    <ComputerIcon />
                  </Avatar>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Patch Management
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  Prioritize patching of critical vulnerabilities, especially in Microsoft Exchange and Apache Log4j.
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Chip 
                    label="Critical Priority" 
                    size="small"
                    sx={{ 
                      backgroundColor: 'rgba(183, 28, 28, 0.1)',
                      color: '#b71c1c',
                      fontWeight: 500
                    }} 
                  />
                  <Button 
                    variant="text" 
                    size="small"
                    endIcon={<MoreHorizIcon />}
                  >
                    Resources
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ThreatIntelligence;