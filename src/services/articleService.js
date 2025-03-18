import { collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";

export const addArticle = async (article) => {
  const docRef = await addDoc(collection(db, "articles"), article);
  return docRef.id;
};

export const getArticles = async () => {
  const querySnapshot = await getDocs(collection(db, "articles"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getArticleById = async (articleId) => {
  try {
    const articleRef = doc(db, "articles", articleId);
    const articleSnap = await getDoc(articleRef);

    if (articleSnap.exists()) {
      return { id: articleSnap.id, ...articleSnap.data() };
    }
  } catch (error) {
    console.error("Maqolani olishda xatolik:", error);
    throw error;
  }
};

export const updateArticle = async (id, updatedData) => {
  const articleRef = doc(db, "articles", id);
  await updateDoc(articleRef, updatedData);
};

export const deleteArticle = async (id) => {
  await deleteDoc(doc(db, "articles", id));
};
