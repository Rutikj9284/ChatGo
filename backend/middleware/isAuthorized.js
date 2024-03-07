import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const isAuthorized = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");  //Don't select password

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;   //VVV Imp

    next();
  } catch (error) {
    console.log("Error in authorization", error.message);
    res.status(500).json({ error: "Intenal Server Error" });
  }
};

export default isAuthorized;
