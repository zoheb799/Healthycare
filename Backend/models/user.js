import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please enter an email"] },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter an email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const User = mongoose.model("User", userSchema);
