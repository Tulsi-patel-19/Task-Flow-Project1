import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized, token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded JWT:", decoded);

    const userDoc = await User.findById(decoded.userId).select("-password");

    console.log("User found:", userDoc);

    if (!userDoc) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = userDoc;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, invalid token",
    });
  }
};

export default protect;