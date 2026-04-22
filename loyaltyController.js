const Loyalty = require("../models/loyaltyModels");

// ADD POINTS
exports.addPoints = async (req, res) => {
  const { userId, points } = req.body;

  // ✅ VALIDASI
  if (!userId || typeof points !== "number") {
    return res.status(400).json({ message: "userId dan points harus diisi & valid" });
  }

  try {
    let user = await Loyalty.findOne({ userId });

    if (!user) {
      user = new Loyalty({ userId, points });
    } else {
      user.points += points;
    }

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET ALL LOYALTY (TAMBAHAN)
exports.getAllLoyalty = async (req, res) => {
  try {
    const data = await Loyalty.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET LOYALTY BY USER ID
exports.getLoyalty = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Loyalty.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// USE POINTS
exports.usePoints = async (req, res) => {
  const { userId, points } = req.body;

  // ✅ VALIDASI
  if (!userId || typeof points !== "number") {
    return res.status(400).json({ message: "userId dan points harus diisi & valid" });
  }

  try {
    const user = await Loyalty.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.points < points) {
      return res.status(400).json({ message: "Points not enough" });
    }

    user.points -= points;
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};