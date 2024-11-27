const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    height,
    weight,
    gender,
    age,
    shoppingDays,
  } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
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
  } catch (error) {
    res.status(500).json({ message: "Profile update failed", error });
  }
};
