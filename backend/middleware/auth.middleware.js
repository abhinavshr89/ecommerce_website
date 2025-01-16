import jwt from 'jsonwebtoken';
import User from '../Models/user.model.js';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Session Expired" });
      }
      throw new Error("Session Invalid");
    }
  } catch (error) {
    console.log("Error in protectRoute Middleware", error.message);
    return res.status(401).json({ message: "User not authenticated" });
  }
};

export const adminRoute = async (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "User not authorized" });
    }
  } catch (error) {
    console.log("Error in adminRoute Middleware", error.message);
    return res.status(401).json({ message: "User not authenticated" });
  }
};