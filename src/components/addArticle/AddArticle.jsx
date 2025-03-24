import "./AddArticle.css";
import Modal from "../modal/Modal";
import { addArticle } from "../../services/articleService";
import { useState } from "react";

const AddArticle = ({ setOpenAddArticle, fetchArticles, plusIcon }) => {
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    try {
      await addArticle({
        author,
        title: title,
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

  const checkAddButton = (author, articleTitle, content) => {
    if (
      author.trim().length &&
      articleTitle.trim().length &&
      content.replace(/<[^>]+>/g, "").trim().length
    ) {
      setAddButtonDisabled(false);
    } else {
      setAddButtonDisabled(true);
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
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      disabledButton={addButtonDisabled}
      setDisabledButton={setAddButtonDisabled}
      iconType={plusIcon}
      checkButton={checkAddButton}
    />
  );
};

export default AddArticle;
