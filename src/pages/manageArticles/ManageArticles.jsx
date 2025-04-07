import "./ManageArticles.css";
import plusIcon from "../../assets/icons/plus.png";
import editIcon from "../../assets/icons/edit.png";
import deleteIcon from "../../assets/icons/delete.png";
import downIcon from "../../assets/icons/arrows/down-arrow.png";
import Loading from "../../components/loading/Loading";
import AddArticle from "../../components/addArticle/AddArticle";
import EditArticle from "../../components/editArticle/EditArticle";
import { useState, useEffect, useRef } from "react";
import { useFetch } from "../../hooks/useFetch";
import { deleteArticle } from "../../services/articleService";

function ManageArticles() {
  const { data, isPending, error, fetchArticles } = useFetch();
  const [openAddArticle, setOpenAddArticle] = useState(false);
  const [openEditArticle, setOpenEditArticle] = useState(false);
  const [manageTypeBtn, setManageTypeBtn] = useState(false);
  const [manageType, setManageType] = useState("Maqola");
  const [loadingState, setLoadingState] = useState({});
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setManageTypeBtn(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!JSON.parse(localStorage.getItem("logined"))) {
    window.location = "/login";
    return null;
  }

  const handleDelete = async (id) => {
    try {
      setLoadingState((prevState) => ({ ...prevState, [id]: true }));

      await deleteArticle(id);
      await fetchArticles();

      setLoadingState((prevState) => ({ ...prevState, [id]: false }));
    } catch (error) {
      console.error("Maqolani o‘chirishda xatolik:", error);
      setLoadingState((prevState) => ({ ...prevState, [id]: false }));
    }
  };

  const handleEdit = (id, title, authors, content, pdfName, pdfURL) => {
    localStorage.setItem(
      "editArticle",
      JSON.stringify({ id, title, authors, content, pdfName, pdfURL })
    );
  };

  if (error) return <p>Xatolik: {error}</p>;

  return (
    <section className="manageArticles-container">
      <div className="manageType" ref={dropdownRef}>
        <button
          className={
            manageTypeBtn
              ? "manageTypeBtn manageTypeBtnFocused"
              : "manageTypeBtn"
          }
          onClick={() => setManageTypeBtn(!manageTypeBtn)}
        >
          Boshqarish: <span>{manageType}</span>
          <img
            className={
              manageTypeBtn ? "manageTypeIcon rotateIcon" : "manageTypeIcon"
            }
            src={downIcon}
            alt="Down Arrow Icon"
          />
        </button>
        <div
          className={
            manageTypeBtn
              ? "manageTypeOptions"
              : "manageTypeOptions manageTypeOptionsHidden"
          }
        >
          <h2
            onClick={() => {
              setManageType("Maqola");
              setManageTypeBtn(!manageTypeBtn);
            }}
          >
            Maqola
          </h2>
          <h2
            onClick={() => {
              setManageType("Konferensiya");
              setManageTypeBtn(!manageTypeBtn);
            }}
          >
            Konferensiya
          </h2>
        </div>
      </div>

      <div className="manageArticles">
        <div className="manageArticles-header">
          <h3 className="articlesCount">{data.length} ta maqola</h3>
          <button
            className="openAddArticle-button"
            onClick={() => setOpenAddArticle(true)}
          >
            <img src={plusIcon} alt="Plus Icon" /> Qo'shish
          </button>
        </div>
        <div className="manageArticles-navbar">
          <h3 className="manageArticles-navbarTitle">Sarlavha</h3>
          <h3 className="manageArticles-navbarAuthor">Muallif</h3>
          <h3 className="manageArticles-navbarCreatedAt">Qo'shilgan vaqt</h3>
          <h3 className="manageArticles-navbarEdit">Tahrirlash</h3>
        </div>

        <div className="manageArticles-body">
          {isPending ? (
            <Loading isPending={isPending} />
          ) : (
            data.map(
              ({ id, title, authors, addedTime, content, pdfName, pdfURL }) => (
                <div className="manageArticles-item" key={id}>
                  <h1 className="manageArticle-title">{title}</h1>
                  <h1 className="manageArticle-author">{authors.join(", ")}</h1>
                  <h1 className="manageArticle-createdAt">{addedTime}</h1>
                  <div className="manageArticle-Buttons">
                    <button
                      className="manageArticle-editButton"
                      onClick={() => {
                        handleEdit(
                          id,
                          title,
                          authors,
                          content,
                          pdfName,
                          pdfURL
                        );
                        setOpenEditArticle(true);
                      }}
                      disabled={loadingState[id]}
                    >
                      <img src={editIcon} alt="Edit Icon" />
                    </button>
                    <button
                      className="manageArticle-deleteButton"
                      onClick={() => handleDelete(id)}
                      disabled={loadingState[id]}
                    >
                      {loadingState[id] ? (
                        <span className="loading centreLoading"></span>
                      ) : (
                        <img src={deleteIcon} alt="Delete Icon" />
                      )}
                    </button>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
      {openAddArticle && (
        <AddArticle
          setOpenAddArticle={setOpenAddArticle}
          fetchArticles={fetchArticles}
          plusIcon={plusIcon}
        />
      )}
      {openEditArticle && (
        <EditArticle
          setOpenEditArticle={setOpenEditArticle}
          fetchArticles={fetchArticles}
          editIcon={editIcon}
        />
      )}
    </section>
  );
}

export default ManageArticles;
