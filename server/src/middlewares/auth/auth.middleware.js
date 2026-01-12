import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    /* ---------- Get Authorization Header ---------- */
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header missing",
      });
    }

    /* ---------- Expect: Bearer <token> ---------- */
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }

    const token = parts[1];

    /* ---------- Verify Token ---------- */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /* ---------- Attach User Context ---------- */
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
      hotelId: decoded.hotelId,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
