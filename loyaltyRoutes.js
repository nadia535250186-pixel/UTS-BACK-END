const express = require("express");
const router = express.Router();
const Loyalty = require("../models/loyaltyModels");

// ✅ GET semua data
router.get("/", async (req, res) => {
  try {
    const data = await Loyalty.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET by userId
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const data = await Loyalty.findOne({ userId });

    if (!data) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ POST add points
router.post("/add", async (req, res) => {
  try {
    const { userId, points } = req.body;

    // 🔥 TAMBAHAN VALIDASI
    if (!userId || !points) {
      return res.status(400).json({
        message: "userId dan points wajib diisi"
      });
    }

    const user = await Loyalty.findOneAndUpdate(
      { userId },
      { $inc: { points: points } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ POST use points
router.post("/use", async (req, res) => {
  try {
    const { userId, points } = req.body;

    // 🔥 TAMBAHAN VALIDASI
    if (!userId || !points) {
      return res.status(400).json({
        message: "userId dan points wajib diisi"
      });
    }

    const user = await Loyalty.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    if (user.points < points) {
      return res.status(400).json({
        message: "Poin tidak cukup"
      });
    }

    user.points -= points;
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;