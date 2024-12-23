const User = require("../models/User");

exports.findUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error });
  }
};

exports.updateProfile = async (req, res) => {
  const {
    userId,
    email,
    firstName,
    lastName,
    height,
    weight,
    gender,
    age,
    shoppingDays,
  } = req.body;

  console.log("Received request to update profile:");
  console.log({
    userId,
    email,
    firstName,
    lastName,
    height,
    weight,
    gender,
    age,
    shoppingDays,
  });

  try {
    const updatedUser = await User.findOneAndUpdate(
      { userId },
      {
        firstName,
        lastName,
        height,
        weight,
        gender,
        age,
        shoppingDays,
        firstTimeLogin: false,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);

    console.log("Successfully updated user profile:");
    console.log(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Profile update failed", error });
  }
};

exports.updatePoints = async (req, res) => {
  const { userId, pointsChange } = req.body;

  try {
    // Find the user by userId and update points
    const user = await User.findOne({ userId }); // Use findOne with userId
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.points = (user.points || 0) + pointsChange;
    await user.save();

    res.status(200).json({ message: "Points updated successfully!" });
  } catch (error) {
    console.error("Error updating points:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateMinutes = async (req, res) => {
  const { userId, pointsChange } = req.body;

  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.minutes = (user.minutes || 0) + pointsChange;
    await user.save();

    res.status(200).json({ message: "Minutes updated successfully!" });
  } catch (error) {
    console.error("Error updating minutes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateHearts = async (req, res) => {
  const { userId, pointsChange } = req.body;

  try {
    const user = await User.findOne({ userId }); // Use findOne with userId
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.hearts = (user.hearts || 0) + pointsChange;
    await user.save();

    res.status(200).json({ message: "Hearts updated successfully!" });
  } catch (error) {
    console.error("Error updating points:", error);
    res.status(500).json({ message: "Server error" });
  }
};
