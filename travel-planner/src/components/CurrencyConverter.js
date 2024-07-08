import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import { TextField, Button, Typography, Container, Grid, Box, Paper, CircularProgress } from '@mui/material';
import { Autocomplete } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 500 },
  });

  useEffect(() => {
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => {
        setCurrencies(Object.keys(response.data.rates));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching currencies:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => {
          setExchangeRate(response.data.rates[toCurrency]);
        })
        .catch(error => console.error('Error fetching exchange rate:', error));
    }
  }, [fromCurrency, toCurrency]);

  const handleConvert = () => {
    const result = amount * exchangeRate;
    return result.toFixed(2);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <animated.div style={fadeIn}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" gutterBottom color="primary" align="center">
            Currency Converter
          </Typography>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  options={currencies}
                  value={fromCurrency}
                  onChange={(event, newValue) => {
                    setFromCurrency(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} label="From" />}
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CompareArrowsIcon color="action" fontSize="large" />
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  options={currencies}
                  value={toCurrency}
                  onChange={(event, newValue) => {
                    setToCurrency(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} label="To" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleConvert} fullWidth>
                  Convert
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" align="center">
                  {amount} {fromCurrency} = {handleConvert()} {toCurrency}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </animated.div>
    </Container>
  );
}

export default CurrencyConverter;