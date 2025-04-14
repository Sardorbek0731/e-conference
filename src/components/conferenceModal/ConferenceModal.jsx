import "./ConferenceModal.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { icons } from "../../data/data";

const ConferenceModal = ({
  modalTitle,
  modalBtnType,
  handeledButton,
  isPending,
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
  const closeModal = () => {
    setIsOpenModal(false);
    if (modalTitle === "Konferensiya tahrirlash") {
      localStorage.removeItem("editConference");
    }
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
              disabled={isPending}
            >
              <img src={icons.cancel} alt="Close Modal" />
            </button>
          </div>

          <form className="modalForm">
            <label className="modalLabel">
              Sarlavha:
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

export default ConferenceModal;
