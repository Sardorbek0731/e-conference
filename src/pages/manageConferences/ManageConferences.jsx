import "../manage/Manage.css";
import "./ManageConferences.css";
import Loading from "../../components/loading/Loading";
import AddConference from "../../components/addConference/AddConference";
import EditConference from "../../components/editConference/EditConference";
import { icons } from "../../data/data";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { deleteConference } from "../../services/conferenceService";
import { getConferences } from "../../services/conferenceService";
import { NavLink } from "react-router-dom";

function ManageConference() {
  const { data, isPending, error, fetchArticles } = useFetch(getConferences);
  const [openAddConference, setOpenAddConference] = useState(false);
  const [openEditConference, setOpenEditConference] = useState(false);
  const [loadingState, setLoadingState] = useState({});

  const handleDelete = async (id) => {
    try {
      setLoadingState((prevState) => ({ ...prevState, [id]: true }));

      await deleteConference(id);
      await fetchArticles();

      setLoadingState((prevState) => ({ ...prevState, [id]: false }));
    } catch (error) {
      console.error("Konferensiyani o‘chirishda xatolik:", error);
      setLoadingState((prevState) => ({ ...prevState, [id]: false }));
    }
  };

  const handleEdit = (
    id,
    title,
    article_ids,
    number,
    description,
    addedTime,
    createdAt
  ) => {
    localStorage.setItem(
      "editConference",
      JSON.stringify({
        id,
        title,
        article_ids,
        number,
        description,
        addedTime,
        createdAt,
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
          <h3 className="articlesCount">{data.length} ta konferensiya</h3>
          <button
            className="openAddModal-button"
            onClick={() => setOpenAddConference(true)}
          >
            <img src={icons.circlePlus} alt="Add Conference" /> Qo'shish
          </button>
        </div>
        <div className="manageNavbar">
          <h3 className="manageConference-navbarTitle">Sarlavha</h3>
          <h3 className="manageConference-navbarAuthor">Soni</h3>
          <h3 className="manageConference-navbarCreatedAt">Qo'shilgan vaqt</h3>
          <h3 className="manageConference-navbarEdit">Tahrirlash</h3>
        </div>

        <div className="manageBody">
          {isPending ? (
            <Loading isPending={isPending} />
          ) : (
            data.map(
              ({
                id,
                title,
                article_ids,
                number,
                description,
                addedTime,
                createdAt,
              }) => (
                <div className="manageItem" key={id}>
                  <h1 className="manageConference-title">{title}</h1>
                  <h1 className="manageConference-author">{number}</h1>
                  <h1 className="manageConference-createdAt">{addedTime}</h1>
                  <div className="manageButtons">
                    <button
                      className="manageEditButton"
                      onClick={() => {
                        handleEdit(
                          id,
                          title,
                          article_ids,
                          number,
                          description,
                          addedTime,
                          createdAt
                        );
                        setOpenEditConference(true);
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
      {openAddConference && (
        <AddConference
          setOpenAddConference={setOpenAddConference}
          fetchArticles={fetchArticles}
          plusIcon={icons.circlePlus}
        />
      )}
      {openEditConference && (
        <EditConference
          setOpenEditConference={setOpenEditConference}
          fetchArticles={fetchArticles}
          editIcon={icons.edit}
        />
      )}
    </section>
  );
}

export default ManageConference;
