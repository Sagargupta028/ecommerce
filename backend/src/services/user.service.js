const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider.js");

const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      throw new Error("User is already exist with email:", email);
    }

    password = await bcrypt.hash(password, 8);

    const user = await User.create({ firstName, lastName, email, password });
    console.log("Created User:", user);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserById = async (userId) => {
  try {
    const user = User.findById(userId)
    // .populate("address");

    if (!user) {
      throw new Error("User not Found with id: ", userId);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByEmail = async ({email}) => {
  try {
    const user = await User.findOne({email});

    if (!user) {
      throw new Error(`User not Found with id: ${email}`);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
    
  }
};

const getUserProfileByToken = async (token) => {
  try {
    const userId = jwtProvider.getUserIdFromToken(token);

    const user = await findUserById(userId);

    if (!user) {
      throw new Error("User not Found with id: ", userId);
    }
    console.log(user);
    
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async (req,res) => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  findUserById,
  getUserByEmail,
  getUserProfileByToken,
  getAllUsers,
};
