// src/components/TravelTips.js
import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Typography, Container, Card, CardContent, Grid, Box, Avatar } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SecurityIcon from '@mui/icons-material/Security';
import LanguageIcon from '@mui/icons-material/Language';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

const tips = [
  { title: 'Pack Light', content: 'Only bring essentials to save space and avoid excess baggage fees.', icon: <FlightIcon /> },
  { title: 'Try Local Cuisine', content: 'Experience the culture through its food. Don\'t be afraid to try new dishes!', icon: <RestaurantIcon /> },
  { title: 'Capture Memories', content: 'Take photos, but also remember to enjoy the moment without a camera.', icon: <CameraAltIcon /> },
  { title: 'Stay Safe', content: 'Be aware of your surroundings and keep your belongings secure.', icon: <SecurityIcon /> },
  { title: 'Learn Key Phrases', content: 'Knowing a few words in the local language can go a long way.', icon: <LanguageIcon /> },
  { title: 'Budget Wisely', content: 'Set a daily budget and track your expenses to avoid overspending.', icon: <LocalAtmIcon /> },
];

function TravelTips() {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 500 },
  });

  return (
    <Container maxWidth="lg">
      <animated.div style={fadeIn}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" gutterBottom color="primary" align="center">
            Travel Tips
          </Typography>
          <Grid container spacing={3}>
            {tips.map((tip, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                        {tip.icon}
                      </Avatar>
                      <Typography variant="h6" component="h2">
                        {tip.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {tip.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </animated.div>
    </Container>
  );
}

export default TravelTips;

