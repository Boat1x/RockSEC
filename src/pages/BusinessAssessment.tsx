import React, { useState } from 'react';
import {
  Box,
  Paper,
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
  useTheme,
  Avatar,
  Chip,
  LinearProgress,
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

interface BusinessAssessmentProps {
  // Add props if needed
}

type ThreatConcern = string;
type SecurityStaffOption = 'yes' | 'partial' | 'no';
type BusinessType = string;
type EmployeeCount = string;

const BusinessAssessment: React.FC<BusinessAssessmentProps> = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [businessType, setBusinessType] = useState<BusinessType>('');
  const [employeeCount, setEmployeeCount] = useState<EmployeeCount>('');
  const [selectedThreats, setSelectedThreats] = useState<ThreatConcern[]>([]);
  const [securityMaturity, setSecurityMaturity] = useState<number | null>(2);
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

  const handleBusinessTypeChange = (event: SelectChangeEvent<string>): void => {
    setBusinessType(event.target.value);
  };

  const handleEmployeeCountChange = (event: SelectChangeEvent<string>): void => {
    setEmployeeCount(event.target.value);
  };

  const handleSecurityStaffChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setHasSecurityStaff(event.target.value as SecurityStaffOption);
  };

  const handleGenerateReport = (): void => {
    // Simulate report generation
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

  // Calculate the security risk score (just an example calculation)
  const calculateRiskScore = (): number => {
    let score = 0;
    
    // Business size risk factor
    if (employeeCount === '1-5 employees') score += 1;
    else if (employeeCount === '6-20 employees') score += 2;
    else if (employeeCount === '21-50 employees') score += 3;
    else if (employeeCount === '51-100 employees') score += 4;
    else score += 5;
    
    // Security maturity factor (inverse relationship)
    if (securityMaturity) {
      score += (6 - securityMaturity);
    } else {
      score += 5;
    }
    
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
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        background: '#1e1e1e',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        mb: 4,
        maxWidth: 900,
        mx: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <AssessmentIcon sx={{ fontSize: 28, mr: 1.5, color: theme.palette.primary.main }} />
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          Business Security Assessment Tool
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" color="textSecondary">
          Created by Manhattanville University student consultants to help local businesses identify and address cybersecurity risks.
        </Typography>
      </Box>

      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel
            StepIconProps={{
              icon: <BusinessIcon />,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Business Information
            </Typography>
          </StepLabel>
          <StepContent>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Let's start by understanding your business better. This helps us tailor our security recommendations to your specific needs.
              </Typography>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
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
              
              <FormControl fullWidth sx={{ mb: 2 }}>
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
                <FormLabel component="legend">Do you have dedicated IT/security staff?</FormLabel>
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
                  background: 'linear-gradient(45deg, #6200ea 30%, #7c4dff 90%)',
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
              icon: <SecurityIcon />,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Security Concerns
            </Typography>
          </StepLabel>
          <StepContent>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                What security concerns are you most worried about? Select all that apply.
              </Typography>
              
              <FormControl component="fieldset" sx={{ mb: 2 }}>
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
                          />
                        }
                        label={threat}
                      />
                    ))}
                  </Box>
                </FormGroup>
              </FormControl>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  How would you rate your organization's current security maturity?
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="caption">Basic</Typography>
                  <Rating
                    value={securityMaturity}
                    onChange={(_, newValue) => {
                      setSecurityMaturity(newValue);
                    }}
                    max={5}
                  />
                  <Typography variant="caption">Advanced</Typography>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ 
                  background: 'linear-gradient(45deg, #6200ea 30%, #7c4dff 90%)',
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
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Assessment Results
            </Typography>
          </StepLabel>
          <StepContent>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Based on your inputs, we've prepared an initial security assessment for your business.
              </Typography>
              
              {!reportGenerated ? (
                <Box sx={{ mb: 3 }}>
                  <Button
                    variant="contained"
                    onClick={handleGenerateReport}
                    sx={{ 
                      background: 'linear-gradient(45deg, #6200ea 30%, #7c4dff 90%)',
                      mb: 2
                    }}
                  >
                    Generate Assessment
                  </Button>
                  <LinearProgress />
                </Box>
              ) : (
                <>
                  <Box sx={{ mb: 4 }}>
                    <Card sx={{ 
                      mb: 3, 
                      backgroundColor: 'rgba(30, 30, 30, 0.5)',
                      borderRadius: 2,
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, mr: 2 }}>
                            Risk Score:
                          </Typography>
                          <Chip 
                            label={`${riskScore}% - ${riskInfo.label}`}
                            sx={{ 
                              bgcolor: `${riskInfo.color}20`,
                              color: riskInfo.color,
                              fontWeight: 600,
                              borderRadius: 1
                            }}
                          />
                        </Box>
                        
                        <Box sx={{ mt: 2 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={riskScore} 
                            sx={{ 
                              height: 10, 
                              borderRadius: 5,
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: riskInfo.color
                              }
                            }}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                    
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                      Key Findings:
                    </Typography>
                    
                    {/* Key findings based on inputs */}
                    <Box sx={{ display: 'grid', gap: 2 }}>
                      {/* Size-based finding */}
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box 
                          sx={{ 
                            width: 28, 
                            height: 28, 
                            borderRadius: '50%', 
                            bgcolor: 'rgba(244, 67, 54, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <WarningIcon sx={{ fontSize: 16, color: theme.palette.error.main }} />
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {employeeCount && `${employeeCount} without dedicated security staff`}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {hasSecurityStaff === 'no' && 'Having no dedicated security personnel increases risk for a business of your size'}
                          </Typography>
                        </Box>
                      </Box>
                      
                      {/* Threat awareness finding */}
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box 
                          sx={{ 
                            width: 28, 
                            height: 28, 
                            borderRadius: '50%', 
                            bgcolor: selectedThreats.length > 5 ? 'rgba(3, 218, 198, 0.1)' : 'rgba(255, 193, 7, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {selectedThreats.length > 5 ? (
                            <CheckCircleIcon sx={{ fontSize: 16, color: theme.palette.secondary.main }} />
                          ) : (
                            <PendingIcon sx={{ fontSize: 16, color: theme.palette.warning.main }} />
                          )}
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {selectedThreats.length > 5 ? 'Good threat awareness' : 'Limited threat awareness'}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {selectedThreats.length > 5 
                              ? 'Your awareness of multiple threat vectors will help in building a comprehensive security strategy' 
                              : 'Being aware of more potential threats would improve your security posture'}
                          </Typography>
                        </Box>
                      </Box>
                      
                      {/* Maturity finding */}
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box 
                          sx={{ 
                            width: 28, 
                            height: 28, 
                            borderRadius: '50%', 
                            bgcolor: securityMaturity && securityMaturity > 3 ? 'rgba(3, 218, 198, 0.1)' : 'rgba(255, 193, 7, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {securityMaturity && securityMaturity > 3 ? (
                            <CheckCircleIcon sx={{ fontSize: 16, color: theme.palette.secondary.main }} />
                          ) : (
                            <PendingIcon sx={{ fontSize: 16, color: theme.palette.warning.main }} />
                          )}
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {securityMaturity && securityMaturity > 3 ? 'Advanced security maturity' : 'Developing security maturity'}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {securityMaturity && securityMaturity > 3 
                              ? 'Your organization has implemented good security practices' 
                              : 'There is room to improve your organization\'s security practices and policies'}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  
                  {/* Recommended actions */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                      Recommended Actions:
                    </Typography>
                    
                    <Box sx={{ display: 'grid', gap: 2 }}>
                      {/* Action 1 */}
                      <Card sx={{ 
                        backgroundColor: 'rgba(30, 30, 30, 0.5)',
                        borderRadius: 2,
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        <CardContent>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            1. Schedule a comprehensive security assessment
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Our student consultants can perform a detailed on-site assessment to identify specific vulnerabilities and provide customized recommendations.
                          </Typography>
                        </CardContent>
                      </Card>
                      
                      {/* Action 2 */}
                      <Card sx={{ 
                        backgroundColor: 'rgba(30, 30, 30, 0.5)',
                        borderRadius: 2,
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        <CardContent>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            2. Implement basic security controls
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Enable multi-factor authentication, implement data backups, and ensure all systems are up-to-date with security patches.
                          </Typography>
                        </CardContent>
                      </Card>
                      
                      {/* Action 3 */}
                      <Card sx={{ 
                        backgroundColor: 'rgba(30, 30, 30, 0.5)',
                        borderRadius: 2,
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        <CardContent>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            3. Conduct staff security awareness training
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Employee education is one of the most cost-effective ways to improve security. Our team can provide customized training sessions.
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: 'rgba(98, 0, 234, 0.1)', border: '1px solid rgba(98, 0, 234, 0.2)' }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 32, height: 32 }}>
                        <SchoolIcon sx={{ fontSize: 16 }} />
                      </Avatar>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Manhattanville University Student Consultant Team
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      Our team of cybersecurity students is ready to help implement these recommendations. We provide affordable security services to local businesses while gaining valuable real-world experience under faculty supervision.
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
            
            <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleReset}
                sx={{ 
                  background: 'linear-gradient(45deg, #6200ea 30%, #7c4dff 90%)',
                }}
              >
                Start New Assessment
              </Button>
            </Box>
          </StepContent>
        </Step>
      </Stepper>
    </Paper>
  );
};

export default BusinessAssessment;