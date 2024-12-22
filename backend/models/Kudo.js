const mongoose = require("mongoose");

const kudoSchema = new mongoose.Schema({
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  badge: {
    type: String,
    enum: ["Helping Hand", "Excellence", "Above and Beyond", "Client Focus"],
    required: true,
  },
  reason: {
    type: String,
    required: true,
    trim: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Kudo", kudoSchema);
