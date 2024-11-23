// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence, initializeAuth } from "firebase/auth"
// Your web app's Firebase configuration
import AsyncStorage from "@react-native-async-storage/async-storage"

import { getFirestore, collection } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDhbRB-4x3InwLhcNp3wRVghTvUnD1IW3Y",
  authDomain: "onna-chat-84d11.firebaseapp.com",
  projectId: "onna-chat-84d11",
  storageBucket: "onna-chat-84d11.firebasestorage.app",
  messagingSenderId: "880908637265",
  appId: "1:880908637265:web:73a257d21152c4c0a75470"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)

export const usersRef = collection(db, "@users")
export const roomRef = collection(db, "@rooms")