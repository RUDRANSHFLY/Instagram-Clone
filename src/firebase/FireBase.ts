import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.DB_API_KEY,
  authDomain:process.env.DB_AUTHDOMAIN,
  projectId:process.env.DB_PROJECT_ID ,
  storageBucket:process.env.DB_STORAGE_BUCKET ,
  messagingSenderId:process.env.DB_MESSAGING_SENDER_ID ,
  appId:process.env.DB_APP_ID ,
  measurementId:process.env.DB_MEASUREMENT_ID 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const storage = getStorage();


export { auth , storage };
export default db;