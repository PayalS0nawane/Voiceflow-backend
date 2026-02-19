
//import admin from "firebase-admin";
import {admin, db} from "../config/firebase.js";

export const saveTranscript = async (req, res) => {
  try {
    console.log("Req_user:", req.user);
    if (!req.user?.uid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    await db.collection("transcripts").add({
      text:text,
      userId: req.user?.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ message: "Saved successfully" });
  } catch (err) {
    console.error("SAVE TRANSCRIPT ERROR:", err);
    res.status(500).json({ error: "Failed to save transcript" });
  }
};

export const getTranscripts = async (req, res) => {
  try {
    if (!req.user?.uid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const snapshot = await db
      .collection("transcripts")
      .where("userId", "==", req.user.uid)
      .orderBy("createdAt", "desc")
      .get();

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(data);
  } catch (err) {
    console.error("GET TRANSCRIPTS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch transcripts" });
   console.log("REQ USER UID:", req.user.uid);
  console.log("DOCS COUNT:", snapshot.size);
  }
};

export const deleteTranscript = async (req, res) => {
  try{
    const{id} = req.params;
    const docRef = 
    db.collection("transcripts").doc(id);
    const doc = await docRef.get();

    if(!doc.exists){
      return res.status(404).json({error:"Transcript not found"});
    }

    if(doc.data().userId !== req.user.uid){
      return res.status(403).json({error:"Forbidden"});
    }
    await docRef.delete();
    res.json({ message: "Transcript deleted"});
  }catch (err){
    res.status(500).json({error:"Failed to delete transcrpt"});
  }
};