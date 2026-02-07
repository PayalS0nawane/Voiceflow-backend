import express from "express";
import {
  saveTranscript,
  getTranscripts,
  deleteTranscript,
} from "../controllers/transcript.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// 🔒 PROTECT BOTH ROUTES
router.post("/", authenticate, saveTranscript);
router.get("/", authenticate, getTranscripts);
router.delete("/:id", authenticate, deleteTranscript);

export default router;
