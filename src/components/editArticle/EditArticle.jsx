import "./EditArticle.css";
import Modal from "../../components/modal/Modal";
import { updateArticle } from "../../services/articleService";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";

function EditArticle({ setOpenEditArticle, fetchArticles, editIcon }) {
  const [editButtonDisabled, setEditButtonDisabled] = useState(true);
  const [isPending, setIsPending] = useState(false);

  const [authors, setAuthors] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfName, setPdfName] = useState(null);
  const [pdfURL, setPdfURL] = useState(null);
  const [createdAt, setCreatedAt] = useState("");
  const [articleId, setArticleId] = useState("");

  useEffect(() => {
    const editData = JSON.parse(localStorage.getItem("editArticle"));

    setAuthors(editData.authors);
    setTitle(editData.title);
    setContent(editData.content);
    setPdfName(editData.pdfName);
    setPdfURL(editData.pdfURL);
    setCreatedAt(editData.createdAt);
    setArticleId(editData.id);
  }, []);

  const checkEditButton = (authors, title, content, _, pdfName) => {
    const editData = JSON.parse(localStorage.getItem("editArticle"));

    const isSameArray = (a, b) => {
      if (!Array.isArray(a) || !Array.isArray(b)) return false;
      if (a.length !== b.length) return false;
      return a.every((item, index) => item === b[index]);
    };

    const trimmedAuthors = authors.filter((a) => a.trim().length >= 3);
    const authorsCheck = !isSameArray(trimmedAuthors, editData.authors);

    if (
      trimmedAuthors.length > 0 &&
      title.trim().length >= 3 &&
      pdfName &&
      content.replace(/<[^>]+>/g, "").trim().length &&
      (title.trim() !== editData.title ||
        content !== editData.content ||
        authorsCheck ||
        pdfName !== editData.pdfName)
    ) {
      setEditButtonDisabled(false);
    } else {
      setEditButtonDisabled(true);
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const cloudinary = new FormData();
    cloudinary.append("file", pdfFile);
    cloudinary.append("upload_preset", "E-Conference");

    const setPDF = await fetch(
      `https://api.cloudinary.com/v1_1/dqbxrkizg/raw/upload`,
      {
        method: "POST",
        body: cloudinary,
      }
    );

    const getPDF = await setPDF.json();
    setPdfURL(getPDF.url || pdfURL);

    try {
      await updateArticle(articleId, {
        authors,
        title,
        pdfURL,
        pdfName,
        image: "test",
        createdAt: new Timestamp(createdAt.seconds, createdAt.nanoseconds),
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
      handeledButton={handleEdit}
      isPending={isPending}
      disabledButton={editButtonDisabled}
      iconType={editIcon}
      checkButton={checkEditButton}
      setIsOpenModal={setOpenEditArticle}
      authors={authors}
      setAuthors={setAuthors}
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      pdfFile={pdfFile}
      setPdfFile={setPdfFile}
      pdfName={pdfName}
      setPdfName={setPdfName}
    />
  );
}

export default EditArticle;
