// src/components/Budget.js
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { TextField, Button, List, ListItem, ListItemText, Typography, Container, Paper } from '@mui/material';

function Budget() {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [newExpenseDescription, setNewExpenseDescription] = useState('');

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  const addExpense = () => {
    if (newExpenseAmount && newExpenseDescription) {
      setExpenses([...expenses, { amount: Number(newExpenseAmount), description: newExpenseDescription }]);
      setNewExpenseAmount('');
      setNewExpenseDescription('');
    }
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <Container maxWidth="md">
      <animated.div style={fadeIn}>
        <Typography variant="h4" gutterBottom>
          Budget Planner
        </Typography>
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <TextField
            fullWidth
            label="Total Budget"
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            margin="normal"
          />
        </Paper>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Add Expense
          </Typography>
          <TextField
            label="Amount"
            type="number"
            value={newExpenseAmount}
            onChange={(e) => setNewExpenseAmount(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Description"
            value={newExpenseDescription}
            onChange={(e) => setNewExpenseDescription(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={addExpense} style={{ marginTop: '10px' }}>
            Add Expense
          </Button>
        </Paper>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Expenses
          </Typography>
          <List>
            {expenses.map((expense, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${expense.description}: $${expense.amount}`} />
              </ListItem>
            ))}
          </List>
          <Typography variant="subtitle1">
            Total Expenses: ${totalExpenses}
          </Typography>
          <Typography variant="subtitle1">
            Remaining Budget: ${budget - totalExpenses}
          </Typography>
        </Paper>
      </animated.div>
    </Container>
  );
}

export default Budget;