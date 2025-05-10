console.log('--- firebaseAdmin.ts module execution started ---'); // ADD THIS LINE AT THE VERY TOP
import * as admin from 'firebase-admin';

// Verify firebase-admin is properly imported
if (!admin || !admin.initializeApp) {
  throw new Error('Firebase Admin SDK not properly imported. Check node_modules/firebase-admin installation.');
}

// Decode the Base64 service account key
const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64;

if (!serviceAccountBase64) {
  console.error('FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 is not set in .env.local');
  throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 is not set in .env.local');
}
console.log('Firebase Admin: Service account key BASE64 found.');

let serviceAccountJsonString: string;
try {
  serviceAccountJsonString = Buffer.from(serviceAccountBase64, 'base64').toString('utf-8');
  console.log('Firebase Admin: Service account key decoded from Base64.');
} catch { // 'e' removed as it's not used when throwing a new error
  console.error('Firebase Admin: Failed to decode service account key from Base64.');
  throw new Error('Failed to decode FIREBASE_SERVICE_ACCOUNT_KEY_BASE64. Ensure it is a valid Base64 string.');
}

let serviceAccount: admin.ServiceAccount;
try {
  serviceAccount = JSON.parse(serviceAccountJsonString);
  console.log('Firebase Admin: Service account JSON parsed successfully.');
} catch { // 'e' removed as it's not used
  console.error('Firebase Admin: Failed to parse service account JSON.');
  throw new Error('Failed to parse Firebase service account JSON. Ensure the Base64 decoded string is valid JSON.');
}

if (!admin.apps.length) {
  console.log('Firebase Admin: No existing Firebase apps, attempting to initialize...');
  try {
    // Verify serviceAccount has required fields (check both camelCase and snake_case versions)
    if (!(serviceAccount.projectId || serviceAccount.project_id) || 
        !(serviceAccount.privateKey || serviceAccount.private_key)) {
      throw new Error('Invalid service account configuration - missing required projectId or privateKey fields');
    }

    const app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    console.log('Firebase Admin: Successfully initialized app:', app.name);
  } catch (e: unknown) {
    console.error('Firebase Admin: ERROR during admin.initializeApp:');
    let errorMessage = 'Firebase Admin SDK initialization error';
    if (e instanceof Error) {
      errorMessage += `: ${e.message}`;
      console.error('Firebase Admin SDK initialization error stack:', e.stack); // Log stack for more details
    } else {
      console.error('Firebase Admin SDK initialization error:', e);
    }
    
    // Optionally, rethrow or handle more gracefully depending on your app's needs
    // For now, we'll let it throw if critical, or log if less critical during build.
    if (process.env.NODE_ENV === 'development') {
        // In development, it might try to initialize multiple times due to HMR.
        // Check if the error is about already initialized app.
        if (e instanceof Error && !/already exists/.test(e.message)) {
            throw new Error(errorMessage); // Rethrow if it's not an "already exists" error
        } else if (!(e instanceof Error)) {
            throw new Error(errorMessage); // Rethrow if it's not an Error instance (and thus not "already exists")
        }
        // If it's an "already exists" error in development, we can often ignore it or just log it.
        console.log("Firebase Admin SDK might have been re-initialized in development due to HMR.");
    } else {
        throw new Error(errorMessage); // In production, any init error is critical
    }
  }
}

export const firestoreAdmin = admin.firestore();
// export const authAdmin = admin.auth(); // If you need admin auth features
// export const databaseAdmin = admin.database(); // If you use Realtime Database
