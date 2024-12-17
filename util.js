import { db } from "./firebase.js";
import { doc, getDoc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const camerasObjectToArray = camerasObject => [0, 1, 2].map(i => camerasObject[i])

export const getCameras = async () => {
    const docRef = doc(db, "admin", "cameras"); // 문서 참조 생성
    const docSnap = await getDoc(docRef); // 문서 스냅샷 가져오기

    if (docSnap.exists()) {
        return camerasObjectToArray(docSnap.data())
    } else {
        console.error("error - there is no data in 'cameras' document!")   
    }
}


export const updateCamera = async (i, value) => {
    const docRef = doc(db, "admin", "cameras");
    await updateDoc(docRef, {
       [i]: value
    })
}


export const setSnapshot = async (callback) => {
    onSnapshot(doc(db, "admin", "cameras"), (docSnap) => {
        callback(camerasObjectToArray(docSnap.data()))
    });    
}