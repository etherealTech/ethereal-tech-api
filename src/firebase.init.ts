import { readJSON } from 'fs-extra';
import { FIREBASE_CONFIG, FIREBASE_CREDENTIAL } from './app.config';
import * as admin from 'firebase-admin';

export async function initilaizeFirebase() {
  console.log('[INFO] Initializing Firebase Admin...');
  const firebaseConfig = FIREBASE_CONFIG;
  const serviceAccount = await readJSON(FIREBASE_CREDENTIAL);
  firebaseConfig.credential = admin.credential.cert(serviceAccount);
  return admin.initializeApp(firebaseConfig);
}
