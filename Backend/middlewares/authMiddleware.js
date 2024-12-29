const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    const jwtToken = token.replace("Bearer", "").trim();
    if (!jwtToken) {
      return res.status(401).json({
        message: "Unauthorised HTTP, Token not Provided",
      });
    }

    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    const userData = await User.findOne({
      email: isVerified.email,
      _id: isVerified.userId,
    }).select({
      password: 0,
    });

    // Convert BigInt value to regular number
    const userDataToSend = { ...userData.toObject(), phone: Number(userData.phone) };
    req.user = userDataToSend;
    req.token = token;
    req.userId = userDataToSend._id;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = authMiddleware;
