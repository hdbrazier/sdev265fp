const jwt = require("jsonwebtoken");

// Middleware to protect private routes
const protect = (req, res, next) => {
  try {
    // Retrieve authorization header
    const authHeader = req.headers.authorization;

    // Validate token presence and format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized, no token"
      });
    }

    // Extract token from header
    const token = authHeader.split(" ")[1];

    // Verify token using JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store decoded user information in request
    req.user = decoded;

    // Continue to protected route
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, invalid token"
    });
  }
};

// Export middleware
module.exports = { protect };