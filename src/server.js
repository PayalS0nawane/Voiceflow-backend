import "dotenv/config";


import express from "express";
import cors from "cors";
import transcriptRoutes from "./routes/transcript.routes.js";
import speechRoutes from "./routes/speech.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/speech", speechRoutes);

app.use("/api/transcripts", transcriptRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
