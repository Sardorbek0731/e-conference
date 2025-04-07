import "./EditArticle.css";
import Modal from "../../components/modal/Modal";
import { updateArticle } from "../../services/articleService";
import { useEffect, useState } from "react";

function EditArticle({ setOpenEditArticle, fetchArticles, editIcon }) {
  const [editButtonDisabled, setEditButtonDisabled] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [articleId, setArticleId] = useState("");
  const [author, setAuthor] = useState("");
  const [authorList, setAuthorList] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfName, setPdfName] = useState(null);
  const [pdfURL, setPdfURL] = useState(null);

  useEffect(() => {
    const editData = JSON.parse(localStorage.getItem("editArticle"));

    setArticleId(editData.id);
    setAuthorList(editData.authorList);
    setTitle(editData.title);
    setContent(editData.content);
    setPdfName(editData.pdfName);
    setPdfURL(editData.pdfURL);
  }, []);

  const checkEditButton = (authorList, title, content, _, pdfName) => {
    const editData = JSON.parse(localStorage.getItem("editArticle"));

    const isSameArray = (a, b) => {
      if (!Array.isArray(a) || !Array.isArray(b)) return false;
      if (a.length !== b.length) return false;
      return a.every((item, index) => item === b[index]);
    };

    const authorListCheck = !isSameArray(authorList, editData.authorList);

    if (
      authorList.length > 0 &&
      title.trim().length &&
      pdfName &&
      content.replace(/<[^>]+>/g, "").trim().length &&
      (title.trim() !== editData.title ||
        content !== editData.content ||
        authorListCheck ||
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
    let savePdfURL = getPDF.url || pdfURL;

    try {
      await updateArticle(articleId, {
        authorList,
        title,
        savePdfURL,
        pdfName,
        image: "test",
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
      pdfName={pdfName}
      setPdfName={setPdfName}
      authorList={authorList}
      setAuthorList={setAuthorList}
    />
  );
}

export default EditArticle;
