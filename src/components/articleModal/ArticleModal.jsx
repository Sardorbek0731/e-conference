import "./ArticleModal.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { icons } from "../../data/data";
import { useRef } from "react";

const ArticleModal = ({
  modalTitle,
  modalBtnType,
  handeledButton,
  isPending,
  disabledButton,
  iconType,
  checkButton,
  setIsOpenModal,
  authors,
  setAuthors,
  title,
  setTitle,
  content,
  setContent,
  pdfFile,
  setPdfFile,
  pdfName,
  setPdfName,
}) => {
  const fileInputRef = useRef(null);

  const closeModal = () => {
    setIsOpenModal(false);
    if (modalTitle === "Maqolani tahrirlash") {
      localStorage.removeItem("editArticle");
    }
  };

  const addAuthorInput = () => {
    const last = authors[authors.length - 1];
    if (authors.length === 0 || (last && last.trim().length >= 3)) {
      const updated = [...authors, ""];
      setAuthors(updated);
      checkButton(updated, title, content, pdfFile, pdfName);
    }
  };

  const handleAuthorChange = (index, value) => {
    const updated = [...authors];
    updated[index] = value;
    setAuthors(updated);
    checkButton(updated, title, content, pdfFile, pdfName);
  };

  const deleteAuthorInput = (index) => {
    const updated = authors.filter((_, i) => i !== index);
    setAuthors(updated);
    checkButton(updated, title, content, pdfFile, pdfName);
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
      setPdfName(file.name);
      checkButton(authors, title, content, file, file.name);
    }
    e.target.value = null;
  };

  const fileDeleteHandler = () => {
    setPdfFile(null);
    setPdfName(null);
    checkButton(authors, title, content, null, null);
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
              <img src={icons.cancel} alt="Close Modal" />
            </button>
          </div>

          <form className="modalForm">
            <div className="authorAdd">
              Muallif:
              <button
                type="button"
                className={`authorAddBtn ${
                  authors.length === 0 ||
                  authors[authors.length - 1].trim().length >= 3
                    ? ""
                    : "disabledAuthorAddBtn"
                }`}
                onClick={addAuthorInput}
                disabled={
                  authors.length !== 0 &&
                  authors[authors.length - 1].trim().length < 3
                }
              >
                <img src={icons.plus} alt="Add Author" />
              </button>
            </div>

            {authors.length > 0 && (
              <div className="authorInputs">
                {authors.map((author, index) => (
                  <div className="authorInputRow" key={index}>
                    <input
                      type="text"
                      className="modalInput"
                      placeholder={`Muallif ${index + 1}`}
                      value={author}
                      onChange={(e) =>
                        handleAuthorChange(index, e.target.value)
                      }
                    />

                    <button
                      type="button"
                      className="authorDelete"
                      onClick={() => deleteAuthorInput(index)}
                    >
                      <img src={icons.cancel} alt="Author Delete" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <label className="modalLabel">
              Sarlavha:
              <input
                type="text"
                className="modalInput titleInput"
                placeholder="Sarlavha..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  checkButton(
                    authors,
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
                  <img src={icons.circleCancel} alt="Delete PDF" />
                </span>
              </div>
            </div>

            <ReactQuill
              className="modalEditor"
              value={content}
              onChange={(value) => {
                setContent(value);
                checkButton(authors, title, value, pdfFile, pdfName);
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
                <img src={icons.circleCancel} alt="Cancel Add Article" />
                Bekor qilish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
