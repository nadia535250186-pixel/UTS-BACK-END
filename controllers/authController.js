const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  const userExist = await User.findOne({ username });
  if (userExist) {
    return res.json({ message: 'Username sudah ada' });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashed
  });

  await user.save();

  res.json({ message: 'Register berhasil' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.json({ message: 'User tidak ditemukan' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ message: 'Password salah' });

  const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });

  res.json({ message: 'Login berhasil', token });
};

// GET USER
exports.getUserByUsername = async (req, res) => {
  const user = await User.findOne({ username: req.params.username });

  if (!user) return res.json({ message: 'User tidak ada' });

  res.json(user);
};