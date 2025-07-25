import User from "../models/user.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200);
    res.locals.data = users;
    res.locals.message = "Users retrieved successfully";
    next();
  } catch (error) {
    next(error);
  }
};
