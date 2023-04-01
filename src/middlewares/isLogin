const { validateToken } = require("../helpers/validateJwt");

/**
 * @function isLogin
 * @param {Object} req - Client request
 * @param {Object} res - Server response
 * @param {function} next - Next middleware function
 * @returns {Object} - Response message
 */
const isLogin = async (req, res, next) => {
  try {
    // Check if Authorization header is present
    if (!req.header("Authorization")) {
      return res
        .status(401)
        .json({ error: "Unauthorized", message: "Please login" });
    }
    // Extract token from header and validate it
    const token = req.header("Authorization").split(" ")[1];
    const decoded = await validateToken(token);
    if (!decoded) {
      return res
        .status(401)
        .json({ error: "Unauthorized", message: "Invalid token" });
    }
    // Add decoded user data to request object and call next middleware
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

module.exports = { isLogin };
