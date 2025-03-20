import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  RadioGroup,
  Radio,
  Divider,
  Card,
  CardContent,
  Rating,
  Avatar,
  Chip,
  LinearProgress,
  Paper,
  useTheme,
  SelectChangeEvent
} from '@mui/material';

// Icons
import BusinessIcon from '@mui/icons-material/Business';
import SecurityIcon from '@mui/icons-material/Security';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import PendingIcon from '@mui/icons-material/Pending';
import SchoolIcon from '@mui/icons-material/School';
import ArticleIcon from '@mui/icons-material/Article';
import ShieldIcon from '@mui/icons-material/Shield';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// Define types 
type ThreatConcern = string;
type SecurityStaffOption = 'yes' | 'partial' | 'no';
type BusinessType = string;
type EmployeeCount = string;

const BusinessAssessment = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [businessType, setBusinessType] = useState<BusinessType>('');
  const [employeeCount, setEmployeeCount] = useState<EmployeeCount>('');
  const [selectedThreats, setSelectedThreats] = useState<ThreatConcern[]>([]);
  const [securityMaturity, setSecurityMaturity] = useState<number>(2);
  const [hasSecurityStaff, setHasSecurityStaff] = useState<SecurityStaffOption>('no');
  const [reportGenerated, setReportGenerated] = useState<boolean>(false);

  const handleNext = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = (): void => {
    setActiveStep(0);
    setBusinessType('');
    setEmployeeCount('');
    setSelectedThreats([]);
    setSecurityMaturity(2);
    setHasSecurityStaff('no');
    setReportGenerated(false);
  };

  const handleThreatChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    const newSelectedThreats = [...selectedThreats];
    
    if (event.target.checked) {
      newSelectedThreats.push(value);
    } else {
      const index = newSelectedThreats.indexOf(value);
      if (index !== -1) {
        newSelectedThreats.splice(index, 1);
      }
    }
    
    setSelectedThreats(newSelectedThreats);
  };

  const handleBusinessTypeChange = (event: SelectChangeEvent): void => {
    setBusinessType(event.target.value);
  };

  const handleEmployeeCountChange = (event: SelectChangeEvent): void => {
    setEmployeeCount(event.target.value);
  };

  const handleSecurityStaffChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setHasSecurityStaff(event.target.value as SecurityStaffOption);
  };

  const handleGenerateReport = (): void => {
    // Simulate report generation with a delay
    setTimeout(() => {
      setReportGenerated(true);
    }, 1500);
  };

  // Business type options
  const businessTypes: string[] = [
    'Retail Store',
    'Restaurant/Cafe',
    'Healthcare Practice',
    'Professional Services',
    'Manufacturing',
    'Non-profit Organization',
    'Educational Institution',
    'Other'
  ];

  // Employee count options
  const employeeCounts: string[] = [
    '1-5 employees',
    '6-20 employees',
    '21-50 employees',
    '51-100 employees',
    '101-250 employees',
    'More than 250 employees'
  ];

  // Common threat concerns
  const threatConcerns: string[] = [
    'Ransomware attacks',
    'Phishing attempts',
    'Data breaches',
    'Insider threats',
    'Password security',
    'Unpatched software',
    'Unsecured WiFi networks',
    'Employee security awareness',
    'Physical security',
    'Compliance requirements',
    'Mobile device security',
    'Cloud service security'
  ];

  // Calculate the security risk score
  const calculateRiskScore = (): number => {
    let score = 0;
    
    // Business size risk factor
    if (employeeCount === '1-5 employees') score += 1;
    else if (employeeCount === '6-20 employees') score += 2;
    else if (employeeCount === '21-50 employees') score += 3;
    else if (employeeCount === '51-100 employees') score += 4;
    else score += 5;
    
    // Security maturity factor (inverse relationship)
    score += (6 - securityMaturity);
    
    // Staff factor
    if (hasSecurityStaff === 'no') score += 3;
    
    // Threat awareness factor
    score += Math.max(0, 5 - selectedThreats.length);
    
    // Convert to 0-100 scale
    return Math.min(Math.round((score / 18) * 100), 100);
  };

  interface RiskInfo {
    label: string;
    color: string;
  }

  const riskScore = calculateRiskScore();
  const getRiskLabel = (score: number): RiskInfo => {
    if (score < 30) return { label: 'Low Risk', color: theme.palette.success.main };
    if (score < 60) return { label: 'Medium Risk', color: theme.palette.warning.main };
    return { label: 'High Risk', color: theme.palette.error.main };
  };
  
  const riskInfo = getRiskLabel(riskScore);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 } }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 3,
          bgcolor: 'white',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Header with decorated background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
            opacity: 0.9,
            zIndex: 0,
          }}
        />
        
        <Box sx={{ position: 'relative', zIndex: 1, pt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar
              sx={{
                bgcolor: 'white',
                color: theme.palette.primary.main,
                width: 56,
                height: 56,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <AssessmentIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: 'white' }}>
                Business Security Assessment
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Created by Manhattanville University student consultants
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ position: 'relative', zIndex: 1, mt: 6 }}>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
            Complete this assessment to identify security risks and receive tailored recommendations for your business. Our student consultants can help implement these recommendations under faculty supervision.
          </Typography>

          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel
                StepIconProps={{
                  icon: <BusinessIcon />,
                  sx: { 
                    fontSize: 28,
                    color: activeStep >= 0 ? theme.palette.primary.main : 'grey.500'
                  }
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Business Information
                </Typography>
              </StepLabel>
              <StepContent>
                <Box sx={{ mb: 3, p: 2, bgcolor: 'rgba(25, 118, 210, 0.04)', borderRadius: 2, border: '1px solid rgba(25, 118, 210, 0.1)' }}>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Let's start by understanding your business better. This helps us tailor our security recommendations to your specific needs.
                  </Typography>
                  
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel id="business-type-label">Business Type</InputLabel>
                    <Select
                      labelId="business-type-label"
                      value={businessType}
                      label="Business Type"
                      onChange={handleBusinessTypeChange}
                    >
                      {businessTypes.map((type) => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel id="employee-count-label">Number of Employees</InputLabel>
                    <Select
                      labelId="employee-count-label"
                      value={employeeCount}
                      label="Number of Employees"
                      onChange={handleEmployeeCountChange}
                    >
                      {employeeCounts.map((count) => (
                        <MenuItem key={count} value={count}>{count}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  <FormControl component="fieldset" sx={{ mb: 2 }}>
                    <FormLabel component="legend" sx={{ mb: 1 }}>Do you have dedicated IT/security staff?</FormLabel>
                    <RadioGroup
                      row
                      value={hasSecurityStaff}
                      onChange={handleSecurityStaffChange}
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="partial" control={<Radio />} label="Outsourced/Partial" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Box>
                
                <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ 
                      py: 1.2,
                      px: 3,
                      background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                      fontWeight: 600,
                    }}
                    disabled={!businessType || !employeeCount}
                  >
                    Continue
                  </Button>
                </Box>
              </StepContent>
            </Step>
            
            <Step>
              <StepLabel
                StepIconProps={{
                  icon: <SecurityIcon />,
                  sx: { 
                    fontSize: 28,
                    color: activeStep >= 1 ? theme.palette.primary.main : 'grey.500'
                  }
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Security Concerns
                </Typography>
              </StepLabel>
              <StepContent>
                <Box sx={{ mb: 3, p: 2, bgcolor: 'rgba(25, 118, 210, 0.04)', borderRadius: 2, border: '1px solid rgba(25, 118, 210, 0.1)' }}>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    What security concerns are you most worried about? Select all that apply.
                  </Typography>
                  
                  <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
                    <FormGroup>
                      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1 }}>
                        {threatConcerns.map((threat) => (
                          <FormControlLabel
                            key={threat}
                            control={
                              <Checkbox 
                                checked={selectedThreats.includes(threat)}
                                onChange={handleThreatChange}
                                value={threat}
                                color="primary"
                              />
                            }
                            label={threat}
                          />
                        ))}
                      </Box>
                    </FormGroup>
                  </FormControl>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      How would you rate your organization's current security maturity?
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                      <Typography variant="caption">Basic</Typography>
                      <Rating
                        value={securityMaturity}
                        onChange={(_, newValue) => {
                          if (newValue !== null) {
                            setSecurityMaturity(newValue);
                          }
                        }}
                        max={5}
                        size="large"
                      />
                      <Typography variant="caption">Advanced</Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    sx={{ px: 3 }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ 
                      py: 1.2,
                      px: 3,
                      background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                      fontWeight: 600
                    }}
                  >
                    Continue
                  </Button>
                </Box>
              </StepContent>
            </Step>
            
            <Step>
              <StepLabel
                StepIconProps={{
                  icon: <ArticleIcon />,
                  sx: { 
                    fontSize: 28,
                    color: activeStep >= 2 ? theme.palette.primary.main : 'grey.500'
                  }
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Assessment Results
                </Typography>
              </StepLabel>
              <StepContent>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ mb: 3 }}>
                    Based on your inputs, we've prepared an initial security assessment for your business.
                  </Typography>
                  
                  {!reportGenerated ? (
                    <Box sx={{ mb: 3 }}>
                      <Button
                        variant="contained"
                        onClick={handleGenerateReport}
                        sx={{ 
                          py: 1.2,
                          px: 3,
                          mb: 2,
                          background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                          boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                          fontWeight: 600
                        }}
                      >
                        Generate Assessment
                      </Button>
                      <LinearProgress sx={{ height: 6, borderRadius: 3 }} />
                    </Box>
                  ) : (
                    <>
                      <Box sx={{ mb: 4 }}>
                        <Card sx={{ 
                          mb: 3, 
                          borderRadius: 2,
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                          overflow: 'hidden'
                        }}>
                          <Box sx={{ 
                            p: 2, 
                            background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                          }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
                              Your Security Risk Assessment
                            </Typography>
                          </Box>
                          
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                              <Avatar 
                                sx={{ 
                                  bgcolor: `${riskInfo.color}20`,
                                  color: riskInfo.color,
                                  width: 64,
                                  height: 64,
                                  mr: 2
                                }}
                              >
                                <Typography variant="h5" fontWeight={700}>
                                  {riskScore}%
                                </Typography>
                              </Avatar>
                              <Box>
                                <Typography variant="body2" color="textSecondary">
                                  Risk Score
                                </Typography>
                                <Chip 
                                  label={riskInfo.label}
                                  sx={{ 
                                    bgcolor: `${riskInfo.color}15`,
                                    color: riskInfo.color,
                                    fontWeight: 600,
                                    mt: 0.5
                                  }}
                                />
                              </Box>
                            </Box>
                            
                            <Box sx={{ mt: 2 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={riskScore} 
                                sx={{ 
                                  height: 10, 
                                  borderRadius: 5,
                                  bgcolor: 'rgba(0, 0, 0, 0.05)',
                                  '& .MuiLinearProgress-bar': {
                                    bgcolor: riskInfo.color
                                  }
                                }}
                              />
                            </Box>
                          </CardContent>
                        </Card>
                        
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                          Key Findings:
                        </Typography>
                        
                        {/* Key findings based on inputs */}
                        <Box sx={{ display: 'grid', gap: 2 }}>
                          {/* Size-based finding */}
                          <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <CardContent sx={{ display: 'flex', gap: 2 }}>
                              <Avatar
                                sx={{ 
                                  bgcolor: hasSecurityStaff === 'no' ? 'rgba(244, 67, 54, 0.1)' : 'rgba(76, 175, 80, 0.1)',
                                  color: hasSecurityStaff === 'no' ? theme.palette.error.main : theme.palette.success.main
                                }}
                              >
                                {hasSecurityStaff === 'no' ? <WarningIcon /> : <CheckCircleIcon />}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                  {employeeCount && hasSecurityStaff === 'no' ? `${employeeCount} without dedicated security staff` : 'Security Staffing'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                  {hasSecurityStaff === 'no' ? 
                                    'Having no dedicated security personnel increases risk for a business of your size' : 
                                    'Your security staffing provides a good foundation for your security posture'}
                                </Typography>
                              </Box>
                            </CardContent>
                          </Card>
                          
                          {/* Threat awareness finding */}
                          <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <CardContent sx={{ display: 'flex', gap: 2 }}>
                              <Avatar
                                sx={{ 
                                  bgcolor: selectedThreats.length > 5 ? 'rgba(3, 169, 244, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                                  color: selectedThreats.length > 5 ? theme.palette.secondary.main : theme.palette.warning.main
                                }}
                              >
                                {selectedThreats.length > 5 ? <CheckCircleIcon /> : <PendingIcon />}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                  {selectedThreats.length > 5 ? 'Good threat awareness' : 'Limited threat awareness'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                  {selectedThreats.length > 5 
                                    ? 'Your awareness of multiple threat vectors will help in building a comprehensive security strategy' 
                                    : 'Being aware of more potential threats would improve your security posture'}
                                </Typography>
                              </Box>
                            </CardContent>
                          </Card>
                          
                          {/* Maturity finding */}
                          <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <CardContent sx={{ display: 'flex', gap: 2 }}>
                              <Avatar
                                sx={{ 
                                  bgcolor: securityMaturity && securityMaturity > 3 ? 'rgba(3, 169, 244, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                                  color: securityMaturity && securityMaturity > 3 ? theme.palette.secondary.main : theme.palette.warning.main
                                }}
                              >
                                {securityMaturity && securityMaturity > 3 ? <CheckCircleIcon /> : <PendingIcon />}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                  {securityMaturity && securityMaturity > 3 ? 'Advanced security maturity' : 'Developing security maturity'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                  {securityMaturity && securityMaturity > 3 
                                    ? 'Your organization has implemented good security practices' 
                                    : 'There is room to improve your organization\'s security practices and policies'}
                                </Typography>
                              </Box>
                            </CardContent>
                          </Card>
                        </Box>
                      </Box>
                      
                      <Divider sx={{ my: 3 }} />
                      
                      {/* Recommended actions */}
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                          Recommended Actions:
                        </Typography>
                        
                        <Box sx={{ display: 'grid', gap: 2 }}>
                          {/* Action 1 */}
                          <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <CardContent>
                              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>1</Avatar>
                                <Box>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                    Schedule a comprehensive security assessment
                                  </Typography>
                                  <Typography variant="body2" color="textSecondary">
                                    Our student consultants can perform a detailed on-site assessment to identify specific vulnerabilities and provide customized recommendations.
                                  </Typography>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                          
                          {/* Action 2 */}
                          <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <CardContent>
                              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <Avatar sx={{ bgcolor: theme.palette.secondary.main, mr: 2 }}>2</Avatar>
                                <Box>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                    Implement basic security controls
                                  </Typography>
                                  <Typography variant="body2" color="textSecondary">
                                    Enable multi-factor authentication, implement data backups, and ensure all systems are up-to-date with security patches.
                                  </Typography>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                          
                          {/* Action 3 */}
                          <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                            <CardContent>
                              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                <Avatar sx={{ bgcolor: '#7e57c2', mr: 2 }}>3</Avatar>
                                <Box>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                    Conduct staff security awareness training
                                  </Typography>
                                  <Typography variant="body2" color="textSecondary">
                                    Employee education is one of the most cost-effective ways to improve security. Our team can provide customized training sessions.
                                  </Typography>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        </Box>
                      </Box>
                      
                      <Card sx={{ 
                        mb: 3, 
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        bgcolor: 'rgba(25, 118, 210, 0.04)',
                        border: '1px solid rgba(25, 118, 210, 0.1)',
                      }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                              <SchoolIcon />
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                Manhattanville University Student Consultant Team
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                Our team of cybersecurity students is ready to help implement these recommendations. We provide affordable security services to local businesses while gaining valuable real-world experience under faculty supervision.
                              </Typography>
                              <Button 
                                variant="outlined" 
                                color="primary"
                                sx={{ mt: 2 }}
                                startIcon={<HelpOutlineIcon />}
                              >
                                Request Consultation
                              </Button>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </Box>
                
                <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    sx={{ px: 3 }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleReset}
                    startIcon={<ShieldIcon />}
                    sx={{ 
                      py: 1.2,
                      px: 3,
                      background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                      fontWeight: 600
                    }}
                  >
                    Start New Assessment
                  </Button>
                </Box>
              </StepContent>
            </Step>
          </Stepper>
        </Box>
        
        {/* Footer */}
        <Box sx={{ 
          mt: 4, 
          pt: 3, 
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} Rocky Security Solutions | Manhattanville University
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default BusinessAssessment;