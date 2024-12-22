const mongoose = require("mongoose");
const Kudo = require("../models/Kudo");
const User = require("../models/User");

exports.sendKudo = async (req, res) => {
  const { to, from, badge, reason } = req.body;

  try {
    if (!to || !from || !badge || !reason) {
      return res.status(400).json({
        status: "success",
        error: "All fields (to, from, badge, reason) are required.",
      });
    }

    if (to === from) {
      return res
        .status(400)
        .json({ status: "error", error: "You cannot send kudos to yourself." });
    }

    const sender = await User.findById(from);
    const recipient = await User.findById(to);

    if (!sender)
      return res
        .status(404)
        .json({ status: "error", error: "Sender not found." });
    if (!recipient)
      return res
        .status(404)
        .json({ status: "error", error: "Recipient not found." });

    const kudo = new Kudo({ to, from, badge, reason });
    await kudo.save();

    recipient.kudosReceived.push(kudo._id);
    await recipient.save();

    res
      .status(201)
      .json({ status: "success", message: "Kudo sent successfully!", kudo });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
};

exports.getKudosSentByUser = async (req, res) => {
  const { userId } = req.query;

  try {
    const kudosData = await Kudo.aggregate([
      { $match: { from: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$badge",
          count: { $sum: 1 },
        },
      },
    ]);

    const response = kudosData.map((item) => ({
      badge: item._id,
      count: item.count,
    }));

    res.status(200).json({ status: "success", response });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
};

// controllers/kudoController.js

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Kudo.aggregate([
      {
        $group: {
          _id: "$to", // Group by the recipient ID
          totalKudos: { $sum: 1 }, // Count total kudos received
        },
      },
      {
        $lookup: {
          from: "users", // Reference the User collection
          localField: "_id", // _id from the group stage (recipient ID)
          foreignField: "_id", // Match with User ID
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails", // Convert array to object for easy access
      },
      {
        $project: {
          name: "$userDetails.name", // Include user name
          totalKudos: 1, // Include total kudos count
        },
      },
      {
        $sort: { totalKudos: -1 }, // Sort by kudos count in descending order
      },
    ]);

    res.status(200).json({ status: "success", leaderboard });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
};

exports.getKudosFeed = async (req, res) => {
  try {
    const kudos = await Kudo.find()
      .populate("to", "name")
      .populate("from", "name")
      .sort({ createdAt: -1 });
    res.status(200).json({ status: "success", kudos });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
};

exports.toggleLike = async (req, res) => {
  const { kudoId, userId } = req.body;

  try {
    const kudo = await Kudo.findById(kudoId);

    if (!kudo) {
      return res
        .status(404)
        .json({ status: "error", error: "Kudo not found." });
    }

    const index = kudo.likes.indexOf(userId);
    if (index === -1) {
      // Add like
      kudo.likes.push(userId);
    } else {
      // Remove like
      kudo.likes.splice(index, 1);
    }

    await kudo.save();
    const updatedKudo = await Kudo.findById(kudoId)
      .populate("to", "name")
      .populate("from", "name");
    res.status(200).json({ status: "success", updatedKudo }); // Return the full kudo object
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
};
