import "./Modal.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import closeIcon from "../../assets/icons/close.png";
import cancelIcon from "../../assets/icons/cancel.png";
import plusIcon from "../../assets/icons/plus-math.png";
import deleteIcon from "../../assets/icons/delete.png";
import { useRef, useState, useEffect } from "react";

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
  pdfFile,
  setPdfFile,
  pdfName,
  setPdfName,
  autherList,
  setAutherList,
}) => {
  const [canAddAuthor, setCanAddAuthor] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const hasEmptyAuthor = autherList.some((a) => a.trim() === "");
    setCanAddAuthor(author.trim().length > 3 && !hasEmptyAuthor);
  }, [author, autherList]);

  const closeModal = () => {
    setIsOpenModal(false);
    if (modalTitle === "Maqolani tahrirlash") {
      localStorage.removeItem("editArticle");
    }
  };

  const addAuthorHandler = (e) => {
    e.preventDefault();
    if (author.trim().length > 3 && !autherList.some((a) => a.trim() === "")) {
      setAutherList([author, ...autherList]);
      setAuthor("");
    }
  };

  const changeAuthorHandler = (id, value) => {
    const updatedAuthors = [...autherList];
    updatedAuthors[id] = value;
    setAutherList(updatedAuthors);
  };

  const deleteAuthorHandler = (id) => {
    const filteredAuthors = autherList.filter((_, index) => index !== id);
    setAutherList(filteredAuthors);
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
      setPdfName(file.name);
      checkButton(author, title, content, file, file.name);
    }
    e.target.value = null;
  };

  const fileDeleteHandler = () => {
    setPdfFile(null);
    setPdfName(null);
    checkButton(author, title, content, null, null);
  };

  return (
    <div className="modalOverlay">
      <div className="modalContainer">
        <div className="modalDialog">
          <div
            className={`modalHeader ${
              modalTitle === "Maqolani tahrirlash" ? "modalHeaderEdit" : ""
            }`}
          >
            <span className="modalTitle">{modalTitle}</span>
            <button
              className="modalClose"
              onClick={closeModal}
              disabled={isPending}
            >
              <img src={closeIcon} alt="Close Modal" />
            </button>
          </div>

          <form className="modalForm">
            <label className="modalLabel">
              Muallif
              <div className="authorInputGroup">
                <input
                  type="text"
                  className="modalInput authorInput"
                  placeholder="Muallif..."
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value);
                    checkButton(
                      e.target.value,
                      title,
                      content,
                      pdfFile,
                      pdfName
                    );
                  }}
                />
                <button
                  className={`authorAddBtn ${
                    canAddAuthor ? "" : "disabledAuthorAddBtn"
                  }`}
                  onClick={addAuthorHandler}
                  disabled={!canAddAuthor}
                >
                  <img src={plusIcon} alt="Plus Icon" />
                </button>
              </div>
              <div className="authorList">
                {autherList.map((auther, id) => (
                  <div className="authorItem" key={id}>
                    <input
                      type="text"
                      value={auther}
                      onChange={(e) => changeAuthorHandler(id, e.target.value)}
                    />
                    <button
                      className="authorDelete"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteAuthorHandler(id);
                      }}
                    >
                      <img src={deleteIcon} alt="Delete Icon" />
                    </button>
                  </div>
                ))}
              </div>
            </label>

            <label className="modalLabel">
              Sarlavha
              <input
                type="text"
                className="modalInput"
                placeholder="Sarlavha..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  checkButton(
                    author,
                    e.target.value,
                    content,
                    pdfFile,
                    pdfName
                  );
                }}
              />
            </label>

            <div className="pdfUploadGroup">
              <input
                type="file"
                hidden
                ref={fileInputRef}
                accept="application/pdf"
                onChange={fileChangeHandler}
              />
              <button
                className="pdfUploadBtn"
                type="button"
                onClick={() => fileInputRef.current.click()}
              >
                Fayl (PDF)
              </button>
              <div className="pdfNameWrapper">
                <span className="pdfName">
                  {pdfName || "Hali fayl tanlanmadi."}
                </span>
              </div>
              <div
                className={`pdfDeleteWrapper ${
                  pdfName ? "" : "disabledPdfDeleteWrapper"
                }`}
              >
                <span className="pdfDeleteBtn" onClick={fileDeleteHandler}>
                  <img src={cancelIcon} alt="Delete PDF Icon" />
                </span>
              </div>
            </div>

            <ReactQuill
              className="modalEditor"
              value={content}
              onChange={(value) => {
                setContent(value);
                checkButton(author, title, value, pdfFile, pdfName);
              }}
            />

            <div className="modalActions">
              <button
                className={`modalSubmit ${
                  modalTitle === "Maqolani tahrirlash"
                    ? "modalSubmitEdit"
                    : "modalSubmitAdd"
                }`}
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

              <button
                className="modalCancel"
                onClick={closeModal}
                disabled={isPending}
              >
                Bekor qilish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
