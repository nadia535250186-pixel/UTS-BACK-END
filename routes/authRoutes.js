const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getUserByUsername
} = require('../controllers/authController');

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/users/:username', getUserByUsername);

module.exports = router;

router.get('/test', (req, res) => {
  res.send('OK');
});