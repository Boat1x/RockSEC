import {
    Avatar,
    Box,
    Chip,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Tooltip,
    Typography,
    useTheme
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';

// Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DownloadIcon from '@mui/icons-material/Download';
import ErrorIcon from '@mui/icons-material/Error';
import FilterListIcon from '@mui/icons-material/FilterList';
import InfoIcon from '@mui/icons-material/Info';
import ReplayIcon from '@mui/icons-material/Replay';
import SearchIcon from '@mui/icons-material/Search';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import WarningIcon from '@mui/icons-material/Warning';

interface ActivityLog {
    id: number;
    timestamp: string;
    user: string;
    action: string;
    category: string;
    ipAddress: string;
    severity: 'info' | 'warning' | 'error';
    details: string;
}

// Mock data
const mockLogs: ActivityLog[] = [
    {
        id: 1,
        timestamp: '2023-09-15T14:30:22',
        user: 'admin@rocksec.edu',
        action: 'Login',
        category: 'Authentication',
        ipAddress: '192.168.1.101',
        severity: 'info',
        details: 'Successful login'
    },
    {
        id: 2,
        timestamp: '2023-09-15T13:45:10',
        user: 'john.smith@university.edu',
        action: 'Added Consultant',
        category: 'User Management',
        ipAddress: '192.168.1.102',
        severity: 'info',
        details: 'Added consultant: Jennifer Lee'
    },
    {
        id: 3,
        timestamp: '2023-09-15T12:22:03',
        user: 'system',
        action: 'Backup Completed',
        category: 'System',
        ipAddress: 'localhost',
        severity: 'info',
        details: 'Daily backup completed successfully'
    },
    {
        id: 4,
        timestamp: '2023-09-15T10:15:45',
        user: 'emma.wilson@university.edu',
        action: 'Updated Client',
        category: 'Client Management',
        ipAddress: '192.168.1.105',
        severity: 'info',
        details: 'Updated client: Harbor Dental Group'
    },
    {
        id: 5,
        timestamp: '2023-09-14T16:38:55',
        user: 'david.williams@university.edu',
        action: 'Failed Login',
        category: 'Authentication',
        ipAddress: '192.168.1.110',
        severity: 'warning',
        details: 'Failed login attempt: Invalid password'
    },
    {
        id: 6,
        timestamp: '2023-09-14T15:12:30',
        user: 'admin@rocksec.edu',
        action: 'Changed Security Settings',
        category: 'Settings',
        ipAddress: '192.168.1.101',
        severity: 'info',
        details: 'Updated password policy'
    },
    {
        id: 7,
        timestamp: '2023-09-14T11:05:22',
        user: 'system',
        action: 'Error',
        category: 'System',
        ipAddress: 'localhost',
        severity: 'error',
        details: 'Database connection timeout'
    },
    {
        id: 8,
        timestamp: '2023-09-14T09:30:15',
        user: 'sarah.johnson@university.edu',
        action: 'Added Client',
        category: 'Client Management',
        ipAddress: '192.168.1.108',
        severity: 'info',
        details: 'Added client: Lakeside Pharmacy'
    },
    {
        id: 9,
        timestamp: '2023-09-13T17:45:38',
        user: 'unknown',
        action: 'Login Attempt',
        category: 'Authentication',
        ipAddress: '203.0.113.45',
        severity: 'error',
        details: 'Multiple failed login attempts from suspicious IP'
    },
    {
        id: 10,
        timestamp: '2023-09-13T14:20:11',
        user: 'michael.chen@university.edu',
        action: 'Viewed Report',
        category: 'Reports',
        ipAddress: '192.168.1.107',
        severity: 'info',
        details: 'Accessed security assessment report for Grove Elementary School'
    },
    {
        id: 11,
        timestamp: '2023-09-13T10:15:00',
        user: 'john.smith@university.edu',
        action: 'Changed Password',
        category: 'User Management',
        ipAddress: '192.168.1.102',
        severity: 'info',
        details: 'User changed their password'
    },
    {
        id: 12,
        timestamp: '2023-09-12T16:42:18',
        user: 'system',
        action: 'System Update',
        category: 'System',
        ipAddress: 'localhost',
        severity: 'info',
        details: 'Application updated to version 2.4.1'
    }
];

const AdminLogs: React.FC = () => {
    const theme = useTheme();
    const [logs, setLogs] = useState<ActivityLog[]>(mockLogs);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [severityFilter, setSeverityFilter] = useState<string>('all');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    // Get unique categories for filter
    const categories = Array.from(new Set(logs.map(log => log.category)));

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setPage(0);
    };

    // Handle category filter change
    const handleCategoryFilterChange = (event: SelectChangeEvent) => {
        setCategoryFilter(event.target.value);
        setPage(0);
    };

    // Handle severity filter change
    const handleSeverityFilterChange = (event: SelectChangeEvent) => {
        setSeverityFilter(event.target.value);
        setPage(0);
    };

    // Handle pagination
    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Handle date change
    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
        setPage(0);
    };

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
        setPage(0);
    };

    // Get severity icon
    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case 'info':
                return <InfoIcon fontSize="small" sx={{ color: theme.palette.info.main }} />;
            case 'warning':
                return <WarningIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />;
            case 'error':
                return <ErrorIcon fontSize="small" sx={{ color: theme.palette.error.main }} />;
            default:
                return <InfoIcon fontSize="small" />;
        }
    };

    // Get category icon
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Authentication':
                return <SecurityIcon fontSize="small" />;
            case 'User Management':
                return <AccountCircleIcon fontSize="small" />;
            case 'Client Management':
                return <AccountCircleIcon fontSize="small" />;
            case 'System':
                return <SettingsIcon fontSize="small" />;
            case 'Settings':
                return <SettingsIcon fontSize="small" />;
            case 'Reports':
                return <InfoIcon fontSize="small" />;
            default:
                return <InfoIcon fontSize="small" />;
        }
    };

    // Get severity chip color
    const getSeverityChipProps = (severity: string) => {
        switch (severity) {
            case 'info':
                return {
                    color: 'info' as const,
                    icon: <InfoIcon fontSize="small" />
                };
            case 'warning':
                return {
                    color: 'warning' as const,
                    icon: <WarningIcon fontSize="small" />
                };
            case 'error':
                return {
                    color: 'error' as const,
                    icon: <ErrorIcon fontSize="small" />
                };
            default:
                return {
                    color: 'default' as const,
                    icon: <InfoIcon fontSize="small" />
                };
        }
    };

    // Format date and time
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(date);
    };

    // Filter logs based on filters
    const filteredLogs = logs.filter(log => {
        const matchesSearch = 
            log.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
            log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.ipAddress.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
        const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
        
        // Date filter
        const logDate = new Date(log.timestamp);
        const matchesStartDate = !startDate || logDate >= startDate;
        const matchesEndDate = !endDate || logDate <= (endDate ? new Date(new Date(endDate).setHours(23, 59, 59, 999)) : new Date());
        
        return matchesSearch && matchesCategory && matchesSeverity && matchesStartDate && matchesEndDate;
    });

    // Sort logs by timestamp (newest first)
    const sortedLogs = [...filteredLogs].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Get displayed logs based on pagination
    const displayedLogs = sortedLogs.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    // Clear all filters
    const handleClearFilters = () => {
        setSearchTerm('');
        setCategoryFilter('all');
        setSeverityFilter('all');
        setStartDate(null);
        setEndDate(null);
        setPage(0);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ p: 3 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                            Activity Logs
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            View and monitor system activity and security events
                        </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Download Logs">
                            <IconButton size="large" sx={{ color: theme.palette.primary.main }}>
                                <DownloadIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Refresh">
                            <IconButton size="large" sx={{ color: theme.palette.primary.main }}>
                                <ReplayIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

                {/* Filters */}
                <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                placeholder="Search logs..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon color="action" />
                                        </InputAdornment>
                                    )
                                }}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="category-filter-label">Category</InputLabel>
                                <Select
                                    labelId="category-filter-label"
                                    value={categoryFilter}
                                    label="Category"
                                    onChange={handleCategoryFilterChange}
                                >
                                    <MenuItem value="all">All Categories</MenuItem>
                                    {categories.map((category) => (
                                        <MenuItem key={category} value={category}>{category}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="severity-filter-label">Severity</InputLabel>
                                <Select
                                    labelId="severity-filter-label"
                                    value={severityFilter}
                                    label="Severity"
                                    onChange={handleSeverityFilterChange}
                                >
                                    <MenuItem value="all">All Severity</MenuItem>
                                    <MenuItem value="info">Info</MenuItem>
                                    <MenuItem value="warning">Warning</MenuItem>
                                    <MenuItem value="error">Error</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={handleStartDateChange}
                                slotProps={{ textField: { size: 'small', fullWidth: true } }}
                            />
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <DatePicker
                                label="End Date"
                                value={endDate}
                                onChange={handleEndDateChange}
                                slotProps={{ textField: { size: 'small', fullWidth: true } }}
                            />
                        </Grid>
                        <Grid item xs={12} md={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Tooltip title="Clear Filters">
                                <IconButton onClick={handleClearFilters}>
                                    <FilterListIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Logs Table */}
                <Paper sx={{ width: '100%', borderRadius: 2, overflow: 'hidden' }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead sx={{ backgroundColor: theme.palette.grey[50] }}>
                                <TableRow>
                                    <TableCell>Timestamp</TableCell>
                                    <TableCell>User</TableCell>
                                    <TableCell>Action</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>IP Address</TableCell>
                                    <TableCell>Severity</TableCell>
                                    <TableCell>Details</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayedLogs.map((log) => (
                                    <TableRow key={log.id} hover>
                                        <TableCell>{formatDateTime(log.timestamp)}</TableCell>
                                        <TableCell>{log.user}</TableCell>
                                        <TableCell>{log.action}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar 
                                                    sx={{ 
                                                        width: 24, 
                                                        height: 24, 
                                                        mr: 1,
                                                        bgcolor: theme.palette.grey[100]
                                                    }}
                                                >
                                                    {getCategoryIcon(log.category)}
                                                </Avatar>
                                                {log.category}
                                            </Box>
                                        </TableCell>
                                        <TableCell>{log.ipAddress}</TableCell>
                                        <TableCell>
                                            <Chip
                                                size="small"
                                                icon={getSeverityChipProps(log.severity).icon}
                                                label={log.severity.charAt(0).toUpperCase() + log.severity.slice(1)}
                                                color={getSeverityChipProps(log.severity).color}
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell>{log.details}</TableCell>
                                    </TableRow>
                                ))}
                                {displayedLogs.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                                            <Typography variant="body1" color="textSecondary">
                                                No logs found matching the search criteria
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={filteredLogs.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[10, 25, 50, 100]}
                    />
                </Paper>
            </Box>
        </LocalizationProvider>
    );
};

export default AdminLogs; 