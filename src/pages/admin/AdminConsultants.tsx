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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';

interface Consultant {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    clientCount: number;
    university: string;
    joinDate: string;
    profileImage?: string;
}

// Mock data
const mockConsultants: Consultant[] = [
    {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@university.edu',
        role: 'Senior Consultant',
        status: 'Active',
        clientCount: 5,
        university: 'Manhattanville University',
        joinDate: '2022-05-15'
    },
    {
        id: 2,
        name: 'Emma Wilson',
        email: 'emma.wilson@university.edu',
        role: 'Student Consultant',
        status: 'Active',
        clientCount: 3,
        university: 'Manhattanville University',
        joinDate: '2023-01-20'
    },
    {
        id: 3,
        name: 'Michael Chen',
        email: 'michael.chen@university.edu',
        role: 'Faculty Advisor',
        status: 'Active',
        clientCount: 0,
        university: 'Manhattanville University',
        joinDate: '2021-09-10'
    },
    {
        id: 4,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@university.edu',
        role: 'Student Consultant',
        status: 'On Leave',
        clientCount: 2,
        university: 'Manhattanville University',
        joinDate: '2023-02-15'
    },
    {
        id: 5,
        name: 'David Williams',
        email: 'david.williams@university.edu',
        role: 'Student Consultant',
        status: 'Active',
        clientCount: 4,
        university: 'Manhattanville University',
        joinDate: '2022-08-30'
    },
    {
        id: 6,
        name: 'Jennifer Lee',
        email: 'jennifer.lee@university.edu',
        role: 'Student Consultant',
        status: 'Active',
        clientCount: 1,
        university: 'Manhattanville University',
        joinDate: '2023-09-05'
    },
    {
        id: 7,
        name: 'Robert Garcia',
        email: 'robert.garcia@university.edu',
        role: 'Faculty Advisor',
        status: 'Active',
        clientCount: 0,
        university: 'Manhattanville University',
        joinDate: '2021-11-20'
    },
    {
        id: 8,
        name: 'Sophia Martinez',
        email: 'sophia.martinez@university.edu',
        role: 'Student Consultant',
        status: 'Inactive',
        clientCount: 0,
        university: 'Manhattanville University',
        joinDate: '2022-03-15'
    }
];

const AdminConsultants: React.FC = () => {
    const theme = useTheme();
    const [consultants, setConsultants] = useState<Consultant[]>(mockConsultants);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [roleFilter, setRoleFilter] = useState<string>('all');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    // Dialog state
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
    
    // New consultant form state
    const [newConsultant, setNewConsultant] = useState({
        name: '',
        email: '',
        role: 'Student Consultant',
        university: 'Manhattanville University'
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

    // Handle role filter change
    const handleRoleFilterChange = (event: SelectChangeEvent) => {
        setRoleFilter(event.target.value);
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
        setNewConsultant({
            name: '',
            email: '',
            role: 'Student Consultant',
            university: 'Manhattanville University'
        });
    };

    const handleAddConsultant = () => {
        const newId = Math.max(...consultants.map(c => c.id)) + 1;
        const currentDate = new Date().toISOString().split('T')[0];
        
        const consultant: Consultant = {
            id: newId,
            name: newConsultant.name,
            email: newConsultant.email,
            role: newConsultant.role,
            status: 'Active',
            clientCount: 0,
            university: newConsultant.university,
            joinDate: currentDate
        };
        
        setConsultants([...consultants, consultant]);
        handleCloseAddDialog();
    };

    // Handle delete dialog
    const handleOpenDeleteDialog = (consultant: Consultant) => {
        setSelectedConsultant(consultant);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setSelectedConsultant(null);
    };

    const handleDeleteConsultant = () => {
        if (selectedConsultant) {
            setConsultants(consultants.filter(c => c.id !== selectedConsultant.id));
        }
        handleCloseDeleteDialog();
    };

    // Handle input change for new consultant form
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewConsultant({
            ...newConsultant,
            [name]: value
        });
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        setNewConsultant({
            ...newConsultant,
            [name]: value
        });
    };

    // Filter consultants based on search term and filters
    const filteredConsultants = consultants.filter(consultant => {
        const matchesSearch = 
            consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            consultant.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || consultant.status === statusFilter;
        const matchesRole = roleFilter === 'all' || consultant.role === roleFilter;
        
        return matchesSearch && matchesStatus && matchesRole;
    });

    // Get displayed consultants based on pagination
    const displayedConsultants = filteredConsultants.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                        Consultants Management
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Manage consultant accounts and permissions
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
                    Add Consultant
                </Button>
            </Box>

            {/* Filters */}
            <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            placeholder="Search consultants..."
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
                                <MenuItem value="On Leave">On Leave</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="role-filter-label">Role</InputLabel>
                            <Select
                                labelId="role-filter-label"
                                value={roleFilter}
                                label="Role"
                                onChange={handleRoleFilterChange}
                            >
                                <MenuItem value="all">All Roles</MenuItem>
                                <MenuItem value="Student Consultant">Student Consultant</MenuItem>
                                <MenuItem value="Faculty Advisor">Faculty Advisor</MenuItem>
                                <MenuItem value="Senior Consultant">Senior Consultant</MenuItem>
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

            {/* Consultants Table */}
            <Paper sx={{ width: '100%', borderRadius: 2, overflow: 'hidden' }}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead sx={{ backgroundColor: theme.palette.grey[50] }}>
                            <TableRow>
                                <TableCell>Consultant</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="center">Clients</TableCell>
                                <TableCell>Join Date</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayedConsultants.map((consultant) => (
                                <TableRow key={consultant.id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main }}>
                                                {consultant.profileImage ? (
                                                    <img src={consultant.profileImage} alt={consultant.name} />
                                                ) : (
                                                    <PersonIcon />
                                                )}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                    {consultant.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {consultant.email}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{consultant.role}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={consultant.status}
                                            size="small"
                                            sx={{
                                                backgroundColor: consultant.status === 'Active' 
                                                    ? '#e8f5e9' 
                                                    : consultant.status === 'On Leave'
                                                        ? '#fff8e1'
                                                        : '#ffebee',
                                                color: consultant.status === 'Active' 
                                                    ? '#2e7d32' 
                                                    : consultant.status === 'On Leave'
                                                        ? '#f57f17'
                                                        : '#c62828',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">{consultant.clientCount}</TableCell>
                                    <TableCell>{new Date(consultant.joinDate).toLocaleDateString()}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Edit">
                                            <IconButton size="small" sx={{ mr: 1 }}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton 
                                                size="small" 
                                                color="error"
                                                onClick={() => handleOpenDeleteDialog(consultant)}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {displayedConsultants.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                                        <Typography variant="body1" color="textSecondary">
                                            No consultants found matching the search criteria
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={filteredConsultants.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Paper>

            {/* Add Consultant Dialog */}
            <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Consultant</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="name"
                                    label="Full Name"
                                    fullWidth
                                    value={newConsultant.name}
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
                                    value={newConsultant.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="role-label">Role</InputLabel>
                                    <Select
                                        labelId="role-label"
                                        name="role"
                                        value={newConsultant.role}
                                        label="Role"
                                        onChange={handleSelectChange}
                                    >
                                        <MenuItem value="Student Consultant">Student Consultant</MenuItem>
                                        <MenuItem value="Faculty Advisor">Faculty Advisor</MenuItem>
                                        <MenuItem value="Senior Consultant">Senior Consultant</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="university-label">University</InputLabel>
                                    <Select
                                        labelId="university-label"
                                        name="university"
                                        value={newConsultant.university}
                                        label="University"
                                        onChange={handleSelectChange}
                                    >
                                        <MenuItem value="Manhattanville University">Manhattanville University</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDialog}>Cancel</Button>
                    <Button 
                        onClick={handleAddConsultant} 
                        variant="contained"
                        disabled={!newConsultant.name || !newConsultant.email}
                    >
                        Add Consultant
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Delete Consultant</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {selectedConsultant?.name}? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                    <Button onClick={handleDeleteConsultant} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminConsultants; 