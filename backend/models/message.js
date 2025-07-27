import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      trim: true,
      default: undefined,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

function transformId(doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  return ret;
}

messageSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: transformId,
});

messageSchema.set("toObject", {
  virtuals: true,
  versionKey: false,
  transform: transformId,
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
