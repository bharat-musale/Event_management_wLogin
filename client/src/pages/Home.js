import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Pagination,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
} from '@mui/material';
import EventCard from '../components/EventCard';
import { events } from '../services/api';
import { useNotification } from '../context/NotificationContext';

const Home = () => {
  const [eventsList, setEventsList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const { showNotification } = useNotification();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await events.getAll(page, pageSize);
      setEventsList(response.data.events);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching events:', error);
      showNotification('Failed to fetch events', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [page, pageSize]);

  const handleDelete = async (id) => {
    try {
      await events.delete(id);
      showNotification('Event deleted successfully!');
      fetchEvents(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting event:', error);
      showNotification('Failed to delete event', 'error');
    }
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1); // Reset to first page when changing page size
  };

  if (loading && eventsList.length === 0) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Events
        </Typography>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="page-size-label">Events per page</InputLabel>
          <Select
            labelId="page-size-label"
            value={pageSize}
            label="Events per page"
            onChange={handlePageSizeChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {eventsList.length === 0 ? (
        <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 4 }}>
          No events found. Create one to get started!
        </Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {eventsList.map((event) => (
              <Grid item xs={12} key={event._id}>
                <EventCard event={event} onDelete={handleDelete} />
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
              size="large"
            />
          </Box>
          
          <Typography variant="body2" color="textSecondary" align="center">
            Showing {eventsList.length} events per page
          </Typography>
        </>
      )}
    </Container>
  );
};

export default Home;
