import express from "express";
import { Login, Logout, Register } from "../controllers/user.js";
import { authMiddleware } from "../middlewares/auth.js";

 export const UserRouter = express.Router();

UserRouter.route("/").get((req, res) => {
  res.json({
    message: "port running !!!!",
  });
});

UserRouter.route("/login").post(Login);
UserRouter.route("/register").post(Register);
UserRouter.route("/logout").post(authMiddleware, Logout);