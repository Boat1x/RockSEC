import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Snackbar,
    Switch,
    Tab,
    Tabs,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import React, { useState } from 'react';

// Icons
import BuildIcon from '@mui/icons-material/Build';
import LockIcon from '@mui/icons-material/Lock';
import SaveIcon from '@mui/icons-material/Save';
import SecurityIcon from '@mui/icons-material/Security';
import ShieldIcon from '@mui/icons-material/Shield';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
            id={`security-tabpanel-${index}`}
            aria-labelledby={`security-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

const AdminSecurity: React.FC = () => {
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Authentication settings
    const [authSettings, setAuthSettings] = useState({
        twoFactorEnabled: true,
        twoFactorMethod: 'app',
        sessionTimeout: 30,
        maxLoginAttempts: 5,
        lockoutDuration: 15
    });

    // Password policy settings
    const [passwordPolicy, setPasswordPolicy] = useState({
        minLength: 12,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        passwordExpiry: 90,
        preventReuseCount: 5
    });

    // Access control settings
    const [accessControl, setAccessControl] = useState({
        ipRestriction: false,
        allowedIPs: '',
        domainRestriction: true,
        allowedDomains: 'mville.edu, student.mville.edu',
        enableCaptcha: true,
        requestApproval: true
    });

    // Monitoring settings
    const [monitoring, setMonitoring] = useState({
        logFailedAttempts: true,
        logSuccessfulLogins: true,
        logAdminActions: true,
        logDataAccess: true,
        alertOnSuspiciousActivity: true,
        retentionPeriod: 365
    });

    // SSL/TLS settings
    const [sslSettings, setSSLSettings] = useState({
        enforceHttps: true,
        hsts: true,
        minimumTlsVersion: 'tls12',
        preferredCipherSuite: 'strong'
    });

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Handle authentication settings change
    const handleAuthSettingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = event.target;
        setAuthSettings({
            ...authSettings,
            [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
        });
    };

    // Handle two-factor method change
    const handleTwoFactorMethodChange = (event: SelectChangeEvent) => {
        setAuthSettings({
            ...authSettings,
            twoFactorMethod: event.target.value
        });
    };

    // Handle password policy change
    const handlePasswordPolicyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = event.target;
        setPasswordPolicy({
            ...passwordPolicy,
            [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
        });
    };

    // Handle access control change
    const handleAccessControlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = event.target;
        setAccessControl({
            ...accessControl,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Handle monitoring change
    const handleMonitoringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = event.target;
        setMonitoring({
            ...monitoring,
            [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
        });
    };

    // Handle SSL/TLS settings change
    const handleSslSettingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setSSLSettings({
            ...sslSettings,
            [name]: checked
        });
    };

    // Handle TLS version change
    const handleTlsVersionChange = (event: SelectChangeEvent) => {
        setSSLSettings({
            ...sslSettings,
            minimumTlsVersion: event.target.value
        });
    };

    // Handle cipher suite change
    const handleCipherSuiteChange = (event: SelectChangeEvent) => {
        setSSLSettings({
            ...sslSettings,
            preferredCipherSuite: event.target.value
        });
    };

    // Handle save settings
    const handleSaveSettings = () => {
        // In a real application, you would save these settings to your backend
        console.log('Saving security settings');
        console.log({
            authSettings,
            passwordPolicy,
            accessControl,
            monitoring,
            sslSettings
        });
        
        // Show success message
        setSnackbarMessage('Security settings saved successfully');
        setSnackbarOpen(true);
    };

    // Handle snackbar close
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                        Security Settings
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Configure application security and access controls
                    </Typography>
                </Box>
                
                <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveSettings}
                    sx={{ borderRadius: 2 }}
                >
                    Save All Settings
                </Button>
            </Box>

            {/* Security Settings Tabs */}
            <Paper sx={{ borderRadius: 2 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="security settings tabs"
                    >
                        <Tab icon={<LockIcon />} label="Authentication" iconPosition="start" />
                        <Tab icon={<SecurityIcon />} label="Password Policy" iconPosition="start" />
                        <Tab icon={<ShieldIcon />} label="Access Control" iconPosition="start" />
                        <Tab icon={<VisibilityIcon />} label="Monitoring" iconPosition="start" />
                        <Tab icon={<BuildIcon />} label="SSL/TLS" iconPosition="start" />
                    </Tabs>
                </Box>

                {/* Authentication Tab */}
                <TabPanel value={tabValue} index={0}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card variant="outlined" sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Multi-Factor Authentication
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={authSettings.twoFactorEnabled}
                                                onChange={handleAuthSettingChange}
                                                name="twoFactorEnabled"
                                                color="primary"
                                            />
                                        }
                                        label="Enable Two-Factor Authentication"
                                    />
                                    <FormControl fullWidth margin="normal" disabled={!authSettings.twoFactorEnabled}>
                                        <InputLabel id="twoFactorMethod-label">Authentication Method</InputLabel>
                                        <Select
                                            labelId="twoFactorMethod-label"
                                            value={authSettings.twoFactorMethod}
                                            label="Authentication Method"
                                            onChange={handleTwoFactorMethodChange}
                                        >
                                            <MenuItem value="app">Authenticator App</MenuItem>
                                            <MenuItem value="sms">SMS</MenuItem>
                                            <MenuItem value="email">Email</MenuItem>
                                        </Select>
                                    </FormControl>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card variant="outlined" sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Session Management
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        label="Session Timeout (minutes)"
                                        name="sessionTimeout"
                                        type="number"
                                        value={authSettings.sessionTimeout}
                                        onChange={handleAuthSettingChange}
                                        margin="normal"
                                        helperText="Minutes of inactivity before session expires"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Maximum Login Attempts"
                                        name="maxLoginAttempts"
                                        type="number"
                                        value={authSettings.maxLoginAttempts}
                                        onChange={handleAuthSettingChange}
                                        margin="normal"
                                        helperText="Number of failed attempts before account lockout"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Lockout Duration (minutes)"
                                        name="lockoutDuration"
                                        type="number"
                                        value={authSettings.lockoutDuration}
                                        onChange={handleAuthSettingChange}
                                        margin="normal"
                                        helperText="Duration of account lockout after failed attempts"
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* Password Policy Tab */}
                <TabPanel value={tabValue} index={1}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Password Requirements
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        label="Minimum Password Length"
                                        name="minLength"
                                        type="number"
                                        value={passwordPolicy.minLength}
                                        onChange={handlePasswordPolicyChange}
                                        margin="normal"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={passwordPolicy.requireUppercase}
                                                onChange={handlePasswordPolicyChange}
                                                name="requireUppercase"
                                                color="primary"
                                            />
                                        }
                                        label="Require Uppercase Characters"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={passwordPolicy.requireLowercase}
                                                onChange={handlePasswordPolicyChange}
                                                name="requireLowercase"
                                                color="primary"
                                            />
                                        }
                                        label="Require Lowercase Characters"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={passwordPolicy.requireNumbers}
                                                onChange={handlePasswordPolicyChange}
                                                name="requireNumbers"
                                                color="primary"
                                            />
                                        }
                                        label="Require Numbers"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={passwordPolicy.requireSpecialChars}
                                                onChange={handlePasswordPolicyChange}
                                                name="requireSpecialChars"
                                                color="primary"
                                            />
                                        }
                                        label="Require Special Characters"
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Password Lifecycle
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        label="Password Expiry (days)"
                                        name="passwordExpiry"
                                        type="number"
                                        value={passwordPolicy.passwordExpiry}
                                        onChange={handlePasswordPolicyChange}
                                        margin="normal"
                                        helperText="Days before password must be changed (0 for never)"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Password History"
                                        name="preventReuseCount"
                                        type="number"
                                        value={passwordPolicy.preventReuseCount}
                                        onChange={handlePasswordPolicyChange}
                                        margin="normal"
                                        helperText="Number of previous passwords that cannot be reused"
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* Access Control Tab */}
                <TabPanel value={tabValue} index={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Network Restrictions
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={accessControl.ipRestriction}
                                                onChange={handleAccessControlChange}
                                                name="ipRestriction"
                                                color="primary"
                                            />
                                        }
                                        label="Enable IP Restrictions"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Allowed IP Addresses"
                                        name="allowedIPs"
                                        value={accessControl.allowedIPs}
                                        onChange={handleAccessControlChange}
                                        margin="normal"
                                        disabled={!accessControl.ipRestriction}
                                        helperText="Comma-separated list of allowed IP addresses or ranges"
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Domain Restrictions
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={accessControl.domainRestriction}
                                                onChange={handleAccessControlChange}
                                                name="domainRestriction"
                                                color="primary"
                                            />
                                        }
                                        label="Restrict Email Domains"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Allowed Email Domains"
                                        name="allowedDomains"
                                        value={accessControl.allowedDomains}
                                        onChange={handleAccessControlChange}
                                        margin="normal"
                                        disabled={!accessControl.domainRestriction}
                                        helperText="Comma-separated list of allowed email domains"
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Additional Security
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={accessControl.enableCaptcha}
                                                        onChange={handleAccessControlChange}
                                                        name="enableCaptcha"
                                                        color="primary"
                                                    />
                                                }
                                                label="Enable CAPTCHA on Login"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={accessControl.requestApproval}
                                                        onChange={handleAccessControlChange}
                                                        name="requestApproval"
                                                        color="primary"
                                                    />
                                                }
                                                label="Require Approval for New Accounts"
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* Monitoring Tab */}
                <TabPanel value={tabValue} index={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Logging Options
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={monitoring.logFailedAttempts}
                                                onChange={handleMonitoringChange}
                                                name="logFailedAttempts"
                                                color="primary"
                                            />
                                        }
                                        label="Log Failed Login Attempts"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={monitoring.logSuccessfulLogins}
                                                onChange={handleMonitoringChange}
                                                name="logSuccessfulLogins"
                                                color="primary"
                                            />
                                        }
                                        label="Log Successful Logins"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={monitoring.logAdminActions}
                                                onChange={handleMonitoringChange}
                                                name="logAdminActions"
                                                color="primary"
                                            />
                                        }
                                        label="Log Administrative Actions"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={monitoring.logDataAccess}
                                                onChange={handleMonitoringChange}
                                                name="logDataAccess"
                                                color="primary"
                                            />
                                        }
                                        label="Log Sensitive Data Access"
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Alert Configuration
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={monitoring.alertOnSuspiciousActivity}
                                                onChange={handleMonitoringChange}
                                                name="alertOnSuspiciousActivity"
                                                color="primary"
                                            />
                                        }
                                        label="Alert on Suspicious Activity"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Log Retention Period (days)"
                                        name="retentionPeriod"
                                        type="number"
                                        value={monitoring.retentionPeriod}
                                        onChange={handleMonitoringChange}
                                        margin="normal"
                                        helperText="Number of days to retain security logs"
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* SSL/TLS Tab */}
                <TabPanel value={tabValue} index={4}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Connection Security
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={sslSettings.enforceHttps}
                                                        onChange={handleSslSettingChange}
                                                        name="enforceHttps"
                                                        color="primary"
                                                    />
                                                }
                                                label="Enforce HTTPS"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={sslSettings.hsts}
                                                        onChange={handleSslSettingChange}
                                                        name="hsts"
                                                        color="primary"
                                                    />
                                                }
                                                label="Enable HSTS"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FormControl fullWidth margin="normal">
                                                <InputLabel id="tls-version-label">Minimum TLS Version</InputLabel>
                                                <Select
                                                    labelId="tls-version-label"
                                                    value={sslSettings.minimumTlsVersion}
                                                    label="Minimum TLS Version"
                                                    onChange={handleTlsVersionChange}
                                                >
                                                    <MenuItem value="tls10">TLS 1.0 (Not Recommended)</MenuItem>
                                                    <MenuItem value="tls11">TLS 1.1</MenuItem>
                                                    <MenuItem value="tls12">TLS 1.2</MenuItem>
                                                    <MenuItem value="tls13">TLS 1.3</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <FormControl fullWidth margin="normal">
                                                <InputLabel id="cipher-suite-label">Cipher Suite Preference</InputLabel>
                                                <Select
                                                    labelId="cipher-suite-label"
                                                    value={sslSettings.preferredCipherSuite}
                                                    label="Cipher Suite Preference"
                                                    onChange={handleCipherSuiteChange}
                                                >
                                                    <MenuItem value="compatible">Backwards Compatible</MenuItem>
                                                    <MenuItem value="moderate">Moderate Security</MenuItem>
                                                    <MenuItem value="strong">Strong Security</MenuItem>
                                                    <MenuItem value="custom">Custom</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>
            </Paper>

            {/* Success Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AdminSecurity; 