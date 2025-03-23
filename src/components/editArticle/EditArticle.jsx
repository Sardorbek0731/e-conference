import "./EditArticle.css";
import Modal from "../../components/modal/Modal";
import { updateArticle } from "../../services/articleService";
import { useEffect, useState } from "react";

function EditArticle({ setOpenEditArticle, fetchArticles, editIcon }) {
  const [disabledButton, setDisabledButton] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [author, setAuthor] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [content, setContent] = useState("");
  const [articleId, setArticleId] = useState("");

  useEffect(() => {
    const editData = JSON.parse(localStorage.getItem("editArticle"));

    if (editData) {
      setArticleId(editData.id);
      setAuthor(editData.author);
      setArticleTitle(editData.title);
      setContent(editData.content);
      setDisabledButton(false);
    }
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!author || !articleTitle || !content) {
      return;
    }

    setIsPending(true);

    try {
      await updateArticle(articleId, {
        author,
        title: articleTitle,
        content,
        updatedAt: new Date(),
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
      articleTitle={articleTitle}
      setArticleTitle={setArticleTitle}
      content={content}
      setContent={setContent}
      disabledButton={disabledButton}
      setDisabledButton={setDisabledButton}
      iconType={editIcon}
    />
  );
}

export default EditArticle;
