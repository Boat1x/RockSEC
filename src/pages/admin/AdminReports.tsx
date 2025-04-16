import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Tab,
    Tabs,
    Typography,
    useTheme
} from '@mui/material';
import React, { useState } from 'react';

// Charting library
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

// Icons
import BarChartIcon from '@mui/icons-material/BarChart';
import DownloadIcon from '@mui/icons-material/Download';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import InsightsIcon from '@mui/icons-material/Insights';
import PieChartIcon from '@mui/icons-material/PieChart';
import RefreshIcon from '@mui/icons-material/Refresh';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TimelineIcon from '@mui/icons-material/Timeline';

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
            id={`analytics-tabpanel-${index}`}
            aria-labelledby={`analytics-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

// Mock data for reports
const securityScoreData = [
    { name: 'Healthcare', value: 72, count: 3 },
    { name: 'Education', value: 90, count: 1 },
    { name: 'Professional Services', value: 72, count: 1 },
    { name: 'Restaurant', value: 85, count: 1 },
    { name: 'Financial Services', value: 0, count: 1 },
];

const monthlyAssessmentData = [
    { month: 'Jan', count: 5 },
    { month: 'Feb', count: 8 },
    { month: 'Mar', count: 12 },
    { month: 'Apr', count: 10 },
    { month: 'May', count: 15 },
    { month: 'Jun', count: 20 },
    { month: 'Jul', count: 25 },
    { month: 'Aug', count: 22 },
    { month: 'Sep', count: 30 },
    { month: 'Oct', count: 28 },
    { month: 'Nov', count: 32 },
    { month: 'Dec', count: 35 },
];

const vulnerabilityTypeData = [
    { name: 'Password Issues', value: 35 },
    { name: 'Outdated Software', value: 25 },
    { name: 'Phishing Susceptibility', value: 18 },
    { name: 'Data Exposure', value: 12 },
    { name: 'Network Security', value: 10 },
];

const consultantPerformanceData = [
    { name: 'John Smith', assessments: 42, clientsManaged: 5, averageScore: 75 },
    { name: 'Emma Wilson', assessments: 25, clientsManaged: 3, averageScore: 82 },
    { name: 'David Williams', assessments: 30, clientsManaged: 4, averageScore: 68 },
    { name: 'Sarah Johnson', assessments: 18, clientsManaged: 2, averageScore: 77 },
    { name: 'Jennifer Lee', assessments: 15, clientsManaged: 1, averageScore: 81 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AdminReports: React.FC = () => {
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);
    const [timeRange, setTimeRange] = useState('year');
    const [reportType, setReportType] = useState('all');

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleTimeRangeChange = (event: SelectChangeEvent) => {
        setTimeRange(event.target.value);
    };

    const handleReportTypeChange = (event: SelectChangeEvent) => {
        setReportType(event.target.value);
    };

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                        Reports & Analytics
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        View program performance metrics and generate reports
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<FileDownloadIcon />}
                        sx={{ borderRadius: 2 }}
                    >
                        Export Data
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        sx={{ borderRadius: 2 }}
                    >
                        Refresh
                    </Button>
                </Box>
            </Box>

            {/* Filter controls */}
            <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="time-range-label">Time Range</InputLabel>
                            <Select
                                labelId="time-range-label"
                                value={timeRange}
                                label="Time Range"
                                onChange={handleTimeRangeChange}
                            >
                                <MenuItem value="month">Last Month</MenuItem>
                                <MenuItem value="quarter">Last Quarter</MenuItem>
                                <MenuItem value="year">Last Year</MenuItem>
                                <MenuItem value="all">All Time</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="report-type-label">Report Type</InputLabel>
                            <Select
                                labelId="report-type-label"
                                value={reportType}
                                label="Report Type"
                                onChange={handleReportTypeChange}
                            >
                                <MenuItem value="all">All Reports</MenuItem>
                                <MenuItem value="security">Security Assessments</MenuItem>
                                <MenuItem value="performance">Consultant Performance</MenuItem>
                                <MenuItem value="client">Client Analytics</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Chip 
                            label="Auto-refresh enabled" 
                            color="primary" 
                            size="small"
                            variant="outlined"
                            sx={{ mr: 1 }} 
                        />
                        <Chip 
                            label="Last updated: Just now" 
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </Paper>

            {/* Analytics Tabs */}
            <Paper sx={{ borderRadius: 2 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="analytics tabs"
                    >
                        <Tab 
                            icon={<InsightsIcon />} 
                            label="Overview" 
                            iconPosition="start"
                        />
                        <Tab 
                            icon={<BarChartIcon />} 
                            label="Security Scores" 
                            iconPosition="start"
                        />
                        <Tab 
                            icon={<ShowChartIcon />} 
                            label="Assessment Trends" 
                            iconPosition="start"
                        />
                        <Tab 
                            icon={<PieChartIcon />} 
                            label="Vulnerability Types" 
                            iconPosition="start"
                        />
                        <Tab 
                            icon={<TimelineIcon />} 
                            label="Consultant Performance" 
                            iconPosition="start"
                        />
                    </Tabs>
                </Box>

                {/* Overview Tab */}
                <TabPanel value={tabValue} index={0}>
                    <Grid container spacing={3}>
                        {/* Summary Cards */}
                        <Grid item xs={12} md={4}>
                            <Card sx={{ borderRadius: 2, height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Assessment Summary
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="h3" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                                            156
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Total assessments completed
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                                        <Box>
                                            <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                                                35
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                This month
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                                +25%
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Growth rate
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                            <Card sx={{ borderRadius: 2, height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Average Security Score
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="h3" sx={{ fontWeight: 700, color: '#ff9800' }}>
                                            73%
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Across all clients
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                                        <Box>
                                            <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                                                +5%
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Improvement
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                                90%
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Highest score
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                            <Card sx={{ borderRadius: 2, height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Critical Issues
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="h3" sx={{ fontWeight: 700, color: theme.palette.error.main }}>
                                            12
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Unresolved critical issues
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                                        <Box>
                                            <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                                                85%
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Resolution rate
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                                3.2
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Avg. days to resolve
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Monthly Trend Chart */}
                        <Grid item xs={12} md={8}>
                            <Card sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Typography variant="h6">
                                            Monthly Assessment Trend
                                        </Typography>
                                        <Button 
                                            size="small" 
                                            startIcon={<DownloadIcon />}
                                            sx={{ textTransform: 'none' }}
                                        >
                                            Download
                                        </Button>
                                    </Box>
                                    <div style={{ width: '100%', height: 300 }}>
                                        <ResponsiveContainer>
                                            <LineChart
                                                data={monthlyAssessmentData}
                                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Line 
                                                    type="monotone" 
                                                    dataKey="count" 
                                                    name="Assessments" 
                                                    stroke={theme.palette.primary.main} 
                                                    activeDot={{ r: 8 }} 
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Vulnerability Pie Chart */}
                        <Grid item xs={12} md={4}>
                            <Card sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Typography variant="h6">
                                            Vulnerability Types
                                        </Typography>
                                        <Button 
                                            size="small" 
                                            startIcon={<DownloadIcon />}
                                            sx={{ textTransform: 'none' }}
                                        >
                                            Download
                                        </Button>
                                    </Box>
                                    <div style={{ width: '100%', height: 300 }}>
                                        <ResponsiveContainer>
                                            <PieChart>
                                                <Pie
                                                    data={vulnerabilityTypeData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {vulnerabilityTypeData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* Security Scores Tab */}
                <TabPanel value={tabValue} index={1}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Card sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                        <Typography variant="h6">
                                            Industry Security Score Comparison
                                        </Typography>
                                        <Button 
                                            size="small" 
                                            startIcon={<DownloadIcon />}
                                            sx={{ textTransform: 'none' }}
                                        >
                                            Download
                                        </Button>
                                    </Box>
                                    <div style={{ width: '100%', height: 400 }}>
                                        <ResponsiveContainer>
                                            <BarChart
                                                data={securityScoreData}
                                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar 
                                                    dataKey="value" 
                                                    name="Average Security Score" 
                                                    fill={theme.palette.primary.main} 
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* Assessment Trends Tab */}
                <TabPanel value={tabValue} index={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Card sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                        <Typography variant="h6">
                                            Annual Assessment Trend
                                        </Typography>
                                        <Button 
                                            size="small" 
                                            startIcon={<DownloadIcon />}
                                            sx={{ textTransform: 'none' }}
                                        >
                                            Download
                                        </Button>
                                    </Box>
                                    <div style={{ width: '100%', height: 400 }}>
                                        <ResponsiveContainer>
                                            <LineChart
                                                data={monthlyAssessmentData}
                                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Line 
                                                    type="monotone" 
                                                    dataKey="count" 
                                                    name="Assessments" 
                                                    stroke={theme.palette.primary.main} 
                                                    strokeWidth={2}
                                                    activeDot={{ r: 8 }} 
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* Vulnerability Types Tab */}
                <TabPanel value={tabValue} index={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                        <Typography variant="h6">
                                            Vulnerability Distribution
                                        </Typography>
                                        <Button 
                                            size="small" 
                                            startIcon={<DownloadIcon />}
                                            sx={{ textTransform: 'none' }}
                                        >
                                            Download
                                        </Button>
                                    </Box>
                                    <div style={{ width: '100%', height: 400 }}>
                                        <ResponsiveContainer>
                                            <PieChart>
                                                <Pie
                                                    data={vulnerabilityTypeData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={true}
                                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                    outerRadius={150}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {vulnerabilityTypeData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                        <Typography variant="h6">
                                            Vulnerability by Severity
                                        </Typography>
                                        <Button 
                                            size="small" 
                                            startIcon={<DownloadIcon />}
                                            sx={{ textTransform: 'none' }}
                                        >
                                            Download
                                        </Button>
                                    </Box>
                                    <div style={{ width: '100%', height: 400 }}>
                                        <ResponsiveContainer>
                                            <BarChart
                                                data={[
                                                    { name: 'Critical', value: 12 },
                                                    { name: 'High', value: 28 },
                                                    { name: 'Medium', value: 45 },
                                                    { name: 'Low', value: 15 },
                                                ]}
                                                layout="vertical"
                                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis type="number" />
                                                <YAxis dataKey="name" type="category" />
                                                <Tooltip />
                                                <Legend />
                                                <Bar 
                                                    dataKey="value" 
                                                    name="Issues" 
                                                    fill="#ff5252" 
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* Consultant Performance Tab */}
                <TabPanel value={tabValue} index={4}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Card sx={{ borderRadius: 2 }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                        <Typography variant="h6">
                                            Consultant Performance
                                        </Typography>
                                        <Button 
                                            size="small" 
                                            startIcon={<DownloadIcon />}
                                            sx={{ textTransform: 'none' }}
                                        >
                                            Download
                                        </Button>
                                    </Box>
                                    <div style={{ width: '100%', height: 400 }}>
                                        <ResponsiveContainer>
                                            <BarChart
                                                data={consultantPerformanceData}
                                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar 
                                                    dataKey="assessments" 
                                                    name="Assessments Completed" 
                                                    fill={theme.palette.primary.main} 
                                                />
                                                <Bar 
                                                    dataKey="clientsManaged" 
                                                    name="Clients Managed" 
                                                    fill={theme.palette.secondary.main} 
                                                />
                                                <Bar 
                                                    dataKey="averageScore" 
                                                    name="Average Client Score" 
                                                    fill="#8884d8" 
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>
            </Paper>
        </Box>
    );
};

export default AdminReports; 