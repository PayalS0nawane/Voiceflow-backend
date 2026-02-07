// import admin from "firebase-admin";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load service account key
// const serviceAccount = JSON.parse(
//   fs.readFileSync(
//     path.join(__dirname, "../../serviceAccountKey.json"),
//     "utf-8"
//   )
// );

// // Initialize Firebase Admin ONCE
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });
// }

// // Firestore instance
// const db = admin.firestore();

// export default db;


import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: process.env.FIREBASE_PROJECT_ID, // 👈 REQUIRED
  });
}
console.log("ENV PROJECT:", process.env.FIREBASE_PROJECT_ID);

const db = admin.firestore();
export { admin, db };
