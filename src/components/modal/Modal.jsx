import "./Modal.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import closeIcon from "../../assets/icons/close.png";
import cancelIcon from "../../assets/icons/cancel.png";
import { useRef } from "react";

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
}) => {
  const fileInputRef = useRef(null);

  return (
    <div className="overlay">
      <div className="modalContainer">
        <div className="modalArticle">
          <div
            className={
              modalTitle === "Maqolani tahrirlash"
                ? "modalHeader editModalHeader"
                : "modalHeader"
            }
          >
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
            <label className="modalLabel">
              Muallif
              <input
                type="text"
                placeholder="Muallif..."
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                  checkButton(e.target.value, title, content, pdfFile, pdfName);
                }}
              />
            </label>
            <label className="modalLabel">
              Sarlavha
              <input
                type="text"
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
            <div className="uploadPDF-file">
              <input
                type="file"
                hidden
                ref={fileInputRef}
                accept="application/pdf"
                onChange={(e) => {
                  setPdfFile(e.target.files[0]);
                  setPdfName(e.target.files[0].name);
                  checkButton(
                    author,
                    title,
                    content,
                    e.target.files[0],
                    e.target.files[0].name
                  );

                  e.target.value = null;
                }}
              />
              <button
                className="uploadPDF-button"
                type="button"
                onClick={() => fileInputRef.current.click()}
              >
                Fayl (PDF)
              </button>
              <div className="pdfNameSelect">
                <span className="pdfName">
                  {pdfName ? pdfName : "Hali fayl tanlanmadi."}
                </span>
              </div>
              <div
                className={
                  pdfName
                    ? "uploadPDF-delete"
                    : "uploadPDF-delete uploadPDF-deleteHidden"
                }
              >
                <span
                  className="uploadPDF-deleteButton"
                  onClick={() => {
                    setPdfFile(null);
                    setPdfName(null);
                    checkButton(
                      author,
                      title,
                      content,
                      (pdfFile = null),
                      (pdfName = null)
                    );
                  }}
                >
                  <img src={cancelIcon} alt="Cancel PDF Icon" />
                </span>
              </div>
            </div>
            <ReactQuill
              className="reactQuill"
              value={content}
              onChange={(value) => {
                setContent(value);
                checkButton(author, title, value, pdfFile, pdfName);
              }}
            />
            <div className="modalClose-buttons">
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
              <button
                className="cancelModal-button"
                onClick={() => {
                  setIsOpenModal(false);
                  modalTitle === "Maqolani tahrirlash"
                    ? localStorage.removeItem("editArticle")
                    : "";
                }}
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
