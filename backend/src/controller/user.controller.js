const userService = require("../services/user.service.js");
const User = require("../models/user.model.js")

const getUserProfile = async (req, res) => {
  try {
    const jwt = req.headers.authorization?.split(" ")[1];
    if (!jwt) {
      return res.status(404).send({ error: "Token Not Found" });
    }

    const user = await userService.getUserProfileByToken(jwt);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const fetchAddressUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate if email is provided
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required in the request body.",
      });
    }

    // Find the user by email and populate the address field
    const user = await User.findOne({ email }).populate("address");

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with the provided email.",
      });
    }

    // Check if the user has any addresses
    if (!user.address || user.address.length === 0) {
      return res.status(200).json({
        success: true,
        message: "User found, but no addresses are associated with this user.",
        data: user,
      });
    }

    // Return the user with populated addresses
    return res.status(200).json({
      success: true,
      message: "User addresses fetched successfully.",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user addresses:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching user addresses.",
      error: error.message,
    });
  }
};

module.exports = {fetchAddressUser, getUserProfile, getAllUsers };
