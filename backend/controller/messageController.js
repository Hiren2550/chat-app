import Message from "../models/message.js";
import CustomError from "../utils/CustomErrorHandler.js";

export const getMessagesById = async (req, res, next) => {
  try {
    const myId = req.user.id;
    const otherUserId = req.params.id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: myId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("senderId")
      .populate("receiverId");

    res.status(200);
    res.locals.data = messages;
    res.locals.message = "Users Message fetched successfully";
    next();
  } catch (error) {
    next(error);
  }
};

export const createMessage = async (req, res, next) => {
  try {
    const { receiverId, text, image } = req.body;
    const senderId = req.user.id;

    if (!receiverId) {
      throw new CustomError("Receiver ID is required", 400);
    }

    if (!text && !image) {
      throw new CustomError("Message must contain text or image", 400);
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text: text?.trim() || "",
      image: image || "",
    });
    res.status(201);
    res.locals.data = newMessage;
    res.locals.message = "Message sent successfully";
    next();
  } catch (error) {
    next(error);
  }
};
