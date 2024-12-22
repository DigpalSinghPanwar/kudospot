const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  kudosReceived: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kudo",
    },
  ],
});

// Adding a unique index explicitly for extra safety
userSchema.index({ name: 1, email: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);
