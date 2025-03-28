import "./EditArticle.css";
import Modal from "../../components/modal/Modal";
import { updateArticle } from "../../services/articleService";
import { useEffect, useState } from "react";

function EditArticle({ setOpenEditArticle, fetchArticles, editIcon }) {
  const [editButtonDisabled, setEditButtonDisabled] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [articleId, setArticleId] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const editData = JSON.parse(localStorage.getItem("editArticle"));

    setArticleId(editData.id);
    setAuthor(editData.author);
    setTitle(editData.title);
    setContent(editData.content);
  }, []);

  const checkEditButton = (author, title, content) => {
    const editData = JSON.parse(localStorage.getItem("editArticle"));

    if (
      author.trim().length &&
      title.trim().length &&
      content.replace(/<[^>]+>/g, "").trim().length &&
      (author.trim() !== editData.author ||
        title.trim() !== editData.title ||
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
      await updateArticle(articleId, {
        author,
        title,
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
    />
  );
}

export default EditArticle;
