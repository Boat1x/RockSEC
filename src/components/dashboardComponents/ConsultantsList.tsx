import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  IconButton,
  Typography,
  LinearProgress
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Consultant {
  id: string;
  name: string;
  role: string;
  status: string;
  avatarUrl?: string;
}

interface ConsultantsListProps {
  consultants: Consultant[];
  loading: boolean;
  searchTerm: string;
}

const ConsultantsList: React.FC<ConsultantsListProps> = ({ consultants, loading, searchTerm }) => {
  if (loading) {
    return <LinearProgress />;
  }

  const filteredConsultants = consultants.filter(consultant => 
    consultant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultant.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredConsultants.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
        No consultants found
      </Typography>
    );
  }

  return (
    <List>
      {filteredConsultants.map((consultant, index) => (
        <ListItem 
          key={consultant.id} 
          sx={{ 
            bgcolor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.02)' : 'transparent', 
            borderRadius: 1 
          }}
        >
          <ListItemAvatar>
            <Avatar 
              src={consultant.avatarUrl || `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 1}.jpg`} 
            />
          </ListItemAvatar>
          <ListItemText 
            primary={consultant.name} 
            secondary={consultant.role}
          />
          <Chip 
            label={consultant.status || "Active"} 
            color={consultant.status === "On Leave" ? "warning" : "success"} 
            size="small" 
            sx={{ mr: 1 }} 
          />
          <IconButton size="small">
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ConsultantsList;
