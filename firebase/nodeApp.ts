import admin from "firebase-admin";
import "firebase/storage";
const firebaseAdminConfig = {
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_SECRET_PROJECT_ID,
    clientEmail: process.env.FIREBASE_SECRET_CLIENT_EMAIL,
    privateKey:
      process.env.FIREBASE_SECRET_PRIVATE_KEY &&
      process.env.FIREBASE_SECRET_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
  storageBucket:  process.env.FIREBASE_STORAGE_BUCKET
};
if (!admin.apps.length) admin.initializeApp(firebaseAdminConfig);

export const storageNode = admin.storage();
