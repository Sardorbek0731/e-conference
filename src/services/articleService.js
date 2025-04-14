import { collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { query, orderBy, limit, startAfter } from "firebase/firestore";

export const addArticle = async (article) => {
  const docRef = await addDoc(collection(db, "articles"), article);
  return docRef.id;
};

export const getArticles = async (startIndex = 0, pageSize = 15) => {
  try {
    const articlesRef = collection(db, "articles");
    const orderedQuery = query(articlesRef, orderBy("createdAt", "desc"));

    let cursorDoc = null;

    if (startIndex > 0) {
      const cursorQuery = query(orderedQuery, limit(startIndex));
      const cursorSnap = await getDocs(cursorQuery);
      cursorDoc = cursorSnap.docs[cursorSnap.docs.length - 1];
    }

    const paginatedQuery = cursorDoc
      ? query(
          articlesRef,
          orderBy("createdAt", "desc"),
          startAfter(cursorDoc),
          limit(pageSize)
        )
      : query(articlesRef, orderBy("createdAt", "desc"), limit(pageSize));

    const querySnapshot = await getDocs(paginatedQuery);

    const articles = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return articles;
  } catch (error) {
    console.error("Pagination error:", error);
    return [];
  }
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
