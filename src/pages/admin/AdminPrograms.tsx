import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Switch,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import React, { useState } from 'react';

// Icons
import BusinessIcon from '@mui/icons-material/Business';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import SchoolIcon from '@mui/icons-material/School';
import SecurityIcon from '@mui/icons-material/Security';
import TuneIcon from '@mui/icons-material/Tune';

interface UniversitySettings {
    name: string;
    logo: string;
    address: string;
    website: string;
    contactEmail: string;
    contactPhone: string;
}

interface ProgramSettings {
    name: string;
    description: string;
    department: string;
    coordinator: string;
    coordinatorEmail: string;
    studentRoles: string[];
    facultyRoles: string[];
}

interface SecuritySettings {
    requireTwoFactor: boolean;
    passwordPolicy: {
        minLength: number;
        requireUppercase: boolean;
        requireLowercase: boolean;
        requireNumbers: boolean;
        requireSpecialChars: boolean;
        expiryDays: number;
    };
    sessionTimeout: number;
    allowedDomains: string[];
}

interface SystemSettings {
    enableEmailNotifications: boolean;
    enableSmsNotifications: boolean;
    maintenanceMode: boolean;
    debugMode: boolean;
    dataRetentionDays: number;
    backupFrequency: string;
}

const AdminPrograms: React.FC = () => {
    const theme = useTheme();
    const [expanded, setExpanded] = useState<string | false>('universitySettings');
    const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

    // University settings state
    const [universitySettings, setUniversitySettings] = useState<UniversitySettings>({
        name: 'Manhattanville University',
        logo: '/assets/logo.png',
        address: '2900 Purchase Street, Purchase, NY 10577',
        website: 'https://www.mville.edu',
        contactEmail: 'security.program@mville.edu',
        contactPhone: '(914) 555-1234'
    });

    // Program settings state
    const [programSettings, setProgramSettings] = useState<ProgramSettings>({
        name: 'ROCKY Security Program',
        description: "Real Organizations' Cybersecurity Knowledge in You - A student-run security consulting service",
        department: 'Computer Science Department',
        coordinator: 'Dr. Lisa Chen',
        coordinatorEmail: 'lisa.chen@mville.edu',
        studentRoles: ['Student Consultant', 'Student Lead', 'Student Researcher'],
        facultyRoles: ['Faculty Advisor', 'Department Chair', 'Program Director']
    });

    // Security settings state
    const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
        requireTwoFactor: true,
        passwordPolicy: {
            minLength: 12,
            requireUppercase: true,
            requireLowercase: true,
            requireNumbers: true,
            requireSpecialChars: true,
            expiryDays: 90
        },
        sessionTimeout: 30,
        allowedDomains: ['mville.edu', 'student.mville.edu', 'faculty.mville.edu']
    });

    // System settings state
    const [systemSettings, setSystemSettings] = useState<SystemSettings>({
        enableEmailNotifications: true,
        enableSmsNotifications: false,
        maintenanceMode: false,
        debugMode: false,
        dataRetentionDays: 365,
        backupFrequency: 'daily'
    });

    // New settings being added
    const [newStudentRole, setNewStudentRole] = useState('');
    const [newFacultyRole, setNewFacultyRole] = useState('');
    const [newAllowedDomain, setNewAllowedDomain] = useState('');

    const handleAccordionChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    // Handle university settings change
    const handleUniversitySettingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUniversitySettings({
            ...universitySettings,
            [name]: value
        });
    };

    // Handle program settings change
    const handleProgramSettingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProgramSettings({
            ...programSettings,
            [name]: value
        });
    };

    // Handle security settings change
    const handleSecuritySettingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked, value, type } = event.target;
        
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            if (parent === 'passwordPolicy') {
                setSecuritySettings({
                    ...securitySettings,
                    passwordPolicy: {
                        ...securitySettings.passwordPolicy,
                        [child]: type === 'checkbox' ? checked : Number(value)
                    }
                });
            }
        } else {
            setSecuritySettings({
                ...securitySettings,
                [name]: type === 'checkbox' ? checked : 
                        type === 'number' ? Number(value) : value
            });
        }
    };

    // Handle system settings change
    const handleSystemSettingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked, value, type } = event.target;
        setSystemSettings({
            ...systemSettings,
            [name]: type === 'checkbox' ? checked : 
                    type === 'number' ? Number(value) : value
        });
    };

    // Handle backup frequency change
    const handleBackupFrequencyChange = (event: SelectChangeEvent) => {
        setSystemSettings({
            ...systemSettings,
            backupFrequency: event.target.value
        });
    };

    // Handle add student role
    const handleAddStudentRole = () => {
        if (newStudentRole && !programSettings.studentRoles.includes(newStudentRole)) {
            setProgramSettings({
                ...programSettings,
                studentRoles: [...programSettings.studentRoles, newStudentRole]
            });
            setNewStudentRole('');
        }
    };

    // Handle remove student role
    const handleRemoveStudentRole = (roleToRemove: string) => {
        setProgramSettings({
            ...programSettings,
            studentRoles: programSettings.studentRoles.filter(role => role !== roleToRemove)
        });
    };

    // Handle add faculty role
    const handleAddFacultyRole = () => {
        if (newFacultyRole && !programSettings.facultyRoles.includes(newFacultyRole)) {
            setProgramSettings({
                ...programSettings,
                facultyRoles: [...programSettings.facultyRoles, newFacultyRole]
            });
            setNewFacultyRole('');
        }
    };

    // Handle remove faculty role
    const handleRemoveFacultyRole = (roleToRemove: string) => {
        setProgramSettings({
            ...programSettings,
            facultyRoles: programSettings.facultyRoles.filter(role => role !== roleToRemove)
        });
    };

    // Handle add allowed domain
    const handleAddAllowedDomain = () => {
        if (newAllowedDomain && !securitySettings.allowedDomains.includes(newAllowedDomain)) {
            setSecuritySettings({
                ...securitySettings,
                allowedDomains: [...securitySettings.allowedDomains, newAllowedDomain]
            });
            setNewAllowedDomain('');
        }
    };

    // Handle remove allowed domain
    const handleRemoveAllowedDomain = (domainToRemove: string) => {
        setSecuritySettings({
            ...securitySettings,
            allowedDomains: securitySettings.allowedDomains.filter(domain => domain !== domainToRemove)
        });
    };

    // Handle save settings
    const handleSaveSettings = (settingType: string) => {
        // In a real application, you would save these settings to your backend
        console.log(`Saving ${settingType} settings`);
        
        // Show success message
        setSaveSuccess(settingType);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
            setSaveSuccess(null);
        }, 3000);
    };

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                        Program Settings
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Configure university and security program settings
                    </Typography>
                </Box>
            </Box>

            {/* University Settings */}
            <Accordion 
                expanded={expanded === 'universitySettings'} 
                onChange={handleAccordionChange('universitySettings')}
                sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ backgroundColor: theme.palette.grey[50] }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main }}>
                            <SchoolIcon />
                        </Avatar>
                        <Typography variant="h6">University Settings</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="University Name"
                                name="name"
                                value={universitySettings.name}
                                onChange={handleUniversitySettingChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="University Logo URL"
                                name="logo"
                                value={universitySettings.logo}
                                onChange={handleUniversitySettingChange}
                                margin="normal"
                                helperText="Path to the university logo image"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="University Address"
                                name="address"
                                value={universitySettings.address}
                                onChange={handleUniversitySettingChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Website"
                                name="website"
                                value={universitySettings.website}
                                onChange={handleUniversitySettingChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Contact Email"
                                name="contactEmail"
                                value={universitySettings.contactEmail}
                                onChange={handleUniversitySettingChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Contact Phone"
                                name="contactPhone"
                                value={universitySettings.contactPhone}
                                onChange={handleUniversitySettingChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                startIcon={<SaveIcon />}
                                onClick={() => handleSaveSettings('university')}
                            >
                                Save University Settings
                            </Button>
                            {saveSuccess === 'university' && (
                                <Chip
                                    label="Settings saved successfully"
                                    color="success"
                                    sx={{ ml: 2 }}
                                />
                            )}
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Program Settings */}
            <Accordion 
                expanded={expanded === 'programSettings'} 
                onChange={handleAccordionChange('programSettings')}
                sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ backgroundColor: theme.palette.grey[50] }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, bgcolor: theme.palette.secondary.main }}>
                            <BusinessIcon />
                        </Avatar>
                        <Typography variant="h6">Program Settings</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Program Name"
                                name="name"
                                value={programSettings.name}
                                onChange={handleProgramSettingChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Department"
                                name="department"
                                value={programSettings.department}
                                onChange={handleProgramSettingChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Program Description"
                                name="description"
                                value={programSettings.description}
                                onChange={handleProgramSettingChange}
                                margin="normal"
                                multiline
                                rows={3}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Program Coordinator"
                                name="coordinator"
                                value={programSettings.coordinator}
                                onChange={handleProgramSettingChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Coordinator Email"
                                name="coordinatorEmail"
                                value={programSettings.coordinatorEmail}
                                onChange={handleProgramSettingChange}
                                margin="normal"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Card variant="outlined" sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Student Roles
                                    </Typography>
                                    <Box sx={{ mb: 2, display: 'flex' }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Add New Role"
                                            value={newStudentRole}
                                            onChange={(e) => setNewStudentRole(e.target.value)}
                                            sx={{ mr: 1 }}
                                        />
                                        <Button 
                                            variant="contained" 
                                            onClick={handleAddStudentRole}
                                            disabled={!newStudentRole}
                                        >
                                            Add
                                        </Button>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {programSettings.studentRoles.map((role) => (
                                            <Chip
                                                key={role}
                                                label={role}
                                                onDelete={() => handleRemoveStudentRole(role)}
                                                color="primary"
                                                variant="outlined"
                                            />
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Card variant="outlined" sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Faculty Roles
                                    </Typography>
                                    <Box sx={{ mb: 2, display: 'flex' }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Add New Role"
                                            value={newFacultyRole}
                                            onChange={(e) => setNewFacultyRole(e.target.value)}
                                            sx={{ mr: 1 }}
                                        />
                                        <Button 
                                            variant="contained" 
                                            onClick={handleAddFacultyRole}
                                            disabled={!newFacultyRole}
                                        >
                                            Add
                                        </Button>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {programSettings.facultyRoles.map((role) => (
                                            <Chip
                                                key={role}
                                                label={role}
                                                onDelete={() => handleRemoveFacultyRole(role)}
                                                color="secondary"
                                                variant="outlined"
                                            />
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                startIcon={<SaveIcon />}
                                onClick={() => handleSaveSettings('program')}
                            >
                                Save Program Settings
                            </Button>
                            {saveSuccess === 'program' && (
                                <Chip
                                    label="Settings saved successfully"
                                    color="success"
                                    sx={{ ml: 2 }}
                                />
                            )}
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Security Settings */}
            <Accordion 
                expanded={expanded === 'securitySettings'} 
                onChange={handleAccordionChange('securitySettings')}
                sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ backgroundColor: theme.palette.grey[50] }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, bgcolor: '#7e57c2' }}>
                            <SecurityIcon />
                        </Avatar>
                        <Typography variant="h6">Security Settings</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Authentication Settings
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={securitySettings.requireTwoFactor}
                                            onChange={handleSecuritySettingChange}
                                            name="requireTwoFactor"
                                            color="primary"
                                        />
                                    }
                                    label="Require Two-Factor Authentication"
                                />
                                <TextField
                                    fullWidth
                                    label="Session Timeout (minutes)"
                                    name="sessionTimeout"
                                    type="number"
                                    value={securitySettings.sessionTimeout}
                                    onChange={handleSecuritySettingChange}
                                    margin="normal"
                                />
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Allowed Email Domains
                                    </Typography>
                                    <Box sx={{ mb: 2, display: 'flex' }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Add Domain"
                                            value={newAllowedDomain}
                                            onChange={(e) => setNewAllowedDomain(e.target.value)}
                                            sx={{ mr: 1 }}
                                            placeholder="example.edu"
                                        />
                                        <Button 
                                            variant="contained" 
                                            onClick={handleAddAllowedDomain}
                                            disabled={!newAllowedDomain}
                                        >
                                            Add
                                        </Button>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {securitySettings.allowedDomains.map((domain) => (
                                            <Chip
                                                key={domain}
                                                label={domain}
                                                onDelete={() => handleRemoveAllowedDomain(domain)}
                                                color="primary"
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Password Policy
                                </Typography>
                                <TextField
                                    fullWidth
                                    label="Minimum Password Length"
                                    name="passwordPolicy.minLength"
                                    type="number"
                                    value={securitySettings.passwordPolicy.minLength}
                                    onChange={handleSecuritySettingChange}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    label="Password Expiry (days)"
                                    name="passwordPolicy.expiryDays"
                                    type="number"
                                    value={securitySettings.passwordPolicy.expiryDays}
                                    onChange={handleSecuritySettingChange}
                                    margin="normal"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={securitySettings.passwordPolicy.requireUppercase}
                                            onChange={handleSecuritySettingChange}
                                            name="passwordPolicy.requireUppercase"
                                            color="primary"
                                        />
                                    }
                                    label="Require Uppercase Letters"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={securitySettings.passwordPolicy.requireLowercase}
                                            onChange={handleSecuritySettingChange}
                                            name="passwordPolicy.requireLowercase"
                                            color="primary"
                                        />
                                    }
                                    label="Require Lowercase Letters"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={securitySettings.passwordPolicy.requireNumbers}
                                            onChange={handleSecuritySettingChange}
                                            name="passwordPolicy.requireNumbers"
                                            color="primary"
                                        />
                                    }
                                    label="Require Numbers"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={securitySettings.passwordPolicy.requireSpecialChars}
                                            onChange={handleSecuritySettingChange}
                                            name="passwordPolicy.requireSpecialChars"
                                            color="primary"
                                        />
                                    }
                                    label="Require Special Characters"
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                startIcon={<SaveIcon />}
                                onClick={() => handleSaveSettings('security')}
                            >
                                Save Security Settings
                            </Button>
                            {saveSuccess === 'security' && (
                                <Chip
                                    label="Settings saved successfully"
                                    color="success"
                                    sx={{ ml: 2 }}
                                />
                            )}
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* System Settings */}
            <Accordion 
                expanded={expanded === 'systemSettings'} 
                onChange={handleAccordionChange('systemSettings')}
                sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ backgroundColor: theme.palette.grey[50] }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, bgcolor: theme.palette.grey[700] }}>
                            <TuneIcon />
                        </Avatar>
                        <Typography variant="h6">System Settings</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Notification Settings
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={systemSettings.enableEmailNotifications}
                                            onChange={handleSystemSettingChange}
                                            name="enableEmailNotifications"
                                            color="primary"
                                        />
                                    }
                                    label="Enable Email Notifications"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={systemSettings.enableSmsNotifications}
                                            onChange={handleSystemSettingChange}
                                            name="enableSmsNotifications"
                                            color="primary"
                                        />
                                    }
                                    label="Enable SMS Notifications"
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    System Maintenance
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={systemSettings.maintenanceMode}
                                            onChange={handleSystemSettingChange}
                                            name="maintenanceMode"
                                            color="primary"
                                        />
                                    }
                                    label="Maintenance Mode"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={systemSettings.debugMode}
                                            onChange={handleSystemSettingChange}
                                            name="debugMode"
                                            color="primary"
                                        />
                                    }
                                    label="Debug Mode"
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Data Retention Period (days)"
                                name="dataRetentionDays"
                                type="number"
                                value={systemSettings.dataRetentionDays}
                                onChange={handleSystemSettingChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="backup-frequency-label">Backup Frequency</InputLabel>
                                <Select
                                    labelId="backup-frequency-label"
                                    value={systemSettings.backupFrequency}
                                    label="Backup Frequency"
                                    onChange={handleBackupFrequencyChange}
                                >
                                    <MenuItem value="hourly">Hourly</MenuItem>
                                    <MenuItem value="daily">Daily</MenuItem>
                                    <MenuItem value="weekly">Weekly</MenuItem>
                                    <MenuItem value="monthly">Monthly</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                startIcon={<SaveIcon />}
                                onClick={() => handleSaveSettings('system')}
                            >
                                Save System Settings
                            </Button>
                            {saveSuccess === 'system' && (
                                <Chip
                                    label="Settings saved successfully"
                                    color="success"
                                    sx={{ ml: 2 }}
                                />
                            )}
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default AdminPrograms; 