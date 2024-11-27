// routes/receiptRoutes.js
const express = require("express");
const multer = require("multer");
const receiptController = require("../controllers/receiptController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Define the route to handle receipt upload and processing
router.post(
  "/extract_total",
  upload.single("image"),
  receiptController.extractTotalAmount
);

router.post(
  "/extract_time",
  upload.single("image"),
  receiptController.extractTime
);
module.exports = router;
