import jwt from "jsonwebtoken";
import { getEnv } from "../utils/env.js";

let checkToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, getEnv("JWT_SECRET"), (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Token is not valid",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: "Auth token is not supplied",
    });
  }
};

export const checkResetToken = (req, res, next) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).json({ message: "Token is required." });
  }

  jwt.verify(token, getEnv("JWT_SECRET"), (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }
    req.decoded = decoded;
    next();
  });
};

export default checkToken;
