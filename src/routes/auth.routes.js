import express from "express";
import {
  login,
  signup,
  refreshTokenHandler,
  resetPassword,
  sendPasswordResetEmail,
  verifyResetToken,
  verifySigUpUser,
} from "../controllers/auth.controller.js";
import { checkResetToken } from "../middlewares/jwt.js";

const authRoutes = express.Router();

//Create Users
authRoutes.post("/user/create", signup);

// //Login User
authRoutes.post("/user/login", login);

// //refresh token
authRoutes.post("/refresh", refreshTokenHandler);

// email-send-password
authRoutes.post("/send-password-reset-email", sendPasswordResetEmail);

// verify-reset-token
authRoutes.get("/reset-account", checkResetToken, verifyResetToken);

// verify-user
authRoutes.get("/verify-user", checkResetToken, verifySigUpUser);

// //reset password
authRoutes.post("/reset-password", checkResetToken, resetPassword);

export default authRoutes;
