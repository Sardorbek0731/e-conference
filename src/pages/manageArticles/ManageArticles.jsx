import "../manage/Manage.css";
import Loading from "../../components/loading/Loading";
import AddArticle from "../../components/addArticle/AddArticle";
import EditArticle from "../../components/editArticle/EditArticle";
import { icons } from "../../data/data";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { deleteArticle } from "../../services/articleService";
import { getArticles } from "../../services/articleService.js";

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

  if (error) return <p>Xatolik: {error}</p>;

  return (
    <>
      <div className="manageArticles">
        <div className="manageArticles-header">
          <h3 className="articlesCount">{data.length} ta maqola</h3>
          <button
            className="openAddArticle-button"
            onClick={() => setOpenAddArticle(true)}
            aria-expanded="Maqola Qo'shish"
          >
            <img src={icons.circlePlus} alt="Add Article" /> Qo'shish
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
    </>
  );
}

export default ManageArticles;
