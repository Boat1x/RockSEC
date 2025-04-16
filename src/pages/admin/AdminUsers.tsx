import {
    Avatar,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Switch,
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
import React, { useState } from 'react';

// Icons
import AddIcon from '@mui/icons-material/Add';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    lastLogin: string;
    permissions: string[];
    type: string;
}

// Mock data
const mockUsers: User[] = [
    {
        id: 1,
        name: 'Admin User',
        email: 'admin@rocksec.edu',
        role: 'System Administrator',
        status: 'Active',
        lastLogin: '2023-09-15T14:30:00',
        permissions: ['all'],
        type: 'Admin'
    },
    {
        id: 2,
        name: 'John Smith',
        email: 'john.smith@university.edu',
        role: 'Program Director',
        status: 'Active',
        lastLogin: '2023-09-14T09:15:00',
        permissions: ['manage_consultants', 'manage_clients', 'view_reports'],
        type: 'Staff'
    },
    {
        id: 3,
        name: 'Emma Wilson',
        email: 'emma.wilson@university.edu',
        role: 'Faculty Lead',
        status: 'Active',
        lastLogin: '2023-09-13T16:45:00',
        permissions: ['manage_clients', 'view_reports'],
        type: 'Faculty'
    },
    {
        id: 4,
        name: 'Michael Chen',
        email: 'michael.chen@university.edu',
        role: 'Department Head',
        status: 'Inactive',
        lastLogin: '2023-08-30T11:20:00',
        permissions: ['view_reports'],
        type: 'Faculty'
    },
    {
        id: 5,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@university.edu',
        role: 'Program Coordinator',
        status: 'Active',
        lastLogin: '2023-09-15T10:10:00',
        permissions: ['manage_consultants', 'view_reports'],
        type: 'Staff'
    },
    {
        id: 6,
        name: 'David Williams',
        email: 'david.williams@university.edu',
        role: 'Technical Support',
        status: 'Active',
        lastLogin: '2023-09-12T13:25:00',
        permissions: ['view_reports', 'system_settings'],
        type: 'IT'
    }
];

const AdminUsers: React.FC = () => {
    const theme = useTheme();
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    // Dialog state
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openPermissionsDialog, setOpenPermissionsDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    
    // New user form state
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        role: '',
        type: '',
        permissions: {
            manage_consultants: false,
            manage_clients: false,
            view_reports: true,
            system_settings: false
        }
    });

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setPage(0);
    };

    // Handle status filter change
    const handleStatusFilterChange = (event: SelectChangeEvent) => {
        setStatusFilter(event.target.value);
        setPage(0);
    };

    // Handle type filter change
    const handleTypeFilterChange = (event: SelectChangeEvent) => {
        setTypeFilter(event.target.value);
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

    // Handle add dialog
    const handleOpenAddDialog = () => {
        setOpenAddDialog(true);
    };

    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
        setNewUser({
            name: '',
            email: '',
            role: '',
            type: '',
            permissions: {
                manage_consultants: false,
                manage_clients: false,
                view_reports: true,
                system_settings: false
            }
        });
    };

    const handleAddUser = () => {
        const newId = Math.max(...users.map(u => u.id)) + 1;
        const currentDate = new Date().toISOString();
        
        const permissionsArray = Object.entries(newUser.permissions)
            .filter(([_, value]) => value)
            .map(([key, _]) => key);
        
        const user: User = {
            id: newId,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            type: newUser.type,
            status: 'Active',
            lastLogin: currentDate,
            permissions: permissionsArray
        };
        
        setUsers([...users, user]);
        handleCloseAddDialog();
    };

    // Handle delete dialog
    const handleOpenDeleteDialog = (user: User) => {
        setSelectedUser(user);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setSelectedUser(null);
    };

    const handleDeleteUser = () => {
        if (selectedUser) {
            setUsers(users.filter(u => u.id !== selectedUser.id));
        }
        handleCloseDeleteDialog();
    };

    // Handle permissions dialog
    const handleOpenPermissionsDialog = (user: User) => {
        setSelectedUser(user);
        setOpenPermissionsDialog(true);
    };

    const handleClosePermissionsDialog = () => {
        setOpenPermissionsDialog(false);
        setSelectedUser(null);
    };

    // Handle form input change
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewUser({
            ...newUser,
            [name]: value
        });
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        setNewUser({
            ...newUser,
            [name]: value
        });
    };

    const handlePermissionChange = (permission: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({
            ...newUser,
            permissions: {
                ...newUser.permissions,
                [permission]: event.target.checked
            }
        });
    };

    // Get user status chip color
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return {
                    bg: '#e8f5e9',
                    text: '#2e7d32'
                };
            case 'Inactive':
                return {
                    bg: '#ffebee',
                    text: '#c62828'
                };
            default:
                return {
                    bg: '#e0e0e0',
                    text: '#616161'
                };
        }
    };

    // Format date and time
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
        }).format(date);
    };

    // Filter users based on search term and filters
    const filteredUsers = users.filter(user => {
        const matchesSearch = 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        const matchesType = typeFilter === 'all' || user.type === typeFilter;
        
        return matchesSearch && matchesStatus && matchesType;
    });

    // Get displayed users based on pagination
    const displayedUsers = filteredUsers.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                        User Management
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Manage system users and permissions
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenAddDialog}
                    sx={{
                        borderRadius: 2,
                        px: 3
                    }}
                >
                    Add User
                </Button>
            </Box>

            {/* Filters */}
            <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            placeholder="Search users..."
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
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="status-filter-label">Status</InputLabel>
                            <Select
                                labelId="status-filter-label"
                                value={statusFilter}
                                label="Status"
                                onChange={handleStatusFilterChange}
                            >
                                <MenuItem value="all">All Statuses</MenuItem>
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="type-filter-label">User Type</InputLabel>
                            <Select
                                labelId="type-filter-label"
                                value={typeFilter}
                                label="User Type"
                                onChange={handleTypeFilterChange}
                            >
                                <MenuItem value="all">All Types</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Staff">Staff</MenuItem>
                                <MenuItem value="Faculty">Faculty</MenuItem>
                                <MenuItem value="IT">IT</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Tooltip title="More filters">
                            <IconButton>
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Paper>

            {/* Users Table */}
            <Paper sx={{ width: '100%', borderRadius: 2, overflow: 'hidden' }}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead sx={{ backgroundColor: theme.palette.grey[50] }}>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Last Login</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayedUsers.map((user) => (
                                <TableRow key={user.id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar 
                                                sx={{ 
                                                    mr: 2, 
                                                    bgcolor: user.type === 'Admin' 
                                                        ? theme.palette.error.light 
                                                        : theme.palette.primary.light 
                                                }}
                                            >
                                                {user.type === 'Admin' ? (
                                                    <AdminPanelSettingsIcon />
                                                ) : (
                                                    <PersonIcon />
                                                )}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                    {user.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {user.email}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.type}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={user.status}
                                            size="small"
                                            sx={{
                                                backgroundColor: getStatusColor(user.status).bg,
                                                color: getStatusColor(user.status).text,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{formatDateTime(user.lastLogin)}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Manage Permissions">
                                            <IconButton 
                                                size="small" 
                                                sx={{ mr: 1 }}
                                                onClick={() => handleOpenPermissionsDialog(user)}
                                            >
                                                <KeyIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Edit">
                                            <IconButton size="small" sx={{ mr: 1 }}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton 
                                                size="small" 
                                                color="error"
                                                onClick={() => handleOpenDeleteDialog(user)}
                                                disabled={user.type === 'Admin'} // Prevent deleting admin users
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {displayedUsers.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                                        <Typography variant="body1" color="textSecondary">
                                            No users found matching the search criteria
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={filteredUsers.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Paper>

            {/* Add User Dialog */}
            <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Add New User</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="name"
                                    label="Full Name"
                                    fullWidth
                                    value={newUser.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="email"
                                    label="Email Address"
                                    fullWidth
                                    type="email"
                                    value={newUser.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="role"
                                    label="Role"
                                    fullWidth
                                    value={newUser.role}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g. Program Director"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth required>
                                    <InputLabel id="user-type-label">User Type</InputLabel>
                                    <Select
                                        labelId="user-type-label"
                                        name="type"
                                        value={newUser.type}
                                        label="User Type"
                                        onChange={handleSelectChange}
                                    >
                                        <MenuItem value="Admin">Admin</MenuItem>
                                        <MenuItem value="Staff">Staff</MenuItem>
                                        <MenuItem value="Faculty">Faculty</MenuItem>
                                        <MenuItem value="IT">IT</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Permissions
                                </Typography>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Switch
                                                checked={newUser.permissions.manage_consultants}
                                                onChange={handlePermissionChange('manage_consultants')}
                                                color="primary"
                                            />
                                            <Typography>Manage Consultants</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Switch
                                                checked={newUser.permissions.manage_clients}
                                                onChange={handlePermissionChange('manage_clients')}
                                                color="primary"
                                            />
                                            <Typography>Manage Clients</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Switch
                                                checked={newUser.permissions.view_reports}
                                                onChange={handlePermissionChange('view_reports')}
                                                color="primary"
                                            />
                                            <Typography>View Reports</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Switch
                                                checked={newUser.permissions.system_settings}
                                                onChange={handlePermissionChange('system_settings')}
                                                color="primary"
                                            />
                                            <Typography>System Settings</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDialog}>Cancel</Button>
                    <Button 
                        onClick={handleAddUser} 
                        variant="contained"
                        disabled={!newUser.name || !newUser.email || !newUser.role || !newUser.type}
                    >
                        Add User
                    </Button>
                </DialogActions>
            </Dialog>

            {/* User Permissions Dialog */}
            <Dialog 
                open={openPermissionsDialog} 
                onClose={handleClosePermissionsDialog}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>User Permissions: {selectedUser?.name}</DialogTitle>
                <DialogContent>
                    {selectedUser && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                                {selectedUser.email} - {selectedUser.role}
                            </Typography>
                            
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Current Permissions
                                </Typography>
                                <Grid container spacing={2}>
                                    {selectedUser.permissions.includes('all') ? (
                                        <Grid item xs={12}>
                                            <Chip 
                                                label="Full System Access" 
                                                color="error" 
                                                sx={{ fontWeight: 'bold' }} 
                                            />
                                        </Grid>
                                    ) : (
                                        <>
                                            {selectedUser.permissions.map((permission) => (
                                                <Grid item key={permission}>
                                                    <Chip 
                                                        label={permission.split('_').join(' ').replace(/\b\w/g, s => s.toUpperCase())} 
                                                        color="primary" 
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                            ))}
                                        </>
                                    )}
                                </Grid>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePermissionsDialog}>Close</Button>
                    <Button variant="contained" color="primary">
                        Edit Permissions
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Delete User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                    <Button onClick={handleDeleteUser} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminUsers; 