import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig.js";

const conferencesCollection = collection(db, "conferences");

export const getConferences = async () => {
  const snapshot = await getDocs(conferencesCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getConferenceById = async (id) => {
  const conferenceRef = doc(db, "conferences", id);
  const snapshot = await getDoc(conferenceRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

export const addConference = async (conferenceData) => {
  const docRef = await addDoc(conferencesCollection, conferenceData);
  return docRef.id;
};

export const updateConference = async (id, updatedData) => {
  const conferenceRef = doc(db, "conferences", id);
  await updateDoc(conferenceRef, updatedData);
};

export const deleteConference = async (id) => {
  const conferenceRef = doc(db, "conferences", id);
  await deleteDoc(conferenceRef);
};
