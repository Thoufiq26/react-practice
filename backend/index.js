// Import Packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./models/users');

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/crud")
    .then(() => console.log('Connected successfully to Database'))
    .catch((err) => console.log('Database connection error:', err));

// Routes
// Signup route
app.post('/mongodb-signup', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    userModel.create({
        firstName,
        lastName,
        email,
        password
    })
        .then(user => res.json(user))
        .catch(err => {
            console.log('Signup error:', err);
            res.status(500).json({ error: err.message });
        });
});

// Create user route
app.post('/create-users', (req, res) => {
    userModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => {
            console.log('Create user error:', err);
            res.status(500).json({ error: err.message });
        });
});

// Get all users route
app.get('/users', (req, res) => {
    userModel.find({})
        .then(users => res.json(users))
        .catch(err => {
            console.log('Get users error:', err);
            res.status(500).json({ error: err.message });
        });
});

// Get user by ID route
app.get('/getusers/:id', (req, res) => {
    const id = req.params.id;
    userModel.findById(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => {
            console.log('Get user error:', err);
            res.status(500).json({ error: err.message });
        });
});

// Update user route
app.put('/update-users/:id', (req, res) => {
    const id = req.params.id;
    const { name, email, age } = req.body;
    
    userModel.findByIdAndUpdate(
        id,
        { name, email, age },
        { new: true, runValidators: true }
    )
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        })
        .catch(err => {
            console.log('Update user error:', err);
            res.status(500).json({ error: err.message });
        });
});

//delet 
app.delete('/delete-users/:id', (req, res) => {
    const id = req.params.id;
    userModel.findByIdAndDelete(id)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        })
        .catch((err) => {
            console.log('Delete user error:', err);
            res.status(500).json({ error: err.message });
        });
});

// Start server
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});