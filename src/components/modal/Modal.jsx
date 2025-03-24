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
  title,
  setTitle,
  content,
  setContent,
  disabledButton,
  iconType,
  checkButton,
}) => {
  return (
    <div className="overlay">
      <div className="modalArticle">
        <div className="modalHeader">
          <span className="modalTitle">{modalTitle}</span>
          <button
            className="closeModal"
            onClick={() => {
              setIsOpenModal(false);
              modalTitle === "Maqolani tahrirlash"
                ? localStorage.removeItem("editArticle")
                : "";
            }}
            disabled={isPending}
          >
            <img src={closeIcon} alt="Close Icon" />
          </button>
        </div>
        <form className="modalBody">
          <div className="addArticle-inputs">
            <label>
              Muallif
              <input
                type="text"
                placeholder="Muallif..."
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                  checkButton(e.target.value, title, content);
                }}
              />
            </label>
            <label>
              Sarlavha
              <input
                type="text"
                placeholder="Sarlavha..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  checkButton(author, e.target.value, content);
                }}
              />
            </label>
          </div>
          <ReactQuill
            className="reactQuill"
            value={content}
            onChange={(value) => {
              setContent(value);
              checkButton(author, title, value);
            }}
          />
          <button
            className={
              modalTitle === "Maqolani tahrirlash"
                ? "modalEdit-or-AddButton editArticle-button"
                : "modalEdit-or-AddButton addArticle-button"
            }
            type="submit"
            onClick={handeledButton}
            disabled={isPending || disabledButton}
          >
            {isPending ? (
              <span className="loading"></span>
            ) : (
              <img src={iconType} alt="Plus Icon" />
            )}
            {modalBtnType}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
