import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Tabs, 
  Tab, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  useTheme
} from '@mui/material';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';
import QuizIcon from '@mui/icons-material/Quiz';
import SchoolIcon from '@mui/icons-material/School';
import SecurityIcon from '@mui/icons-material/Security';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CodeIcon from '@mui/icons-material/Code';
import SpeedIcon from '@mui/icons-material/Speed';
import CloudIcon from '@mui/icons-material/Cloud';
import PhishingIcon from '@mui/icons-material/Phishing';
import CheckIcon from '@mui/icons-material/Check';

interface Resource {
  id: number;
  title: string;
  type: 'article' | 'video' | 'template' | 'guide' | 'training';
  category: string;
  author: string;
  date: string;
  rating: number;
  readTime?: string;
  videoLength?: string;
  description: string;
  image?: string;
  popular?: boolean;
}

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
      id={`learning-tabpanel-${index}`}
      aria-labelledby={`learning-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Categories for filtering
const categories = [
  { name: 'All Resources', icon: <SecurityIcon />, color: '#1976d2' },
  { name: 'Phishing Defense', icon: <PhishingIcon />, color: '#f44336' },
  { name: 'Network Security', icon: <SpeedIcon />, color: '#ff9800' },
  { name: 'Cloud Security', icon: <CloudIcon />, color: '#03a9f4' },
  { name: 'Client Education', icon: <PeopleIcon />, color: '#4caf50' },
  { name: 'Assessment Tools', icon: <CodeIcon />, color: '#7e57c2' },
];

const resources: Resource[] = [
  {
    id: 1,
    title: 'Small Business Security Essentials',
    type: 'guide',
    category: 'Client Education',
    author: 'John Smith',
    date: 'March 1, 2025',
    rating: 4.8,
    readTime: '15 min',
    description: 'A comprehensive guide to essential security practices for small business owners.',
    image: 'https://example.com/image1.jpg',
    popular: true
  },
  {
    id: 2,
    title: 'How to Conduct a Phishing Simulation',
    type: 'video',
    category: 'Phishing Defense',
    author: 'Emily Chen',
    date: 'February 14, 2025',
    rating: 4.5,
    videoLength: '22:15',
    description: 'Step-by-step tutorial on setting up effective phishing simulations for clients.',
    image: 'https://example.com/image2.jpg',
    popular: true
  },
  {
    id: 3,
    title: 'Network Vulnerability Assessment Template',
    type: 'template',
    category: 'Assessment Tools',
    author: 'Michael Johnson',
    date: 'February 28, 2025',
    rating: 4.7,
    description: 'Ready-to-use template for documenting network vulnerabilities and recommendations.',
    popular: false
  },
  {
    id: 4,
    title: 'Cloud Security Best Practices',
    type: 'article',
    category: 'Cloud Security',
    author: 'Sarah Williams',
    date: 'February 20, 2025',
    rating: 4.6,
    readTime: '10 min',
    description: 'Learn how to secure cloud environments for small businesses.',
    popular: true
  },
  {
    id: 5,
    title: 'Staff Security Awareness Training',
    type: 'training',
    category: 'Client Education',
    author: 'David Rodriguez',
    date: 'March 2, 2025',
    rating: 4.9,
    videoLength: '45:00',
    description: 'Complete training program to educate client staff on security best practices.',
    popular: false
  },
  {
    id: 6,
    title: 'Secure Password Policies for SMBs',
    type: 'article',
    category: 'Client Education',
    author: 'Alex Turner',
    date: 'February 25, 2025',
    rating: 4.3,
    readTime: '8 min',
    description: 'How to establish effective password policies for small and medium businesses.',
    popular: false
  },
  {
    id: 7,
    title: 'Discovering Network Vulnerabilities',
    type: 'video',
    category: 'Network Security',
    author: 'Lisa Martinez',
    date: 'February 18, 2025',
    rating: 4.7,
    videoLength: '18:45',
    description: 'Demonstration of tools and techniques for discovering network vulnerabilities.',
    popular: true
  },
  {
    id: 8,
    title: 'Client Security Assessment Report Template',
    type: 'template',
    category: 'Assessment Tools',
    author: 'Kevin Zhang',
    date: 'March 3, 2025',
    rating: 4.8,
    description: 'Professional template for presenting security assessment findings to clients.',
    popular: false
  },
];

// Function to get icon for resource type
const getResourceIcon = (type: string) => {
  switch (type) {
    case 'article':
      return <ArticleIcon />;
    case 'video':
      return <VideoLibraryIcon />;
    case 'template':
      return <InsertDriveFileIcon />;
    case 'guide':
      return <SchoolIcon />;
    case 'training':
      return <PeopleIcon />;
    default:
      return <ArticleIcon />;
  }
};

// Function to get color for resource type
const getResourceColor = (type: string) => {
  switch (type) {
    case 'article':
      return '#1976d2'; // Blue
    case 'video':
      return '#f44336'; // Red
    case 'template':
      return '#4caf50'; // Green
    case 'guide':
      return '#ff9800'; // Orange
    case 'training':
      return '#7e57c2'; // Purple
    default:
      return '#1976d2'; // Blue
  }
};

const LearningHub: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Resources');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredResources = resources.filter(resource => 
    (selectedCategory === 'All Resources' || resource.category === selectedCategory) && 
    (resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     resource.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const popularResources = resources.filter(resource => resource.popular);

  const newestResources = [...resources].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 4);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
        Security Learning Hub
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Educational resources created by Manhattanville University cybersecurity students to help clients implement best security practices
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            placeholder="Search for resources..."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth
            startIcon={<SchoolIcon />}
            sx={{ height: '56px' }}
          >
            Submit New Resource
          </Button>
        </Grid>
      </Grid>
      <Paper elevation={1} sx={{ borderRadius: 2, mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Browse All" />
          <Tab label="Popular Resources" />
          <Tab label="Newest Additions" />
          <Tab label="My Favorites" />
        </Tabs>
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Categories
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
            {categories.map((category) => (
              <Chip
                key={category.name}
                label={category.name}
                icon={category.icon}
                onClick={() => setSelectedCategory(category.name)}
                variant={selectedCategory === category.name ? "filled" : "outlined"}
                color={selectedCategory === category.name ? "primary" : "default"}
                sx={{ 
                  mb: 1,
                  fontWeight: 500,
                  '& .MuiChip-icon': {
                    color: selectedCategory === category.name ? 'inherit' : category.color
                  }
                }}
              />
            ))}
          </Stack>
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              {filteredResources.map((resource) => (
                <Grid item xs={12} sm={6} md={4} key={resource.id}>
                  <Card sx={{ 
                    borderRadius: 2, 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                    },
                  }}>
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip 
                        label={resource.type} 
                        size="small"
                        icon={getResourceIcon(resource.type)}
                        sx={{ 
                          backgroundColor: `${getResourceColor(resource.type)}15`,
                          color: getResourceColor(resource.type),
                          fontWeight: 500,
                          '& .MuiChip-icon': {
                            color: getResourceColor(resource.type)
                          }
                        }} 
                      />
                      <Typography variant="caption" color="textSecondary">
                        {resource.type === 'video' ? resource.videoLength : resource.readTime}
                      </Typography>
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
                        {resource.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        {resource.description}
                      </Typography>
                      <Typography variant="caption" color="textSecondary" display="block">
                        By {resource.author} • {resource.date}
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'space-between' }}>
                      <Button 
                        variant="text" 
                        color="primary"
                        startIcon={resource.type === 'video' ? <PlayArrowIcon /> : <ArticleIcon />}
                      >
                        {resource.type === 'video' ? 'Watch' : 'View'}
                      </Button>
                      <Button variant="text" color="secondary">
                        Save
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              {popularResources.map((resource) => (
                <Grid item xs={12} sm={6} md={4} key={resource.id}>
                  <Card sx={{ 
                    borderRadius: 2, 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                    },
                  }}>
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip 
                        label={resource.type} 
                        size="small"
                        icon={getResourceIcon(resource.type)}
                        sx={{ 
                          backgroundColor: `${getResourceColor(resource.type)}15`,
                          color: getResourceColor(resource.type),
                          fontWeight: 500,
                          '& .MuiChip-icon': {
                            color: getResourceColor(resource.type)
                          }
                        }} 
                      />
                      <Typography variant="caption" color="textSecondary">
                        {resource.type === 'video' ? resource.videoLength : resource.readTime}
                      </Typography>
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
                        {resource.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        {resource.description}
                      </Typography>
                      <Typography variant="caption" color="textSecondary" display="block">
                        By {resource.author} • {resource.date}
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'space-between' }}>
                      <Button 
                        variant="text" 
                        color="primary"
                        startIcon={resource.type === 'video' ? <PlayArrowIcon /> : <ArticleIcon />}
                      >
                        {resource.type === 'video' ? 'Watch' : 'View'}
                      </Button>
                      <Button variant="text" color="secondary">
                        Save
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              {newestResources.map((resource) => (
                <Grid item xs={12} sm={6} md={4} key={resource.id}>
                  <Card sx={{ 
                    borderRadius: 2, 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                    },
                  }}>
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip 
                        label={resource.type} 
                        size="small"
                        icon={getResourceIcon(resource.type)}
                        sx={{ 
                          backgroundColor: `${getResourceColor(resource.type)}15`,
                          color: getResourceColor(resource.type),
                          fontWeight: 500,
                          '& .MuiChip-icon': {
                            color: getResourceColor(resource.type)
                          }
                        }} 
                      />
                      <Typography variant="caption" color="textSecondary">
                        {resource.type === 'video' ? resource.videoLength : resource.readTime}
                      </Typography>
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
                        {resource.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        {resource.description}
                      </Typography>
                      <Typography variant="caption" color="textSecondary" display="block">
                        By {resource.author} • {resource.date}
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'space-between' }}>
                      <Button 
                        variant="text" 
                        color="primary"
                        startIcon={resource.type === 'video' ? <PlayArrowIcon /> : <ArticleIcon />}
                      >
                        {resource.type === 'video' ? 'Watch' : 'View'}
                      </Button>
                      <Button variant="text" color="secondary">
                        Save
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6 }}>
              <QuizIcon sx={{ fontSize: 64, color: 'rgba(0, 0, 0, 0.2)', mb: 2 }} />
              <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                No saved resources yet
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3, textAlign: 'center' }}>
                Save resources to access them quickly later
              </Typography>
              <Button variant="outlined" color="primary">
                Browse Resources
              </Button>
            </Box>
          </TabPanel>
        </Box>
      </Paper>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Get Started with Client Education
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 2,
                border: '1px solid rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Security Awareness Training
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Ready-to-use training materials to educate client staff on security best practices.
              </Typography>
              <List dense sx={{ mb: 2 }}>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '36px' }}>
                    <CheckIcon sx={{ color: theme.palette.success.main }} />
                  </ListItemIcon>
                  <ListItemText primary="Customizable slide decks" />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '36px' }}>
                    <CheckIcon sx={{ color: theme.palette.success.main }} />
                  </ListItemIcon>
                  <ListItemText primary="Phishing awareness exercises" />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '36px' }}>
                    <CheckIcon sx={{ color: theme.palette.success.main }} />
                  </ListItemIcon>
                  <ListItemText primary="Security best practices handouts" />
                </ListItem>
              </List>
              <Button variant="outlined" color="primary" sx={{ mt: 'auto' }}>
                View Resources
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 2,
                border: '1px solid rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Security Policy Templates
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Help clients develop proper security policies with these customizable templates.
              </Typography>
              <List dense sx={{ mb: 2 }}>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '36px' }}>
                    <CheckIcon sx={{ color: theme.palette.success.main }} />
                  </ListItemIcon>
                  <ListItemText primary="Password policy template" />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '36px' }}>
                    <CheckIcon sx={{ color: theme.palette.success.main }} />
                  </ListItemIcon>
                  <ListItemText primary="Acceptable use policy" />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '36px' }}>
                    <CheckIcon sx={{ color: theme.palette.success.main }} />
                  </ListItemIcon>
                  <ListItemText primary="Incident response procedures" />
                </ListItem>
              </List>
              <Button variant="outlined" color="primary" sx={{ mt: 'auto' }}>
                View Templates
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 2,
                border: '1px solid rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Security Assessment Tools
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Tools and templates to help you conduct thorough security assessments.
              </Typography>
              <List dense sx={{ mb: 2 }}>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '36px' }}>
                    <CheckIcon sx={{ color: theme.palette.success.main }} />
                  </ListItemIcon>
                  <ListItemText primary="Vulnerability scanning guide" />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '36px' }}>
                    <CheckIcon sx={{ color: theme.palette.success.main }} />
                  </ListItemIcon>
                  <ListItemText primary="Risk assessment worksheets" />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: '36px' }}>
                    <CheckIcon sx={{ color: theme.palette.success.main }} />
                  </ListItemIcon>
                  <ListItemText primary="Security report templates" />
                </ListItem>
              </List>
              <Button variant="outlined" color="primary" sx={{ mt: 'auto' }}>
                View Tools
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LearningHub;