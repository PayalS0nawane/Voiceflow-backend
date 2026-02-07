import express from "express";
import upload from "../middleware/upload.js";
import { speechToText } from "../controllers/speech.controller.js";

const router = express.Router();

router.post("/", upload.single("audio"), speechToText);

export default router;
