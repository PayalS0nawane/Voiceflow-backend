import express from "express";
import upload from "../middleware/upload.js";
import { speechToText } from "../controllers/speech.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/", 
     authenticate,
     upload.single("audio"), speechToText);

export default router;
