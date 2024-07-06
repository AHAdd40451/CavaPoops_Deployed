import checkToken from "../middlewares/jwt.js";
import verifyRefresh from "../middlewares/refreshToken.js";
import {
  createAccessToken,
  createAccessTokenForReset,
  createRefreshToken,
} from "../middlewares/tokens.js";
import { User } from "../models/user.model.js";
import { getEnv } from "../utils/env.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const signup = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Email and password are required fields." });
    }

    let existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.status === "verified") {
        return res.status(403).json({
          message: "Email is already in use.",
        });
      }

      const token = createAccessTokenForReset(existingUser);
      const resetLink = `${getEnv("BASE_URL")}/api/verify-user?token=${token}`;

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: getEnv("EMAIL_USER"),
          pass: getEnv("EMAIL_PASS"),
        },
      });
      const mailOptions = {
        from: getEnv("EMAIL_USER"),
        to: email,
        subject:
          role === "admin" ? "Admin Invitation Request" : "Verify User Request",
        text:
          role === "admin"
            ? `You have been invited to join as an admin. Click the following link to accept the invitation: ${resetLink}`
            : `You requested to verify your account. Click the following link to verify your email: ${resetLink}`,
      };

      await transporter.sendMail(mailOptions);

      return res.status(403).json({
        message:
          role === "admin"
            ? "Account Already Exists. A Invitation email has been sent again to your email address."
            : "You already have an account. A verification email has been sent again to your email address.",
      });
    }

    const user = new User();
    user.email = email;
    user.password = user.encryptPassword(password);
    user.name = name;

    if (role) {
      user.role = role;
    }

    user.status = "pending";
    const result = await user.save();

    const token = createAccessTokenForReset(user);
    const resetLink = `${getEnv("BASE_URL")}/api/verify-user?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: getEnv("EMAIL_USER"),
        pass: getEnv("EMAIL_PASS"),
      },
    });
    const mailOptions = {
      from: getEnv("EMAIL_USER"),
      to: email,
      subject: "Verify User Request",
      text: `You requested to verify your account. Click the following link to verify your email: ${resetLink}`,
    };

    // Send email and handle errors
    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      message:
        "User created successfully. Please verify your account by the link sent to your email.",
      id: result._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error has occurred.",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Email and password are required fields" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (user.status !== "verified") {
      return res.status(401).json({
        message: "User is not Verified",
      });
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.validPassword(password, user.password)) {
      return res.status(401).json({ message: "Invalid Password." });
    }

    const token = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    const response = {
      message: "Authenticated Successfully",
      token,
      refreshToken,
      email: user.email,
      name: user.name,
      status: user.status,
      uid: user._id,
    };

    if (user.role) {
      response.role = user.role;
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const refreshTokenHandler = async (req, res) => {
  try {
    const { email, refreshToken, userId } = req.body;

    if (!email || !refreshToken || !userId) {
      return res.status(400).json({
        success: false,
        error: "Email, refresh token, and user ID are required.",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    const isValid = verifyRefresh(email, refreshToken);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        error: "Invalid token, please try logging in again.",
      });
    }

    const token = createAccessToken(user);

    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "An error occurred while processing your request.",
    });
  }
};

export const sendPasswordResetEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const token = createAccessTokenForReset(user);
    const resetLink = `${getEnv("BASE_URL")}/api/reset-account?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: getEnv("EMAIL_USER"),
        pass: getEnv("EMAIL_PASS"),
      },
    });
    const mailOptions = {
      from: getEnv("EMAIL_USER"),
      to: email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Click the following link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!req.decoded) {
      return res
        .status(400)
        .json({ message: "Token and new password are required." });
    }

    const user = await User.findOne({ email: req.decoded.email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.password = user.encryptPassword(newPassword);
    await user.save();

    return res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};

export const verifyResetToken = (req, res, next) => {
  const { email } = req.decoded;
  return res.redirect(
    `${getEnv("FRONTEND_URL")}/verify-account?token=${
      req.query.token
    }&email=${email}`
  );
};

export const verifySigUpUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.decoded.email });
    if (!user) {
      return res.status(404).json({ message: "Invalid Token" });
    }
    user.status = "verified";
    await user.save();
    return res.redirect(
      `${getEnv("FRONTEND_URL")}/admin/signin?status=verified`
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};
