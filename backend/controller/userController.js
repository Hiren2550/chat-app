import User from "../models/user.js";
import cloudinary from "../utils/cloudinary.js";
import CustomError from "../utils/CustomErrorHandler.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } }).select(
      "-password"
    );
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
    const fullname = req.body.fullname;
    let payload;
    if (file) {
      const uploadRes = await cloudinary.uploader.upload(file, {
        folder: "uploads",
      });
      payload = {
        profile_image: uploadRes.secure_url,
      };
    }
    if (fullname) {
      payload = { ...payload, fullname };
    }
    const updatedData = await User.findByIdAndUpdate(req.user.id, payload, {
      new: true,
    }).select("-password");
    res.status(200);
    res.locals.data = updatedData;
    res.locals.message = "User Data Updated Successfully";
    next();
  } catch (error) {
    next(error);
  }
};
