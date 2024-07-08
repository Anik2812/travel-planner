// src/components/Itinerary.js
import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { TextField, Button, List, ListItem, ListItemText, Typography, Container, Box, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

function Itinerary() {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState('');
  const mapRef = useRef();
  const mapInstance = useRef(null);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  useEffect(() => {
    if (!mapInstance.current) {
      mapInstance.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: fromLonLat([-122.4376, 37.7577]),
          zoom: 8
        })
      });
    }
  }, []);

  const addActivity = () => {
    if (newActivity.trim() !== '') {
      setActivities([...activities, newActivity]);
      setNewActivity('');
    }
  };

  const removeActivity = (index) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  return (
    <Container maxWidth="lg">
      <animated.div style={fadeIn}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" gutterBottom color="primary">
            Plan Your Perfect Itinerary
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <TextField
              fullWidth
              variant="outlined"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              placeholder="Add an activity"
            />
            <Button variant="contained" color="primary" onClick={addActivity} startIcon={<AddIcon />}>
              Add
            </Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Paper elevation={3} sx={{ flex: 1, p: 2, maxHeight: 400, overflowY: 'auto' }}>
              <List>
                {activities.map((activity, index) => (
                  <ListItem key={index} secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => removeActivity(index)}>
                      <DeleteIcon />
                    </IconButton>
                  }>
                    <ListItemText primary={activity} />
                  </ListItem>
                ))}
              </List>
            </Paper>
            <Box sx={{ flex: 1 }}>
              <div ref={mapRef} style={{ width: '100%', height: '400px', borderRadius: '8px', overflow: 'hidden' }}></div>
            </Box>
          </Box>
        </Box>
      </animated.div>
    </Container>
  );
}

export default Itinerary;