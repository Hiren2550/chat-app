import User from "../models/user.js";
import jwt from "jsonwebtoken";
import CustomError from "../utils/CustomErrorHandler.js";

export const privateRoute = async (req, res, next) => {
  const token = req.cookies.chat_token;
  if (!token) {
    throw new CustomError("Unauthorized - No Token Provided", 401);
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedToken) {
    throw new CustomError("Unauthorized - Invalid Token", 401);
  }
  const user = await User.findById(decodedToken.userId).select("-password");
  if (!user) {
    throw new CustomError("User Not Found", 404);
  }
  req.user = user;
  next();
};
