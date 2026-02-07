import { createClient } from "@deepgram/sdk";

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);
console.log(process.env.DEEPGRAM_API_KEY ? "found":"missing");
export default deepgram;
