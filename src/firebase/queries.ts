import { db } from "../../firebaseConfig";
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
} from "firebase/firestore";

const addUserData = async (payload: any) => {
    try {
        const docRef = await addDoc(collection(db, "users"), payload);
        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

const get = async (id: any) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email_id", "==", id));
    const response = await getDocs(q);
    const documents = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return documents;
};

const update = async (id: any, payload: any) => {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, payload);
};

const updateMany = async (ids: any[], payload: any) => {
    const updatePromises = ids.map(async (id) => {
        const userRef = doc(db, "users", id);
        await updateDoc(userRef, payload);
    });
    await Promise.all(updatePromises);
};

const deleteById = async (id: any) => {
    await deleteDoc(doc(db, "users", id));
};

const deleteMany = async (ids: any[]) => {
    const deletePromises = ids.map(async (id) => {
        await deleteDoc(doc(db, "users", id));
    });
    await Promise.all(deletePromises);
};

export { addUserData, get, update,updateMany, deleteById,deleteMany };
