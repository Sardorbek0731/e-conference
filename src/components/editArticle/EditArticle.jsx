import "./EditArticle.css";
import Modal from "../../components/modal/Modal";
import { updateArticle } from "../../services/articleService";
import { useEffect, useState } from "react";
import { storage } from "../../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function EditArticle({ setOpenEditArticle, fetchArticles, editIcon }) {
  const [editButtonDisabled, setEditButtonDisabled] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [articleId, setArticleId] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    const editData = JSON.parse(localStorage.getItem("editArticle"));

    setArticleId(editData.id);
    setAuthor(editData.author);
    setTitle(editData.title);
    setContent(editData.content);
  }, []);

  const checkEditButton = (author, title, pdfFile, content) => {
    const editData = JSON.parse(localStorage.getItem("editArticle"));

    if (
      author.trim().length &&
      title.trim().length &&
      pdfFile &&
      content.replace(/<[^>]+>/g, "").trim().length &&
      (author.trim() !== editData.author ||
        title.trim() !== editData.title ||
        pdfFile !== editData.pdfFile ||
        content.replace(/<[^>]+>/g, "") !==
          editData.content.replace(/<[^>]+>/g, ""))
    ) {
      setEditButtonDisabled(false);
    } else {
      setEditButtonDisabled(true);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    try {
      let pdfURL = "";

      if (pdfFile) {
        const storageRef = ref(storage, `pdfs/${pdfFile.name}`);
        await uploadBytes(storageRef, pdfFile);
        pdfURL = await getDownloadURL(storageRef);
      }

      await updateArticle(articleId, {
        author,
        title,
        pdfURL,
        createdAt: new Date(),
        content,
      });
      await fetchArticles();
      setOpenEditArticle(false);
    } catch (err) {
      console.error("Maqolani tahrirlashda xatolik:", err);
    } finally {
      setIsPending(false);
      localStorage.removeItem("editArticle");
    }
  };

  return (
    <Modal
      modalTitle={"Maqolani tahrirlash"}
      modalBtnType={"Tahrirlash"}
      setIsOpenModal={setOpenEditArticle}
      fetchArticles={fetchArticles}
      handeledButton={handleEdit}
      isPending={isPending}
      author={author}
      setAuthor={setAuthor}
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      disabledButton={editButtonDisabled}
      setDisabledButton={setEditButtonDisabled}
      iconType={editIcon}
      checkButton={checkEditButton}
      pdfFile={pdfFile}
      setPdfFile={setPdfFile}
    />
  );
}

export default EditArticle;
