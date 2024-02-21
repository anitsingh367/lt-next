// firebase.ts
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  Firestore,
  getFirestore,
  collection,
  query,
  getDocs,
} from "firebase/firestore";

interface EventDetail {
  title: string;
  // Add other properties of event details here, matching the Firestore document structure
}

interface ProjectDetail {
  // Define the structure of project details
}

interface HomePageVideo {
  // Define the structure of home page video details
}

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

// Fetch event details from Firestore
export const getEventDetails = async (): Promise<EventDetail[]> => {
  const arr: any[] = [];
  const q = query(collection(db, "EventDetails"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push(doc.data() as EventDetail);
  });

  return arr;
};

// Add similar functions for getProjectDetails and getHomePageVideo
// Ensure you define and use the correct interfaces for the data you're fetching

export const getProjectDetails = async (): Promise<any> => {
  let arr: any[] = [];
  const q = query(collection(db, "ProjectDetails"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push(doc.data());
  });

  return arr;
};

export const getHomePageVideo = async (): Promise<any> => {
  let arr: any[] = [];
  const q = query(collection(db, "HomePage"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push(doc.data());
  });

  return arr;
};
