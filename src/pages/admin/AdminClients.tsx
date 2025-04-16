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
    LinearProgress,
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
import BusinessIcon from '@mui/icons-material/Business';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Client {
    id: number;
    name: string;
    type: string;
    email: string;
    phone: string;
    address: string;
    contactPerson: string;
    consultantCount: number;
    securityScore: number;
    status: string;
    joinDate: string;
    logoUrl?: string;
}

// Mock data
const mockClients: Client[] = [
    {
        id: 1,
        name: 'Harbor Dental Group',
        type: 'Healthcare',
        email: 'info@harbordentalgroup.com',
        phone: '(555) 123-4567',
        address: '123 Harbor Way, Seaside, CA 93955',
        contactPerson: 'Dr. James Wilson',
        consultantCount: 2,
        securityScore: 68,
        status: 'Active',
        joinDate: '2022-06-15'
    },
    {
        id: 2,
        name: 'Riverside Café',
        type: 'Restaurant',
        email: 'contact@riversidecafe.com',
        phone: '(555) 234-5678',
        address: '456 River Rd, Riverdale, NY 10471',
        contactPerson: 'Maria Garcia',
        consultantCount: 1,
        securityScore: 85,
        status: 'Active',
        joinDate: '2023-02-10'
    },
    {
        id: 3,
        name: 'Westfield Law Partners',
        type: 'Professional Services',
        email: 'info@westfieldlaw.com',
        phone: '(555) 345-6789',
        address: '789 West Ave, Westfield, NJ 07090',
        contactPerson: 'Robert Chen',
        consultantCount: 2,
        securityScore: 72,
        status: 'Active',
        joinDate: '2022-09-08'
    },
    {
        id: 4,
        name: 'Grove Elementary School',
        type: 'Education',
        email: 'principal@groveelementary.edu',
        phone: '(555) 456-7890',
        address: '101 School Lane, Oakville, CA 94562',
        contactPerson: 'Principal Sarah Johnson',
        consultantCount: 3,
        securityScore: 90,
        status: 'Active',
        joinDate: '2022-05-20'
    },
    {
        id: 5,
        name: 'Sunrise Senior Living',
        type: 'Healthcare',
        email: 'admin@sunrisesenior.org',
        phone: '(555) 567-8901',
        address: '202 Sunrise Blvd, Sunrise, FL 33322',
        contactPerson: 'David Thompson',
        consultantCount: 2,
        securityScore: 63,
        status: 'Pending Review',
        joinDate: '2023-04-05'
    },
    {
        id: 6,
        name: 'Metro Credit Union',
        type: 'Financial Services',
        email: 'contact@metrocu.com',
        phone: '(555) 678-9012',
        address: '303 Financial Way, Metro City, NY 10001',
        contactPerson: 'Jennifer Martinez',
        consultantCount: 0,
        securityScore: 0,
        status: 'Pending Approval',
        joinDate: '2023-06-12'
    },
    {
        id: 7,
        name: 'Lakeside Pharmacy',
        type: 'Healthcare',
        email: 'info@lakesidepharmacy.com',
        phone: '(555) 789-0123',
        address: '404 Lake Dr, Lakeside, MI 49116',
        contactPerson: 'Michael Wong',
        consultantCount: 1,
        securityScore: 75,
        status: 'Active',
        joinDate: '2023-01-30'
    }
];

const AdminClients: React.FC = () => {
    const theme = useTheme();
    const [clients, setClients] = useState<Client[]>(mockClients);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    // Dialog state
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    
    // New client form state
    const [newClient, setNewClient] = useState({
        name: '',
        type: '',
        email: '',
        phone: '',
        address: '',
        contactPerson: ''
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
        setNewClient({
            name: '',
            type: '',
            email: '',
            phone: '',
            address: '',
            contactPerson: ''
        });
    };

    const handleAddClient = () => {
        const newId = Math.max(...clients.map(c => c.id)) + 1;
        const currentDate = new Date().toISOString().split('T')[0];
        
        const client: Client = {
            id: newId,
            name: newClient.name,
            type: newClient.type,
            email: newClient.email,
            phone: newClient.phone,
            address: newClient.address,
            contactPerson: newClient.contactPerson,
            consultantCount: 0,
            securityScore: 0,
            status: 'Pending Approval',
            joinDate: currentDate
        };
        
        setClients([...clients, client]);
        handleCloseAddDialog();
    };

    // Handle delete dialog
    const handleOpenDeleteDialog = (client: Client) => {
        setSelectedClient(client);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setSelectedClient(null);
    };

    const handleDeleteClient = () => {
        if (selectedClient) {
            setClients(clients.filter(c => c.id !== selectedClient.id));
        }
        handleCloseDeleteDialog();
    };

    // Handle input change for new client form
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewClient({
            ...newClient,
            [name]: value
        });
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        setNewClient({
            ...newClient,
            [name]: value
        });
    };

    // Get security score color
    const getScoreColor = (score: number) => {
        if (score >= 80) return '#4caf50';
        if (score >= 60) return '#ff9800';
        return '#f44336';
    };

    // Filter clients based on search term and filters
    const filteredClients = clients.filter(client => {
        const matchesSearch = 
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
        const matchesType = typeFilter === 'all' || client.type === typeFilter;
        
        return matchesSearch && matchesStatus && matchesType;
    });

    // Get unique client types for filter
    const clientTypes = Array.from(new Set(clients.map(client => client.type)));

    // Get displayed clients based on pagination
    const displayedClients = filteredClients.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                        Clients Management
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Manage client organizations and their security assessments
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
                    Register Client
                </Button>
            </Box>

            {/* Filters */}
            <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            placeholder="Search clients..."
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
                                <MenuItem value="Pending Review">Pending Review</MenuItem>
                                <MenuItem value="Pending Approval">Pending Approval</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="type-filter-label">Business Type</InputLabel>
                            <Select
                                labelId="type-filter-label"
                                value={typeFilter}
                                label="Business Type"
                                onChange={handleTypeFilterChange}
                            >
                                <MenuItem value="all">All Types</MenuItem>
                                {clientTypes.map((type) => (
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                ))}
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

            {/* Clients Table */}
            <Paper sx={{ width: '100%', borderRadius: 2, overflow: 'hidden' }}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead sx={{ backgroundColor: theme.palette.grey[50] }}>
                            <TableRow>
                                <TableCell>Client</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Security Score</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="center">Consultants</TableCell>
                                <TableCell>Join Date</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayedClients.map((client) => (
                                <TableRow key={client.id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar sx={{ mr: 2, bgcolor: theme.palette.secondary.main }}>
                                                {client.logoUrl ? (
                                                    <img src={client.logoUrl} alt={client.name} />
                                                ) : (
                                                    <BusinessIcon />
                                                )}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                    {client.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {client.contactPerson}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{client.type}</TableCell>
                                    <TableCell>
                                        {client.securityScore > 0 ? (
                                            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                                    <Typography variant="body2" sx={{ mr: 1, fontWeight: 600 }}>
                                                        {client.securityScore}%
                                                    </Typography>
                                                    <Box sx={{ width: 80 }}>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={client.securityScore}
                                                            sx={{
                                                                height: 8,
                                                                borderRadius: 5,
                                                                backgroundColor: theme.palette.grey[200],
                                                                '& .MuiLinearProgress-bar': {
                                                                    backgroundColor: getScoreColor(client.securityScore),
                                                                    borderRadius: 5,
                                                                }
                                                            }}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Box>
                                        ) : (
                                            <Typography variant="body2" color="textSecondary">
                                                Not assessed
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={client.status}
                                            size="small"
                                            sx={{
                                                backgroundColor: client.status === 'Active' 
                                                    ? '#e8f5e9' 
                                                    : client.status === 'Pending Review'
                                                        ? '#fff8e1'
                                                        : '#f3e5f5',
                                                color: client.status === 'Active' 
                                                    ? '#2e7d32' 
                                                    : client.status === 'Pending Review'
                                                        ? '#f57f17'
                                                        : '#7b1fa2',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">{client.consultantCount}</TableCell>
                                    <TableCell>{new Date(client.joinDate).toLocaleDateString()}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="View Details">
                                            <IconButton size="small" sx={{ mr: 1 }}>
                                                <VisibilityIcon fontSize="small" />
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
                                                onClick={() => handleOpenDeleteDialog(client)}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {displayedClients.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                                        <Typography variant="body1" color="textSecondary">
                                            No clients found matching the search criteria
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={filteredClients.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Paper>

            {/* Add Client Dialog */}
            <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Register New Client</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="name"
                                    label="Business Name"
                                    fullWidth
                                    value={newClient.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="type"
                                    label="Business Type"
                                    fullWidth
                                    value={newClient.type}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g. Healthcare, Education, Financial Services"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="email"
                                    label="Business Email"
                                    fullWidth
                                    type="email"
                                    value={newClient.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="phone"
                                    label="Business Phone"
                                    fullWidth
                                    value={newClient.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="address"
                                    label="Business Address"
                                    fullWidth
                                    value={newClient.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="contactPerson"
                                    label="Primary Contact Person"
                                    fullWidth
                                    value={newClient.contactPerson}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Full name and title"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDialog}>Cancel</Button>
                    <Button 
                        onClick={handleAddClient} 
                        variant="contained"
                        disabled={!newClient.name || !newClient.type || !newClient.email}
                    >
                        Register Client
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Delete Client</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {selectedClient?.name}? This will permanently remove all client data, including assessment history.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                    <Button onClick={handleDeleteClient} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminClients; 