import Reward from "../models/rewardModel.js";

// GET /reward
export const getRewards = async (req, res) => {
  try {
    const rewards = await Reward.find();
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /redeem
export const redeemReward = async (req, res) => {
  try {
    const { rewardId } = req.body;

    const reward = await Reward.findById(rewardId);

    if (!reward) {
      return res.status(404).json({ message: "Reward not found" });
    }

    // simulasi redeem
    res.json({
      message: "Reward redeemed successfully",
      reward
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};