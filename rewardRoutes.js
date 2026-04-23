import express from "express";
import { getRewards, redeemReward } from "../controllers/rewardController.js";

const router = express.Router();

router.get("/reward", getRewards);
router.post("/redeem", redeemReward);

export default router;