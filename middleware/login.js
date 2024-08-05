const { Berita } = require('../models/models.js');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');


const loginUser = async (req, res) => {
    const { username, password } = req.body;

    const user = {
        username: 'admin',
        password: 'password123',
    };

    // Check if username and password match
    if (username === user.username && password === user.password) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid Username or Password' });
    }
};

module.exports = {
    loginUser
  };

