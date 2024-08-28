import React from 'react';
import { Typography, Container, Box, Button, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Footer from '../components/Footer';


const FeatureItem = ({ icon, title, description }) => (
  <Paper elevation={3} sx={{ p: 3, height: '100%', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: 6 } }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      {icon}
      <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  </Paper>
);

const Home = () => {
  return (
    <>
      <Container>
        <Box sx={{ 
          minHeight: 'calc(100vh - 64px - 100px)', // Adjusted for navbar and footer
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          textAlign: 'center',
          py: 8
        }}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
              Welcome to Zynco
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography variant="h5" sx={{ mb: 4, color: '#34495e' }}>
              Your go-to app for organizing events and meetups with friends and family.
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              component={Link}
              to="/events"
              sx={{
                borderRadius: '50px',
                padding: '10px 30px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textTransform: 'none',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 25px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              Explore Events
            </Button>
          </motion.div>

          <Box sx={{ mt: 8, width: '100%' }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 4 }}>
              Key Features
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={3}>
                <FeatureItem 
                  icon={<EventIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
                  title="Event Planning"
                  description="Create and manage events easily. Set dates, invite friends, and organize all the details in one place."
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FeatureItem 
                  icon={<GroupIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
                  title="Integrated Calendar"
                  description="See your friends' availability and find the perfect time for your event with our shared calendar feature."
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FeatureItem 
                  icon={<ChatIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
                  title="Group Chats"
                  description="Communicate with all event participants in dedicated group chats. Discuss details and share updates effortlessly."
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FeatureItem 
                  icon={<NotificationsActiveIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
                  title="Smart Notifications"
                  description="Stay informed with timely reminders about upcoming events, RSVP deadlines, and important updates."
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Home;