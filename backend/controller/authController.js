import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import CustomError from "../utils/CustomErrorHandler.js";

export const createuser = async (req, res, next) => {
  try {
    const { email, password, fullname, profile_image } = req.body;
    if (!email || !password || !fullname) {
      throw new CustomError("All fields are required", 400);
    }
    const user = await User.findOne({ email });
    if (user) {
      throw new CustomError("User already exists", 400);
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
      res.status(201);
      res.locals.data = {
        email: newUser.email,
        fullname: newUser.fullname,
        profile_image: newUser.profile_image,
      };
      res.locals.message = "New User Created Successfully";
      next();
    } else {
      throw new CustomError("Failed to create user", 500);
    }
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError("All fields are required", 400);
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new CustomError("Invalid credentials", 400);
    }
    generateToken(user.id, res);
    res.status(200);
    res.locals.data = {
      email: user.email,
      fullname: user.fullname,
      profile_image: user.profile_image,
    };
    res.locals.message = "User Logged In Successfully";
    next();
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("chat_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 0,
    });
    res.status(200);
    res.locals.data = {
      message: "Logged out successfully",
    };
    next();
  } catch (error) {
    next(error);
  }
};
