import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  point_required: {
    type: Number,
    required: true,
    min: 0
  }
}, { 
  timestamps: true 
});

const Reward = mongoose.model("Reward", rewardSchema);

export default Reward;