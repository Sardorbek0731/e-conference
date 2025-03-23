import "./AddArticle.css";
import Modal from "../modal/Modal";
import { addArticle } from "../../services/articleService";
import { useState } from "react";

const AddArticle = ({ setOpenAddArticle, fetchArticles, plusIcon }) => {
  const [disabledButton, setDisabledButton] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [author, setAuthor] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author || !articleTitle || !content) {
      return;
    }

    setIsPending(true);

    try {
      await addArticle({
        author,
        title: articleTitle,
        photo: "",
        createdAt: new Date(),
        content,
      });
      await fetchArticles();
      setOpenAddArticle(false);
      setIsPending(false);
    } catch (err) {
      console.error("Maqolani qo'shishda xatolik:", err);
    }
  };

  return (
    <Modal
      modalTitle={"Maqola qo'shish"}
      modalBtnType={"Qo'shish"}
      setIsOpenModal={setOpenAddArticle}
      fetchArticles={fetchArticles}
      handeledButton={handleSubmit}
      isPending={isPending}
      author={author}
      setAuthor={setAuthor}
      articleTitle={articleTitle}
      setArticleTitle={setArticleTitle}
      content={content}
      setContent={setContent}
      disabledButton={disabledButton}
      setDisabledButton={setDisabledButton}
      iconType={plusIcon}
    />
  );
};

export default AddArticle;
