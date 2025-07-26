import User from "../models/user.js";
import cloudinary from "../utils/cloudinary.js";
import CustomError from "../utils/CustomErrorHandler.js";

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

export const updateUser = async (req, res, next) => {
  try {
    const file = req.body.image; // Base64 or file URL
    if (!file) {
      throw new CustomError("Image is not provided", 400);
    }
    const uploadRes = await cloudinary.uploader.upload(file, {
      folder: "uploads",
    });
    const updatedData = await User.findByIdAndUpdate(
      req.user.id,
      {
        profile_image: uploadRes.secure_url,
      },
      { new: true }
    ).select("-password");
    res.status(200);
    res.locals.data = updatedData;
    res.locals.message = "User Data Updated Successfully";
    next();
  } catch (error) {
    next(error);
  }
};
