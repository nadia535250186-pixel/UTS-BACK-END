const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json());
app.use((req, res, next) => {
  console.log('REQ:', req.method, req.url);
  next();
});

app.use('/api', require('./routes/authRoutes'));

app.listen(5000, () => {
  console.log('Server jalan di port 5000');
});