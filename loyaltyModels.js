const mongoose = require("mongoose");

const loyaltySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "userId wajib diisi"],
      unique: true, // 1 user = 1 data
      trim: true
    },
    points: {
      type: Number,
      default: 0,
      min: [0, "points tidak boleh minus"]
    }
  },
  {
    timestamps: true
  }
);

// 🔥 Biar response lebih clean (hilangin __v & rapihin id)
loyaltySchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model("Loyalty", loyaltySchema);