// src/components/Search.js
import React, { useState } from 'react';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import { TextField, Button, Card, CardContent, Typography, Grid, Container, Box, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/search?q=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <animated.div style={fadeIn}>
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom color="primary">
            Discover Your Next Destination
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <TextField
              fullWidth
              variant="outlined"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter a destination"
              sx={{ maxWidth: 600, mr: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleSearch} startIcon={<SearchIcon />}>
              Search
            </Button>
          </Box>
        </Box>
        <Grid container spacing={3}>
          {results.map((result) => (
            <Grid item xs={12} sm={6} md={4} key={result.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ pt: '56.25%', position: 'relative' }}>
                  <Box
                    component="img"
                    src={`https://source.unsplash.com/400x300/?${result.name}`}
                    alt={result.name}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {result.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Travel Planner, a travel app that helps you plan, budget, and explore your next adventure.
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip label="Popular" color="primary" size="small" />
                    <Chip label="Beach" color="secondary" size="small" />
                    <Chip label="Culture" color="success" size="small" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </animated.div>
    </Container>
  );
}

export default Search;