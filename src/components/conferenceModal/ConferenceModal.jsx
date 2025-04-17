import "./ConferenceModal.css";
import "../../components/modal/Modal.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { icons } from "../../data/data";
import { useFetch } from "../../hooks/useFetch";
import { getArticles } from "../../services/articleService";

const ConferenceModal = ({
  modalTitle,
  modalBtnType,
  handeledButton,
  modalIsPending,
  disabledButton,
  iconType,
  checkButton,
  setIsOpenModal,
  title,
  setTitle,
  description,
  setDescription,
  number,
  setNumber,
  articleIDS,
  setArticleIDS,
}) => {
  const { data, isPending, error, fetchArticles } = useFetch(getArticles);

  const closeModal = () => {
    setIsOpenModal(false);
    if (modalTitle === "Konferensiya tahrirlash") {
      localStorage.removeItem("editConference");
    }
  };

  const addArticleIDInput = () => {
    const last = articleIDS[articleIDS.length - 1];
    if (articleIDS.length === 0 || (last && last.trim().length >= 3)) {
      const updated = [...articleIDS, ""];
      setArticleIDS(updated);
      checkButton(title, description, number, updated);
    }
  };

  const handleArticleIDChange = (index, value) => {
    const updated = [...articleIDS];
    updated[index] = value;
    setArticleIDS(updated);
    checkButton(title, description, number, updated);
  };

  const deleteArticleIDInput = (index) => {
    const updated = articleIDS.filter((_, i) => i !== index);
    setArticleIDS(updated);
    checkButton(title, description, number, updated);
  };

  return (
    <div className="modalOverlay">
      <div className="modalContainer">
        <div className="modalDialog">
          <div
            className={`modalHeader ${
              modalTitle === "Konferensiya tahrirlash" ? "modalHeaderEdit" : ""
            }`}
          >
            <span className="modalTitle">{modalTitle}</span>
            <button
              className="modalClose"
              onClick={closeModal}
              disabled={modalIsPending}
            >
              <img src={icons.cancel} alt="Close Modal" />
            </button>
          </div>

          <form className="modalForm">
            <label className="modalLabel">
              Sarlavhawfeffef:
              <input
                type="text"
                className="modalInput titleInput"
                placeholder="Sarlavha..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  checkButton(e.target.value, description, number, articleIDS);
                }}
              />
            </label>

            <label className="modalLabel">
              Soni:
              <input
                type="text"
                className="modalInput titleInput"
                placeholder="Soni..."
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                  checkButton(title, description, e.target.value, articleIDS);
                }}
              />
            </label>

            <div className="optionInput">
              Maqola:
              <button
                type="button"
                className={`optionInput-addBtn ${
                  articleIDS.length === 0 ||
                  articleIDS[articleIDS.length - 1].trim().length >= 3
                    ? ""
                    : "optionInput-addBtn--disabled"
                }`}
                onClick={addArticleIDInput}
                disabled={
                  articleIDS.length !== 0 &&
                  articleIDS[articleIDS.length - 1].trim().length < 3
                }
              >
                <img src={icons.plus} alt="Add Article" />
              </button>
            </div>

            {articleIDS.length > 0 && (
              <div className="optionInput-list">
                {articleIDS.map((item, index) => (
                  <div className="optionInput-row" key={index}>
                    <input
                      type="text"
                      className="modalInput"
                      placeholder={`Maqola ${index + 1}`}
                      value={item}
                      onChange={(e) =>
                        handleArticleIDChange(index, e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="optionInput-deleteBtn"
                      onClick={() => deleteArticleIDInput(index)}
                    >
                      <img src={icons.cancel} alt="Delete Article" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <ReactQuill
              className="modalEditor"
              value={description}
              onChange={(value) => {
                setDescription(value);
                checkButton(title, value, number, articleIDS);
              }}
            />

            <div className="modalActions">
              <button
                className={`modalSubmit ${
                  modalTitle === "Konferensiya tahrirlash"
                    ? "modalSubmitEdit"
                    : "modalSubmitAdd"
                }`}
                type="submit"
                onClick={handeledButton}
                disabled={modalIsPending || disabledButton}
              >
                {modalIsPending ? (
                  <span className="loading"></span>
                ) : (
                  <img src={iconType} alt="Plus Icon" />
                )}
                {modalBtnType}
              </button>

              <button
                className="modalCancel"
                onClick={closeModal}
                disabled={modalIsPending}
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

export default ConferenceModal;
