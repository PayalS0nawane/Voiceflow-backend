import "dotenv/config";


import express from "express";
import cors from "cors";
import transcriptRoutes from "./routes/transcript.routes.js";
import speechRoutes from "./routes/speech.routes.js";



console.log("PROJECT ID =", process.env.FIREBASE_PROJECT_ID);
console.log("CREDS =", process.env.GOOGLE_APPLICATION_CREDENTIALS);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/speech", speechRoutes);

app.use("/api/transcripts", transcriptRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
