const express = require('express');
const router = express.Router();

// pakai let supaya bisa diubah (ditambah data)
let menus = [
  { id: 1, name: "Nasi Goreng" },
  { id: 2, name: "Mie Ayam" }
];

// GET /api/menus
router.get('/', (req, res) => {
  res.json(menus);
});

// POST /api/menus
router.post('/', (req, res) => {
  const newMenu = req.body;
  menus.push(newMenu);

  res.json({
    message: "Menu berhasil ditambah",
    data: menus
  });
});

module.exports = router;