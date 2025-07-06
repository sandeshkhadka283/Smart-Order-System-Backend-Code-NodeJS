import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Authorization header missing" });

  const token = authHeader.split(" ")[1]; // Bearer token
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { userId, role, iat, exp }
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const authorizeStaff = (req, res, next) => {
  if (req.user.role !== "staff" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Staff only" });
  }
  next();
};
