// config/firebaseConfig.ts
import admin from 'firebase-admin';
const data = require("../config/serviceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(data),
  databaseURL: "https://backend-repo.firebaseio.com"
});

const db = admin.firestore();
export { db };
