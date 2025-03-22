import "./AddArticle.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { addArticle } from "../../services/articleService";
import { useState } from "react";
import closeIcon from "../../assets/icons/close.png";
import plus from "../../assets/icons/plus.png";
import { useFetch } from "../../hooks/useFetch";

const AddArticle = ({ closeModal }) => {
  const { refetch } = useFetch();
  const [author, setAuthor] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author || !articleTitle || !content) {
      console.log("Barcha maydonlarni to'ldiring!");
      return;
    }
    try {
      await addArticle({
        author,
        title: articleTitle,
        photo: "",
        createdAt: new Date(),
        content,
      });
      refetch();
      closeModal();
    } catch (error) {
      console.error("Maqolani qo'shishda xatolik:", error);
    }
  };

  return (
    <div className="overlay">
      <div className="addArticle">
        <div className="modalHeader">
          <span className="modalTitle">Maqola qo'shish</span>
          <button className="closeModal" onClick={closeModal}>
            <img src={closeIcon} alt="Close Icon" />
          </button>
        </div>
        <form className="modalBody" onSubmit={handleSubmit}>
          <div className="addArticle-simpleInputs">
            <label>
              Muallif
              <input
                type="text"
                placeholder="Muallif..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </label>
            <label>
              Sarlavha
              <input
                type="text"
                placeholder="Sarlavha..."
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
              />
            </label>
          </div>
          <ReactQuill
            className="reactQuill"
            value={content}
            onChange={setContent}
          />
          <button
            className="openAddArticle-modal addArticle-button"
            type="submit"
          >
            <img src={plus} alt="Plus Icon" /> Qo'shish
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
