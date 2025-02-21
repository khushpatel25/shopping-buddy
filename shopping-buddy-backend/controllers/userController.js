const User = require("../models/User");
const cron = require("node-cron");

const timeZone = 'America/Halifax';

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
    profileImage
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
    profileImage
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
        profileImage,
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

  console.log(req.body)

  try {
    const user = await User.findOne({ userId }); // Use findOne with userId
    console.log({user})
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

exports.getUsersByPoints = async (req,res) => {
  try {
    const users = await User.find().sort({ points: -1 });
    console.log({ users });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users by points:", error);
    res.status(500).json({ message: "Server error" });
  }
}

exports.getUsersByHearts = async (req, res) => {
  try {
    const users = await User.find().sort({ hearts: -1 });
    console.log({ users });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users hearts:", error);
    res.status(500).json({ message: "Server error" });
  }
}

exports.getUsersByMinutes = async (req, res) => {
  try {
    const users = await User.find().sort({ minutes: -1 });
    console.log({ users });
    res.status(200).json(users);
  } catch (error) {
    console.log("Error fetching users minutes:", error);
    res.status(500).json({message: "Server error"})
  }
}

cron.schedule("0 0 * * 0", async () => {
  try {

    const topUsersByPoints = await User.find().sort({ points: -1 }).limit(3);
    for (let user of topUsersByPoints) {
      user.points += 20;
      await user.save();
    }

    const topUsersByMinutes = await User.find().sort({ minutes: -1 }).limit(3);
    for (let user of topUsersByMinutes) {
      user.minutes += 20;
      await user.save();
    }

    const topUsersByHearts = await User.find().sort({ hearts: -1 }).limit(3);
    for (let user of topUsersByHearts) {
      user.hearts += 20;
      await user.save();
    }

    console.log("Top 3 users rewarded successfully.")

  } catch (error) {
    console.error('Error rewarding top users:', error);
  }
})
