import "../manage/Manage.css";
import Loading from "../../components/loading/Loading";
import AddConference from "../../components/addConference/AddConference";
import EditConference from "../../components/editConference/EditConference";
import { icons } from "../../data/data";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { deleteArticle } from "../../services/articleService";
import { getConferences } from "../../services/conferenceService";

function ManageConference() {
  const { data, isPending, error, fetchArticles } = useFetch(getConferences);
  const [openAddConference, setOpenAddConference] = useState(false);
  const [openEditConference, setOpenEditConference] = useState(false);
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

  if (error) return <p>Xatolik: {error}</p>;

  return (
    <>
      <div className="manageArticles">
        <div className="manageArticles-header">
          <h3 className="articlesCount">{data.length} ta konferensiya</h3>
          <button
            className="openAddArticle-button"
            onClick={() => setOpenAddConference(true)}
            aria-expanded="Konferensiya Qo'shish"
          >
            <img src={icons.circlePlus} alt="Add Conference" /> Qo'shish
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
            data.map(({ id, title, addedTime }) => (
              <div className="manageArticles-item" key={id}>
                <h1 className="manageArticle-title">{title}</h1>
                <h1 className="manageArticle-author"></h1>
                <h1 className="manageArticle-createdAt">{addedTime}</h1>
                <div className="manageArticle-Buttons">
                  <button
                    className="manageArticle-editButton"
                    onClick={() => setOpenEditConference(true)}
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
            ))
          )}
        </div>
      </div>
      {openAddConference && <AddConference />}
      {openEditConference && <EditConference />}
    </>
  );
}

export default ManageConference;
