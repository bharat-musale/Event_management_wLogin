import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const EventCard = ({ event, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isOrganizer = user && event.organizer._id === user.id;

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div" gutterBottom>
          {event.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {format(new Date(event.date), 'PPP')}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Location: {event.location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Organized by: {event.organizerName}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ display: 'flex', gap: 1, p: 1, width: '100%', justifyContent: 'flex-end' }}>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => navigate(`/events/${event._id}`)}
            startIcon={<VisibilityIcon />}
          >
            View
          </Button>
          {isOrganizer && (
            <>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => navigate(`/events/edit/${event._id}`)}
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => onDelete(event._id)}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default EventCard;
