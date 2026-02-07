
import deepgram from "../config/deepgram.js";
import {db} from "../config/firebase.js";

export const speechToText = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file received" });
    }

    const buffer = req.file.buffer;

    const { result } =
      await deepgram.listen.prerecorded.transcribeFile(buffer, {
        mimetype: req.file.mimetype,
        model: "nova-2",
        punctuate: true,
        language: "en",
      });

    const channels = result?.results?.channels;

    if (!channels || channels.length === 0) {
      return res.status(200).json({
        transcript: "",
        message: "No speech detected",
      });
    }

    const transcript =
      channels[0]?.alternatives?.[0]?.transcript || "";

    if (!transcript) {
      return res.status(200).json({
        transcript: "",
        message: "Empty transcript",
      });
    }

    await db.collection("transcripts").add({
      text: transcript,
      createdAt: new Date(),
      
    });

    res.json({ transcript });
  } catch (err) {
    console.error("DEEPGRAM ERROR:", err);
    res.status(500).json({ error: "Speech to text failed" });
  }
};
