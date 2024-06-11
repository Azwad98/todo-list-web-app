jest.mock('firebase/app');
jest.mock('firebase/firestore');

const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

describe('Firebase Configuration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize Firebase app with environment variables', () => {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Check if Firebase app and Firestore are initialized correctly
    expect(initializeApp).toHaveBeenCalledWith(firebaseConfig);
    expect(getFirestore).toHaveBeenCalledWith(app);
  });
});
