// src/components/Search.js
import React, { useState } from 'react';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import { TextField, Button, Card, CardContent, Typography, Grid, Container } from '@mui/material';

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
    <Container maxWidth="md">
      <animated.div style={fadeIn}>
        <Typography variant="h4" gutterBottom>
          Search Destinations
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a destination"
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          {results.map((result) => (
            <Grid item xs={12} sm={6} md={4} key={result.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{result.name}</Typography>
                  {/* Add more details here */}
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