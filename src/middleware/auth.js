import { admin } from "../config/firebase.js"

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    console.log("AUTH header:", req.headers.authorization);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("AUTH ERROR:", err);
    console.log("VERIFY ERROR:", err);
    res.status(401).json({ error: "Invalid token" });
  }
};