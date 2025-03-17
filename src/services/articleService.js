import { collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

// Add Article
import { addDoc } from "firebase/firestore";

export const addArticle = async (article) => {
  const docRef = await addDoc(collection(db, "articles"), article);
  return docRef.id;
};

// Get Articles
import { getDocs } from "firebase/firestore";

export const getArticles = async () => {
  const querySnapshot = await getDocs(collection(db, "articles"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Update Articles
import { doc, updateDoc } from "firebase/firestore";

export const updateArticle = async (id, updatedData) => {
  const articleRef = doc(db, "articles", id);
  await updateDoc(articleRef, updatedData);
};

// Delete Articles
import { deleteDoc } from "firebase/firestore";

export const deleteArticle = async (id) => {
  await deleteDoc(doc(db, "articles", id));
};
