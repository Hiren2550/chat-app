import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const privateRoute = async (req, res, next) => {
  const token = req.cookies.chat_token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No Token Provided" });
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedToken) {
    return res.status(401).json({ message: "Unauthorized - Invalid Token" });
  }
  const user = await User.findById(decodedToken.userId).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  req.user = user;
  next();
};
