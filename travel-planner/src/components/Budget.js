// src/components/Budget.js
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { TextField, Button, Typography, Container, Box, Paper, Grid, LinearProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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
    const remainingBudget = budget - totalExpenses;
    const budgetProgress = (totalExpenses / budget) * 100;

    return (
        <Container maxWidth="lg">
            <animated.div style={fadeIn}>
                <Box sx={{ my: 4 }}>
                    <Typography variant="h2" gutterBottom color="primary">
                        Budget Planner
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 3 }}>
                                <Typography variant="h5" gutterBottom>
                                    Set Your Budget
                                </Typography>
                                <TextField
                                    fullWidth
                                    label="Total Budget"
                                    type="number"
                                    value={budget}
                                    onChange={(e) => setBudget(Number(e.target.value))}
                                    margin="normal"
                                />
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="body1">
                                        Total Budget: ${budget}
                                    </Typography>
                                    <Typography variant="body1">
                                        Total Expenses: ${totalExpenses}
                                    </Typography>
                                    <Typography variant="body1" color={remainingBudget >= 0 ? 'success.main' : 'error.main'}>
                                        Remaining Budget: ${remainingBudget}
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                        <LinearProgress variant="determinate" value={budgetProgress} color={remainingBudget >= 0 ? 'primary' : 'error'} />
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 3 }}>
                                <Typography variant="h5" gutterBottom>
                                    Add Expense
                                </Typography>
                                <TextField
                                    fullWidth
                                    label="Amount"
                                    type="number"
                                    value={newExpenseAmount}
                                    onChange={(e) => setNewExpenseAmount(e.target.value)}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    label="Description"
                                    value={newExpenseDescription}
                                    onChange={(e) => setNewExpenseDescription(e.target.value)}
                                    margin="normal"
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={addExpense}
                                    startIcon={<AddIcon />}
                                    sx={{ mt: 2 }}
                                >
                                    Add Expense
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ p: 3 }}>
                                <Typography variant="h5" gutterBottom>
                                    Expenses
                                </Typography>
                                <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                                    {expenses.map((expense, index) => (
                                        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body1">
                                                {expense.description}
                                            </Typography>
                                            <Typography variant="body1">
                                                ${expense.amount}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </animated.div>
        </Container>
    );
}

export default Budget;