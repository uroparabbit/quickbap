import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// setup app
const firebaseConfig = {
    apiKey: "AIzaSyDodQd-ACadUKi1XVidSdDmLLMYfyvZ5Gk",
    authDomain: "quickbap.firebaseapp.com",
    projectId: "quickbap",
    storageBucket: "quickbap.firebasestorage.app",
    messagingSenderId: "1043029841651",
    appId: "1:1043029841651:web:0f73fc845f96e1c51d0986"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);