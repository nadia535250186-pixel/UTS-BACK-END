const express = require('express');
const app = express();

const menusRoutes = require('./menus');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server API jalan');
});

app.use('/api/menus', menusRoutes);

app.listen(3000, () => {
  console.log('Server jalan di http://localhost:3000');
});  