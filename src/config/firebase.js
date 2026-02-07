
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
