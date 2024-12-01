require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pgp = require('pg-promise')();
const cors = require('cors');
const app = express();
const port = 5000;

// ตรวจสอบการตั้งค่า DATABASE_URL
const db = pgp(process.env.DATABASE_URL || 'postgres://postgres:MY@ym2562@localhost:5432/postgres');
const SECRET_KEY = '4a90b2c5e4d2e4986e91eb3f91f91275d916c147e516ea5f2de6c45251aa917d2d7c9461b0e19681617dc7089291c8b2c1d0ee3f567de92c8dc972a2b5b843a0';

app.use(express.json());
app.use(cors());

// สร้างตาราง users หากยังไม่มี
const createTable = async () => {
  try {
    await db.none(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);
    console.log('Table "users" is ready.');
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

createTable();

// Register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    await db.none('INSERT INTO users(username, password) VALUES($1, $2)', [username, hashedPassword]);
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).send(error);
  }
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await db.one('SELECT * FROM users WHERE username = $1', [username]);
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (validPassword) {
      const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token is required');

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send('Invalid token');
  }
};

// Protected route
app.get('/gallery', verifyToken, (req, res) => {
  res.send('This is a protected route');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});



//postgres://postgres:MY@ym2562@localhost:5432/postgres