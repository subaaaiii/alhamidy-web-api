import { Berita } from "../models/models.js";
import { Url } from "url";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Op } from "sequelize";
import jwt from "jsonwebtoken"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const loginUser = async (req, res) => {
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

