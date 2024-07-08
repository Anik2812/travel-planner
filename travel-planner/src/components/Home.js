// src/components/Home.js
import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Typography, Box, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={fadeIn}>
      <Box
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/1600x900/?travel)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom color="white">
            Plan Your Next Adventure
          </Typography>
          <Typography variant="h5" paragraph color="white">
            Discover new destinations, create itineraries, and manage your travel budget with ease.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/search"
          >
            Start Planning
          </Button>
        </Container>
      </Box>
    </animated.div>
  );
}

export default Home;