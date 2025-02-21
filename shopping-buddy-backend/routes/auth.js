const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

console.log(process.env.CLOUDINARY_NAME)
console.log(process.env.CLOUDINARY_API_KEY)
console.log(process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST /register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body)

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      email,
      password: hashedPassword,
      userId: uuidv4(),
    });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      userId: newUser.userId,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body)

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    console.log(user);
    // Check if it's the first login
    if (user.firstTimeLogin) {
      // Update firstTimeLogin to false
      user.firstTimeLogin = false;
      await user.save();

      return res.status(200).json({
        message: "First-time login",
        firstTimeLogin: true,
        userId: user.userId,
      });
    }

    // Return success response for returning user
    res.status(200).json({
      message: "Login successful",
      firstTimeLogin: false,
      userId: user.userId,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    console.log("Request file:", req.file)
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: "shopping-buddy" }, 
      (error, cloudinaryResponse) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.json({ imageUrl: cloudinaryResponse.secure_url }); 
      }
    ).end(req.file.buffer);
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Image upload failed" });
  }
});


module.exports = router;
