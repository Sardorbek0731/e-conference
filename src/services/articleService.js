import { collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

export const downloadPDF = async (article, articleRef) => {
  try {
    if (!articleRef.current) {
      throw new Error("Article reference is not available");
    }

    const element = articleRef.current;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${article.title}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Failed to generate PDF. Please try again.");
  }
};
