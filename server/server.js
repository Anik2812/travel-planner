// server/server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock data for destination search
const destinations = [
    { id: 1, name: 'Paris, France' },
    { id: 2, name: 'Tokyo, Japan' },
    { id: 3, name: 'New York City, USA' },
    { id: 4, name: 'Rome, Italy' },
    { id: 5, name: 'Sydney, Australia' },
];
app.get('/', (req, res) => {
    res.send('Welcome to Travel planner API');
});
app.get('/api/search', (req, res) => {
    const { q } = req.query;
    const results = destinations.filter(dest =>
        dest.name.toLowerCase().includes(q.toLowerCase())
    );
    res.json(results);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});