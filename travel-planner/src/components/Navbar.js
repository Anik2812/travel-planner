// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <FlightTakeoffIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Travel Planner
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/search">Search</Button>
        <Button color="inherit" component={Link} to="/itinerary">Itinerary</Button>
        <Button color="inherit" component={Link} to="/budget">Budget</Button>
        <Button color="inherit" component={Link} to="/tips">Travel Tips</Button>
        <Button color="inherit" component={Link} to="/currency">Currency</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;