
import { initializeApp } from "firebase/app";   
import { getAuth} from "firebase/auth";  


import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

 
import { GoogleAuthProvider } from "firebase/auth";  

const firebaseConfig = {
apiKey: "AIzaSyA8PUeDx1ujEe61hhkWtBRiTlgRF4uzssI",
authDomain: "shalimar-chatgpt.firebaseapp.com",
projectId: "shalimar-chatgpt",
storageBucket: "shalimar-chatgpt.appspot.com",
messagingSenderId: "407979328709",
appId: "1:407979328709:web:b6ee698186be6da38bdcac",
measurementId: "G-1PXY0W0FKW"
};
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 

export const db = getFirestore(app); 
export const storage = getStorage(app); 


export const provider = new GoogleAuthProvider(); 