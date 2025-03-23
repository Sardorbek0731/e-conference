import "./Modal.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import closeIcon from "../../assets/icons/close.png";

const Modal = ({
  modalTitle,
  modalBtnType,
  setIsOpenModal,
  handeledButton,
  isPending,
  author,
  setAuthor,
  articleTitle,
  setArticleTitle,
  content,
  setContent,
  disabledButton,
  setDisabledButton,
  iconType,
}) => {
  const okButton = (author, articleTitle, content) => {
    if (author.length && articleTitle.length && content.length) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };

  return (
    <div className="overlay">
      <div className="modalArticle">
        <div className="modalHeader">
          <span className="modalTitle">{modalTitle}</span>
          <button
            className={
              isPending ? "closeModal disabledCloseModal" : "closeModal"
            }
            disabled={isPending}
            onClick={() => {
              setIsOpenModal(false);
              modalTitle === "Maqolani tahrirlash"
                ? localStorage.removeItem("editArticle")
                : "";
            }}
          >
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
              className={
                modalTitle === "Maqolani tahrirlash"
                  ? "openAddArticle-modal editArticle-button editDisabledButton"
                  : "openAddArticle-modal addArticle-button addDisabledButton"
              }
              type="submit"
              onClick={handeledButton}
              disabled="true"
            >
              <span className="loading"></span>
              {modalBtnType}
            </button>
          ) : (
            <button
              className={
                disabledButton
                  ? modalTitle === "Maqolani tahrirlash"
                    ? "openAddArticle-modal editArticle-button editDisabledButton"
                    : "openAddArticle-modal addArticle-button addDisabledButton"
                  : modalTitle === "Maqolani tahrirlash"
                  ? "openAddArticle-modal editArticle-button"
                  : "openAddArticle-modal addArticle-button"
              }
              type="submit"
              onClick={handeledButton}
              disabled={disabledButton}
            >
              <img src={iconType} alt="Plus Icon" />
              {modalBtnType}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Modal;
