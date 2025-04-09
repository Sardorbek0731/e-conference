import "../manage/Manage.css";
import "./ManageArticles.css";
import Loading from "../../components/loading/Loading";
import AddArticle from "../../components/addArticle/AddArticle";
import EditArticle from "../../components/editArticle/EditArticle";
import { icons } from "../../data/data";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { deleteArticle } from "../../services/articleService";
import { getArticles } from "../../services/articleService.js";
import { NavLink } from "react-router-dom";

function ManageArticles() {
  const { data, isPending, error, fetchArticles } = useFetch(getArticles);
  const [openAddArticle, setOpenAddArticle] = useState(false);
  const [openEditArticle, setOpenEditArticle] = useState(false);
  const [loadingState, setLoadingState] = useState({});

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

  if (!JSON.parse(localStorage.getItem("logined"))) {
    window.location = "/login";
  }

  if (error) return <p>Xatolik: {error}</p>;

  return (
    <section className="manageContainer">
      <div className="manageType">
        <NavLink to={"/manage/articles"}>Maqola</NavLink>
        <span>|</span>
        <NavLink to={"/manage/conferences"}>Konferensiya</NavLink>
      </div>

      <div className="manage">
        <div className="manageHeader">
          <h3 className="articlesCount">{data.length} ta maqola</h3>
          <button
            className="openAddModal-button"
            onClick={() => setOpenAddArticle(true)}
          >
            <img src={icons.circlePlus} alt="Add Article" /> Qo'shish
          </button>
        </div>
        <div className="manageNavbar">
          <h3 className="manageArticles-navbarTitle">Sarlavha</h3>
          <h3 className="manageArticles-navbarAuthor">Muallif</h3>
          <h3 className="manageArticles-navbarCreatedAt">Qo'shilgan vaqt</h3>
          <h3 className="manageArticles-navbarEdit">Tahrirlash</h3>
        </div>

        <div className="manageBody">
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
                <div className="manageItem" key={id}>
                  <h1 className="manageArticle-title">{title}</h1>
                  <h1 className="manageArticle-author">{authors.join(", ")}</h1>
                  <h1 className="manageArticle-createdAt">{addedTime}</h1>
                  <div className="manageButtons">
                    <button
                      className="manageEditButton"
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
                      <img src={icons.edit} alt="Edit" />
                    </button>
                    <button
                      className="manageDeleteButton"
                      onClick={() => handleDelete(id)}
                      disabled={loadingState[id]}
                    >
                      {loadingState[id] ? (
                        <span className="loading centreLoading"></span>
                      ) : (
                        <img src={icons.trash} alt="Delete" />
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
