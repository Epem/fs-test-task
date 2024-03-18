import rateLimit from "express-rate-limit";

export default rateLimit({
  windowMs: 60 * 1000, // 24 hrs to milliseconds
  max: 30, // 200 requests limit
  message: "Slow down.",
  standardHeaders: true,
  legacyHeaders: false,
});