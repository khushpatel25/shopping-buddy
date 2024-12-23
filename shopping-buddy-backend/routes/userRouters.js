// routes/userRoutes.js

const express = require("express");
const {
  updateProfile,
  updatePoints,
  updateHearts,
  updateMinutes,
  findUserById,
} = require("../controllers/userController");
const router = express.Router();

router.put("/update-profile", updateProfile);
router.post("/update-points", updatePoints);
router.post("/update-hearts", updateHearts);
router.post("/update-minutes", updateMinutes);
router.get("/find-user/:userId", findUserById);

module.exports = router;
