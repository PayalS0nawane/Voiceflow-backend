import deepgram from "../config/deepgram.js";
import { db } from "../config/firebase.js";
import admin from "firebase-admin";

export const speechToText = async (req, res) => {
  try {
    // 🔐 Auth check
    if (!req.user || !req.user.uid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // 🎧 File check
    if (!req.file) {
      return res.status(400).json({ error: "No audio file received" });
    }

    console.log("FILE INFO:", {
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    const buffer = req.file.buffer;

    // 🧠 Deepgram transcription
    const response =
      await deepgram.listen.prerecorded.transcribeFile(buffer, {
        model: "nova-2",
        language: "en",
        smart_format: true,

        // 🔥 VERY IMPORTANT (audio/webm + opus)
        mimetype: "audio/webm",
        encoding: "opus",
        sample_rate: 48000,
        channels: 1,
      });

    console.log("DEEPGRAM FULL RESPONSE:", JSON.stringify(response, null, 2));

    const transcript =
      response?.result?.results?.channels?.[0]?.alternatives?.[0]?.transcript ||
      "";

    if (!transcript.trim()) {
      return res.status(200).json({
        transcript: "",
        message: "No speech detected",
      });
    }

    // 💾 Save to Firestore
    await db.collection("transcripts").add({
      text: transcript,
      userId: req.user.uid, // 🔑 REQUIRED
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      //createdAt: new Date(),
    });

    res.status(200).json({ transcript });
  } catch (err) {
    console.error("SPEECH TO TEXT ERROR:", err);
    res.status(500).json({ error: "Speech to text failed" });
  }
};