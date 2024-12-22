const express = require("express");
const router = express.Router();
const {
  sendKudo,
  getKudosSentByUser,
  getLeaderboard,
  getKudosFeed,
  toggleLike,
} = require("../controllers/kudoController");

router.post("/send", sendKudo);
router.get("/analytics/sent", getKudosSentByUser);
router.get("/analytics/leaderboard", getLeaderboard);

router.get("/feed", getKudosFeed);
router.post("/like", toggleLike);

module.exports = router;
