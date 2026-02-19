import express from "express";
import {
  saveTranscript,
  getTranscripts,
  deleteTranscript,
} from "../controllers/transcript.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// 🔒 PROTECT BOTH ROUTES
router.get("/", authenticate, getTranscripts);
router.post("/", authenticate, saveTranscript);
router.delete("/:id", authenticate, deleteTranscript);

export default router;
