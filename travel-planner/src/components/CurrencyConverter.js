// src/components/CurrencyConverter.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import { Autocomplete } from '@mui/lab';

function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => {
        setCurrencies(Object.keys(response.data.rates));
      })
      .catch(error => console.error('Error fetching currencies:', error));
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

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Currency Converter
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            options={currencies}
            value={fromCurrency}
            onChange={(event, newValue) => {
              setFromCurrency(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="From Currency" />}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            options={currencies}
            value={toCurrency}
            onChange={(event, newValue) => {
              setToCurrency(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="To Currency" />}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleConvert}>
            Convert
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            {amount} {fromCurrency} = {handleConvert()} {toCurrency}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CurrencyConverter;