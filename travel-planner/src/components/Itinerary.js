// src/components/Itinerary.js
import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { TextField, Button, List, ListItem, ListItemText, Typography, Container } from '@mui/material';
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

  return (
    <Container maxWidth="md">
      <animated.div style={fadeIn}>
        <Typography variant="h4" gutterBottom>
          Itinerary Planner
        </Typography>
        <div ref={mapRef} style={{ width: '100%', height: '400px', marginBottom: '20px' }}></div>
        <TextField
          fullWidth
          variant="outlined"
          value={newActivity}
          onChange={(e) => setNewActivity(e.target.value)}
          placeholder="Add an activity"
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={addActivity}>
          Add
        </Button>
        <List>
          {activities.map((activity, index) => (
            <ListItem key={index}>
              <ListItemText primary={activity} />
            </ListItem>
          ))}
        </List>
      </animated.div>
    </Container>
  );
}

export default Itinerary;