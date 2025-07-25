import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    profile_image: {
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

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: transformId,
});

userSchema.set("toObject", {
  virtuals: true,
  versionKey: false,
  transform: transformId,
});

const User = mongoose.model("User", userSchema);

export default User;
