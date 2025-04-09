import "./ManageConferences.css";
import Loading from "../../components/loading/Loading";
import AddArticle from "../../components/addArticle/AddArticle";
import EditArticle from "../../components/editArticle/EditArticle";
import BackButton from "../../components/backButton/BackButton";
import { icons } from "../../data/data";
import { useState, useEffect, useRef } from "react";
import { useFetch } from "../../hooks/useFetch";
import { deleteArticle } from "../../services/articleService";
import { NavLink } from "react-router-dom";
import { getConferences } from "../../services/conferenceService";

function ManageArticles() {
  const { data, isPending, error, fetchArticles } = useFetch(getConferences);
  const [openAddArticle, setOpenAddArticle] = useState(false);
  const [openEditArticle, setOpenEditArticle] = useState(false);
  const [manageTypeBtn, setManageTypeBtn] = useState(false);
  const [manageType, setManageType] = useState(() => {
    return localStorage.getItem("manageType") || "Maqola";
  });
  const [loadingState, setLoadingState] = useState({});
  const dropdownRef = useRef(null);

  useEffect(() => {
    setManageType("Konferensiya");
    localStorage.setItem("manageType", manageType);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setManageTypeBtn(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [manageType]);

  if (!JSON.parse(localStorage.getItem("logined"))) {
    window.location = "/login";
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

  const handleEdit = (
    id,
    title,
    authors,
    createdAt,
    content,
    pdfName,
    pdfURL
  ) => {
    localStorage.setItem(
      "editArticle",
      JSON.stringify({
        id,
        title,
        authors,
        createdAt,
        content,
        pdfName,
        pdfURL,
      })
    );
  };

  if (error) return <p>Xatolik: {error}</p>;

  return (
    <section className="manageArticles-container">
      <div className="manageHeaderBtns">
        <BackButton />

        <div className="dropdown-container" ref={dropdownRef}>
          <button
            className={`dropdown-toggle ${
              manageTypeBtn ? "dropdown-toggle--active" : ""
            }`}
            onClick={() => setManageTypeBtn((prev) => !prev)}
            aria-expanded={manageTypeBtn}
          >
            Boshqaruv: <span className="selected-option">{manageType}</span>
            <img
              className="dropdown-icon"
              src={icons.down}
              alt="Dropdown Arrow"
            />
          </button>
          <div className="dropdown-menu">
            <NavLink
              to={"/manage/articles"}
              className={`dropdown-item ${
                manageType === "Maqola" ? "dropdown-item--selected" : ""
              }`}
              onClick={() => {
                setManageType("Maqola");
                setManageTypeBtn((prev) => !prev);
              }}
            >
              Maqola
            </NavLink>
            <NavLink
              to={"/manage/conferences"}
              className={`dropdown-item ${
                manageType === "Konferensiya" ? "dropdown-item--selected" : ""
              }`}
              onClick={() => {
                setManageType("Konferensiya");
                setManageTypeBtn((prev) => !prev);
              }}
            >
              Konferensiya
            </NavLink>
          </div>
        </div>
      </div>

      <div className="manageArticles">
        <div className="manageArticles-header">
          <h3 className="articlesCount">{data.length} ta konferensiya</h3>
          <button
            className="openAddArticle-button"
            onClick={() => setOpenAddArticle(true)}
            aria-expanded="Maqola Qo'shish"
          >
            <img src={icons.circlePlus} alt="Plus Icon" /> Qo'shish
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
              ({
                id,
                title,
                authors,
                createdAt,
                content,
                pdfName,
                pdfURL,
                addedTime,
              }) => (
                <div className="manageArticles-item" key={id}>
                  <h1 className="manageArticle-title">{title}</h1>
                  <h1 className="manageArticle-author"></h1>
                  <h1 className="manageArticle-createdAt">{addedTime}</h1>
                  <div className="manageArticle-Buttons">
                    <button
                      className="manageArticle-editButton"
                      onClick={() => {
                        handleEdit(
                          id,
                          title,
                          authors,
                          createdAt,
                          content,
                          pdfName,
                          pdfURL
                        );
                        setOpenEditArticle(true);
                      }}
                      disabled={loadingState[id]}
                    >
                      <img src={icons.edit} alt="Edit Icon" />
                    </button>
                    <button
                      className="manageArticle-deleteButton"
                      onClick={() => handleDelete(id)}
                      disabled={loadingState[id]}
                    >
                      {loadingState[id] ? (
                        <span className="loading centreLoading"></span>
                      ) : (
                        <img src={icons.trash} alt="Delete Icon" />
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
          plusIcon={icons.circlePlus}
        />
      )}
      {openEditArticle && (
        <EditArticle
          setOpenEditArticle={setOpenEditArticle}
          fetchArticles={fetchArticles}
          editIcon={icons.edit}
        />
      )}
    </section>
  );
}

export default ManageArticles;
