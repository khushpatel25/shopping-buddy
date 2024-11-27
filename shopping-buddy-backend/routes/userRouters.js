// routes/userRoutes.js

const express = require("express");
const { updateProfile } = require("../controllers/userController");
const router = express.Router();

router.post("/update-profile", updateProfile);

module.exports = router;
