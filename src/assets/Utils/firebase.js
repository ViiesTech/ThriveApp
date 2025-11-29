import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDVGubrqhtB4IrYQ0Dlp031R5KloYDk5co',
  authDomain: 'ithriv-fb24a.firebaseapp.com',
  projectId: 'ithriv-fb24a',
  storageBucket: 'ithriv-fb24a.firebasestorage.app',
  messagingSenderId: '250556430264',
  appId: '1:250556430264:web:279d925b9ba9bf3f70c14d',
  measurementId: 'G-LXMJRNP24Z',
};

// Initialize Firebase only once
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

export { app, db };
