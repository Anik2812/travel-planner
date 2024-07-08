import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Typography, Box, Container, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ExploreIcon from '@mui/icons-material/Explore';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function Home() {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 },
  });

  return (
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
      <Container maxWidth="lg">
        <animated.div style={fadeIn}>
          <Typography variant="h1" component="h1" gutterBottom color="#50C878" sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Explore the World
          </Typography>
          <Typography variant="h4" paragraph color="#50C878" sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)', mb: 4 }}>
            Plan, budget, and embark on your next adventure with ease.
          </Typography>
          <Grid container spacing={3}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={Link}
                to="/search"
                startIcon={<ExploreIcon />}
                sx={{ px: 4, py: 2 }}
              >
                Start Exploring
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                component={Link}
                to="/itinerary"
                startIcon={<FlightTakeoffIcon />}
                sx={{ px: 4, py: 2 }}
              >
                Plan Itinerary
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="success"
                size="large"
                component={Link}
                to="/budget"
                startIcon={<AttachMoneyIcon />}
                sx={{ px: 4, py: 2 }}
              >
                Set Budget
              </Button>
            </Grid>
          </Grid>
        </animated.div>
      </Container>
    </Box>
  );
}

export default Home;