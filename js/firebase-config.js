import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyDxtmtMIpzXMGWuOajEQLMfO6qw8H-prR8",
  authDomain: "apollo-47.firebaseapp.com",
  databaseURL: "https://apollo-47-default-rtdb.firebaseio.com/",
  projectId: "apollo-47",
  storageBucket: "apollo-47.firebasestorage.app",
  messagingSenderId: "529700389059",
  appId: "1:529700389059:web:afa848c6acb7ed12822276",
  measurementId: "G-1RT6Y5614G"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
