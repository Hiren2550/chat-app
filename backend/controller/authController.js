import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const createuser = async (req, res) => {
  try {
    const { email, password, fullname, profile_image } = req.body;
    if (!email || !password || !fullname) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: hashPassword,
      fullname,
      profile_image,
    });
    if (newUser) {
      generateToken(newUser.id, res);
      await newUser.save();
      res.status(201).json({
        email: newUser.email,
        fullname: newUser.fullname,
        profile_image: newUser.profile_image,
      });
    } else {
      res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(user.id, res);
    res.status(200).json({
      email: user.email,
      fullname: user.fullname,
      profile_image: user.profile_image,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("chat_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 0,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
