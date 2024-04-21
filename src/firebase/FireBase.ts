import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.DB_API_KEY as string,
  authDomain:process.env.DB_AUTHDOMAIN as string,
  projectId:process.env.DB_PROJECT_ID as string,
  storageBucket:process.env.DB_STORAGE_BUCKET as string,
  messagingSenderId:process.env.DB_MESSAGING_SENDER_ID as string,
  appId:process.env.DB_APP_ID as string,
  measurementId:process.env.DB_MEASUREMENT_ID as string,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const storage = getStorage();


export { auth , storage };
export default db;