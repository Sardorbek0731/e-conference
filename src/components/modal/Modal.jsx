import "./Modal.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import closeIcon from "../../assets/icons/close.png";
import plus from "../../assets/icons/plus.png";
import { addArticle } from "../../services/articleService";
import { useState } from "react";

const Modal = ({ setIsModalOpen, fetchArticles }) => {
  const [author, setAuthor] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

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
      setIsModalOpen(false);
      setIsPending(false);
    } catch (err) {
      console.error("Maqolani qo'shishda xatolik:", err);
    }
  };

  const okButton = (author, articleTitle, content) => {
    console.log(author, articleTitle, content);

    if (author.length && articleTitle.length && content.length) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };

  return (
    <div className="overlay">
      <div className="addArticle">
        <div className="modalHeader">
          <span className="modalTitle">Maqola qo'shish</span>
          <button className="closeModal" onClick={() => setIsModalOpen(false)}>
            <img src={closeIcon} alt="Close Icon" />
          </button>
        </div>
        <form className="modalBody">
          <div className="addArticle-simpleInputs">
            <label>
              Muallif
              <input
                type="text"
                placeholder="Muallif..."
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                  okButton(e.target.value, articleTitle, content);
                }}
              />
            </label>
            <label>
              Sarlavha
              <input
                type="text"
                placeholder="Sarlavha..."
                value={articleTitle}
                onChange={(e) => {
                  setArticleTitle(e.target.value);
                  okButton(author, e.target.value, content);
                }}
              />
            </label>
          </div>
          <ReactQuill
            className="reactQuill"
            value={content}
            onChange={(value) => {
              setContent(value);
              okButton(author, articleTitle, value.replace(/<[^>]+>/g, ""));
            }}
          />
          {isPending ? (
            <button
              className="openAddArticle-modal addArticle-button disabledButton"
              type="submit"
              onClick={handleSubmit}
              disabled="true"
            >
              <span className="loading"></span>
              Qo'shish
            </button>
          ) : (
            <button
              className={
                disabledButton
                  ? "openAddArticle-modal addArticle-button disabledButton"
                  : "openAddArticle-modal addArticle-button"
              }
              type="submit"
              onClick={handleSubmit}
              disabled={disabledButton}
            >
              <img src={plus} alt="Plus Icon" />
              Qo'shish
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Modal;
