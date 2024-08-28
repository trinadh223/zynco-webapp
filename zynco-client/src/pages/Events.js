import React, { useState, useEffect } from 'react';
import { Typography, Container, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import Footer from '../components/Footer';

const Events = () => {
  // ... (keep the existing state and useEffect)
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <Container sx={{ py: 8, minHeight: 'calc(100vh - 64px - 300px)' }}> {/* Adjust minHeight to account for navbar and footer */}
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: '#2c3e50' }}>
        Upcoming Events
      </Typography>
      <Grid container spacing={4}>
        {events.map((event, index) => (
          <Grid item key={event._id} xs={12} sm={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 30px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    {event.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5, color: '#7f8c8d' }}>
                    {new Date(event.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#34495e' }}>
                    {event.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" sx={{ fontWeight: 'bold' }}>View Details</Button>
                  <Button size="small" color="secondary" sx={{ fontWeight: 'bold' }}>Join Event</Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Events;