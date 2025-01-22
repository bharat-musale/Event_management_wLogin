import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Grid,
  Divider,
} from '@mui/material';
import { format } from 'date-fns';
import { events } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await events.getById(id);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
        showNotification('Failed to fetch event details', 'error');
        navigate('/home');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, navigate, showNotification]);

  const handleEdit = () => {
    navigate(`/events/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await events.delete(id);
      showNotification('Event deleted successfully!');
      navigate('/home');
    } catch (error) {
      console.error('Error deleting event:', error);
      showNotification('Failed to delete event', 'error');
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!event) {
    return (
      <Container>
        <Typography variant="h5" color="error">
          Event not found
        </Typography>
      </Container>
    );
  }

  const isOrganizer = user && event.organizer._id === user.id;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              {event.title}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ my: 3 }}>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Date & Time
              </Typography>
              <Typography variant="body1">
                {format(new Date(event.date), 'PPP p')}
              </Typography>
            </Box>

            <Box sx={{ my: 3 }}>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Location
              </Typography>
              <Typography variant="body1">{event.location}</Typography>
            </Box>

            <Box sx={{ my: 3 }}>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {event.description}
              </Typography>
            </Box>

            <Box sx={{ my: 3 }}>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Organized by
              </Typography>
              <Typography variant="body1">{event.organizer.username}</Typography>
            </Box>
          </Grid>

          {isOrganizer && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEdit}
                  startIcon={<EditIcon />}
                  size="large"
                >
                  Edit Event
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                  startIcon={<DeleteIcon />}
                  size="large"
                >
                  Delete Event
                </Button>
              </Box>
            </Grid>
          )}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'flex-start' }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/home')}
              >
                Back to Events
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default EventDetails;
