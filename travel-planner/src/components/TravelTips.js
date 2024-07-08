// src/components/TravelTips.js
import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Typography, Container, Card, CardContent, Grid } from '@mui/material';

const tips = [
  { title: 'Pack Light', content: 'Only bring essentials to save space and avoid excess baggage fees.' },
  { title: 'Learn Local Phrases', content: 'Knowing a few words in the local language can go a long way.' },
  { title: 'Travel Insurance', content: 'Always get travel insurance for peace of mind.' },
  { title: 'Local Cuisine', content: 'Try local dishes to fully experience the culture.' },
  { title: 'Offline Maps', content: 'Download offline maps for easy navigation without data.' },
  { title: 'Portable Charger', content: 'Bring a portable charger to keep your devices powered up.' },
];

function TravelTips() {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  return (
    <Container maxWidth="md">
      <animated.div style={fadeIn}>
        <Typography variant="h4" gutterBottom>
          Travel Tips
        </Typography>
        <Grid container spacing={3}>
          {tips.map((tip, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {tip.title}
                  </Typography>
                  <Typography variant="body2">
                    {tip.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </animated.div>
    </Container>
  );
}

export default TravelTips;