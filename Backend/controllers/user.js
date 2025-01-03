import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.js";

export const Register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const ExistingUser = await User.findOne({ email });
    if (ExistingUser) {
      return res
        .status(400)
        .json({ message: "user already registered...try login.." });
    }

    const user = new User({ name, email, password });
    await user.save();
    res
      .status(201)
      .json({ message: "user successfully registered.....", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error in registering ...try again..", error });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ message: "no user found...try registering.." });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(400).json({ message: "invalid credentials.." });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({ message: " successfully login.....", user, token: token });
  } catch (error) {
    res.status(500).json({ message: "error in login ...try again..", error });
  }
};

export const Logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "logged out successfully",
      });
  } catch {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
